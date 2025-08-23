import { useTranslation } from 'react-i18next'
import { Shield, Mail, Database, Trash2, Eye } from 'lucide-react'

export function PrivacyInfo() {
  const { t } = useTranslation(['common'])

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('privacy.title')}
        </h3>
      </div>

      <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-start gap-3">
          <Database className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('privacy.dataCollection.title')}
            </h4>
            <p>{t('privacy.dataCollection.description')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('privacy.purpose.title')}
            </h4>
            <p>{t('privacy.purpose.description')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('privacy.sharing.title')}
            </h4>
            <p>{t('privacy.sharing.description')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {t('privacy.retention.title')}
            </h4>
            <p>{t('privacy.retention.description')}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t('privacy.rights')}
        </p>
      </div>
    </div>
  )
}
