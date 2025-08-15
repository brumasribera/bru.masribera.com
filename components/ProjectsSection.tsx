import { Card, CardContent, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Users, Star, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const projects = [
  {
    title: 'Reserve',
    description: 'Mobile-first app that lets anyone protect nature by funding habitat restoration and protection one square meter at a time with transparent impact tracking.',
    technologies: ['React Native', 'TypeScript', 'Stripe', 'MongoDB', 'Node.js'],
    github: null,
    live: 'https://reserve.org',
    impact: 'Nature protection',
    users: 'Nature enthusiasts',
    featured: true,
    image: '/logos/reserve-logo.png'
  },
  {
    title: 'Open Huts',
    description: 'Platform connecting hikers with mountain refuges worldwide, promoting sustainable tourism and outdoor exploration across global mountain regions.',
    technologies: ['React', 'TypeScript', 'Mapbox', 'Node.js', 'PostgreSQL'],
    github: null,
    live: 'https://openhuts.org',
    impact: 'Sustainable tourism',
    users: 'Hikers & outdoor enthusiasts',
    featured: true,
    image: '/logos/openhuts_logo.jpeg'
  },
  {
    title: 'Clathes',
    description: 'Protecting endangered species through sustainable fashion, creating global impact with every purchase and strategic conservation initiative worldwide.',
    technologies: ['Conservation Tech', 'Strategic Planning', 'Sustainable Fashion', 'Wildlife Protection'],
    github: null,
    live: 'https://www.instagram.com/clathesofficial/',
    impact: 'Endangered species protection',
    users: 'Conservation community',
    featured: true,
    image: '/clathes/Vaquita - profile logo.png'
  },
  {
    title: 'MoodleNet Platform',
    description: 'Decentralized learning platform enabling educators to share and discover open educational resources worldwide, promoting collaborative learning.',
    technologies: ['React', 'TypeScript', 'ActivityPub', 'Node.js', 'PostgreSQL'],
    github: null,
    live: 'https://moodle.net',
    impact: 'Open education',
    users: 'Educators & learners',
    featured: true,
    image: '/logos/moodlenet_logo.png'
  },
  {
    title: 'Pomoca Production Interface',
    description: 'Manufacturing control system for ski equipment production, optimizing workflow and quality assurance with modern digital interfaces.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'IoT'],
    github: null,
    live: null,
    impact: 'Manufacturing efficiency',
    users: 'Production staff',
    featured: true,
    image: '/logos/oberalp___salewa_group_logo.jpeg'
  },
  {
    title: 'DeFROST Snow Monitoring',
    description: 'Advanced snow monitoring and avalanche prediction system using satellite data and AI, providing real-time environmental intelligence for safety.',
    technologies: ['Python', 'AI/ML', 'Satellite Data', 'React', 'Node.js'],
    github: null,
    live: 'https://wegaw.com',
    impact: 'Safety & research',
    users: 'Ski resorts & researchers',
    featured: true,
    image: '/logos/wegaw_logo.jpeg'
  }
]

export function ProjectsSection() {
  const navigate = useNavigate()
  
  return (
    <section id="projects" className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced header with gradient title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent mb-6 leading-tight pb-2">
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
                    {project.title === 'Clathes' ? (
                      <button
                        onClick={() => navigate('/clathes')}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">More Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.title === 'Open Huts' ? (
                      <button
                        onClick={() => navigate('/openhuts')}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">More Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.title === 'MoodleNet Platform' ? (
                      <button
                        onClick={() => navigate('/moodlenet')}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">More Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.title === 'Reserve' ? (
                      <button
                        onClick={() => navigate('/reserve')}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">More Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.title === 'DeFROST Snow Monitoring' ? (
                      <button
                        onClick={() => navigate('/wegaw')}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">More Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : project.title === 'Pomoca Production Interface' ? (
                      <button
                        onClick={() => navigate('/pomoca')}
                        className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">More Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      </button>
                    ) : (
                      <button className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">
                        {/* Shiny overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        
                        <span className="relative z-10">More Details</span>
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
