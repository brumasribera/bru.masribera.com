import { ArrowLeft, Github, Globe, Users, MapPin, Calendar, TrendingUp, Zap, Mountain, TreePine, Users2, Shield, Award, Route, Compass, Globe2, Star, Heart, MountainSnow, Tent, MapPinOff, Search, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function OpenHutsPage() {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Array of all image paths for navigation
  const imagePaths = [
    '/open-huts/Search View.png',
    '/open-huts/Detailed View.png',
    '/open-huts/Hut View.png',
    '/open-huts/Route View.png',
    '/open-huts/Planning View.png',
    '/open-huts/Manager Base View.png'
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
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/#projects')}
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
              Open Huts Nature Network
            </h1>
            <p className="text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              A revolutionary platform connecting nature enthusiasts with mountain huts worldwide, 
              enabling seamless booking and route planning for unforgettable outdoor adventures.
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
                Open Huts Nature Network is a pioneering platform that revolutionizes how outdoor enthusiasts 
                discover, book, and plan their mountain adventures. As the founder and lead developer, I've 
                created a comprehensive ecosystem that goes beyond simple hut booking to enable complex 
                multi-hut route planning across the world's most beautiful mountain regions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                The platform addresses the growing need for accessible, well-maintained mountain accommodations 
                while promoting sustainable outdoor tourism and supporting local mountain communities. It serves 
                hikers, trail runners, climbers, and adventurers of all levels, providing detailed information 
                about each hut and route with advanced booking capabilities.
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
                  <MapPin className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Global Reach</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Worldwide Coverage</p>
                <p className="text-gray-600 dark:text-gray-400">Mountain Regions</p>
                <p className="text-gray-600 dark:text-gray-400">Remote Locations</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Platform Screenshots */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Platform Preview
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Search & Discovery
                </CardTitle>
              </CardHeader>
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage('/open-huts/Search View.png')}
              >
                <img 
                  src="/open-huts/Search View.png" 
                  alt="Open Huts Search Interface"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg"
                />
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                  <Tent className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  Hut Details
                </CardTitle>
              </CardHeader>
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage('/open-huts/Hut View.png')}
              >
                <img 
                  src="/open-huts/Hut View.png" 
                  alt="Open Huts Hut Details Interface"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg"
                />
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                  <Route className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  Route Planning
                </CardTitle>
              </CardHeader>
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage('/open-huts/Route View.png')}
              >
                <img 
                  src="/open-huts/Route View.png" 
                  alt="Open Huts Route Planning Interface"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg"
                />
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Planning Tools
                </CardTitle>
              </CardHeader>
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage('/open-huts/Planning View.png')}
              >
                <img 
                  src="/open-huts/Planning View.png" 
                  alt="Open Huts Planning Tools Interface"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg"
                />
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                  Tour Booking
                </CardTitle>
              </CardHeader>
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage('/open-huts/Detailed View.png')}
              >
                <img 
                  src="/open-huts/Detailed View.png" 
                  alt="Open Huts Tour Booking Interface"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg"
                />
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                  <Users2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  Manager Dashboard
                </CardTitle>
              </CardHeader>
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage('/open-huts/Manager Base View.png')}
              >
                <img 
                  src="/open-huts/Manager Base View.png" 
                  alt="Open Huts Manager Dashboard Interface"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover shadow-lg"
                />
              </div>
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
                  <Tent className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Single Hut Booking</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Book individual mountain huts with flexible options for meals, dates, and group sizes. 
                  View detailed availability, weather forecasts, and access information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Route className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Hut Routes</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Plan complex multi-day adventures with connected hut networks. 
                  Customize routes, add professional guides, and manage group bookings seamlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Compass className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Advanced Planning</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive maps, elevation profiles, and detailed route information. 
                  Plan your adventure with confidence using comprehensive planning tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MountainSnow className="h-8 w-8 text-emerald-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Mountain Safety</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time weather updates, safety information, and emergency protocols. 
                  Stay informed about mountain conditions and access requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users2 className="h-8 w-8 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Community Features</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  User reviews, photos, and recommendations. Connect with fellow adventurers 
                  and share your mountain experiences with the community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe2 className="h-8 w-8 text-cyan-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Global Coverage</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Access mountain huts and routes worldwide. From the Alps to the Himalayas, 
                  discover hidden gems and plan your next adventure anywhere on Earth.
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
                    Next.js
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    TypeScript
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Tailwind CSS
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Interactive Maps
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
                    PostgreSQL
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Geospatial Data
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Real-time Updates
                  </Badge>
                  <Badge className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                    Secure APIs
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
                    Mobile-First Approach
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Recognizing that most users access the platform from mobile devices while on the trail, 
                    the entire experience is optimized for mobile use with offline capabilities and intuitive 
                    touch interfaces.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Responsive design ensures seamless experience across all devices, from smartphones 
                    to tablets and desktop computers.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Adventure-Centric Design
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    The platform is designed through extensive research with hikers, mountaineers, 
                    and hut owners to understand their needs, pain points, and desired features.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Key design principles focus on accessibility, intuitive navigation, and providing 
                    essential information at the right moment during the user journey.
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
            <button
              onClick={() => navigate('/#projects')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors text-lg"
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
