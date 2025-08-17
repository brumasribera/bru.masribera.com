import { ArrowLeft, Globe, Heart, Shield, Activity, Camera, Satellite, AlertTriangle, Instagram } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

import { Footer } from '../layout/Footer'
import { useProjectNavigation } from '../hooks/useProjectNavigation'
import { ProjectNavigationButton } from '../navigation/ProjectNavigationButton'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'

export function ClathesPage() {
  const { navigateToProject, navigateToHome } = useProjectNavigation()
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    prevProjectPath: '/openhuts',
    nextProjectPath: '/moodlenet'
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div className="relative text-white py-20 overflow-hidden">
        {/* Background with vaquita theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-800 to-cyan-700"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Projects</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-3xl shadow-xl">
                <img 
                  src="/clathes/Vaquita - profile logo.png" 
                  alt="Clathes - Vaquita Protection"
                  className="h-24 w-24 object-contain rounded-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Clathes
            </h1>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Protecting species, ecosystems, and human rights through sustainable fashion, creating global impact with every purchase and conservation initiative
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg flex flex-col">
            <CardHeader>
                           <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
               Project Vision
             </CardTitle>
           </CardHeader>
           <CardContent className="flex-1 flex flex-col space-y-6">
             <div className="flex-1 space-y-6">
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                 Clathes combines sustainable fashion with global impact, creating a unique platform 
                 where every purchase contributes to protecting endangered species, preserving ecosystems, 
                 and supporting human rights causes worldwide.
               </p>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                 Our inaugural project focuses on the vaquita porpoise, the world's most endangered marine mammal. 
                 With only an estimated 10-20 vaquitas remaining in the wild, we've developed a comprehensive 
                 strategic plan involving satellite monitoring, AI-powered poaching detection, and coordinated 
                 conservation efforts in the Gulf of California.
               </p>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                 Beyond vaquitas, Clathes will expand to address other critical environmental and social issues, 
                 from rainforest preservation to clean water access, making sustainable fashion a powerful force 
                 for positive change across the planet.
               </p>
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
                  <span>Follow the Project</span>
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
                 <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">First</h3>
                 <p className="text-blue-700 dark:text-blue-300">Project: Vaquitas</p>
               </CardContent>
             </Card>
             
             <Card className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 border border-teal-200 dark:border-teal-700 rounded-3xl">
               <CardContent className="p-6 text-center">
                 <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Globe className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-100 mb-2">Global</h3>
                 <p className="text-teal-700 dark:text-teal-300">Impact reach</p>
               </CardContent>
             </Card>
             
             <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-3xl">
               <CardContent className="p-6 text-center">
                 <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Shield className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">Multiple</h3>
                 <p className="text-purple-700 dark:text-purple-300">Causes supported</p>
               </CardContent>
             </Card>
           </div>
        </div>

        {/* Strategic Plan Overview */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Strategic Plan to Save Vaquitas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive approach combines technology, collaboration, and direct action to protect the vaquita population
            </p>
          </div>
          
          {/* Strategic Overview */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 rounded-3xl shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-900 dark:text-blue-100 text-center">
                Strategic Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6">
                  Central Goal: Vaquitas population starts increasing
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-blue-200 dark:border-blue-700">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">Monitoring</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    AI-powered satellite monitoring and acoustic tracking systems
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-blue-200 dark:border-blue-700">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">Terrain Action</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Direct intervention and collaboration with local authorities
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-blue-200 dark:border-blue-700">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">Totoaba</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Addressing the root cause of vaquita bycatch
                  </p>
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
                      Planet Labs & Google Earth Engine
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Use AI to detect poaching ships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Send signal when approaching vaquitas area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Local authorities and NGO receive alert</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Activity className="h-6 w-6 text-green-500" />
                      Acoustic Monitoring Network
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Set up microphones distributed across all areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Help track vaquita movements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Detect stress situations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Heart className="h-6 w-6 text-red-500" />
                      Advanced Tagging & Sensors
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Tag all encountered vaquitas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Top world professionals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Fast interventions, non-invasive</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Globe className="h-6 w-6 text-purple-500" />
                      Real-time Data Transmission
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Send position and heart rate every 5-15 min</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Detect weird patterns indicating trapped vaquitas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Monitor stress levels in dangerous situations</span>
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
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Stop Poachers</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Before setting up nets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Close collaboration with local authorities</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Ensure Proper Collaboration</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Sue any weird behavior</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Work with government for alignment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Coordinate Local Actors</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Local Authorities</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Direct collaboration and support</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Other NGOs</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Strategic partnerships</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Local Communities</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Vaquita watch tours for economic benefit</p>
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
              <CardTitle className="text-3xl font-bold text-green-900 dark:text-green-100 text-center">
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-green-200 dark:border-green-700">
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">Immediate Actions</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Start tagging vaquitas</span>
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Setup collaborations for satellite ships monitoring</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-green-200 dark:border-green-700">
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">Strategic Coordination</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Coordinate all actors through strategic meetings to discuss and refine our conservation strategy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

                 {/* Visual Story */}
         <div className="mb-20">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="group relative overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
               <img src="/clathes/vaquita-representation.png" alt="Vaquita representation" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-3 left-3 text-white font-medium">The Vaquita</div>
             </div>
             <div className="group relative overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
               <img src="/clathes/vaquita-yellow-hands.png" alt="Hands protecting vaquita" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-3 left-3 text-white font-medium">Hands-on Protection</div>
             </div>
             <div className="group relative overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
               <img src="/clathes/bio t-shirt.jpg" alt="Clathes bio t-shirt" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-3 left-3 text-white font-medium">Bio T‑Shirts Funding Action</div>
             </div>
           </div>
           
           {/* Vaquita Videos Section */}
           <div className="mt-16">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
               Learn More About Vaquitas
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
                     Vaquita Conservation Efforts
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400">
                     Watch this informative video about the critical situation facing vaquitas and ongoing conservation efforts.
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
                     Protecting the Vaquita
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400">
                     Learn about the urgent need to protect vaquitas and the actions being taken to save this endangered species.
                   </p>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Back to All Projects Button */}
           <div className="text-center mt-16">
             <button
               onClick={navigateToHome}
               className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden"
             >
               {/* Shiny overlay effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
               
               <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
               <span className="relative z-10">Back to All Projects</span>
             </button>
           </div>
         </div>
      </div>

      {/* Navigation Buttons */}
      <ProjectNavigationButton 
        direction="prev" 
        projectName="Open Huts" 
        onClick={() => navigateToProject('/openhuts')} 
      />
      <ProjectNavigationButton 
        direction="next" 
        projectName="MoodleNet" 
        onClick={() => navigateToProject('/moodlenet')} 
      />

      <Footer />
    </div>
  )
}
