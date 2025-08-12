import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'OpenHuts Platform',
    description: 'A comprehensive platform for hikers to discover and book mountain huts across Europe. Features include real-time availability, user reviews, and integrated booking system.',
    technologies: ['React', 'Python', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/username/openhuts',
    live: 'https://openhuts.com'
  },
  {
    title: 'UX Research Dashboard',
    description: 'Interactive dashboard for analyzing user research data and generating insights. Includes data visualization, filtering, and export capabilities.',
    technologies: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    github: 'https://github.com/username/ux-dashboard',
    live: 'https://ux-dashboard.com'
  },
  {
    title: '3D Mapping Interface',
    description: 'Web-based 3D mapping interface for photogrammetry software. Features include 3D visualization, measurement tools, and export functionality.',
    technologies: ['Three.js', 'WebGL', 'React', 'TypeScript'],
    github: 'https://github.com/username/3d-mapping',
    live: 'https://3d-mapping.com'
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills in frontend development and UX design
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                  {project.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">Live</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
