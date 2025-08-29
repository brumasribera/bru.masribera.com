import { useState } from "react";
import { 
  ArrowLeft, 
  Shield, 
  Key, 
 
  Bell,
  Eye,

  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface AccountSettingsProps {
  onBack: () => void;
  user?: {
    email: string;
    verified: boolean;
  };
}

export function AccountSettings({ onBack, user }: AccountSettingsProps) {
  const { t } = useTranslation('reserve');
  

  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    security: true
  });

  const defaultUser = {
    email: "sonia.rodriguez@email.com",
    verified: true
  };
  
  const currentUser = user || defaultUser;

  const securityItems = [
    {
      id: "password",
      title: t('accountSettings.changePassword'),
      description: t('accountSettings.changePasswordDesc'),
      icon: Key,
      action: () => {},
      showChevron: true
    },
    {
      id: "twoFactor",
      title: t('accountSettings.twoFactorAuth'),
      description: t('accountSettings.twoFactorAuthDesc'),
      icon: Shield,
      action: () => {},
      showChevron: true,
      status: "enabled"
    },
    {
      id: "sessions",
      title: t('accountSettings.activeSessions'),
      description: t('accountSettings.activeSessionsDesc'),
      icon: Clock,
      action: () => {},
      showChevron: true
    }
  ];

  const privacyItems = [
    {
      id: "emailVisibility",
      title: t('accountSettings.emailVisibility'),
      description: t('accountSettings.emailVisibilityDesc'),
      toggle: true,
      value: false
    },
    {
      id: "activityTracking",
      title: t('accountSettings.activityTracking'),
      description: t('accountSettings.activityTrackingDesc'),
      toggle: true,
      value: true
    },
    {
      id: "dataSharing",
      title: t('accountSettings.dataSharing'),
      description: t('accountSettings.dataSharingDesc'),
      toggle: true,
      value: false
    }
  ];

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative h-24 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700" />
        
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-200/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white pointer-events-auto">
            <h1 className="text-base font-bold">{t('accountSettings.title')}</h1>
            <p className="text-purple-100 text-xs">{t('accountSettings.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 py-1 space-y-1.5 flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        
        {/* Account Verification Status */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-green-100">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-green-600" />
            {t('accountSettings.accountStatus')}
          </h3>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">{t('accountSettings.emailAddress')}</span>
              <span className="font-medium text-gray-900">{currentUser.email}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">{t('accountSettings.verification')}</span>
              <div className="flex items-center gap-1">
                {currentUser.verified ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="font-medium text-green-700">{t('accountSettings.verified')}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    <span className="font-medium text-orange-700">{t('accountSettings.unverified')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-green-100">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-purple-600" />
            {t('accountSettings.security')}
          </h3>
          
          <div className="space-y-1">
            {securityItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center gap-1.5 p-1.5 hover:bg-gray-50 rounded text-left transition-colors"
                >
                  <IconComponent className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  {item.status === "enabled" && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-green-100">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-blue-600" />
            {t('accountSettings.notifications')}
          </h3>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs font-medium text-gray-900">{t('accountSettings.emailNotifications')}</div>
                <div className="text-xs text-gray-500">{t('accountSettings.emailNotificationsDesc')}</div>
              </div>
              <button
                onClick={() => handleNotificationToggle('email')}
                className={`w-8 h-4 rounded-full transition-colors relative ${
                  notifications.email ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications.email ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs font-medium text-gray-900">{t('accountSettings.marketingEmails')}</div>
                <div className="text-xs text-gray-500">{t('accountSettings.marketingEmailsDesc')}</div>
              </div>
              <button
                onClick={() => handleNotificationToggle('marketing')}
                className={`w-8 h-4 rounded-full transition-colors relative ${
                  notifications.marketing ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications.marketing ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs font-medium text-gray-900">{t('accountSettings.securityAlerts')}</div>
                <div className="text-xs text-gray-500">{t('accountSettings.securityAlertsDesc')}</div>
              </div>
              <button
                onClick={() => handleNotificationToggle('security')}
                className={`w-8 h-4 rounded-full transition-colors relative ${
                  notifications.security ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications.security ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-green-100">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            {t('accountSettings.privacy')}
          </h3>
          
          <div className="space-y-1.5">
            {privacyItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <div className="text-xs font-medium text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
                <button
                  className={`w-8 h-4 rounded-full transition-colors relative ${
                    item.value ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${
                    item.value ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-red-200">
          <h3 className="text-xs font-semibold text-red-900 mb-1.5 flex items-center gap-1.5">
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            {t('accountSettings.dangerZone')}
          </h3>
          
          <button
            onClick={() => setShowDeactivateDialog(true)}
            className="w-full p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded text-xs font-medium transition-colors border border-red-200"
          >
            {t('accountSettings.deactivateAccount')}
          </button>
        </div>
      </div>
      
      {/* Deactivate Account Dialog */}
      {showDeactivateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('accountSettings.confirmDeactivation')}
              </h3>
              
              <p className="text-sm text-gray-600 mb-6">
                {t('accountSettings.deactivationWarning')}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeactivateDialog(false)}
                  className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  {t('accountSettings.cancel')}
                </button>
                <button
                  onClick={() => {
                    // Handle deactivation logic here
                    setShowDeactivateDialog(false);
                  }}
                  className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  {t('accountSettings.deactivate')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal bottom spacing */}
      <div className="h-2" />
    </div>
  );
}
