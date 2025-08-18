import { Mail, Linkedin, Github, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedGradientTitle } from '../ui/AnimatedGradientTitle';
import { useFirstHoverTooltip } from '../hooks/useFirstHoverTooltip';

export function Footer() {
  const { t } = useTranslation(['common', 'translation']);
  const { shouldShowTooltip: shouldShowEmailTooltip, handleMouseEnter: handleEmailMouseEnter, handleMouseLeave: handleEmailMouseLeave } = useFirstHoverTooltip();
  const { shouldShowTooltip: shouldShowLinkedInTooltip, handleMouseEnter: handleLinkedInMouseEnter, handleMouseLeave: handleLinkedInMouseLeave } = useFirstHoverTooltip();
  const { shouldShowTooltip: shouldShowGithubTooltip, handleMouseEnter: handleGithubMouseEnter, handleMouseLeave: handleGithubMouseLeave } = useFirstHoverTooltip();
  const { shouldShowTooltip: shouldShowCvTooltip, handleMouseEnter: handleCvMouseEnter, handleMouseLeave: handleCvMouseLeave } = useFirstHoverTooltip();

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
              {t('footer.tagline')}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="relative">
              <a 
                href="mailto:bru@masribera.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Email"
                onMouseEnter={handleEmailMouseEnter}
                onMouseLeave={handleEmailMouseLeave}
              >
                <Mail className="h-5 w-5" />
              </a>
              {shouldShowEmailTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50">
                  {t('footer.tooltips.email')}
                </div>
              )}
            </div>

            <div className="relative">
              <a 
                href="https://linkedin.com/in/brumasribera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-500 hover:fill-current hover:scale-110"
                aria-label="LinkedIn"
                onMouseEnter={handleLinkedInMouseEnter}
                onMouseLeave={handleLinkedInMouseLeave}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              {shouldShowLinkedInTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50">
                  {t('footer.tooltips.linkedin')}
                </div>
              )}
            </div>

            <div className="relative">
              <a 
                href="https://github.com/brumasribera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-500 hover:fill-current hover:scale-110"
                aria-label="GitHub"
                onMouseEnter={handleGithubMouseEnter}
                onMouseLeave={handleGithubMouseLeave}
              >
                <Github className="h-5 w-5" />
              </a>
              {shouldShowGithubTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50">
                  {t('footer.tooltips.github')}
                </div>
              )}
            </div>

            <div className="relative">
              <a 
                href="/cv"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="CV"
                onMouseEnter={handleCvMouseEnter}
                onMouseLeave={handleCvMouseLeave}
              >
                <FileText className="h-5 w-5" />
              </a>
              {shouldShowCvTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50">
                  {t('footer.tooltips.cv')}
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-col sm:grid sm:grid-cols-2 items-center justify-center gap-2 sm:gap-5">
              <p className="text-gray-500 dark:text-gray-500 text-lg font-medium text-center">
                {t('footer.madeWith')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base text-center">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
