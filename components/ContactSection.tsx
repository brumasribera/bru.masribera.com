import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Professional header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight pb-2">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I'm always open to meaningful collaborations and exciting opportunities. 
            Let's build something amazing together.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Call to action above buttons */}
          <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600">
            <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              Let's discuss your next project
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Whether it's collaboration, consultation, or just a conversation - I'm here to help.
            </p>
          </div>
           
          {/* Contact buttons */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              {/* Email */}
              <button 
                onClick={() => window.open('mailto:bru@masribera.com','_blank')}
                className="group bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                bru@masribera.com
              </button>
              
              {/* LinkedIn */}
              <button 
                onClick={() => window.open('https://linkedin.com/in/brumasribera','_blank')}
                className="group bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </button>
              
              {/* GitHub */}
              <button 
                onClick={() => window.open('https://github.com/brumasribera','_blank')}
                className="group bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
