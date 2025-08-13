import { ArrowLeft, Github, Globe, Users, MapPin, Calendar, TrendingUp, Zap, BookOpen, GraduationCap, Share2, Award, Route, Compass, Globe2, Star, Heart, BookMarked, Users2, Shield, Award as AwardIcon, Route as RouteIcon, Compass as CompassIcon, Globe2 as Globe2Icon, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function MoodleNetPage() {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Array of all image paths for navigation (placeholder for now)
  const imagePaths = [
    '/logos/moodlenet_logo.png'
  ]
  
  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      
      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = imagePaths.indexOf(selectedImage)
        const prevIndex = currentIndex === 0 ? imagePaths.length - 1 : currentIndex - 1
        setSelectedImage(imagePaths[prevIndex])
      } else if (e.key === 'ArrowRight') {
        const currentIndex = imagePaths.indexOf(selectedImage)
        const nextIndex = currentIndex === imagePaths.length - 1 ? 0 : currentIndex + 1
        setSelectedImage(imagePaths[nextIndex])
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])
  
  // Navigation functions for modal
  const goToPreviousImage = () => {
    if (!selectedImage) return
    const currentIndex = imagePaths.indexOf(selectedImage)
    const prevIndex = currentIndex === 0 ? imagePaths.length - 1 : currentIndex - 1
    setSelectedImage(imagePaths[prevIndex])
  }
  
  const goToNextImage = () => {
    if (!selectedImage) return
    const currentIndex = imagePaths.indexOf(selectedImage)
    const nextIndex = currentIndex === imagePaths.length - 1 ? 0 : currentIndex + 1
    setSelectedImage(imagePaths[nextIndex])
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
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
              An open-source platform revolutionizing how educators discover, share, and curate 
              educational resources worldwide, built with modern web technologies and UX principles.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                Project Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                MoodleNet is a pioneering open-source platform that transforms how educators discover, 
                share, and curate educational resources. As a frontend developer on this project, I've 
                contributed to building a comprehensive ecosystem that goes beyond simple resource sharing 
                to enable collaborative curation and discovery of high-quality educational content.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                The platform addresses the growing need for accessible, well-curated educational materials 
                while promoting open education and supporting the global teaching community. It serves 
                educators, instructional designers, and learners of all levels, providing detailed information 
                about each resource with advanced discovery and curation capabilities.
              </p>
              
              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <a
                  href="https://moodle.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  <Globe className="h-4 w-4" />
                  <span>Go to Site</span>
                </a>
                <a
                  href="https://github.com/moodle/moodlenet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Repo</span>
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
                <p className="text-gray-600 dark:text-gray-400">Instructional Designers</p>
                <p className="text-gray-600 dark:text-gray-400">Students & Learners</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Development Status</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Active Development</p>
                <p className="text-gray-600 dark:text-gray-400">Production Platform</p>
                <p className="text-gray-600 dark:text-gray-400">Open Source</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Global Reach</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Worldwide Coverage</p>
                <p className="text-gray-600 dark:text-gray-400">Educational Institutions</p>
                <p className="text-gray-600 dark:text-gray-400">Open Education</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Core Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookMarked className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Resource Discovery</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced search and filtering capabilities to discover educational resources 
                  across subjects, levels, and formats. AI-powered recommendations and tagging.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Share2 className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Content Curation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Collaborative curation tools for educators to organize, rate, and review 
                  educational resources. Create collections and learning pathways.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users2 className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Community Building</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with fellow educators, share best practices, and collaborate on 
                  educational content. Discussion forums and networking features.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-8 w-8 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Learning Analytics</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Track resource usage, engagement metrics, and learning outcomes. 
                  Data-driven insights for improving educational content quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe2 className="h-8 w-8 text-cyan-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Open Standards</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Built on open educational standards and interoperable with major LMS platforms. 
                  Support for SCORM, LTI, and other educational protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quality Assurance</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Community-driven quality control and peer review systems. 
                  Verified resources and trusted contributor programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Overview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Technology Architecture
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Frontend & User Experience
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
                    Storybook
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    UX Design
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Backend & Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Open Source
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Educational Standards
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Community Driven
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Scalable Architecture
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Experience Focus */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            User Experience Design
          </h2>
          
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Educator-Centric Design
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    The platform is designed through extensive research with educators, instructional 
                    designers, and students to understand their needs, pain points, and desired features.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Key design principles focus on accessibility, intuitive navigation, and providing 
                    essential information at the right moment during the resource discovery journey.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Open Education Focus
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Recognizing that educators need quick access to quality resources, the entire 
                    experience is optimized for efficient discovery and curation with collaborative features.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Responsive design ensures seamless experience across all devices, from desktop 
                    computers to tablets and smartphones used in educational settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
            {/* Close button - always visible */}
            <button
              onClick={() => setSelectedImage(null)}
              className="fixed top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Navigation arrows */}
            <button
              onClick={goToPreviousImage}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={goToNextImage}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
            >
              <ArrowLeft className="h-6 w-6 rotate-180" />
            </button>
            
            <img 
              src={selectedImage} 
              alt="Platform Preview"
              className="max-w-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
