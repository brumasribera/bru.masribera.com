import { ArrowLeft, Globe, ExternalLink, Factory, Settings, Zap, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Footer } from '../layout/Footer'
import { useProjectNavigation } from '../hooks/useProjectNavigation'
import { ProjectNavigationButton } from '../navigation/ProjectNavigationButton'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { ImageModal } from '../modals/ImageModal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function PomocaPage() {
  const { navigateToProject, navigateToHome } = useProjectNavigation()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { t } = useTranslation(['pomoca', 'common'])
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    prevProjectPath: '/moodlenet',
    nextProjectPath: '/wegaw',
    disableNavigation: selectedImage !== null
  })
  
  const prototypeImages = [
    '/pomoca/prototypes/glr-cutting-step.png',
    '/pomoca/prototypes/qa-step.png',
    '/pomoca/prototypes/product-refinements.png'
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div 
        className="text-white py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(45deg, #be185d, #d61c94, #ec4899, #f472b6, #f9a8d4, #fce7f3)',
          backgroundSize: '200% 200%',
          animation: 'diagonal-gradient 12s ease-in-out infinite'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-pink-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('common:backToProjects')}</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-3xl shadow-xl">
                <img 
                  src="/logos/oberalp-salewa-group-logo.jpeg" 
                  alt="Pomoca"
                  className="h-24 w-24 object-contain rounded-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">{t('header.title')}</h1>
            <p className="text-2xl text-pink-100 max-w-4xl mx-auto leading-relaxed">{t('header.tagline')}</p>
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
                  href="https://www.pomoca.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors font-medium"
                  style={{ backgroundColor: '#d61c94' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#be185d'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d61c94'}
                >
                  <Globe className="h-4 w-4" />
                  <span>{t('links.visitSite')}</span>
                </a>
                <a
                  href="https://www.pomoca.com/en/history"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t('links.history')}</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="h-6 w-6" style={{ color: '#d61c94' }} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('cards.manufacturing.title')}</h3>
                </div>
                {(t('cards.manufacturing.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="h-6 w-6" style={{ color: '#d61c94' }} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('cards.technology.title')}</h3>
                </div>
                {(t('cards.technology.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6" style={{ color: '#d61c94' }} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('cards.innovation.title')}</h3>
                </div>
                {(t('cards.innovation.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Manufacturing Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('process.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('process.subtitle')}</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
            {/* Material Reception - Step 1 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/material-reception.png" 
                    alt="Material Reception"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.1.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.1.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Storage - Step 2 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/storage.png" 
                    alt="Storage"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.2.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.2.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Cutting - Step 3 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/cutting.png" 
                    alt="Cutting"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.3.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.3.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Gliding - Step 4 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                4
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/gliding.png" 
                    alt="Gliding"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.4.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.4.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Marking - Step 5 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                5
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/marking.png" 
                    alt="Marking"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.5.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.5.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Adhesive Application - Step 6 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                6
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/adhesive-application.png" 
                    alt="Adhesive Application"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.6.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.6.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Quality Assurance - Step 7 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                7
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/qa.png" 
                    alt="Quality Assurance"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.7.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.7.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Laser Cutting - Step 8 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                8
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2 md:mb-3 p-1 sm:p-1.5 md:p-2 bg-white">
                  <img 
                    src="/pomoca/steps/laser-cutting.png" 
                    alt="Laser Cutting"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2">
                  {t('process.steps.8.title')}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  {t('process.steps.8.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prototype Showcase */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('prototypes.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('prototypes.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Prototype 1 - Cutting */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img src="/pomoca/prototypes/glr-cutting-step.png" alt="Pomoca Production Interface - Cutting Step" className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setSelectedImage('/pomoca/prototypes/glr-cutting-step.png')} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('prototypes.items.0.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t('prototypes.items.0.desc')}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('prototypes.items.0.badge')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prototype 2 - QA */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img src="/pomoca/prototypes/qa-step.png" alt="Pomoca Production Interface - QA Step" className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setSelectedImage('/pomoca/prototypes/qa-step.png')} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('prototypes.items.1.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t('prototypes.items.1.desc')}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('prototypes.items.1.badge')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prototype 3 - Refinements */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img src="/pomoca/prototypes/product-refinements.png" alt="Pomoca Production Interface - Product Refinements" className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setSelectedImage('/pomoca/prototypes/product-refinements.png')} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('prototypes.items.2.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t('prototypes.items.2.desc')}</p>
                  <div className="flex items:center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('prototypes.items.2.badge')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mb-20">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">{t('implementation.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('implementation.approachTitle')}</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {(t('implementation.approach', { returnObjects: true }) as string[]).map((item: string) => (
                      <li key={item} className="text-gray-600 dark:text-gray-400">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('implementation.integrationTitle')}</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {(t('implementation.integration', { returnObjects: true }) as string[]).map((item: string) => (
                      <li key={item} className="text-gray-600 dark:text-gray-400">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('implementation.featuresTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(t('implementation.features', { returnObjects: true }) as any[]).map((feat: any) => (
                    <div key={feat.title} className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(214, 28, 148, 0.1)' }}>
                      <h4 className="font-semibold mb-2" style={{ color: '#d61c94' }}>{feat.title}</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="relative">
          <ProjectNavigationButton direction="prev" projectName={t('nav.prev')} onClick={() => navigateToProject('/moodlenet')} />
          <ProjectNavigationButton direction="next" projectName={t('nav.next')} onClick={() => navigateToProject('/wegaw')} />
          <div className="text-center mb-20">
            <button onClick={navigateToHome} className="group relative inline-flex items-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
              <span className="relative z-10">{t('nav.backToAll')}</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} imagePaths={prototypeImages} altText="Pomoca Production Interface Prototype" />
    </div>
  )
}
