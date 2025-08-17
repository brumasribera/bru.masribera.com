import { Mail, Linkedin, Github } from 'lucide-react';
import { AnimatedGradientTitle } from '../ui/AnimatedGradientTitle';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white py-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="mb-2">
              <AnimatedGradientTitle 
                size="md" 
                autoAnimate={true} 
                alternateText="@brumasribera"
              >
                BRU MAS RIBERA
              </AnimatedGradientTitle>
            </h3>
                         <p className="text-gray-600 dark:text-gray-400 text-sm">
               Frontend & UX Engineer | Remote-friendly
             </p>
          </div>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <a 
              href="mailto:bru@masribera.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/brumasribera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/brumasribera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          
                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                                       <div className="flex flex-col sm:grid sm:grid-cols-2 items-center justify-center gap-2 sm:gap-5">
                <p className="text-gray-500 dark:text-gray-500 text-lg font-medium text-center">
                  Made with 🥰 in Switzerland
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-base text-center">
                  © {new Date().getFullYear()} Bru Mas Ribera. All rights reserved.
                </p>
              </div>
           </div>
        </div>
      </div>
    </footer>
  )
}
