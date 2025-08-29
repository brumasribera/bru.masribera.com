import { ArrowLeft, Users, Shield, Globe2, Instagram, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Footer } from '../layout/Footer'
import { useProjectNavigation } from '../hooks/useProjectNavigation'
import { ProjectNavigationButton } from '../navigation/ProjectNavigationButton'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import ReserveMobileApp from '../ReserveApp'

import { useTranslation } from 'react-i18next'

export function ReservePage() {
	const { navigateToProject, navigateToHome } = useProjectNavigation()
	const { t } = useTranslation(['reserve', 'common'])
	
	// Enable keyboard navigation
	useKeyboardNavigation({
		prevProjectPath: '/pix4d',
		nextProjectPath: '/openhuts'
	})

	// Function to open app in new tab
	const openAppInNewTab = () => {
		// Open the Reserve app in a new tab at full screen
		window.open('/reserve-app', '_blank')
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			{/* Hero */}
			<div 
				className="text-white py-20 relative overflow-hidden"
				style={{
					background: 'linear-gradient(45deg, #00ff88, #00d4aa, #00b4d8, #48cae4, #90e0ef, #ade8f4)',
					backgroundSize: '200% 200%',
					animation: 'diagonal-gradient 12s ease-in-out infinite'
				}}
			>
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-4 mb-8">
						<button onClick={navigateToHome} className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors">
							<ArrowLeft className="h-5 w-5" />
							<span>{t('common:backToProjects')}</span>
						</button>
					</div>

					<div className="text-center">
						<div className="flex justify-center mb-8">
							<div className="bg-white p-4 rounded-3xl shadow-xl">
								<img src="/logos/reserve-logo.png" alt="Reserve" className="h-24 w-24 object-contain rounded-2xl" />
							</div>
						</div>
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">{t('page.header.title')}</h1>
						<p className="text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed">
							{t('page.header.tagline')}
						</p>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				{/* Overview */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
					<Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
						<CardHeader>
							<CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">{t('page.overview.title')}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
								{t('page.overview.p1')}
							</p>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
								{t('page.overview.p2')}
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
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('page.cards.targetUsers.title')}</h3>
								</div>
								{(t('page.cards.targetUsers.users', { returnObjects: true }) as string[]).map((item: string) => (
									<p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
								))}
							</CardContent>
						</Card>

						<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<Shield className="h-6 w-6 text-green-600" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('page.cards.impact.title')}</h3>
								</div>
								{(t('page.cards.impact.benefits', { returnObjects: true }) as string[]).map((item: string) => (
									<p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
								))}
							</CardContent>
						</Card>

						<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<Globe2 className="h-6 w-6 text-lime-600" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('page.cards.channels.title')}</h3>
								</div>
								<p className="text-gray-600 dark:text-gray-400 mb-4">{t('page.cards.channels.subtitle')}</p>
								<a href="https://www.instagram.com/reservenatureapp/" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden text-sm">
									{/* Shiny overlay effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

									{/* Instagram icon with hover effect */}
									<Instagram className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
									<span className="relative z-10">{t('page.cards.channels.instagram')}</span>
								</a>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Prototype */}
				<div id="interactive-prototype" className="mb-16">
					{/* Mobile CTA - Open App Card for screens under 500px */}
					<div className="block max-[499px]:block max-[499px]:mb-8 min-[500px]:hidden">
						<div className="max-w-md mx-auto text-center">
							<div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700">
								<div className="w-16 h-16 md:w-20 md:h-20 bg-white p-2 rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
									<img src="/logos/reserve-logo.png" alt="Reserve" className="h-full w-full object-contain" />
								</div>
								<h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">{t('page.prototype.ctaTitle')}</h3>
								<p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed">
									{t('page.prototype.ctaDesc')}
								</p>
								<button
									onClick={openAppInNewTab}
									className="group relative inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-base md:text-lg overflow-hidden w-full"
								>
									{/* Shiny overlay effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
									
									<ExternalLink className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
									<span className="relative z-10">{t('common:openApp')}</span>
								</button>
							</div>
						</div>
					</div>

					{/* Phone mockup - Only visible on screens 500px and wider */}
					<div className="hidden min-[500px]:block">
						<div className="flex items-center justify-center">
							<div className="relative w-[330px] h-[600px] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] bg-white dark:bg-gray-900">
								{/* Screen */}
								<div className="relative h-full rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
									<ReserveMobileApp />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Buttons */}
				<div className="relative">
					{/* Previous Project Button - Left Side */}
					<ProjectNavigationButton
						direction="prev"
						projectName="Pix4D"
						onClick={() => navigateToProject('/pix4d')}
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
							className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-300 hover:via-emerald-400 hover:to-teal-400 text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden"
						>
							{/* Shiny overlay effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
							
							<ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
							<span className="relative z-10">{t('page.nav.backToAll')}</span>
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
