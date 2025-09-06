import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { MapPin, Calendar, ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const experiences = [
  {
    company: 'openHuts',
    logo: '/icons/logos/openhuts-platform-logo.jpeg',
    position: 'experience.companies.openHuts.position',
    location: 'experience.companies.openHuts.location',
    period: 'experience.companies.openHuts.period',
    description: 'experience.companies.openHuts.description',
    skills: ['experience.skills.react', 'experience.skills.next', 'experience.skills.typescript', 'experience.skills.supabase', 'experience.skills.uxResearch', 'experience.skills.figma']
  },
  {
    company: 'moodle',
    logo: '/icons/logos/moodle-platform-logo.jpeg',
    position: 'experience.companies.moodle.position',
    location: 'experience.companies.moodle.location',
    period: 'experience.companies.moodle.period',
    description: 'experience.companies.moodle.description',
    skills: ['experience.skills.react', 'experience.skills.figma', 'experience.skills.uxDesign', 'experience.skills.openSource', 'experience.skills.educationalTechnology']
  },
  {
    company: 'oberalp',
    logo: '/icons/logos/oberalp-salewa-group-logo.jpeg',
    position: 'experience.companies.oberalp.position',
    location: 'experience.companies.oberalp.location',
    period: 'experience.companies.oberalp.period',
    description: 'experience.companies.oberalp.description',
    skills: ['experience.skills.behavioralInterviewing', 'experience.skills.usabilityTesting', 'experience.skills.uxDesign', 'experience.skills.productionInterfaces']
  },
  {
    company: 'wegaw',
    logo: '/icons/logos/wegaw-weather-logo.jpeg',
    position: 'experience.companies.wegaw.position',
    location: 'experience.companies.wegaw.location',
    period: 'experience.companies.wegaw.period',
    description: 'experience.companies.wegaw.description',
    skills: ['experience.skills.javascript', 'experience.skills.kubernetes', 'experience.skills.satelliteData', 'experience.skills.esaProjects', 'experience.skills.snowCoverTracking']
  },
  {
    company: 'pix4d',
    logo: '/icons/logos/pix4d-software-logo.jpeg',
    position: 'experience.companies.pix4d.position',
    location: 'experience.companies.pix4d.location',
    period: 'experience.companies.pix4d.period',
    description: 'experience.companies.pix4d.description',
    skills: ['experience.skills.angular4', 'experience.skills.rxjs', 'experience.skills.cloudPlatform', 'experience.skills.3dModeling', 'experience.skills.droneTechnology']
  }
]

export function ExperienceSection() {
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)
  const { t } = useTranslation(['home', 'common'])
  
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3)
  const hasMore = experiences.length > 2.5
  
  return (
    <section id="experience" className="py-6 sm:py-12 px-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 dark:from-green-400 dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent mb-6 leading-tight pb-2">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </div>
        {/* Timeline list with logo, content, and right-aligned meta */}
        <div className="relative">
          {/* Vertical line - hidden on small screens */}
          <div className={`hidden sm:block absolute left-6 sm:left-8 w-px transition-all duration-700 ease-in-out ${
            !showAll ? 'h-[calc(100%-4rem)]' : 'h-[calc(100%-5rem)]'
          } bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700`} />
          
          {/* Timeline fade-out overlay when collapsed */}
          {!showAll && (
            <div className="hidden sm:block absolute left-6 sm:left-8 w-px h-16 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 pointer-events-none" 
                 style={{ top: 'calc(100% - 4rem)' }} />
          )}

          <div className="transition-all duration-700 ease-in-out relative pt-4 pb-4 px-4 sm:pl-4 sm:pr-16">
            <ul className="space-y-8">
            {visibleExperiences.map((experience, index) => (
              <li 
                key={experience.company} 
                className={`relative pl-0 sm:pl-20 group transition-all duration-700 ease-in-out ${
                  !showAll && index === 2 ? 'cursor-pointer' : ''
                }`}
                style={{
                  height: !showAll && index === 2 ? '80px' : 'auto'
                }}
                onClick={!showAll && index === 2 ? () => setShowAll(true) : undefined}
              >
                {/* Dot aligned with vertical timeline - hidden on small screens */}
                <div className="hidden sm:block absolute left-2 sm:left-4 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 z-10" />

                <div className="overflow-visible">
                                  <Card className={`group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 relative ${
                  !showAll && index === 2 ? 'shadow-none group-hover:shadow-none hover:shadow-[0_-8px_25px_-12px_rgba(0,0,0,0.25),8px_0_25px_-12px_rgba(0,0,0,0.25)] hover:scale-[1.01] hover:shadow-blue-500/20 overflow-hidden h-20' : ''
                } ${showAll && index === experiences.length - 1 ? 'mb-8' : ''}`}>
                  
                  <div className={!showAll && index === 2 ? 'overflow-hidden h-20' : ''}>
                    <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4 sm:gap-6">
                        {/* Company logo */}
                        <img 
                          src={experience.logo} 
                          alt={t(`experience.companies.${experience.company}.name`)} 
                          className="w-16 h-16 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">${t(`experience.companies.${experience.company}.name`).charAt(0)}</div>`;
                            }
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300 leading-tight">
                            {t(experience.position)}
                          </CardTitle>
                          <div className="text-base sm:text-lg font-medium text-gray-700 dark:text-white transition-all duration-300 mt-1">
                            {t(`experience.companies.${experience.company}.name`)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Location and dates - now below on small screens */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 sm:ml-auto">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit">
                          <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium text-sm text-gray-900 dark:text-gray-300">{t(experience.location)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit">
                          <Calendar className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-900 dark:text-gray-300">{t(experience.period)}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                      {t(experience.description)}
                    </p>
                    
                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {experience.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                        >
                          {t(skill)}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action button */}
                    <div className="flex justify-end">
                      {experience.company === 'openHuts' ? (
                        <button
                          onClick={() => {
                            navigate('/openhuts')
                            // Scroll to top after navigation completes
                            setTimeout(() => {
                              window.scrollTo(0, 0)
                            }, 150)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>{t('experience.moreDetails')}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'moodle' ? (
                        <button
                          onClick={() => {
                            navigate('/moodlenet')
                            // Scroll to top after navigation completes
                            setTimeout(() => {
                              window.scrollTo(0, 0)
                            }, 150)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>{t('experience.moreDetails')}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'wegaw' ? (
                        <button
                          onClick={() => {
                            navigate('/wegaw')
                            // Scroll to top after navigation completes
                            setTimeout(() => {
                              window.scrollTo(0, 0)
                            }, 150)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>{t('experience.moreDetails')}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'pix4d' ? (
                        <button
                          onClick={() => {
                            navigate('/pix4d')
                            // Scroll to top after navigation completes
                            setTimeout(() => {
                              window.scrollTo(0, 0)
                            }, 150)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>{t('experience.moreDetails')}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'oberalp' ? (
                        <button
                          onClick={() => {
                            navigate('/pomoca')
                            // Scroll to top after navigation completes
                            setTimeout(() => {
                              window.scrollTo(0, 0)
                            }, 150)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>{t('experience.moreDetails')}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105">
                          <span>{t('experience.moreDetails')}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </CardContent>
                    </div>
                </Card>
                  </div>
              </li>
            ))}
            </ul>
            
            {/* Comprehensive fade-out overlay for entire container when collapsed */}
            {!showAll && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 pointer-events-none z-20" />
            )}
          </div>
          
          {/* Show More/Less Button */}
          {hasMore && !showAll && (
            <div className="text-center transition-all duration-700 ease-in-out mt-2">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ChevronDown className="h-5 w-5" />
                {t('experience.showMore')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
