import { Card, CardContent, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Users, Star, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const projects = [
  {
    title: 'Reserve',
    description: 'Mobile-first app that lets anyone protect nature by funding habitat restoration and protection one square meter at a time.',
    technologies: ['React', 'TypeScript', 'UX Design', 'Conservation Tech'],
    github: null,
    live: 'https://www.instagram.com/reservenatureapp/',
    impact: 'Fund habitat protection',
    users: 'Nature supporters',
    featured: true,
    image: '/logos/reserve-logo.png'
  },
  {
    title: 'Open Huts Nature Network',
    description: 'Founder and lead developer of a comprehensive platform for discovering and booking mountain huts across Europe. Features real-time availability, user reviews, and integrated booking.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Supabase', 'UX Research', 'Figma'],
    github: null,
    live: null,
    impact: 'Mindful outdoors platform',
    users: 'Research phase',
    featured: true,
    image: '/logos/openhuts_logo.jpeg'
  },
  {
    title: 'MoodleNet Platform',
    description: 'Led frontend development for MoodleNet, an open-source platform for sharing and curating educational resources. Built with React, Storybook, and modern web technologies.',
    technologies: ['React', 'TypeScript', 'Storybook', 'UX Design', 'Open Source'],
    github: 'https://github.com/moodle/moodlenet',
    live: 'https://moodle.net',
    impact: 'Global educational platform',
    users: '100K+ educators',
    featured: true,
    image: '/logos/moodlenet_logo.png'
  },
  {
    title: 'Pomoca Production Interface',
    description: 'Redesigned production interfaces for the world leader in ski touring skins. Conducted user research, usability testing, and implemented modern UX patterns.',
    technologies: ['UX Design', 'User Research', 'Usability Testing', 'Figma', 'Prototyping'],
    github: null,
    live: null,
    impact: 'Manufacturing efficiency',
    users: 'Production teams',
    featured: false,
    image: '/logos/oberalp___salewa_group_logo.jpeg'
  },
  {
    title: 'DeFROST Snow Monitoring',
    description: 'Developed an ESA-funded project for tracking snow cover from satellites worldwide. Built cloud infrastructure and data processing pipelines.',
    technologies: ['Python', 'Django', 'Docker', 'Kubernetes', 'Satellite Data', 'GCP'],
    github: 'https://github.com/wegaw/defrost',
    live: 'https://defrost.io',
    impact: 'Climate research platform',
    users: 'Scientists & researchers',
    featured: false,
    image: '/logos/wegaw_logo.jpeg'
  },
  {
    title: 'Pix4D Cloud Platform',
    description: 'Developed cloud platform for processing and analyzing 3D models from drone images. Built scalable architecture for photogrammetry workflows.',
    technologies: ['Angular', 'RxJS', 'Cloud Platform', '3D Modeling', 'Drone Technology'],
    github: null,
    live: 'https://pix4d.com',
    impact: 'Professional photogrammetry',
    users: 'Surveyors & engineers',
    featured: false,
    image: '/logos/pix4d_logo.jpeg'
  }
]

export function ProjectsSection() {
  const navigate = useNavigate()
  
  return (
    <section id="projects" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced header with gradient title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent mb-6 leading-tight pb-2">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my work across frontend development, UX design, and product innovation. 
            From open-source platforms to nature conservation tech.
          </p>
        </div>
        
        {/* All projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden flex flex-col">
              {/* Card content with flex-grow to push action elements to bottom */}
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="flex-1">
                  {/* Project logo */}
                  <div className="flex justify-center mb-4">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-16 h-16 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300">${project.title.charAt(0)}</div>`;
                        }
                      }}
                    />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {project.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Metrics */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{project.users}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span>{project.github ? 'Open Source' : 'Enterprise Solution'}</span>
                    </div>
                  </div>
                </div>

                {/* Technology pills - positioned at bottom */}
                <div className="mt-auto">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons - always at bottom */}
                  <div className="flex justify-center gap-3">
                    {project.title === 'Pix4D Cloud Platform' ? (
                      <button
                        onClick={() => {
                          navigate('/pix4d')
                          // Scroll to top instantly when navigating to project page
                          window.scrollTo(0, 0)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                      >
                        <span>More Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : project.title === 'Open Huts Nature Network' ? (
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
                    ) : project.title === 'MoodleNet Platform' ? (
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
                    ) : project.title === 'Reserve' ? (
                      <button
                        onClick={() => {
                          navigate('/reserve')
                          // Scroll to top instantly when navigating to project page
                          window.scrollTo(0, 0)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                      >
                        <span>More Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : project.title === 'DeFROST Snow Monitoring' ? (
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
                    ) : project.title === 'Pomoca Production Interface' ? (
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
       
      </div>
    </section>
  )
}
