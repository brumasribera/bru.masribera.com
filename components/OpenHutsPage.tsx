import { ArrowLeft, Users, Calendar, Route, Compass, Globe2, MountainSnow, Tent, Search, Users2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Footer } from './Footer'
import { useProjectNavigation } from './hooks/useProjectNavigation'
import { ProjectNavigationButton } from './ProjectNavigationButton'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { ImageModal } from './ImageModal'
import { useState } from 'react'

export function OpenHutsPage() {
  const { navigateToProject, navigateToHome } = useProjectNavigation()
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    prevProjectPath: '/reserve',
    nextProjectPath: '/clathes',
    disableNavigation: selectedImage !== null
  })
  
  // Array of all image paths for navigation
  const imagePaths = [
    '/open-huts/Search View.png',
    '/open-huts/Hut View.png',
    '/open-huts/Route View.png'
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-green-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Projects</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-3xl shadow-xl">
                <img 
                  src="/logos/openhuts_logo.jpeg" 
                  alt="Open Huts Nature Network"
                  className="h-24 w-24 object-contain rounded-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Open Huts
            </h1>
            <p className="text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              A revolutionary platform connecting nature enthusiasts with mountain huts worldwide, enabling sustainable outdoor tourism and adventure planning
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
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Open Huts Nature Network revolutionizes how outdoor enthusiasts discover, book, and plan 
                mountain adventures. As founder and lead developer, I created a comprehensive ecosystem 
                for multi-hut route planning across the world's most beautiful mountain regions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                The platform addresses the need for accessible mountain accommodations while promoting 
                sustainable outdoor tourism and supporting local mountain communities.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Target Users</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Hikers & Trail Runners</p>
                <p className="text-gray-600 dark:text-gray-400">Climbers & Mountaineers</p>
                <p className="text-gray-600 dark:text-gray-400">Nature Enthusiasts</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Development Status</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Research & Prototyping</p>
                <p className="text-gray-600 dark:text-gray-400">Core Architecture Design</p>
                <p className="text-gray-600 dark:text-gray-400">MVP Development</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe2 className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Global Reach</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">European Alps</p>
                <p className="text-gray-600 dark:text-gray-400">North American Rockies</p>
                <p className="text-gray-600 dark:text-gray-400">Himalayan Region</p>
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Smart Search</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced filtering by location, amenities, availability, and user preferences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Route className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Route Planning</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Multi-hut route planning with elevation profiles and difficulty ratings
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Tent className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Hut Management</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive hut profiles with photos, amenities, and availability
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users2 className="h-8 w-8 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Community</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  User reviews, ratings, and community-driven content
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Compass className="h-8 w-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Navigation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Offline maps and GPS integration for remote areas
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MountainSnow className="h-8 w-8 text-cyan-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Weather Integration</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time weather data and seasonal considerations
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
                  src="/open-huts/Search View.png"
                  alt="Search Interface"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/open-huts/Search View.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Search Interface
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Advanced search functionality with filters for location, amenities, and availability. 
                    Users can find the perfect mountain hut based on their specific requirements.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/open-huts/Hut View.png"
                  alt="Hut Details"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/open-huts/Hut View.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Hut Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Comprehensive hut profiles with photos, amenities, availability, and user reviews. 
                    Detailed information to help users make informed decisions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <img
                  src="/open-huts/Route View.png"
                  alt="Route Planning"
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage('/open-huts/Route View.png')}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Route Planning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Multi-hut route planning with interactive maps, elevation profiles, and difficulty ratings. 
                    Plan your perfect mountain adventure with multiple stops.
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
                    Mapbox
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
                    Node.js
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Express
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    PostgreSQL
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Redis
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
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Open Huts Nature Network is evolving into a comprehensive ecosystem for sustainable outdoor tourism. 
                Future plans include AI-powered route recommendations, community-driven conservation initiatives, 
                and partnerships with environmental organizations to protect mountain ecosystems worldwide.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                The platform aims to become the global standard for mountain hut booking and route planning, 
                connecting adventurers with the world's most beautiful and remote mountain destinations.
              </p>
            </CardContent>
          </Card>
          
          <div className="mt-12">
            {/* Navigation Buttons */}
            <div className="relative">
              {/* Previous Project Button - Left Side */}
              <ProjectNavigationButton
                direction="prev"
                projectName="Reserve"
                onClick={() => navigateToProject('/reserve')}
              />

              {/* Next Project Button - Right Side */}
              <ProjectNavigationButton
                direction="next"
                projectName="MoodleNet"
                onClick={() => navigateToProject('/moodlenet')}
              />

              {/* Back to Projects Button - Center */}
              <div className="text-center mb-20">
                <button
                  onClick={navigateToHome}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg overflow-hidden"
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
