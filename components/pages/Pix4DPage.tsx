import { ArrowLeft, Globe, Github, ExternalLink, Users, Globe2, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Footer } from '../layout/Footer'
import { useProjectNavigation } from '../hooks/useProjectNavigation'
import { ProjectNavigationButton } from '../navigation/ProjectNavigationButton'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useTranslation } from 'react-i18next'

export function Pix4DPage() {
  const { navigateToProject, navigateToHome } = useProjectNavigation()
  const { t } = useTranslation(['pix4d', 'common'])
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    prevProjectPath: '/wegaw',
    nextProjectPath: '/reserve'
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div 
        className="text-white py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(45deg, #1e40af, #7c3aed, #06b6d4, #3b82f6, #8b5cf6, #ec4899)',
          backgroundSize: '200% 200%',
          animation: 'diagonal-gradient 12s ease-in-out infinite'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('common:backToProjects')}</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-3xl shadow-xl">
                <img 
                  src="/logos/pix4d_logo.jpeg" 
                  alt="Pix4D"
                  className="h-24 w-24 object-contain rounded-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">{t('header.title')}</h1>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">{t('header.tagline')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg flex flex-col">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">{t('overview.title')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 space-y-4">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p1')}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p2')}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p3')}</p>
              </div>
              
              {/* Action buttons - always at bottom */}
              <div className="flex gap-3 pt-6 mt-auto">
                <a
                  href="https://www.pix4d.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  <Globe className="h-4 w-4" />
                  <span>{t('links.visitSite')}</span>
                </a>
                <a
                  href="https://www.pix4d.com/blog/modelling-matterhorn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t('links.caseStudy')}</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('cards.role.title')}</h3>
                </div>
                {(t('cards.role.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe2 className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('cards.tech.title')}</h3>
                </div>
                {(t('cards.tech.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('cards.impact.title')}</h3>
                </div>
                {(t('cards.impact.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

                {/* Cloud Platform Demo */}
        <div className="mb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('cloudDemo.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('cloudDemo.subtitle')}</p>
          </div>
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
            <CardContent className="p-0 !pb-0">
              <video
                className="w-full h-auto"
                controls
                autoPlay
                preload="metadata"
              >
                <source src="/pix4d/pix4d-demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </CardContent>
          </Card>
        </div>

        {/* 3D Model Showcase */}
        <div id="3d-model-showcase" className="mb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('modelShowcase.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('modelShowcase.subtitle')}</p>
          </div>
          <Card className="bg-white dark:bg-gray-800 border border-gray-700 rounded-3xl shadow-lg overflow-hidden">
            <CardContent className="p-0 !pb-0">
              <div className="w-full h-96 sm:h-[500px] lg:h-[600px]">
                <iframe
                  title="3D Matterhorn (Cervin) Model"
                  src="https://sketchfab.com/models/a4fac92f8b6044fe94eafad0b009e625/embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  execution-while-out-of-viewport
                  execution-while-not-rendered
                  web-share
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drone Technology & Process */}
        <div id="drone-technology" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">{t('droneTech.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-0">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  senseFly eBee Drone
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Professional mapping drone with 50-minute flight time
                </p>
              </CardHeader>
              <CardContent className="p-0 pb-0">
                <img
                  src="/pix4d/ebeematterhorn-3.jpg"
                  alt="senseFly eBee Drone mapping the Matterhorn"
                  className="w-full h-64 object-cover rounded-b-3xl"
                />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-0">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Flight Planning & Execution
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Autonomous flight paths from 4,478m summit
                </p>
              </CardHeader>
              <CardContent className="p-0 pb-0">
                <img
                  src="/pix4d/ebeematterhorn-12.jpg"
                  alt="Flight planning over the Matterhorn"
                  className="w-full h-64 object-cover rounded-b-3xl"
                />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-0">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Matterhorn 3D Reconstruction
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  High-density point cloud with 300 million points at 20cm GSD
                </p>
              </CardHeader>
              <CardContent className="p-0 pb-0">
                <img
                  src="/pix4d/matterhorn-cervin-pix4d-pix4dmapper-switzerland.jpg"
                  alt="Matterhorn 3D point cloud reconstruction"
                  className="w-full h-64 object-cover rounded-b-3xl"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Technology Architecture
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('tech.frontend')}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    React
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    TypeScript
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Cloud Platform
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    3D Visualization
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('tech.platform')}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Cloud Platform
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    3D Modeling
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Drone Technology
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Photogrammetry
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Point Cloud Processing
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    GSD Analysis
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">{t('achievements.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('achievements.items.0.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('achievements.items.0.desc')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('achievements.items.1.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('achievements.items.1.desc')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Github className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('achievements.items.2.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('achievements.items.2.desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="relative">
              {/* Previous Project Button - Left Side */}
              <ProjectNavigationButton 
                direction="prev" 
                projectName={t('nav.prev')} 
                onClick={() => navigateToProject('/wegaw')} 
              />

              {/* Next Project Button - Right Side */}
              <ProjectNavigationButton 
                direction="next" 
                projectName={t('nav.next')} 
                onClick={() => navigateToProject('/reserve')} 
              />

          {/* Back to Projects Button - Center */}
          <div className="text-center mb-20">
            <button
              onClick={navigateToHome}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-300 hover:via-emerald-400 hover:to-teal-400 text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden"
            >
              {/* Shiny overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
              <span className="relative z-10">{t('nav.backToAll')}</span>
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
