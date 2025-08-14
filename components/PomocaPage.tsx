import { ArrowLeft, Globe, ExternalLink, Factory, Settings, Zap, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'

export function PomocaPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 text-white py-20" style={{ background: 'linear-gradient(135deg, #d61c94 0%, #be185d 50%, #9d174d 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8 pt-8">
            <button 
              onClick={() => navigate('/#projects')}
              className="flex items-center gap-2 text-pink-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Projects</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-3xl shadow-xl">
                <img 
                  src="/logos/oberalp___salewa_group_logo.jpeg" 
                  alt="Pomoca"
                  className="h-24 w-24 object-contain rounded-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Pomoca Production Interface
            </h1>
                         <p className="text-2xl text-pink-100 max-w-4xl mx-auto leading-relaxed">
               UX design project for digital transformation of ski touring skin manufacturing. Designed new production monitoring 
               and quality control interfaces for the world's leading manufacturer since 1933.
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
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 space-y-4">
                                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                   Pomoca, founded in 1933, is the world's leading manufacturer of ski touring skins. 
                   This UX design project focused on creating new digital interfaces for their manufacturing 
                   process, designing intuitive production monitoring and control workflows.
                 </p>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                   The design concept integrates with existing manufacturing equipment to provide real-time 
                   monitoring, quality assurance, and production optimization interfaces for their Swiss-made 
                   ski touring skins.
                 </p>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                   As part of the Oberalp Group, Pomoca needed modern interface designs that could handle 
                   their complex manufacturing processes while maintaining their high quality standards 
                   and Swiss precision.
                 </p>
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
                  <span>Visit Pomoca</span>
                </a>
                <a
                  href="https://www.pomoca.com/en/history"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Company History</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="h-6 w-6" style={{ color: '#d61c94' }} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manufacturing</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Swiss Made Quality</p>
                <p className="text-gray-600 dark:text-gray-400">Since 1933</p>
                <p className="text-gray-600 dark:text-gray-400">World Leading</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="h-6 w-6" style={{ color: '#d61c94' }} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technology</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Production Monitoring</p>
                <p className="text-gray-600 dark:text-gray-400">Quality Control</p>
                <p className="text-gray-600 dark:text-gray-400">Real-time Data</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6" style={{ color: '#d61c94' }} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Innovation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Digital Transformation</p>
                <p className="text-gray-600 dark:text-gray-400">Smart Manufacturing</p>
                <p className="text-gray-600 dark:text-gray-400">Process Optimization</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Manufacturing Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Manufacturing Process
            </h2>
                         <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
               Our interface designs monitor and control the complete manufacturing workflow 
               from material reception to final quality assurance
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {/* Material Reception - Step 1 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/material-reception.png" 
                    alt="Material Reception"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Material Reception
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Raw material intake and initial inspection
                </p>
              </CardContent>
            </Card>

            {/* Storage - Step 2 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/storage.png" 
                    alt="Storage"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Storage
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Inventory management and storage
                </p>
              </CardContent>
            </Card>

            {/* Cutting - Step 3 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/cutting.png" 
                    alt="Cutting"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Cutting
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Precision cutting and sizing
                </p>
              </CardContent>
            </Card>

            {/* Gliding - Step 4 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                4
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/gliding.png" 
                    alt="Gliding"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Gliding
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Surface treatment and gliding
                </p>
              </CardContent>
            </Card>

            {/* Marking - Step 5 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                5
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/marking.png" 
                    alt="Marking"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Marking
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Branding and identification
                </p>
              </CardContent>
            </Card>

            {/* Adhesive Application - Step 6 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                6
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/adhesive-application.png" 
                    alt="Adhesive Application"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Adhesive Application
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Adhesive application and bonding
                </p>
              </CardContent>
            </Card>

            {/* Quality Assurance - Step 7 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                7
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/qa.png" 
                    alt="Quality Assurance"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Quality Assurance
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Quality assurance and testing
                </p>
              </CardContent>
            </Card>

            {/* Laser Cutting - Step 8 */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg text-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                8
              </div>
              <CardContent className="p-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 p-2 bg-white">
                  <img 
                    src="/pomoca/steps/laser-cutting.png" 
                    alt="Laser Cutting"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Laser Cutting
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Final precision laser cutting
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prototype Showcase */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Production Interface Prototypes
            </h2>
                         <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
               Three specialized interface designs for production monitoring, each designed for different 
               process stations and manufacturing machines on the factory floor
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Prototype 1 - Cutting */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="/pomoca/prototypes/GLR Cutting step.png" 
                  alt="Pomoca Production Interface - Cutting Step"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                     Cutting Process Interface Design
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 mb-4">
                     Specialized interface design for the cutting step, providing real-time monitoring 
                     of cutting parameters, material tracking, and quality control during the cutting process.
                   </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Cutting Control</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prototype 2 - QA */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="/pomoca/prototypes/QA step.png" 
                  alt="Pomoca Production Interface - QA Step"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                     Quality Assurance Interface Design
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 mb-4">
                     Dedicated QA interface design for quality control processes, featuring automated 
                     quality checks, inspection workflows, and compliance monitoring for ski touring skins.
                   </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Quality Control</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prototype 3 - Refinements */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="/pomoca/prototypes/Product refinements .png" 
                  alt="Pomoca Production Interface - Product Refinements"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                     Product Refinements Interface Design
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 mb-4">
                     Advanced interface design for product refinement processes, including surface treatments, 
                     finishing touches, and final quality enhancements before product completion.
                   </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Product Finishing</span>
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
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                Technical Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                   Interface Design Approach
                 </h3>
                 <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                   <li>• User-centered design methodology</li>
                   <li>• Real-time data visualization concepts</li>
                   <li>• Responsive design for factory floor tablets</li>
                   <li>• Intuitive operator interface patterns</li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                   Design Integration Concepts
                 </h3>
                 <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                   <li>• Manufacturing equipment interface design</li>
                   <li>• Quality control system interfaces</li>
                   <li>• Production planning interface concepts</li>
                   <li>• Real-time monitoring interface patterns</li>
                 </ul>
                </div>
              </div>
              
              <div>
                                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                   Key Design Features
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(214, 28, 148, 0.1)' }}>
                     <h4 className="font-semibold mb-2" style={{ color: '#d61c94' }}>Production Monitoring Interface</h4>
                     <p className="text-sm text-gray-700 dark:text-gray-300">Interface design for real-time status of all manufacturing equipment and processes</p>
                   </div>
                   <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(214, 28, 148, 0.1)' }}>
                     <h4 className="font-semibold mb-2" style={{ color: '#d61c94' }}>Quality Control Interface</h4>
                     <p className="text-sm text-gray-700 dark:text-gray-300">Interface design for automated quality checks and manual inspection workflows</p>
                   </div>
                   <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(214, 28, 148, 0.1)' }}>
                     <h4 className="font-semibold mb-2" style={{ color: '#d61c94' }}>Analytics & Reporting Interface</h4>
                     <p className="text-sm text-gray-700 dark:text-gray-300">Interface design for production metrics, efficiency analysis, and predictive insights</p>
                   </div>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
