import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Github, Globe, Users, Star, TrendingUp, Zap } from 'lucide-react'
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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
            <Card key={project.title} className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
              <div className="relative">
                {/* Project image */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center p-8">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`h-20 w-20 object-contain rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      project.title === 'MoodleNet Platform' 
                        ? 'bg-white p-3' 
                        : project.title === 'Open Huts Nature Network' 
                        ? 'bg-white p-2' 
                        : ''
                    }`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">${project.title.charAt(0)}</div>`;
                      }
                    }}
                  />
                </div>
                
                {/* Impact badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-3 py-1 text-sm font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {project.impact}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {/* User metrics */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{project.users}</span>
                  </div>
                  {project.github && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Star className="h-4 w-4" />
                      <span>Open Source</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Technology stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3">
                  {project.title === 'Open Huts Nature Network' ? (
                    <button
                      onClick={() => navigate('/openhuts')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                    >
                      <TrendingUp className="h-4 w-4" />
                      <span>Project Details</span>
                    </button>
                  ) : project.title === 'MoodleNet Platform' ? (
                    <button
                      onClick={() => navigate('/moodlenet')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                    >
                      <TrendingUp className="h-4 w-4" />
                      <span>Project Details</span>
                    </button>
                  ) : project.title === 'Reserve' ? (
                    <button
                      onClick={() => navigate('/reserve')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105"
                    >
                      <TrendingUp className="h-4 w-4" />
                      <span>Project Details</span>
                    </button>
                  ) : (
                    <>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                        >
                          <Github className="h-4 w-4" />
                          <span>View Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                        >
                          <Globe className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {!project.github && !project.live && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                          <Zap className="h-4 w-4" />
                          <span>Proprietary</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
       
      </div>
    </section>
  )
}
