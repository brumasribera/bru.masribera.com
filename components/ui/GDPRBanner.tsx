import { useState, useEffect } from 'react'
import { Button } from './button'
import { useTranslation } from 'react-i18next'
import { Shield } from 'lucide-react'
import { useLanguageRouting } from '../hooks/useLanguageRouting'

interface GDPRBannerProps {
  onAccept: () => void
  isVisible: boolean
}

export function GDPRBanner({ onAccept, isVisible }: GDPRBannerProps) {
  const { t } = useTranslation(['common'])
  const { getLocalizedPath } = useLanguageRouting()

  if (!isVisible) return null

  return (
    <>
      {/* Overlay that blurs the entire page */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* GDPR Banner */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-6 mb-6">
        <div className="mx-auto max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('gdpr.description').replace('Terms and Privacy Policy', '').trim()}{' '}
                <a 
                  href={getLocalizedPath('/terms')} 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('footer.termsOfUse')}
                </a>
                {' '}and{' '}
                <a 
                  href={getLocalizedPath('/privacy')} 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('footer.privacyPolicy')}
                </a>
                .
              </p>
            </div>
            
            <Button
              onClick={onAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-medium whitespace-nowrap"
            >
              {t('gdpr.accept')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

// Utility to detect private browsing mode
function isPrivateMode(): boolean {
  try {
    // Try to use localStorage - in private mode this might fail or behave differently
    const testKey = '__privacy_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return false
  } catch {
    return true
  }
}

// Current terms version - increment this when terms are updated
const CURRENT_TERMS_VERSION = '2024.12.1'

// Hook for managing GDPR consent
export function useGDPRConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

  useEffect(() => {
    const privateMode = isPrivateMode()
    setIsPrivate(privateMode)

    if (privateMode) {
      // In private mode, check sessionStorage for this session only
      const sessionConsent = sessionStorage.getItem('gdpr-consent-session')
      const consentGiven = sessionConsent === 'true'
      setHasConsent(consentGiven)
      setShowBanner(!consentGiven)
    } else {
      // In normal mode, check localStorage and terms version
      const savedConsent = localStorage.getItem('gdpr-consent')
      const savedTermsVersion = localStorage.getItem('gdpr-terms-version')
      
      const consentGiven = savedConsent === 'true' && savedTermsVersion === CURRENT_TERMS_VERSION
      
      setHasConsent(consentGiven)
      setShowBanner(!consentGiven)
    }
  }, [])

  const acceptConsent = () => {
    const now = new Date().toISOString()
    
    if (isPrivate) {
      // In private mode, only store in sessionStorage
      sessionStorage.setItem('gdpr-consent-session', 'true')
      sessionStorage.setItem('gdpr-consent-session-date', now)
    } else {
      // In normal mode, store in localStorage with terms version
      localStorage.setItem('gdpr-consent', 'true')
      localStorage.setItem('gdpr-consent-date', now)
      localStorage.setItem('gdpr-terms-version', CURRENT_TERMS_VERSION)
    }
    
    setHasConsent(true)
    setShowBanner(false)
  }

  const revokeConsent = () => {
    if (isPrivate) {
      sessionStorage.removeItem('gdpr-consent-session')
      sessionStorage.removeItem('gdpr-consent-session-date')
    } else {
      localStorage.removeItem('gdpr-consent')
      localStorage.removeItem('gdpr-consent-date')
      localStorage.removeItem('gdpr-terms-version')
    }
    
    setHasConsent(false)
    setShowBanner(true)
  }

  return {
    hasConsent,
    showBanner,
    acceptConsent,
    revokeConsent,
    isPrivateMode: isPrivate
  }
}
