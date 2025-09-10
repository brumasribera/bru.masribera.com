import { ArrowLeft, Globe, Heart, Shield, Activity, Camera, Satellite, AlertTriangle, Instagram } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { ImageModal } from '../modals/ImageModal'

import { Footer } from '../layout/Footer'
import { useProjectNavigation } from '../hooks/useProjectNavigation'
import { ProjectNavigationButton } from '../navigation/ProjectNavigationButton'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useTranslation } from 'react-i18next'

export function ClathesPage() {
  const { navigateToProject, navigateToHome } = useProjectNavigation()
  const { t } = useTranslation(['clathes', 'common'])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const imagePaths = [
    '/assets/images/clathes/vaquita-representation.png',
    '/assets/images/clathes/vaquita-yellow-hands.png',
    '/assets/images/clathes/bio-t-shirt.jpg'
  ]
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    prevProjectPath: '/openhuts',
    nextProjectPath: '/moodlenet',
    disableNavigation: selectedImage !== null
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div className="relative text-white py-20 overflow-hidden">
        {/* Background with vaquita theme */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, #1e3a8a, #1e40af, #0f766e, #0891b2, #06b6d4, #0891b2)',
            backgroundSize: '200% 200%',
            animation: 'diagonal-gradient 12s ease-in-out infinite'
          }}
        ></div>
        
        {/* Content */}
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
                  src="/icons/logos/projects/clathes-vaquita-logo.png" 
                  alt="Clathes - Vaquita Protection"
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
           <CardContent className="flex-1 flex flex-col space-y-6">
             <div className="flex-1 space-y-6">
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p1')}</p>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p2')}</p>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t('overview.p3')}</p>
             </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://www.instagram.com/clathesofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Instagram className="h-5 w-5" />
                  <span>{t('overview.instagramCta')}</span>
                </a>
              </div>
            </CardContent>
          </Card>
          
                     {/* Quick Stats */}
           <div className="space-y-6">
             <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 rounded-3xl">
               <CardContent className="p-6 text-center">
                 <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Heart className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">{t('stats.first.title')}</h3>
                 <p className="text-blue-700 dark:text-blue-300">{t('stats.first.desc')}</p>
               </CardContent>
             </Card>
             
             <Card className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 border border-teal-200 dark:border-teal-700 rounded-3xl">
               <CardContent className="p-6 text-center">
                 <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Globe className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-100 mb-2">{t('stats.global.title')}</h3>
                 <p className="text-teal-700 dark:text-teal-300">{t('stats.global.desc')}</p>
               </CardContent>
             </Card>
             
             <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-3xl">
               <CardContent className="p-6 text-center">
                 <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Shield className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">{t('stats.multiple.title')}</h3>
                 <p className="text-purple-700 dark:text-purple-300">{t('stats.multiple.desc')}</p>
               </CardContent>
             </Card>
           </div>
        </div>

        {/* Strategic Plan Overview */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('strategy.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">{t('strategy.subtitle')}</p>
          </div>
          
          {/* Strategic Overview */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 rounded-3xl shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-900 dark:text-blue-100 text-center">{t('strategy.overviewTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6">{t('strategy.goal')}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-blue-200 dark:border-blue-700">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">{t('strategy.columns.monitoring.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{t('strategy.columns.monitoring.items.0')}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-blue-200 dark:border-blue-700">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">{t('strategy.columns.terrain.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{t('strategy.columns.terrain.items.0')}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-blue-200 dark:border-blue-700">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">{t('strategy.columns.totoaba.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{t('strategy.columns.totoaba.items.0')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Monitoring Strategy */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                Monitoring & Detection Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Satellite className="h-6 w-6 text-blue-500" />
                      {t('strategy.details.satelliteTitle')}
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.satelliteItems.0')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.satelliteItems.1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.satelliteItems.2')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Activity className="h-6 w-6 text-green-500" />
                      {t('strategy.details.acousticTitle')}
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.acousticItems.0')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.acousticItems.1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.acousticItems.2')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Heart className="h-6 w-6 text-red-500" />
                      {t('strategy.details.taggingTitle')}
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.taggingItems.0')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.taggingItems.1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.taggingItems.2')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Globe className="h-6 w-6 text-purple-500" />
                      {t('strategy.details.transmissionTitle')}
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.transmissionItems.0')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.transmissionItems.1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{t('strategy.details.transmissionItems.2')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terrain Action Strategy */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                Terrain Action & Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Shield className="h-8 w-8 text-red-500" />
                    Sea Shepherd Partnership
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{t('terrain.stopPoachers.title')}</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('terrain.stopPoachers.items.0')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('terrain.stopPoachers.items.1')}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{t('terrain.collaboration.title')}</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('terrain.collaboration.items.0')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('terrain.collaboration.items.1')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{t('terrain.coordination.title')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('terrain.coordination.cards.0.title')}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('terrain.coordination.cards.0.desc')}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('terrain.coordination.cards.1.title')}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('terrain.coordination.cards.1.desc')}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">{t('terrain.coordination.cards.2.title')}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('terrain.coordination.cards.2.desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-green-900 dark:text-green-100 text-center">{t('nextSteps.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-green-200 dark:border-green-700">
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">{t('nextSteps.immediate.title')}</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>{t('nextSteps.immediate.items.0')}</span>
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>{t('nextSteps.immediate.items.1')}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-green-200 dark:border-green-700">
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">{t('nextSteps.strategic.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('nextSteps.strategic.desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

                 {/* Visual Story */}
         <div className="mb-20">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="group relative overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-zoom-in" onClick={() => setSelectedImage(imagePaths[0])} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage(imagePaths[0]) } }}>
               <img src="/clathes/vaquita-representation.png" alt="Vaquita representation" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-3 left-3 text-white font-medium">{t('gallery.vaquita')}</div>
             </div>
             <div className="group relative overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-zoom-in" onClick={() => setSelectedImage(imagePaths[1])} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage(imagePaths[1]) } }}>
               <img src="/clathes/vaquita-yellow-hands.png" alt="Hands protecting vaquita" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-3 left-3 text-white font-medium">{t('gallery.hands')}</div>
             </div>
             <div className="group relative overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-zoom-in" onClick={() => setSelectedImage(imagePaths[2])} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage(imagePaths[2]) } }}>
               <img src="/clathes/bio-t-shirt.jpg" alt="Clathes bio t-shirt" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-3 left-3 text-white font-medium">{t('gallery.shirts')}</div>
             </div>
           </div>
           
           {/* Vaquita Videos Section */}
           <div className="mt-16">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
               {t('gallery.learnMore')}
             </h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                 <div className="aspect-video">
                   <iframe
                     src="https://www.youtube.com/embed/L9thdrDdcFs"
                     title="Vaquita Conservation Video"
                     className="w-full h-full"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                 </div>
                 <div className="p-6">
                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                     {t('gallery.video1.title')}
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400">
                     {t('gallery.video1.desc')}
                   </p>
                 </div>
               </div>
               
               <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                 <div className="aspect-video">
                   <iframe
                     src="https://www.youtube.com/embed/QiFjJCUd9ro"
                     title="Vaquita Protection Video"
                     className="w-full h-full"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                 </div>
                 <div className="p-6">
                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                     {t('gallery.video2.title')}
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400">
                     {t('gallery.video2.desc')}
                   </p>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Back to All Projects Button */}
           <div className="text-center mt-16">
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

      {/* Navigation Buttons */}
      <ProjectNavigationButton 
        direction="prev" 
        projectName={t('nav.prev')} 
        onClick={() => navigateToProject('/openhuts')} 
      />
      <ProjectNavigationButton 
        direction="next" 
        projectName={t('nav.next')} 
        onClick={() => navigateToProject('/moodlenet')} 
      />

      {/* Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        imagePaths={imagePaths}
        altText="Clathes Project"
      />

      <Footer />
    </div>
  )
}
