import { useTranslation } from 'react-i18next'
import { FileText, Shield, Mail, Globe, Heart } from 'lucide-react'

export function TermsOfUse() {
  const { t } = useTranslation(['common'])

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('terms.title')}
        </h3>
      </div>

      <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('terms.acceptance.title')}
            </h4>
            <p>{t('terms.acceptance.description')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('terms.intellectualProperty.title')}
            </h4>
            <p>{t('terms.intellectualProperty.description')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('terms.contact.title')}
            </h4>
            <p>{t('terms.contact.description')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('terms.disclaimer.title')}
            </h4>
            <p>{t('terms.disclaimer.description')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('terms.projectProtection.title')}
            </h4>
            <p className="text-red-600 dark:text-red-400 font-medium">
              {t('terms.projectProtection.description')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('terms.openHutsProtection.title')}
            </h4>
            <p className="text-red-600 dark:text-red-400 font-medium">
              {t('terms.openHutsProtection.description')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('terms.legalEnforcement.title')}
            </h4>
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              {t('terms.legalEnforcement.description')}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t('terms.lastUpdated')}
        </p>
      </div>
    </div>
  )
}
