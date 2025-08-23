import { useTranslation } from 'react-i18next'
import { FileText, Shield, Mail, Globe, Heart, ArrowLeft, AlertTriangle } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../layout/Footer'
import { useLanguageRouting } from '../hooks/useLanguageRouting'
import { useEffect } from 'react'

export function TermsPage() {
  const { t, i18n } = useTranslation(['common'])
  const navigate = useNavigate()
  const { currentLanguage } = useLanguageRouting()

  // Force translation update when language changes
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToProjects')}
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('terms.title')}
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('terms.readCarefully')}
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('terms.acceptance.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('terms.acceptance.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('terms.intellectualProperty.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('terms.intellectualProperty.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('terms.contact.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('terms.contact.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Heart className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('terms.disclaimer.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('terms.disclaimer.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('terms.projectProtection.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('terms.projectProtection.description')}
                </p>
              </div>
            </div>


            {/* Legal Enforcement */}
            <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-6 bg-purple-50 dark:bg-purple-900/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    {t('terms.legalEnforcement.title')}
                  </h2>
                  <p className="text-purple-800 dark:text-purple-200 leading-relaxed font-medium">
                    {t('terms.legalEnforcement.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {t('terms.lastUpdated')}
            </p>
          </div>

                     {/* Contact Information */}
           <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
             <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
               {t('terms.questions.title')}
             </h3>
             <p className="text-blue-800 dark:text-blue-200">
               {t('terms.questions.description')}
             </p>
           </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
