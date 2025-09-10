import { Card, CardContent, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Users, Star, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguageRouting } from '../hooks/useLanguageRouting'

export function ProjectsSection() {
  const navigate = useNavigate()
  const { t } = useTranslation(['home', 'common'])
  const { getLocalizedPath } = useLanguageRouting()
  
  // Define projects with proper translation keys
  const projects = [
    {
      titleKey: 'projects.projects.reserve.title',
      descriptionKey: 'projects.projects.reserve.description',
      technologies: ['projects.technologies.reactNative', 'projects.technologies.typescript', 'projects.technologies.stripe', 'projects.technologies.mongodb', 'projects.technologies.nodejs'],
      github: null,
      live: 'https://reserve-app.vercel.app',
      impactKey: 'projects.projects.reserve.impact',
      usersKey: 'projects.projects.reserve.users',
      featured: true,
      image: '/icons/logos/reserve-conservation-logo.png'
    },
    {
      titleKey: 'projects.projects.openHuts.title',
      descriptionKey: 'projects.projects.openHuts.description',
      technologies: ['projects.technologies.react', 'projects.technologies.typescript', 'projects.technologies.mapbox', 'projects.technologies.nodejs', 'projects.technologies.postgresql'],
      github: null,
      live: 'https://openhuts.org',
      impactKey: 'projects.projects.openHuts.impact',
      usersKey: 'projects.projects.openHuts.users',
      featured: true,
      image: '/icons/logos/openhuts-platform-logo.jpeg'
    },
    {
      titleKey: 'projects.projects.clathes.title',
      descriptionKey: 'projects.projects.clathes.description',
      technologies: ['projects.technologies.conservationTech', 'projects.technologies.strategicPlanning', 'projects.technologies.sustainableFashion', 'projects.technologies.wildlifeProtection', 'projects.technologies.shopify'],
      github: null,
      live: 'https://www.instagram.com/clathesofficial/',
      impactKey: 'projects.projects.clathes.impact',
      usersKey: 'projects.projects.clathes.users',
      featured: true,
      image: '/clathes/vaquita-profile-logo.png'
    },
    {
      titleKey: 'projects.projects.moodleNet.title',
      descriptionKey: 'projects.projects.moodleNet.description',
      technologies: ['projects.technologies.react', 'projects.technologies.typescript', 'projects.technologies.activityPub', 'projects.technologies.nodejs', 'projects.technologies.postgresql'],
      github: null,
      live: 'https://moodle.net',
      impactKey: 'projects.projects.moodleNet.impact',
      usersKey: 'projects.projects.moodleNet.users',
      featured: true,
      image: '/icons/logos/moodlenet-network-logo.png'
    },
    {
      titleKey: 'projects.projects.pomoca.title',
      descriptionKey: 'projects.projects.pomoca.description',
      technologies: ['projects.technologies.react', 'projects.technologies.typescript', 'projects.technologies.nodejs', 'projects.technologies.postgresql', 'projects.technologies.iot'],
      github: null,
      live: null,
      impactKey: 'projects.projects.pomoca.impact',
      usersKey: 'projects.projects.pomoca.users',
      featured: true,
      image: '/icons/logos/oberalp-salewa-group-logo.jpeg'
    },
    {
      titleKey: 'projects.projects.defrost.title',
      descriptionKey: 'projects.projects.defrost.description',
      technologies: ['projects.technologies.python', 'projects.technologies.aiMl', 'projects.technologies.satelliteData', 'projects.technologies.react', 'projects.technologies.nodejs'],
      github: null,
      live: 'https://wegaw.com',
      impactKey: 'projects.projects.defrost.impact',
      usersKey: 'projects.projects.defrost.users',
      featured: true,
      image: '/icons/logos/wegaw-weather-logo.jpeg'
    }
  ]
  
  return (
    <section id="projects" className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced header with gradient title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent mb-6 leading-tight pb-2">
            {t('projects.featuredTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('projects.featuredSubtitle')}
          </p>
        </div>
        
        {/* All projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.titleKey} className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden flex flex-col">
              {/* Card content with flex-grow to push action elements to bottom */}
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
                    <CardTitle className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {t(project.titleKey)}
                    </CardTitle>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1 leading-relaxed text-left">
                    {t(project.descriptionKey)}
                  </p>
                  
                  {/* Impact and users */}
                  <div className="mb-6 mt-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Star className="h-4 w-4" />
                        <span>{t(project.impactKey)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{t(project.usersKey)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                          {t(tech)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons - pinned to bottom, center-aligned */}
                  <div className="mt-auto flex justify-center">
                    {project.titleKey === 'projects.projects.clathes.title' ? (
                      <button
                        onClick={() => {
                          navigate(getLocalizedPath('/clathes'))
                          // Scroll to top after navigation completes
                          setTimeout(() => {
                            window.scrollTo(0, 0)
                          }, 150)
                        }}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">{t('projects.moreDetails')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.titleKey === 'projects.projects.openHuts.title' ? (
                      <button
                        onClick={() => {
                          navigate(getLocalizedPath('/openhuts'))
                          // Scroll to top after navigation completes
                          setTimeout(() => {
                            window.scrollTo(0, 0)
                          }, 150)
                        }}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">{t('projects.moreDetails')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.titleKey === 'projects.projects.moodleNet.title' ? (
                      <button
                        onClick={() => {
                          navigate(getLocalizedPath('/moodlenet'))
                          // Scroll to top after navigation completes
                          setTimeout(() => {
                            window.scrollTo(0, 0)
                          }, 150)
                        }}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">{t('projects.moreDetails')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.titleKey === 'projects.projects.reserve.title' ? (
                      <button
                        onClick={() => {
                          navigate(getLocalizedPath('/reserve'))
                          // Scroll to top after navigation completes
                          setTimeout(() => {
                            window.scrollTo(0, 0)
                          }, 150)
                        }}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">{t('projects.moreDetails')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.titleKey === 'projects.projects.defrost.title' ? (
                      <button
                        onClick={() => {
                          navigate(getLocalizedPath('/wegaw'))
                          // Scroll to top after navigation completes
                          setTimeout(() => {
                            window.scrollTo(0, 0)
                          }, 150)
                        }}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">{t('projects.moreDetails')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.titleKey === 'projects.projects.pomoca.title' ? (
                      <button
                        onClick={() => {
                          navigate(getLocalizedPath('/pomoca'))
                          // Scroll to top after navigation completes
                          setTimeout(() => {
                            window.scrollTo(0, 0)
                          }, 150)
                        }}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">{t('projects.moreDetails')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : (
                      <button className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">{t('projects.moreDetails')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
