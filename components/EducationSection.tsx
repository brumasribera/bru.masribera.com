import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Calendar, GraduationCap, MapPin } from 'lucide-react'

const education = [
  {
    degree: 'Engineer\'s Degree, Computer Engineering',
    institution: 'Universitat de Barcelona',
    period: '2011 - 2016',
    location: 'Barcelona, Catalonia',
    description: 'Bachelor\'s degree in Computer Engineering with focus on web development and software architecture.',
    skills: ['Web Development', 'Software Architecture', 'Problem Solving', 'Technical Foundation', 'System Design']
  },
  {
    degree: 'UX Designer Nanodegree',
    institution: 'Udacity',
    period: '2020 - 2020',
    location: 'Remote',
    description: 'Specialized course in UX design principles, user research, prototyping, and user testing methodologies.',
    skills: ['UX Design', 'User Research', 'Prototyping', 'User Testing', 'Design Thinking', 'Figma', 'User-Centered Design']
  },
  {
    degree: 'UIMLA Mountain Leader, Alpine Hiking Guide',
    institution: 'ICEMP',
    period: '2019 - 2021',
    location: 'Pyrenees',
    description: 'Professional certification for mountain leadership and alpine hiking guidance.',
    skills: ['Leadership', 'Environmental Awareness', 'Risk Assessment', 'Team Management', 'Sustainability', 'Outdoor Planning']
  },
  {
    degree: 'ThePowerMBA, MBA',
    institution: 'ThePowerMBA',
    period: '2020 - 2021',
    location: 'Remote',
    description: 'Master of Business Administration focusing on modern business strategies and digital transformation.',
    skills: ['Business Strategy', 'Digital Transformation', 'Product Management', 'Market Analysis', 'Strategic Thinking', 'Innovation']
  },
  {
    degree: 'Architecture',
    institution: 'Universitat Politècnica de Catalunya',
    period: '2009 - 2011',
    location: 'Barcelona, Catalonia',
    description: 'Studies in Architecture providing foundation in design thinking and spatial problem solving.',
    skills: ['Design Thinking', 'Spatial Problem Solving', 'Creative Design', 'Visual Communication', '3D Modeling', 'Sustainability']
  }
]

export function EducationSection() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#005aeb] to-[#9EE2FF] bg-clip-text text-transparent mb-6 leading-tight">
            Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            My academic journey and continuous learning path
          </p>
        </div>
        
        {/* Timeline list with modern card design */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />

          <ul className="space-y-8">
            {education.map((edu, idx) => (
              <li key={edu.degree} className="relative pl-16 sm:pl-20">
                {/* Dot aligned with vertical timeline */}
                <div className="absolute left-6 sm:left-8 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-lg transition-all duration-700 ease-in-out group-hover:scale-150 group-hover:shadow-2xl group-hover:shadow-blue-500/50 z-10" />

                <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-6">
                        {/* Education logo */}
                        {edu.institution === 'ThePowerMBA' ? (
                          <img 
                            src="/logos/the_power_logo.jpeg"
                            alt={edu.institution}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                          />
                        ) : edu.institution === 'Udacity' ? (
                          <img 
                            src="/logos/udacity_logo.jpeg"
                            alt={edu.institution}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                          />
                        ) : edu.institution === 'Universitat de Barcelona' ? (
                          <img 
                            src="/logos/university_of_barcelona_logo.jpeg"
                            alt={edu.institution}
                            className="w-16 h-16 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                          />
                        ) : edu.institution === 'Universitat Politècnica de Catalunya' ? (
                          <img 
                            src="/logos/upc_logo.jpeg"
                            alt={edu.institution}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                          />
                        ) : edu.institution === 'ICEMP' ? (
                          <img 
                            src="/logos/icemp_logo.jpeg"
                            alt={edu.institution}
                            className="w-16 h-16 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            {edu.institution.charAt(0)}
                          </div>
                        )}
                        <div className="space-y-1">
                          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-[1.02] transition-all duration-300">
                            {edu.degree}
                          </CardTitle>
                          <div className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:scale-[1.02] transition-all duration-300">{edu.institution}</div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600 dark:text-gray-400 shrink-0 space-y-2 ml-auto">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full w-fit ml-auto">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-sm">{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full w-fit ml-auto">
                          <Calendar className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-sm">{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                      {edu.description}
                    </p>
                    
                    {/* Skill pills */}
                    {edu.skills && (
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
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
