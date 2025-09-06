import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Calendar, MapPin, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const education = [
  {
    degree: 'education.degrees.computerEngineering.degree',
    institution: 'education.degrees.computerEngineering.institution',
    period: 'education.degrees.computerEngineering.period',
    location: 'education.degrees.computerEngineering.location',
    description: 'education.degrees.computerEngineering.description',
    skills: ['education.skills.webDevelopment', 'education.skills.softwareArchitecture', 'education.skills.problemSolving', 'education.skills.technicalFoundation', 'education.skills.systemDesign']
  },
  {
    degree: 'education.degrees.uxDesigner.degree',
    institution: 'education.degrees.uxDesigner.institution',
    period: 'education.degrees.uxDesigner.period',
    location: 'education.degrees.uxDesigner.location',
    description: 'education.degrees.uxDesigner.description',
    skills: ['education.skills.uxDesign', 'education.skills.userResearch', 'education.skills.prototyping', 'education.skills.userTesting', 'education.skills.designThinking', 'education.skills.figma', 'education.skills.userCenteredDesign']
  },
  {
    degree: 'education.degrees.mountainLeader.degree',
    institution: 'education.degrees.mountainLeader.institution',
    period: 'education.degrees.mountainLeader.period',
    location: 'education.degrees.mountainLeader.location',
    description: 'education.degrees.mountainLeader.description',
    skills: ['education.skills.leadership', 'education.skills.environmentalAwareness', 'education.skills.riskAssessment', 'education.skills.teamManagement', 'education.skills.sustainability', 'education.skills.outdoorPlanning']
  },
  {
    degree: 'education.degrees.mba.degree',
    institution: 'education.degrees.mba.institution',
    period: 'education.degrees.mba.period',
    location: 'education.degrees.mba.location',
    description: 'education.degrees.mba.description',
    skills: ['education.skills.businessStrategy', 'education.skills.digitalTransformation', 'education.skills.productManagement', 'education.skills.marketAnalysis', 'education.skills.strategicThinking', 'education.skills.innovation']
  },
  {
    degree: 'education.degrees.architecture.degree',
    institution: 'education.degrees.architecture.institution',
    period: 'education.degrees.architecture.period',
    location: 'education.degrees.architecture.location',
    description: 'education.degrees.architecture.description',
    skills: ['education.skills.designThinking', 'education.skills.spatialProblemSolving', 'education.skills.creativeDesign', 'education.skills.visualCommunication', 'education.skills.3dModeling', 'education.skills.sustainability']
  }
]

export function EducationSection() {
  const [showAll, setShowAll] = useState(false)
  const { t } = useTranslation(['home', 'common'])
  
  const visibleEducation = showAll ? education : education.slice(0, 3)
  const hasMore = education.length > 2.5
  
  return (
    <section id="education" className="py-6 sm:py-12 px-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#005aeb] to-[#9EE2FF] bg-clip-text text-transparent mb-6 leading-tight">
            {t('education.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('education.subtitle')}
          </p>
        </div>
        
        {/* Timeline list with modern card design */}
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
              {visibleEducation.map((edu, index) => (
              <li 
                key={edu.degree} 
                className={`relative pl-0 sm:pl-20 group transition-all duration-700 ease-in-out ${
                  !showAll && index === 2 ? 'cursor-pointer' : ''
                }`}
                style={{
                  height: !showAll && index === 2 ? '80px' : 'auto',
                  overflow: !showAll && index === 2 ? 'hidden' : 'visible'
                }}
                onClick={!showAll && index === 2 ? () => setShowAll(true) : undefined}
              >
                {/* Dot aligned with vertical timeline - hidden on small screens */}
                <div className="hidden sm:block absolute left-2 sm:left-4 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 z-10" />

                <div className="overflow-visible">
                  <Card className={`group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 relative ${
                    !showAll && index === 2 ? 'shadow-none group-hover:shadow-none hover:shadow-[0_-8px_25px_-12px_rgba(0,0,0,0.25),8px_0_25px_-12px_rgba(0,0,0,0.25)] hover:scale-[1.01] hover:shadow-blue-500/20 overflow-hidden h-20 !flex !flex-col' : ''
                  } ${showAll && index === education.length - 1 ? 'mb-8' : ''}`}>
                    
                    <div className={!showAll && index === 2 ? 'overflow-hidden h-20' : ''}>
                      <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4 sm:gap-6">
                        {/* Education logo */}
                        {edu.institution === 'education.degrees.mba.institution' ? (
                          <img 
                            src="/icons/logos/the-power-program-logo.jpeg"
                            alt={t(edu.institution)}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0"
                          />
                        ) : edu.institution === 'education.degrees.uxDesigner.institution' ? (
                          <img 
                            src="/icons/logos/udacity-education-logo.jpeg"
                            alt={t(edu.institution)}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0"
                          />
                        ) : edu.institution === 'education.degrees.computerEngineering.institution' ? (
                          <img 
                            src="/icons/logos/university-of-barcelona-logo.jpeg"
                            alt={t(edu.institution)}
                            className="w-16 h-16 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0"
                          />
                        ) : edu.institution === 'education.degrees.architecture.institution' ? (
                          <img 
                            src="/icons/logos/upc-university-logo.jpeg"
                            alt={t(edu.institution)}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0"
                          />
                        ) : edu.institution === 'education.degrees.mountainLeader.institution' ? (
                          <img 
                            src="/icons/logos/icemp-company-logo.jpeg"
                            alt={t(edu.institution)}
                            className="w-16 h-16 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                            {t(edu.institution).charAt(0)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-[1.02] transition-all duration-300 leading-tight">
                            {t(edu.degree)}
                          </CardTitle>
                          <div className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:scale-[1.02] transition-all duration-300 mt-1">
                            {t(edu.institution)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Location and dates - now below on small screens */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 sm:ml-auto">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit">
                          <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium text-sm text-gray-900 dark:text-gray-300">{t(edu.location)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit">
                          <Calendar className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-900 dark:text-gray-300">{t(edu.period)}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                      {t(edu.description)}
                    </p>
                    
                    {/* Skill pills */}
                    {edu.skills && (
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                          >
                            {t(skill)}
                          </span>
                        ))}
                      </div>
                    )}
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ChevronDown className="h-5 w-5" />
                {t('education.showMore')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
