import { ArrowLeft, Globe, ExternalLink, Snowflake, Satellite, Database, BarChart3, Shield, Mountain, Activity, Thermometer, MountainSnow } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ProjectNavigationButton } from './ProjectNavigationButton'
import { useProjectNavigation } from './hooks/useProjectNavigation'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

export function WegawPage() {
  const navigate = useNavigate()
  const { navigateToProject } = useProjectNavigation()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useKeyboardNavigation({
    prevProjectPath: '/pomoca',
    nextProjectPath: '/pix4d'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation Buttons */}
      <ProjectNavigationButton
        direction="prev"
        projectName="Pomoca"
        onClick={() => navigateToProject('/pomoca')}
      />
      <ProjectNavigationButton
        direction="next"
        projectName="Pix4D"
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
           <div className="flex items-center gap-4 mb-8 pt-8">
             <button 
               onClick={() => navigate('/#projects')}
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
                   src="/logos/wegaw_logo.jpeg" 
                   alt="Wegaw"
                   className="h-24 w-24 object-contain rounded-2xl"
                 />
               </div>
             </div>
             
             <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
               Wegaw
             </h1>
             <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
               Advanced snow monitoring and avalanche prediction system using satellite data and AI. The DeFROST project demonstrates environmental monitoring capabilities.
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
            <CardContent className="flex-1 flex flex-col space-y-4">
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  Wegaw revolutionizes snow monitoring with the DeFROST project, providing near real-time snow cover and depth data 
                  at 20m resolution. Their service helps outdoor platforms, tourism offices, and adventure enthusiasts make informed decisions.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  As climate change makes winters shorter, destinations need accurate snow condition overviews to develop safe 
                  off-season tourism. DeFROST combines satellite and ground data to deliver the comprehensive insights they require.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  The company is expanding into the energy market, specifically for hydropower plant operators, demonstrating the value of 
                  near real-time snow data in water inflow forecasting.
                </p>
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
                  <span>Visit Wegaw</span>
                </a>
                <a
                  href="https://business.esa.int/projects/defrost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>ESA Project</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Snowflake className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resolution</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">20m Spatial Resolution</p>
                <p className="text-gray-600 dark:text-gray-400">Daily Updates</p>
                <p className="text-gray-600 dark:text-gray-400">Global Coverage</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Applications</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Tourism & Safety</p>
                <p className="text-gray-600 dark:text-gray-400">Digital Platforms</p>
                <p className="text-gray-600 dark:text-gray-400">Energy Markets</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Satellite className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technology</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Sentinel Satellites</p>
                <p className="text-gray-600 dark:text-gray-400">NASA Sensors</p>
                <p className="text-gray-600 dark:text-gray-400">AI Analysis</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div id="core-capabilities" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Core Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Snowflake className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Snow Cover Mapping</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Daily snow cover data at 20m resolution using European Sentinel satellites and NASA sensors
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Snow Depth Estimation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Accurate depth measurements from ground stations combined with satellite data
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Avalanche Risk Assessment</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Official country-wide risk assessments in collaboration with SLF Institute
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MountainSnow className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Weather Integration</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Combined with weather nowcasts and probabilistic logic for comprehensive analysis
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-8 w-8 text-cyan-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">API Integration</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Flexible integration options for mobile and web applications with real-time data
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Analysis</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced algorithms to predict snow cover beneath persistent cloud cover
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* DeFROST Project Development */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            DeFROST Project Development
          </h2>
          
          {/* Project Overview */}
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              DeFROST represents a comprehensive approach to operational snow monitoring, combining satellite remote sensing, 
              ground validation, and advanced analytics to deliver actionable environmental intelligence.
            </p>
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Research & Validation Phase
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Comprehensive analysis of satellite data sources and ground truth validation methodologies. 
                    Established partnerships with WSL Institute for Snow and Avalanche Research (SLF) for 
                    scientific validation and quality assurance protocols.
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Technical Implementation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Developed multi-sensor fusion algorithms integrating Sentinel-2, VIIRS, and MODIS data streams. 
                    Implemented cloud detection and AI-powered interpolation techniques for continuous coverage 
                    despite atmospheric interference.
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Commercial Deployment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Successfully deployed operational service with Swiss Destination Marketing Organization, 
                    demonstrating 95% accuracy in snow cover detection. Established API infrastructure for 
                    seamless integration with outdoor platforms and tourism applications.
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Market Expansion
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Expanding into energy sector applications, particularly hydropower operations. 
                    Conducting proof-of-concept studies with major European utilities to demonstrate 
                    value in water resource management and inflow forecasting.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
                   </div>

        {/* Technology Overview */}
        <div id="technology-architecture" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Technology Architecture
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Satellite Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Sentinel-2
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    VIIRS
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    MODIS
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    ESA
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI & Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Machine Learning
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Probabilistic Logic
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Cloud Detection
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Real-time Processing
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Partners & Integration */}
        <div id="partners" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Partners & Integration
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Research Partners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">WSL Institute for Snow and Avalanche Research (SLF)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Switzerland's leading institute for snow and avalanche research</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Satellite className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">European Space Agency (ESA)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Supporting the DeFROST project through Business Applications program</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Platform Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Strava</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">World's leading fitness tracking platform</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="h-6 w-6 text-emerald-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Swisstopo</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Switzerland's national mapping agency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Vision */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Vision for the Future
          </h2>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Wegaw is expanding into the energy market, specifically for hydropower plant operators. 
                The current product capabilities enable Proof of Concepts that demonstrate the value of 
                near real-time snow data in water inflow forecasting.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                The goal is to convert successful Proof of Concepts into long-term commercial agreements 
                and continue expanding Wegaw's foothold in the energy market while maintaining their leadership 
                in outdoor recreation and tourism applications.
              </p>
            </CardContent>
          </Card>
          
          <div className="mt-12">
            <button
              onClick={() => navigate('/#projects')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to All Projects
            </button>
          </div>
        </div>
      </div>
      
      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full overflow-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="fixed top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
            >
              <span className="text-2xl">×</span>
            </button>
            
            <img 
              src={selectedImage} 
              alt="DeFROST Project"
              className="max-w-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}