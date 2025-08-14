import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const experiences = [
  {
    company: 'Open Huts',
    logo: '/logos/openhuts_logo.jpeg',
    position: 'Founder & Project Lead',
    location: 'Remote',
    period: '2014 - Present',
    description: 'Find hidden places to sleep out in the wild. Help protect nature by enjoying it.',
    skills: ['React', 'Next', 'TypeScript', 'Supabase', 'UX Research', 'Figma']
  },
  {
    company: 'Moodle',
    logo: '/logos/moodle_logo.jpeg',
    position: 'Frontend & UX Engineer',
    location: 'Remote',
    period: '2021 - 2024',
    description: 'Developing MoodleNet, a network to share and curate open educational resources.',
    skills: ['React', 'Figma', 'UX Design', 'Open Source', 'Educational Technology']
  },
  {
    company: 'Oberalp Group',
    logo: '/logos/oberalp___salewa_group_logo.jpeg',
    position: 'User Experience Designer',
    location: 'Lausanne, Switzerland',
    period: '2020',
    description: 'Redesigning the production interfaces of the ski touring skins world leader, Pomoca.',
    skills: ['Behavioral Interviewing', 'Usability Testing', 'UX Design', 'Production Interfaces']
  },
  {
    company: 'Wegaw',
    logo: '/logos/wegaw_logo.jpeg',
    position: 'Solution Architect',
    location: 'Lausanne, Switzerland',
    period: '2018',
    description: 'Developing an European Space Agency project to track snow cover from satellites worldwide.',
    skills: ['JavaScript', 'Kubernetes', 'Satellite Data', 'ESA Projects', 'Snow Cover Tracking']
  },
  {
    company: 'Pix4D',
    logo: '/logos/pix4d_logo.jpeg',
    position: 'Junior Web Developer',
    location: 'Lausanne, Switzerland',
    period: '2017 - 2018',
    description: 'Developing a cloud platform to upload, process and analyze 3D models from drone images.',
    skills: ['Angular 4', 'RxJS', 'Cloud Platform', '3D Modeling', 'Drone Technology']
  }
]

export function ExperienceSection() {
  const navigate = useNavigate()
  
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 dark:from-green-400 dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent mb-6 leading-tight pb-2">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            My professional journey in software development and UX design
          </p>
        </div>
        {/* Timeline list with logo, content, and right-aligned meta */}
        <div className="relative">
          {/* Vertical line - hidden on small screens */}
          <div className="hidden sm:block absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />

          <ul className="space-y-8">
            {experiences.map((experience) => (
              <li key={experience.company} className="relative pl-4 sm:pl-20 group">
                {/* Dot aligned with vertical timeline - hidden on small screens */}
                <div className="hidden sm:block absolute left-6 sm:left-8 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 z-10" />

                <Card className="group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4 sm:gap-6">
                        {/* Company logo */}
                        <img 
                          src={experience.logo} 
                          alt={experience.company} 
                          className="w-16 h-16 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">${experience.company.charAt(0)}</div>`;
                            }
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300 leading-tight">
                            {experience.position}
                          </CardTitle>
                          <div className="text-base sm:text-lg font-medium text-gray-700 dark:text-white transition-all duration-300 mt-1">
                            {experience.company === 'OpenHuts' ? 'Open Huts' : experience.company}
                          </div>
                        </div>
                      </div>
                      
                      {/* Location and dates - now below on small screens */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 sm:ml-auto">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit">
                          <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium text-sm text-gray-900 dark:text-gray-300">{experience.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit">
                          <Calendar className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-900 dark:text-gray-300">{experience.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                      {experience.description}
                    </p>
                    
                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {experience.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action button */}
                    <div className="flex justify-end">
                      {experience.company === 'Open Huts' ? (
                        <button
                          onClick={() => {
                            navigate('/openhuts')
                            // Scroll to top instantly when navigating to project page
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>More Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'Moodle' ? (
                        <button
                          onClick={() => {
                            navigate('/moodlenet')
                            // Scroll to top instantly when navigating to project page
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>More Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'Wegaw' ? (
                        <button
                          onClick={() => {
                            navigate('/wegaw')
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>More Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'Pix4D' ? (
                        <button
                          onClick={() => {
                            navigate('/pix4d')
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>More Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : experience.company === 'Oberalp Group' ? (
                        <button
                          onClick={() => {
                            navigate('/pomoca')
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                        >
                          <span>More Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105">
                          <span>More Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
