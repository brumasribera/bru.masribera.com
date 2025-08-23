import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguageRouting } from '../hooks/useLanguageRouting'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Users, Star, ArrowRight, Home, Leaf, ArrowLeft } from 'lucide-react'

interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  technologies: string[]
  github: string | null
  live: string | null
  impactKey: string
  usersKey: string
  featured: boolean
  image: string
  path: string
}

export function ProjectsPage() {
  const navigate = useNavigate()
  const { t } = useTranslation(['home', 'common'])
  const { getLocalizedPath } = useLanguageRouting()
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const projectsPerPage = 25

  // Define all projects with their paths
  const allProjects: Project[] = [
    {
      id: 'reserve',
      titleKey: 'projects.projects.reserve.title',
      descriptionKey: 'projects.projects.reserve.description',
      technologies: ['projects.technologies.reactNative', 'projects.technologies.typescript', 'projects.technologies.stripe', 'projects.technologies.mongodb', 'projects.technologies.nodejs'],
      github: null,
      live: 'https://reserve.org',
      impactKey: 'projects.projects.reserve.impact',
      usersKey: 'projects.projects.reserve.users',
      featured: true,
      image: '/logos/reserve-logo.png',
      path: '/reserve'
    },
    {
      id: 'openhuts',
      titleKey: 'projects.projects.openHuts.title',
      descriptionKey: 'projects.projects.openHuts.description',
      technologies: ['projects.technologies.react', 'projects.technologies.typescript', 'projects.technologies.mapbox', 'projects.technologies.nodejs', 'projects.technologies.postgresql'],
      github: null,
      live: 'https://openhuts.org',
      impactKey: 'projects.projects.openHuts.impact',
      usersKey: 'projects.projects.openHuts.users',
      featured: true,
      image: '/logos/openhuts_logo.jpeg',
      path: '/openhuts'
    },
    {
      id: 'clathes',
      titleKey: 'projects.projects.clathes.title',
      descriptionKey: 'projects.projects.clathes.description',
      technologies: ['projects.technologies.conservationTech', 'projects.technologies.strategicPlanning', 'projects.technologies.sustainableFashion', 'projects.technologies.wildlifeProtection', 'projects.technologies.shopify'],
      github: null,
      live: 'https://www.instagram.com/clathesofficial/',
      impactKey: 'projects.projects.clathes.impact',
      usersKey: 'projects.projects.clathes.users',
      featured: true,
      image: '/clathes/Vaquita - profile logo.png',
      path: '/clathes'
    },
    {
      id: 'moodlenet',
      titleKey: 'projects.projects.moodleNet.title',
      descriptionKey: 'projects.projects.moodleNet.description',
      technologies: ['projects.technologies.react', 'projects.technologies.typescript', 'projects.technologies.activityPub', 'projects.technologies.nodejs', 'projects.technologies.postgresql'],
      github: null,
      live: 'https://moodle.net',
      impactKey: 'projects.projects.moodleNet.impact',
      usersKey: 'projects.projects.moodleNet.users',
      featured: true,
      image: '/logos/moodlenet_logo.png',
      path: '/moodlenet'
    },
    {
      id: 'pomoca',
      titleKey: 'projects.projects.pomoca.title',
      descriptionKey: 'projects.projects.pomoca.description',
      technologies: ['projects.technologies.react', 'projects.technologies.typescript', 'projects.technologies.nodejs', 'projects.technologies.postgresql', 'projects.technologies.iot'],
      github: null,
      live: null,
      impactKey: 'projects.projects.pomoca.impact',
      usersKey: 'projects.projects.pomoca.users',
      featured: true,
      image: '/logos/oberalp___salewa_group_logo.jpeg',
      path: '/pomoca'
    },
    {
      id: 'wegaw',
      titleKey: 'projects.projects.defrost.title',
      descriptionKey: 'projects.projects.defrost.description',
      technologies: ['projects.technologies.python', 'projects.technologies.aiMl', 'projects.technologies.satelliteData', 'projects.technologies.react', 'projects.technologies.nodejs'],
      github: null,
      live: 'https://wegaw.com',
      impactKey: 'projects.projects.defrost.impact',
      usersKey: 'projects.projects.defrost.users',
      featured: true,
      image: '/logos/wegaw_logo.jpeg',
      path: '/wegaw'
    },
    {
      id: 'pix4d',
      titleKey: 'projects.projects.pix4d.title',
      descriptionKey: 'projects.projects.pix4d.description',
      technologies: ['projects.technologies.python', 'projects.technologies.aiMl', 'projects.technologies.satelliteData', 'projects.technologies.react', 'projects.technologies.nodejs'],
      github: null,
      live: null,
      impactKey: 'projects.projects.pix4d.impact',
      usersKey: 'projects.projects.pix4d.users',
      featured: true,
      image: '/logos/pix4d_logo.jpeg',
      path: '/pix4d'
    }
  ]

  // Load initial projects
  useEffect(() => {
    loadMoreProjects()
  }, [])

  const loadMoreProjects = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      const startIndex = (currentPage - 1) * projectsPerPage
      const endIndex = startIndex + projectsPerPage
      const newProjects = allProjects.slice(startIndex, endIndex)
      
      if (newProjects.length === 0) {
        setHasMore(false)
      } else {
        setVisibleProjects(prev => [...prev, ...newProjects])
        setCurrentPage(prev => prev + 1)
      }
      
      setIsLoading(false)
    }, 500)
  }, [currentPage, isLoading, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreProjects()
        }
      },
      { threshold: 0.1 }
    )

    const sentinel = document.getElementById('scroll-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => observer.disconnect()
  }, [loadMoreProjects, hasMore, isLoading])

  const handleProjectClick = (project: Project) => {
    navigate(getLocalizedPath(project.path))
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 150)
  }

  const handleGoHome = () => {
    navigate(getLocalizedPath('/'))
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 150)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Leaf className="h-5 w-5" />
                <span className="text-lg font-semibold">All Projects</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {visibleProjects.length} of {allProjects.length} projects
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent mb-6 leading-tight">
            Explore all projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover my complete portfolio of web development, UX design, and product innovation projects
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden flex flex-col cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="flex-1 flex flex-col">
                  {/* Centered logo and title */}
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-[60px] h-[60px] rounded-2xl overflow-hidden flex items-center justify-center bg-white ring-1 ring-gray-200 shadow-sm dark:bg-white dark:ring-gray-700">
                      <img
                        src={project.image}
                        alt={t(project.titleKey)}
                        className="max-w-[70%] max-h-[70%] object-contain"
                      />
                    </div>
                    <CardTitle className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                      {t(project.titleKey)}
                    </CardTitle>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-left line-clamp-3">
                    {t(project.descriptionKey)}
                  </p>
                  
                  {/* Impact and users */}
                  <div className="mb-4 mt-4">
                    <div className="flex flex-wrap gap-3 text-xs">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Star className="h-3 w-3" />
                        <span>{t(project.impactKey)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Users className="h-3 w-3" />
                        <span>{t(project.usersKey)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                          {t(tech)}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <div className="mt-auto flex justify-center">
                    <button className="group relative flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                      <span>View details</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading more projects...</span>
          </div>
        )}

        {/* End of results */}
        {!hasMore && visibleProjects.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
              <Leaf className="h-4 w-4" />
              <span>All projects loaded</span>
            </div>
          </div>
        )}

        {/* Scroll sentinel for infinite scroll */}
        <div id="scroll-sentinel" className="h-4" />
      </div>
    </div>
  )
}
