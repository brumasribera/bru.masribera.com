import { useTranslation } from 'react-i18next'
import { Shield, Mail, Database, Trash2, Eye, ArrowLeft, FileText, Globe, Heart, AlertTriangle } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate, useLocation } from 'react-router-dom'
import { Footer } from '../layout/Footer'
import { useLanguageRouting } from '../hooks/useLanguageRouting'
import { useEffect, useState } from 'react'

export function LegalPage() {
  const { t, i18n } = useTranslation(['common'])
  const navigate = useNavigate()
  const location = useLocation()
  const { currentLanguage } = useLanguageRouting()
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy')

  // Force translation update when language changes
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n])

  // Handle URL hash changes and set active tab
  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash === 'terms' || hash === 'privacy') {
      setActiveTab(hash as 'privacy' | 'terms')
    } else {
      // Default to privacy if no hash or invalid hash
      setActiveTab('privacy')
      // Update URL to include the default hash
      if (!location.hash) {
        navigate(`${location.pathname}#privacy`, { replace: true })
      }
    }
  }, [location.hash, location.pathname, navigate])

  // Handle tab switching
  const switchTab = (tab: 'privacy' | 'terms') => {
    setActiveTab(tab)
    navigate(`${location.pathname}#${tab}`, { replace: true })
    
    // Smooth scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {activeTab === 'privacy' ? t('privacy.title') : t('terms.title')}
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {activeTab === 'privacy' ? t('privacy.commitment') : t('terms.readCarefully')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
          <button
            onClick={() => switchTab('privacy')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'privacy'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Shield className="w-5 h-5" />
            {t('footer.privacyPolicy')}
          </button>
          <button
            onClick={() => switchTab('terms')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'terms'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            {t('footer.termsOfUse')}
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Privacy Content */}
          <div className={`transition-all duration-300 ease-in-out ${activeTab === 'privacy' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'}`}>
            {activeTab === 'privacy' && (
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Database className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('privacy.dataCollection.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('privacy.dataCollection.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('privacy.purpose.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('privacy.purpose.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Eye className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('privacy.sharing.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('privacy.sharing.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Trash2 className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('privacy.retention.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('privacy.retention.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Rights */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('privacy.gdprRights.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('privacy.rights')}
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {t('privacy.contact.title')}
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  {t('privacy.contact.description')}
                </p>
              </div>
            </div>
          )}

          {/* Terms Content */}
          {activeTab === 'terms' && (
            <div className="space-y-8">
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
          )}
        </div>
      </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
