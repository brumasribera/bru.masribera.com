import { ArrowLeft, Users, Shield, Globe2, Instagram } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Footer } from './Footer'
import { useProjectNavigation } from './hooks/useProjectNavigation'
import { ProjectNavigationButton } from './ProjectNavigationButton'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useEffect, useMemo, useState } from 'react'

type Step = 'home' | 'select' | 'summary' | 'success'

export function ReservePage() {
	const { navigateToProject, navigateToHome } = useProjectNavigation()
	
	// Enable keyboard navigation
	useKeyboardNavigation({
		prevProjectPath: '/pix4d',
		nextProjectPath: '/openhuts'
	})

	// Prototype state
	const [step, setStep] = useState<Step>('home')
	const [selectedCells, setSelectedCells] = useState<Set<string>>(() => new Set())
	const pricePerSquare = 1 // $/m²
	const squareSizeM2 = 10 // m² per grid cell

	// Derived values
	const totalM2 = useMemo(() => selectedCells.size * squareSizeM2, [selectedCells])
	const totalCost = useMemo(() => totalM2 * pricePerSquare, [totalM2])

	// Keyboard shortcuts for prototype navigation (desktop only)
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setStep('home')
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			{/* Hero */}
			<div className="bg-gradient-to-br from-emerald-600 via-green-600 to-lime-600 text-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-4 mb-8">
						<button onClick={navigateToHome} className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors">
							<ArrowLeft className="h-5 w-5" />
							<span>Back to Projects</span>
						</button>
					</div>

					<div className="text-center">
						<div className="flex justify-center mb-8">
							<div className="bg-white p-4 rounded-3xl shadow-xl">
								<img src="/logos/reserve-logo.png" alt="Reserve" className="h-24 w-24 object-contain rounded-2xl" />
							</div>
						</div>
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">Reserve</h1>
						<p className="text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed">
							A crowdfunding platform to protect regions, reforest areas, and restore natural habitats with transparent impact tracking and cost per square meter.
						</p>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				{/* Overview */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
					<Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
						<CardHeader>
							<CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Project Vision</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
								Reserve is a nature crowdfunding platform that enables individuals and organizations to 
								directly fund conservation actions. Choose a region on a map, see its size and restoration cost, 
								and contribute to protecting, reforesting, or restoring natural habitats with transparent impact tracking.
							</p>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
								The prototype showcases key flows: selecting a grid area for conservation, calculating protected m² and 
								cost, confirming your contribution, and sharing progress. Designed with calm visuals and a signature 
								rainbow gradient celebrating biodiversity and the variety of conservation projects available.
							</p>

							<div className="flex flex-wrap gap-3 pt-2">
								<Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">Nature Crowdfunding</Badge>
								<Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">Habitat Restoration</Badge>
								<Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">Conservation Tech</Badge>
								<Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">React</Badge>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<Users className="h-6 w-6 text-emerald-600" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Target Users</h3>
								</div>
								<p className="text-gray-600 dark:text-gray-400">Nature enthusiasts</p>
								<p className="text-gray-600 dark:text-gray-400">Conservation organizations</p>
								<p className="text-gray-600 dark:text-gray-400">Corporate sustainability programs</p>
							</CardContent>
						</Card>

						<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<Shield className="h-6 w-6 text-green-600" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Impact</h3>
								</div>
								<p className="text-gray-600 dark:text-gray-400">Protect and restore natural regions</p>
								<p className="text-gray-600 dark:text-gray-400">Reforest degraded areas</p>
								<p className="text-gray-600 dark:text-gray-400">Transparent cost per m²</p>
							</CardContent>
						</Card>

						<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<Globe2 className="h-6 w-6 text-lime-600" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Channels</h3>
								</div>
								<p className="text-gray-600 dark:text-gray-400 mb-4">Follow the project on social media</p>
								<a href="https://www.instagram.com/reservenatureapp/" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden text-sm">
									{/* Shiny overlay effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
									
									{/* Instagram icon with hover effect */}
									<Instagram className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
									<span className="relative z-10">Follow on Instagram</span>
								</a>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Prototype */}
				<div id="interactive-prototype" className="mb-20">
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Conservation Prototype</h2>

					{/* Desktop phone frame */}
					<div className="hidden lg:flex items-center justify-center">
						<div className="relative w-[380px] h-[780px] rounded-[3rem] border-8 border-gray-900 dark:border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-gray-900">
							<div className="mx-auto mt-2 h-6 w-40 rounded-b-2xl bg-gray-900 dark:bg-gray-200" />
							<div className="relative m-2 mt-3 h-[730px] rounded-[2rem] overflow-hidden bg-white dark:bg-gray-900">
								<PrototypeScreen step={step} setStep={setStep} selectedCells={selectedCells} setSelectedCells={setSelectedCells} totalM2={totalM2} totalCost={totalCost} pricePerSquare={pricePerSquare} />
							</div>
						</div>
					</div>

					{/* Mobile full width */}
					<div className="lg:hidden">
						<div className="relative h-[85vh] rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-900">
							<PrototypeScreen step={step} setStep={setStep} selectedCells={selectedCells} setSelectedCells={setSelectedCells} totalM2={totalM2} totalCost={totalCost} pricePerSquare={pricePerSquare} />
						</div>
					</div>
				</div>



								{/* Navigation Buttons */}
				<div className="relative">
					{/* Previous Project Button - Left Side */}
					<ProjectNavigationButton
						direction="prev"
						projectName="Clathes"
						onClick={() => navigateToProject('/clathes')}
					/>

					{/* Next Project Button - Right Side */}
					<ProjectNavigationButton
						direction="next"
						projectName="Open Huts"
						onClick={() => navigateToProject('/openhuts')}
					/>

					{/* Back to Projects Button - Center */}
					<div className="text-center mt-20">
						<button
							onClick={navigateToHome}
							className="group relative inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden"
						>
							{/* Shiny overlay effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
							
							<ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
							<span className="relative z-10">Back to All Projects</span>
						</button>
					</div>
				</div>
			</div>

			{/* No modal needed for interactive prototype */}

			<Footer />
		</div>
	)
}

// Prototype inner screen component
function PrototypeScreen({
	step,
	setStep,
	selectedCells,
	setSelectedCells,
	totalM2,
	totalCost,
	pricePerSquare,
}: {
	step: Step
	setStep: (s: Step) => void
	selectedCells: Set<string>
	setSelectedCells: (s: Set<string>) => void
	totalM2: number
	totalCost: number
	pricePerSquare: number
}) {
	// Grid config
	const rows = 14
	const cols = 8

	const toggleCell = (r: number, c: number) => {
		const key = `${r}-${c}`
		const next = new Set(selectedCells)
		if (next.has(key)) next.delete(key)
		else next.add(key)
		setSelectedCells(next)
	}

	const reset = () => setSelectedCells(new Set())

	const handleShare = async () => {
		const text = `I just conserved ${totalM2} m² with Reserve!`
		try {
			// @ts-ignore
			if (navigator.share) {
				// @ts-ignore
				await navigator.share({ title: 'Reserve', text, url: window.location.href })
			} else {
				await navigator.clipboard.writeText(text)
				alert('Copied to clipboard!')
			}
		} catch {}
	}

	return (
		<div className="h-full w-full">
			{step === 'home' && (
				<div className="h-full flex flex-col items-center justify-end pb-10 bg-white dark:bg-gray-900">
					<div className="flex-1 w-full flex items-center justify-center">
						<div className="text-center space-y-6">
							<img src="/logos/reserve-logo.png" alt="Reserve" className="h-28 w-28 mx-auto" />
							<div>
								<p className="text-2xl text-gray-700 dark:text-gray-300">You have protected</p>
								<div className="text-[120px] leading-none font-bold text-gray-900 dark:text-white">0</div>
								<div className="text-4xl text-gray-700 dark:text-gray-300">m²</div>
							</div>
						</div>
					</div>
					<div className="px-6 w-full">
						<button onClick={() => setStep('select')} className="w-full py-4 rounded-2xl text-white text-xl font-semibold bg-gradient-to-r from-blue-500 via-pink-400 via-orange-300 via-yellow-300 to-lime-400 shadow-lg active:scale-[0.99] transition-transform">
							Conserve
						</button>
					</div>
				</div>
			)}

			{step === 'select' && (
				<div className="relative h-full">
					<img src="/forest-background.jpg" alt="forest" className="absolute inset-0 h-full w-full object-cover" />
					<div className="absolute inset-0 bg-emerald-900/20" />
					{/* Header values */}
					<div className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-[72px] font-bold drop-shadow-lg">
						{totalM2}<span className="align-top text-4xl ml-2">m²</span>
					</div>

					{/* Grid */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, width: '86%', aspectRatio: '9/12' }}>
							{Array.from({ length: rows }).map((_, r) => (
								<div key={r} className="contents">
									{Array.from({ length: cols }).map((__, c) => {
										const key = `${r}-${c}`
										const isSelected = selectedCells.has(key)
										return (
											<button
												key={key}
												onClick={() => toggleCell(r, c)}
												className={`relative border border-green-500/60 hover:border-green-300/90 transition-colors ${isSelected ? 'bg-gradient-to-r from-blue-400/70 via-pink-400/70 via-orange-300/70 via-yellow-300/70 to-lime-300/70' : 'bg-emerald-700/10'}`}
											>
												{isSelected && <span className="absolute inset-0 shadow-[0_0_0_3px_rgba(255,255,255,0.6)_inset] rounded-sm" />}
											</button>
										)
									})}
								</div>
							))}
						</div>
					</div>

					{/* Footer controls */}
					<div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-4">
						<div className="text-white text-3xl drop-shadow">
							${totalCost}
						</div>
						<div className="flex gap-3 px-6 w-full max-w-sm">
							<button onClick={reset} className="flex-1 py-3 rounded-xl bg-white/20 text-white backdrop-blur border border-white/30">Reset</button>
							<button
								onClick={() => setStep('summary')}
								disabled={totalM2 === 0}
								className={`flex-1 py-3 rounded-xl text-white font-medium transition-all ${totalM2 === 0 ? 'bg-gray-400/60 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 via-pink-400 via-orange-300 via-yellow-300 to-lime-400 hover:scale-[1.02]'}`}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			)}

			{step === 'summary' && (
				<div className="h-full flex flex-col items-center justify-between py-10">
					<div className="text-center">
						<div className="text-[96px] leading-none font-bold text-gray-900 dark:text-white">{totalM2}<span className="align-top text-4xl ml-2">m²</span></div>
						<div className="mt-8 w-[80%] mx-auto aspect-[5/2] rounded-xl overflow-hidden relative">
							<img src="/forest-background.jpg" alt="preview" className="absolute inset-0 h-full w-full object-cover" />
							<div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
								{Array.from({ length: rows }).map((_, r) => (
									<div key={r} className="contents">
										{Array.from({ length: cols }).map((__, c) => {
											const key = `${r}-${c}`
											const isSelected = selectedCells.has(key)
											return <div key={key} className={`border border-green-500/40 ${isSelected ? 'bg-gradient-to-r from-blue-400/60 via-pink-400/60 via-orange-300/60 via-yellow-300/60 to-lime-300/60' : 'bg-transparent'}`} />
										})}
									</div>
								))}
							</div>
						</div>
						<div className="text-center space-y-2">
							<div className="text-3xl text-gray-700 dark:text-gray-300">${pricePerSquare} m²</div>
							<div className="text-4xl font-semibold text-gray-900 dark:text-white">${totalCost}</div>
						</div>
					</div>
					<div className="px-6 w-full">
						<button onClick={() => setStep('success')} className="w-full py-4 rounded-2xl text-white text-xl font-semibold bg-gradient-to-r from-blue-500 via-pink-400 via-orange-300 via-yellow-300 to-lime-400 shadow-lg active:scale-[0.99] transition-transform">
							Conserve
						</button>
						<div className="mt-3 text-center">
							<button onClick={() => setStep('select')} className="text-sm text-gray-500 dark:text-gray-400 underline">Edit selection</button>
						</div>
					</div>
				</div>
			)}

			{step === 'success' && (
				<div className="h-full flex flex-col items-center justify-between py-10">
					<div className="text-center space-y-6">
						<div className="text-5xl font-bold text-gray-900 dark:text-white">Amazing!</div>
						<div className="text-2xl text-gray-700 dark:text-gray-300">You just conserved</div>
						<div className="text-[120px] leading-none font-bold text-gray-900 dark:text-white">{totalM2}</div>
						<div className="text-4xl text-gray-700 dark:text-gray-300 -mt-6">m²</div>
						<div className="mt-4 w-[80%] mx-auto aspect-[5/2] rounded-xl overflow-hidden relative">
							<img src="/forest-background.jpg" alt="preview" className="absolute inset-0 h-full w-full object-cover" />
							<div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
								{Array.from({ length: rows }).map((_, r) => (
									<div key={r} className="contents">
										{Array.from({ length: cols }).map((__, c) => {
											const key = `${r}-${c}`
											const isSelected = selectedCells.has(key)
											return <div key={key} className={`border border-green-500/40 ${isSelected ? 'bg-gradient-to-r from-blue-400/60 via-pink-400/60 via-orange-300/60 via-yellow-300/60 to-lime-300/60' : 'bg-transparent'}`} />
										})}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="px-6 w-full space-y-3">
						<button onClick={handleShare} className="w-full py-4 rounded-2xl text-white text-xl font-semibold bg-gradient-to-r from-blue-500 via-pink-400 via-orange-300 via-yellow-300 to-lime-400 shadow-lg active:scale-[0.99] transition-transform">
							Share
						</button>
						<button onClick={() => { reset(); setStep('select') }} className="block w-full text-center text-gray-600 dark:text-gray-400">Conserve more</button>
					</div>
				</div>
			)}
		</div>
	)
}
