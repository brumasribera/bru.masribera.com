import { ArrowLeft, Github, Globe, Users, Calendar, Share2, Globe2, BookMarked, Users2, Shield, GraduationCap, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Footer } from './Footer'
import { useProjectNavigation } from './hooks/useProjectNavigation'
import { ProjectNavigationButton } from './ProjectNavigationButton'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { ImageModal } from './ImageModal'
import { useState } from 'react'

export function MoodleNetPage() {
  const { navigateToProject, navigateToHome } = useProjectNavigation()
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    prevProjectPath: '/clathes',
    nextProjectPath: '/pomoca',
    disableNavigation: selectedImage !== null
  })
  
  // Array of all image paths for navigation
  const imagePaths = [
    '/moodlenet/moodle1.png',
    '/moodlenet/moodle2.png',
    '/moodlenet/moodle3.png'
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  src="/logos/moodlenet_logo.png" 
                  alt="MoodleNet Platform"
                  className="h-24 w-24 object-contain rounded-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              MoodleNet Platform
            </h1>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              An open-source platform revolutionizing how educators discover and share educational resources worldwide, promoting open education
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
                  MoodleNet transforms how educators discover, share, and curate educational resources. 
                  As a frontend developer, I contributed to building a comprehensive ecosystem for 
                  collaborative curation and discovery of high-quality educational content.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  The platform addresses the need for accessible, well-curated educational materials 
                  while promoting open education and supporting the global teaching community.
                </p>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3 pt-4 mt-auto">
                <a
                  href="https://moodle.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  <Globe className="h-4 w-4" />
                  <span>Visit MoodleNet</span>
                </a>
                <a
                  href="https://github.com/moodle/moodle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Target Users</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Educators & Teachers</p>
                <p className="text-gray-600 dark:text-gray-400">Students & Learners</p>
                <p className="text-gray-600 dark:text-gray-400">Institutions</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Development Status</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Active Development</p>
                <p className="text-gray-600 dark:text-gray-400">Open Source</p>
                <p className="text-gray-600 dark:text-gray-400">Community Driven</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe2 className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Global Reach</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Worldwide Coverage</p>
                <p className="text-gray-600 dark:text-gray-400">Multi-language</p>
                <p className="text-gray-600 dark:text-gray-400">Open Standards</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Resource Discovery</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced search and filtering for educational resources across multiple formats
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookMarked className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Content Curation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Collaborative curation tools for educators to organize and share resources
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users2 className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Community</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Social learning features and community-driven content sharing
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quality Control</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Peer review and rating systems for educational content quality
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-8 w-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Learning Paths</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Structured learning sequences and curriculum planning tools
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Share2 className="h-8 w-8 text-cyan-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Open Sharing</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Open licensing and sharing mechanisms for educational resources
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Platform Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Platform Preview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/moodlenet/moodle1.png"
                  alt="MoodleNet Interface 1"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/moodlenet/moodle1.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Main Interface
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Clean and intuitive main interface for discovering educational resources. 
                    Advanced search capabilities with multiple filter options.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/moodlenet/moodle2.png"
                  alt="MoodleNet Interface 2"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/moodlenet/moodle2.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Resource Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Detailed resource view with metadata, ratings, and community feedback. 
                    Comprehensive information for educators to evaluate content.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/moodlenet/moodle3.png"
                  alt="MoodleNet Interface 3"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/moodlenet/moodle3.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Community Features
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Community-driven features including reviews, ratings, and collaborative curation. 
                    Social learning elements for enhanced engagement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    React
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    TypeScript
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Tailwind CSS
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Material-UI
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    PHP
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    MySQL
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    REST APIs
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    OAuth
                  </Badge>
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
                MoodleNet is evolving into a comprehensive ecosystem for open education and resource sharing. 
                Future plans include AI-powered content recommendations, advanced learning analytics, 
                and partnerships with educational institutions worldwide to expand the platform's reach.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                The platform aims to become the global standard for educational resource discovery and curation, 
                connecting educators with the world's best open educational resources and fostering 
                collaborative learning communities.
              </p>
            </CardContent>
          </Card>
          
          <div className="mt-12">
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
                projectName="Pomoca"
                onClick={() => navigateToProject('/pomoca')}
              />

              {/* Back to Projects Button - Center */}
              <div className="text-center mb-20">
                <button
                  onClick={navigateToHome}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden"
                >
                  {/* Shiny overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  
                  <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="relative z-10">Back to All Projects</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        imagePaths={imagePaths}
        altText="Platform Preview"
      />
      
      <Footer />
    </div>
  )
}
