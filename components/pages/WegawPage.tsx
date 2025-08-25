// WegawPage component - Snow monitoring and avalanche prediction system
import { ArrowLeft, Globe, ExternalLink, Snowflake, Satellite, Database, BarChart3, Shield, Mountain, Activity, Thermometer, MountainSnow } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Footer } from '../layout/Footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ProjectNavigationButton } from '../navigation/ProjectNavigationButton'
import { useProjectNavigation } from '../hooks/useProjectNavigation'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { ImageModal } from '../modals/ImageModal'
import { useTranslation } from 'react-i18next'

export function WegawPage() {
  // Component for Wegaw project page - Fixed case sensitivity
  const navigate = useNavigate()
  const { t } = useTranslation(['wegaw', 'common'])
  const { navigateToProject } = useProjectNavigation()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Array of all image paths for navigation
  const imagePaths = [
    '/wegaw/DeFROST1.jpg',
    '/wegaw/2_defrost.png',
    '/wegaw/3_defrost.png',
    '/wegaw/DeFROST_SpaceValueAdded_01.png'
  ]

  useKeyboardNavigation({
    prevProjectPath: '/pomoca',
    nextProjectPath: '/pix4d',
    disableNavigation: selectedImage !== null
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation Buttons */}
      <ProjectNavigationButton
        direction="prev"
        projectName={t('nav.prev')}
        onClick={() => navigateToProject('/pomoca')}
      />
      <ProjectNavigationButton
        direction="next"
        projectName={t('nav.next')}
        onClick={() => navigateToProject('/pix4d')}
      />

             {/* Hero Header */}
       <div className="relative text-white py-20 overflow-hidden">
         {/* Video Background */}
         <video 
           className="absolute inset-0 w-full h-full object-cover"
           loop 
           autoPlay 
           playsInline 
           muted 
           preload="none"
         >
           <source type="video/mp4" src="https://wegaw.com/wp-content/uploads/2025/04/Sequence-01YouTube.mp4" />
           <source type="video/webm" src="https://wegaw.com/wp-content/uploads/2025/04/Sequence-01YouTube.mp4" />
         </video>
         
         {/* Dark overlay for better text readability */}
         <div className="absolute inset-0 bg-black/40"></div>
         
         {/* Content */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-4 mb-8">
             <button 
               onClick={() => navigate('/#projects')}
               className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
             >
               <ArrowLeft className="h-5 w-5" />
               <span>{t('header.back')}</span>
             </button>
           </div>
           
           <div className="text-center">
             <div className="flex justify-center mb-8">
               <div className="bg-white p-4 rounded-3xl shadow-xl">
                 <img 
                   src="/logos/wegaw_logo.jpeg" 
                   alt="Wegaw"
                   className="h-24 w-24 object-contain rounded-2xl"
                 />
               </div>
             </div>
             
             <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">{t('header.title')}</h1>
             <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
               {t('header.tagline')}
             </p>
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
            <CardContent className="flex-1 flex flex-col space-y-4">
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p1')}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p2')}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p3')}</p>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3 pt-4 mt-auto">
                <a
                  href="https://www.wegaw.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  <Globe className="h-4 w-4" />
                  <span>{t('overview.visitSite')}</span>
                </a>
                <a
                  href="https://business.esa.int/projects/defrost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t('overview.esa')}</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Snowflake className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('quick.resolution.title')}</h3>
                </div>
                {(t('quick.resolution.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('quick.applications.title')}</h3>
                </div>
                {(t('quick.applications.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Satellite className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('quick.technology.title')}</h3>
                </div>
                {(t('quick.technology.items', { returnObjects: true }) as string[]).map((item: string) => (
                  <p key={item} className="text-gray-600 dark:text-gray-400">{item}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div id="core-capabilities" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">{t('capabilities.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Snowflake className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('capabilities.items.0.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('capabilities.items.0.desc')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('capabilities.items.1.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('capabilities.items.1.desc')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('capabilities.items.2.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('capabilities.items.2.desc')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MountainSnow className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('capabilities.items.3.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('capabilities.items.3.desc')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-8 w-8 text-cyan-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('capabilities.items.4.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('capabilities.items.4.desc')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('capabilities.items.5.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('capabilities.items.5.desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* DeFROST Project Development */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">{t('defrost.title')}</h2>
          
          {/* Project Overview */}
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">{t('defrost.intro')}</p>
          </div>
          
          {/* 2x2 Grid Development Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Development Stage 1: Research & Validation */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/wegaw/DeFROST1.jpg"
                  alt="DeFROST Research & Validation"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/wegaw/DeFROST1.jpg')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('defrost.stages.0.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('defrost.stages.0.desc')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Development Stage 2: Technical Implementation */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/wegaw/2_defrost.png"
                  alt="DeFROST Technical Implementation"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/wegaw/2_defrost.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('defrost.stages.1.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('defrost.stages.1.desc')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Development Stage 3: Commercial Deployment */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/wegaw/3_defrost.png"
                  alt="DeFROST Commercial Deployment"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/wegaw/3_defrost.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('defrost.stages.2.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('defrost.stages.2.desc')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Development Stage 4: Market Expansion */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/wegaw/DeFROST_SpaceValueAdded_01.png"
                  alt="DeFROST Market Expansion"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/wegaw/DeFROST_SpaceValueAdded_01.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('defrost.stages.3.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('defrost.stages.3.desc')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
                   </div>

        {/* Technology Overview */}
        <div id="technology-architecture" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">{t('technology.title')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('technology.satellite.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {(t('technology.satellite.badges', { returnObjects: true }) as string[]).map((badge: string) => (
                    <Badge key={badge} className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('technology.ai.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {(t('technology.ai.badges', { returnObjects: true }) as string[]).map((badge: string) => (
                    <Badge key={badge} className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Partners & Integration */}
        <div id="partners" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">{t('partners.title')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('partners.research.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{t('partners.research.items.0.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('partners.research.items.0.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Satellite className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{t('partners.research.items.1.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('partners.research.items.1.desc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('partners.platform.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{t('partners.platform.items.0.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('partners.platform.items.0.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="h-6 w-6 text-emerald-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{t('partners.platform.items.1.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('partners.platform.items.1.desc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Vision */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('future.title')}</h2>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t('future.p1')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('future.p2')}
              </p>
            </CardContent>
          </Card>
          
          <div className="mt-12">
            <button
              onClick={() => navigate('/#projects')}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-300 hover:via-emerald-400 hover:to-teal-400 text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden"
            >
              {/* Shiny overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
              <span className="relative z-10">{t('future.backToAll')}</span>
            </button>
          </div>
        </div>
      </div>
      
             {/* Image Modal */}
       <ImageModal
         selectedImage={selectedImage}
         setSelectedImage={setSelectedImage}
         imagePaths={imagePaths}
         altText="DeFROST Project"
       />
      
      <Footer />
    </div>
  )
}