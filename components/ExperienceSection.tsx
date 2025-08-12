import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { MapPin, Calendar, Building2 } from 'lucide-react'

const experiences = [
  {
    company: 'Moodle',
    position: 'Frontend Developer',
    location: 'Barcelona, Spain',
    period: '2023 - Present',
    description: 'Developing modern web applications using React, TypeScript, and modern frontend technologies.',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB']
  },
  {
    company: 'OpenHuts',
    position: 'Full Stack Developer',
    location: 'Remote',
    period: '2022 - 2023',
    description: 'Built a platform for hikers to discover and book mountain huts across Europe.',
    skills: ['React', 'Python', 'PostgreSQL', 'Docker']
  },
  {
    company: 'Wecaw',
    position: 'UX Engineer',
    location: 'Barcelona, Spain',
    period: '2021 - 2022',
    description: 'Designed and developed user interfaces for web and mobile applications.',
    skills: ['Figma', 'React', 'UX Design', 'Prototyping']
  },
  {
    company: 'Pix4D',
    position: 'Frontend Developer',
    location: 'Lausanne, Switzerland',
    period: '2020 - 2021',
    description: 'Developed 3D mapping and photogrammetry software interfaces.',
    skills: ['Three.js', 'WebGL', 'React', 'TypeScript']
  }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey in software development and UX design
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((experience) => (
            <Card key={experience.company} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">
                        {experience.position}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Building2 className="h-4 w-4" />
                        <span>{experience.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{experience.period}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
