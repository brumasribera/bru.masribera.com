import { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type LanguageCode = 'en' | 'de' | 'fr' | 'es' | 'ca' | 'it' | 'pt'

type FlatRecord = Record<string, string>

function flattenObject(obj: Record<string, any>, prefix = ''): FlatRecord {
	const result: FlatRecord = {}
	for (const key of Object.keys(obj ?? {})) {
		const value = obj[key]
		const newKey = prefix ? `${prefix}.${key}` : key
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			Object.assign(result, flattenObject(value, newKey))
		} else if (value !== undefined && value !== null) {
			result[newKey] = String(value)
		}
	}
	return result
}

function unflattenObject(flat: FlatRecord): Record<string, any> {
	const result: Record<string, any> = {}
	for (const flatKey of Object.keys(flat)) {
		const parts = flatKey.split('.')
		let curr: Record<string, any> = result
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]
			if (i === parts.length - 1) {
				curr[part] = flat[flatKey]
			} else {
				curr[part] = curr[part] ?? {}
				curr = curr[part]
			}
		}
	}
	return result
}

async function aiTranslateBatch(params: {
	apiKey?: string
	sourceLanguage: string
	targetLanguage: string
	reference: FlatRecord
	missingKeys: string[]
}): Promise<Record<string, string>> {
	const { apiKey, sourceLanguage, targetLanguage, reference, missingKeys } = params
	if (!apiKey || missingKeys.length === 0) return {}

	const examples = missingKeys.slice(0, 50).map((k) => ({ key: k, text: reference[k] }))
	const content = [
		{
			role: 'system',
			content:
				`You are a precise translator. Keep placeholders like "+{name}", "{count}", "{{variable}}", or "%(var)s" intact. Keep HTML/Markdown tags. Translate natural language text from ${sourceLanguage} to ${targetLanguage}. Return a compact JSON object mapping keys to translated strings, no commentary.`,
		},
		{
			role: 'user',
			content: `Reference entries (JSON array of {key, text}):\n${JSON.stringify(examples)}\nTranslate only for the provided keys.`,
		},
	]

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini',
			messages: content as any,
			temperature: 0.2,
		})
	})

	if (!response.ok) return {}
	const data = await response.json()
	const text: string = data?.choices?.[0]?.message?.content ?? '{}'
	try {
		const parsed = JSON.parse(text)
		return parsed && typeof parsed === 'object' ? parsed : {}
	} catch {
		return {}
	}
}

export default function TranslationsAdminPage() {
	const { i18n } = useTranslation()
	const [authorized, setAuthorized] = useState(false)
	const [password, setPassword] = useState('')
	const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>((i18n.language as LanguageCode) || 'en')
	const [selectedNamespace, setSelectedNamespace] = useState<string>('home')
	const [filter, setFilter] = useState('')
	const [darkMode, setDarkMode] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showStats, setShowStats] = useState(true)

	const adminPassword = (import.meta as any).env?.VITE_TRANSLATIONS_ADMIN_PASSWORD || 'HH0R^47Y6n1SId@*^K!!'
	const openaiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY as string | undefined

	// Auto-detect dark mode preference
	useEffect(() => {
		const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		setDarkMode(isDark)
	}, [])

	// Swap favicon specifically for admin translations page
	useEffect(() => {
		const head = document.head
		const existingIcon = head.querySelector("link[rel='icon'][type='image/svg+xml']") as HTMLLinkElement | null
		const originalHref = existingIcon?.href
		// add or replace with admin favicon
		const adminHref = '/favicons/favicon-admin.svg'
		if (existingIcon) {
			existingIcon.href = adminHref
		} else {
			const link = document.createElement('link')
			link.rel = 'icon'
			link.type = 'image/svg+xml'
			link.href = adminHref
			link.id = 'favicon-svg'
			head.appendChild(link)
		}

		return () => {
			if (existingIcon && originalHref) {
				existingIcon.href = originalHref
			}
		}
	}, [])

	const availableNamespaces: string[] = useMemo(() => {
		const ns = i18n.options?.ns
		if (Array.isArray(ns)) return ns as string[]
		if (typeof ns === 'string') return [ns]
		return ['translation', 'common', 'home', 'pages_openhuts', 'pages_reserve', 'cv']
	}, [i18n.options?.ns])

	const flatRecords = useMemo(() => {
		const res = i18n.getResourceBundle(selectedLanguage, selectedNamespace) || {}
		return flattenObject(res)
	}, [i18n, selectedLanguage, selectedNamespace])

	const referenceFlat = useMemo(() => {
		const refLng = (i18n.options?.fallbackLng as any) || 'en'
		const ref = i18n.getResourceBundle(Array.isArray(refLng) ? refLng[0] : refLng, selectedNamespace) || {}
		return flattenObject(ref)
	}, [i18n, selectedNamespace])

	const [edits, setEdits] = useState<FlatRecord>({})

	const merged: FlatRecord = useMemo(() => ({ ...flatRecords, ...edits }), [flatRecords, edits])

	const missingKeys = useMemo(() => Object.keys(referenceFlat).filter((k) => !(k in merged)), [referenceFlat, merged])

	const visibleEntries = useMemo(() => {
		const entries = Object.entries(merged)
		if (!filter.trim()) return entries
		const f = filter.toLowerCase()
		return entries.filter(([k, v]) => k.toLowerCase().includes(f) || v.toLowerCase().includes(f))
	}, [merged, filter])

	const handleSaveRuntime = async () => {
		setIsLoading(true)
		try {
			const updated = unflattenObject(merged)
			i18n.addResourceBundle(selectedLanguage, selectedNamespace, updated, true, true)
			localStorage.setItem(
				`translations-edits:${selectedLanguage}:${selectedNamespace}`,
				JSON.stringify(updated)
			)
			// Show success toast
			showToast('Changes saved successfully!', 'success')
		} catch (error) {
			showToast('Error saving changes', 'error')
		} finally {
			setIsLoading(false)
		}
	}

	const handleExport = () => {
		const updated = unflattenObject(merged)
		const blob = new Blob([JSON.stringify(updated, null, 2)], { type: 'application/json' })
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = `${selectedLanguage}.${selectedNamespace}.json`
		a.click()
		showToast('File exported successfully!', 'success')
	}

	const handleAutofillAI = async () => {
		if (!openaiKey) return
		setIsLoading(true)
		try {
			const translated = await aiTranslateBatch({
				apiKey: openaiKey,
				sourceLanguage: 'en',
				targetLanguage: selectedLanguage,
				reference: referenceFlat,
				missingKeys,
			})
			if (Object.keys(translated).length === 0) {
				showToast('No translations generated', 'warning')
				return
			}
			setEdits((prev) => ({ ...prev, ...translated }))
			showToast(`${Object.keys(translated).length} translations generated!`, 'success')
		} catch (error) {
			showToast('Error generating translations', 'error')
		} finally {
			setIsLoading(false)
		}
	}

	const enableLocizeEditor = () => {
		localStorage.setItem('locizeEditor', 'enabled')
		location.reload()
	}

	const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
		// Simple toast implementation
		const toast = document.createElement('div')
		toast.className = `fixed top-24 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform translate-x-full transition-transform duration-300 ${
			type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500'
		}`
		toast.textContent = message
		document.body.appendChild(toast)
		
		setTimeout(() => toast.classList.remove('translate-x-full'), 100)
		setTimeout(() => {
			toast.classList.add('translate-x-full')
			setTimeout(() => document.body.removeChild(toast), 300)
		}, 3000)
	}

	if (!authorized) {
		return (
			<div className={`min-h-screen transition-colors duration-300 ${
				darkMode 
					? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
					: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
			} pt-24 px-4`}>
				<div className="max-w-md mx-auto">
					<div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 border ${
						darkMode 
							? 'bg-slate-800/80 border-slate-700 text-white' 
							: 'bg-white/80 border-slate-200 text-slate-800'
					}`}>
						<div className="text-center mb-8">
							<div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
								<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
							<h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Translations Admin
							</h1>
							<p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
								Enter your password to access the admin panel
							</p>
						</div>
						
						<form onSubmit={(e) => { e.preventDefault(); setAuthorized(password === adminPassword) }}>
							<div className="space-y-6">
								<div>
									<label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
										Password
									</label>
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className={`w-full px-4 py-4 border rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
											darkMode 
												? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
												: 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
										}`}
										placeholder="Enter your password"
										autoFocus
									/>
								</div>
								
								<button
									type="submit"
									className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl"
								>
									Unlock Admin Panel
								</button>
							</div>
						</form>
						
						{password && password !== adminPassword && (
							<div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
								<p className="text-sm text-red-400 text-center">Incorrect password. Please try again.</p>
							</div>
						)}

						{/* Dark mode toggle removed */}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`min-h-screen transition-colors duration-300 ${
			darkMode 
				? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
				: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
		} pt-24 px-4`}>
			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<div className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-8 mb-8 ${
					darkMode 
						? 'bg-slate-800/80 border-slate-700' 
						: 'bg-white/80 border-slate-200'
				}`}>
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
						<div className="flex-1">
							<div className="flex items-center gap-4 mb-4">
								<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
									Translations Admin
								</h1>
								{/* Dark mode toggle removed */}
							</div>
							<p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
								Manage and edit translation files for all supported languages
							</p>
						</div>
						
						<div className="flex flex-wrap gap-3">
							<button 
								onClick={handleSaveRuntime}
								disabled={isLoading}
								className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? (
									<svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								) : (
									<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
								)}
								{isLoading ? 'Saving...' : 'Apply Changes'}
							</button>
							
							<button 
								onClick={handleExport} 
								className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
							>
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								Export JSON
							</button>
							
							{openaiKey && (
								<button 
									onClick={handleAutofillAI}
									disabled={isLoading}
									className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
									AI Autofill ({missingKeys.length})
								</button>
							)}
							
							{(import.meta as any).env?.VITE_LOCIZE_ENABLED && (
								<button 
									onClick={enableLocizeEditor} 
									className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
								>
									<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
									</svg>
									Enable In-Context Editor
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Stats Section */}
				{showStats && (
					<div className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-6 mb-8 ${
						darkMode 
							? 'bg-slate-800/80 border-slate-700' 
							: 'bg-white/80 border-slate-200'
					}`}>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
								<div className="text-3xl font-bold text-blue-600">{visibleEntries.length}</div>
								<div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Total Entries</div>
							</div>
							<div className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
								<div className="text-3xl font-bold text-orange-600">{missingKeys.length}</div>
								<div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Missing Keys</div>
							</div>
							<div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
								<div className="text-3xl font-bold text-green-600">{Object.keys(edits).length}</div>
								<div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Modified</div>
							</div>
							<div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
								<div className="text-3xl font-bold text-purple-600">{selectedLanguage.toUpperCase()}</div>
								<div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Current Language</div>
							</div>
						</div>
					</div>
				)}

				{/* Controls Section */}
				<div className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-6 mb-8 ${
					darkMode 
						? 'bg-slate-800/80 border-slate-700' 
						: 'bg-white/80 border-slate-200'
				}`}>
					<div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
						<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
							<div className="flex items-center gap-3">
								<label className={`text-sm font-semibold whitespace-nowrap ${
									darkMode ? 'text-slate-200' : 'text-slate-700'
								}`}>Language:</label>
								<select
									value={selectedLanguage}
									onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
									className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
										darkMode 
											? 'bg-slate-700 border-slate-600 text-white' 
											: 'bg-white border-slate-300 text-slate-800'
									}`}
								>
									{(['en', 'de', 'fr', 'es', 'ca', 'it', 'pt'] as LanguageCode[]).map((lng) => (
										<option key={lng} value={lng} className="py-1">{lng.toUpperCase()}</option>
									))}
								</select>
							</div>

							<div className="flex items-center gap-3">
								<label className={`text-sm font-semibold whitespace-nowrap ${
									darkMode ? 'text-slate-200' : 'text-slate-700'
								}`}>Namespace:</label>
								<select
									value={selectedNamespace}
									onChange={(e) => setSelectedNamespace(e.target.value)}
									className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
										darkMode 
											? 'bg-slate-700 border-slate-600 text-white' 
											: 'bg-white border-slate-300 text-slate-800'
									}`}
								>
									{availableNamespaces.map((ns) => (
										<option key={ns} value={ns} className="py-1">{ns}</option>
									))}
								</select>
							</div>
						</div>

						<div className="flex-1 lg:ml-auto">
							<div className="relative">
								<svg className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
									darkMode ? 'text-slate-400' : 'text-slate-500'
								}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<input
									type="text"
									value={filter}
									onChange={(e) => setFilter(e.target.value)}
									placeholder="Search by key or text content..."
									className={`w-full lg:w-96 pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
										darkMode 
											? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
											: 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
									}`}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Translations Table */}
				<div className={`backdrop-blur-xl rounded-3xl shadow-2xl border overflow-hidden ${
					darkMode 
						? 'bg-slate-800/80 border-slate-700' 
						: 'bg-white/80 border-slate-200'
				}`}>
					<div className="bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 text-white px-8 py-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<div className="text-sm font-semibold uppercase tracking-wider">Translation Key</div>
							<div className="text-sm font-semibold uppercase tracking-wider">Text Content</div>
						</div>
					</div>
					
					<div className="max-h-[70vh] overflow-auto">
						{visibleEntries.length === 0 ? (
							<div className="p-16 text-center">
								<svg className={`w-20 h-20 mx-auto mb-6 ${
									darkMode ? 'text-slate-600' : 'text-slate-300'
								}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								<p className={`text-xl font-medium mb-2 ${
									darkMode ? 'text-slate-400' : 'text-slate-500'
								}`}>No translations found</p>
								<p className={`${
									darkMode ? 'text-slate-500' : 'text-slate-400'
								}`}>Try adjusting your search or language/namespace selection</p>
							</div>
						) : (
							<div className="divide-y divide-slate-100 dark:divide-slate-700">
								{visibleEntries.map(([k, v], index) => (
									<div key={k} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 hover:bg-opacity-50 transition-all duration-300 ${
										index % 2 === 0 
											? darkMode ? 'bg-slate-700/50' : 'bg-slate-50/50'
											: darkMode ? 'bg-slate-800/50' : 'bg-white/50'
									} hover:${darkMode ? 'bg-slate-600/50' : 'bg-slate-100/50'}`}>
										<div className="space-y-3">
											<div className={`text-sm font-mono px-3 py-2 rounded-lg break-all ${
												darkMode 
													? 'bg-slate-600 text-slate-200' 
													: 'bg-slate-100 text-slate-700'
											}`}>
												{k}
											</div>
											<div className={`text-sm ${
												darkMode ? 'text-slate-400' : 'text-slate-500'
											}`}>
												Original: <span className="font-medium">{v || '(empty)'}</span>
											</div>
										</div>
										
										<div className="space-y-3">
											<textarea
												className={`w-full border rounded-xl px-4 py-3 text-base min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-y ${
													darkMode 
														? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
														: 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
												}`}
												value={edits[k] ?? v ?? ''}
												onChange={(e) => setEdits((prev) => ({ ...prev, [k]: e.target.value }))}
												placeholder="Enter translation..."
											/>
											{edits[k] !== undefined && edits[k] !== v && (
												<div className="flex items-center gap-3 text-sm">
													<span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
														Modified
													</span>
													<button
														onClick={() => setEdits((prev) => { const newEdits = { ...prev }; delete newEdits[k]; return newEdits; })}
														className="inline-flex items-center gap-2 px-3 py-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline hover:no-underline transition-all duration-200"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4z" />
														</svg>
														Reset
													</button>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Floating Action Button */}
				<div className="fixed bottom-8 right-8 z-40">
					<button
						onClick={() => setShowStats(!showStats)}
						className={`p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
							darkMode 
								? 'bg-slate-700 text-slate-200 hover:bg-slate-600' 
								: 'bg-white text-slate-700 hover:bg-slate-100'
						}`}
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}


