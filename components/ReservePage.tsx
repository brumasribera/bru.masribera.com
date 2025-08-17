import { ArrowLeft, Users, Shield, Globe2, Instagram, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Footer } from './Footer'
import { useProjectNavigation } from './hooks/useProjectNavigation'
import { ProjectNavigationButton } from './ProjectNavigationButton'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import ReserveMobileApp from './ReserveApp'

export function ReservePage() {
	const { navigateToProject, navigateToHome } = useProjectNavigation()
	
	// Enable keyboard navigation
	useKeyboardNavigation({
		prevProjectPath: '/clathes',
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
							A crowdfunding platform to protect regions, reforest areas, and restore natural habitats with transparent impact tracking and cost per square meter
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
				<div id="interactive-prototype" className="mb-16">
					{/* Open App Button - Only visible on screens smaller than 500px */}
					<div className="block max-[500px]:block max-[500px]:mb-8 hidden">
						<div className="max-w-md mx-auto text-center">
							<div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
								<div className="w-20 h-20 bg-white p-2 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
									<img src="/logos/reserve-logo.png" alt="Reserve" className="h-full w-full object-contain" />
								</div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Experience the App</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
									Open the Reserve app in full screen for the best interactive experience
								</p>
								<button
									onClick={openAppInNewTab}
									className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden w-full"
								>
									{/* Shiny overlay effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
									
									<ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
									<span className="relative z-10">Open App</span>
								</button>
							</div>
						</div>
					</div>

					{/* Phone mockup - Only visible on screens 500px and wider */}
					<div className="hidden min-[500px]:block">
						<div className="flex items-center justify-center">
							<div className="relative w-[380px] h-[700px] rounded-[3rem] border-8 border-gray-900 dark:border-gray-200 shadow-[0_25px_80px_rgba(0,0,0,0.35)] bg-gray-900 dark:bg-gray-800">
								{/* Notch */}
								<div className="mx-auto mt-2 h-6 w-40 rounded-b-2xl bg-gray-900 dark:bg-gray-200" />
								{/* Screen */}
								<div className="relative m-2 mt-3 h-[638px] rounded-[2rem] overflow-hidden bg-white dark:bg-gray-900 shadow-inner">
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

			<Footer />
		</div>
	)
}
