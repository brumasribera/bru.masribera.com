import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Bell,
  Mail,
  Smartphone,
  Settings,
  CheckCircle,
  AlertTriangle,
  Info,
  Volume2,
  VolumeX,
  Clock,
  MapPin,
  Leaf,
  DollarSign,
  Shield,
  Users,
  Globe
} from "lucide-react";

interface NotificationsPageProps {
  onBack: () => void;
}

interface NotificationCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  push: boolean;
  email: boolean;
  inApp: boolean;
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const { t } = useTranslation('reserve');
  
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [inAppNotificationsEnabled, setInAppNotificationsEnabled] = useState(true);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00');
  const [showQuietHoursSettings, setShowQuietHoursSettings] = useState(false);

  const [notificationCategories] = useState<NotificationCategory[]>([
    {
      id: 'project-updates',
      name: 'Project Updates',
      description: 'Get notified about project progress and milestones',
      icon: Leaf,
      push: true,
      email: true,
      inApp: true
    },
    {
      id: 'contributions',
      name: 'Contributions',
      description: 'Notifications about your contributions and impact',
      icon: DollarSign,
      push: true,
      email: false,
      inApp: true
    },
    {
      id: 'security',
      name: 'Security Alerts',
      description: 'Important security notifications and login alerts',
      icon: Shield,
      push: true,
      email: true,
      inApp: true
    },
    {
      id: 'community',
      name: 'Community',
      description: 'Updates from the Reserve community and events',
      icon: Users,
      push: false,
      email: true,
      inApp: false
    },
    {
      id: 'global-impact',
      name: 'Global Impact',
      description: 'News about global conservation efforts and achievements',
      icon: Globe,
      push: false,
      email: true,
      inApp: false
    },
    {
      id: 'location-based',
      name: 'Location-Based',
      description: 'Notifications about projects near your location',
      icon: MapPin,
      push: true,
      email: false,
      inApp: true
    }
  ]);

  const toggleCategoryNotification = (categoryId: string, type: 'push' | 'email' | 'inApp') => {
    const updatedCategories = notificationCategories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, [type]: !cat[type] }
        : cat
    );
    // In real app, this would update state and call API
    console.log('Updated category:', categoryId, type);
  };

  const toggleGlobalNotification = (type: 'push' | 'email' | 'inApp') => {
    switch (type) {
      case 'push':
        setPushNotificationsEnabled(!pushNotificationsEnabled);
        break;
      case 'email':
        setEmailNotificationsEnabled(!emailNotificationsEnabled);
        break;
      case 'inApp':
        setInAppNotificationsEnabled(!inAppNotificationsEnabled);
        break;
    }
  };

  const getNotificationIcon = (type: 'push' | 'email' | 'inApp') => {
    switch (type) {
      case 'push':
        return <Smartphone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'inApp':
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationLabel = (type: 'push' | 'email' | 'inApp') => {
    switch (type) {
      case 'push':
        return 'Push';
      case 'email':
        return 'Email';
      case 'inApp':
        return 'In-App';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto" style={{ maxHeight: '700px', maxWidth: '380px' }}>
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="notifications-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="8" height="8" fill="white" opacity="0.3"/>
              <rect x="20" y="20" width="8" height="8" fill="white" opacity="0.2"/>
              <circle cx="30" cy="10" r="2" fill="white" opacity="0.4"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#notifications-pattern)" />
          </svg>
        </div>
        
        {/* Navigation */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 z-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        {/* Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <Bell className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Notifications</h1>
          <p className="text-blue-100 text-sm text-center">Stay informed about what matters to you</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Global Notification Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Global Settings
          </h3>
          
          <div className="space-y-4">
            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications on your device</p>
                </div>
              </div>
              <button
                onClick={() => toggleGlobalNotification('push')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pushNotificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pushNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
              </div>
              <button
                onClick={() => toggleGlobalNotification('email')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* In-App Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">In-App Notifications</p>
                  <p className="text-xs text-gray-500">See notifications within the app</p>
                </div>
              </div>
              <button
                onClick={() => toggleGlobalNotification('inApp')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  inAppNotificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  inAppNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Quiet Hours
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Enable Quiet Hours</p>
                <p className="text-xs text-gray-500">Pause notifications during specific hours</p>
              </div>
              <button
                onClick={() => setQuietHoursEnabled(!quietHoursEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  quietHoursEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  quietHoursEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {quietHoursEnabled && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={quietHoursStart}
                      onChange={(e) => setQuietHoursStart(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={quietHoursEnd}
                      onChange={(e) => setQuietHoursEnd(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-blue-700">
                    Notifications will be paused from {quietHoursStart} to {quietHoursEnd}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notification Categories */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Categories</h3>
          
          <div className="space-y-4">
            {notificationCategories.map((category) => {
              const IconComponent = category.icon;
              
              return (
                <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {(['push', 'email', 'inApp'] as const).map((type) => (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(type)}
                          <span className="text-xs text-gray-600">{getNotificationLabel(type)}</span>
                        </div>
                        <button
                          onClick={() => toggleCategoryNotification(category.id, type)}
                          disabled={!notificationCategories.find(c => c.id === category.id)?.[type]}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            category[type] ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            category[type] ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Sound Effects</p>
                <p className="text-xs text-gray-500">Play sounds for notifications</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Vibration</p>
                <p className="text-xs text-gray-500">Vibrate device for notifications</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Badge Count</p>
                <p className="text-xs text-gray-500">Show notification count on app icon</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Tips */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Notification Tips
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Enable push notifications to stay updated in real-time</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Use quiet hours to avoid notifications during sleep</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Customize categories to focus on what matters most</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Security alerts are always delivered for your safety</p>
            </div>
          </div>
        </div>

        {/* Test Notifications */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Notifications</h3>
          
          <div className="space-y-3">
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Send Test Push Notification
            </button>
            
            <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Send Test Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
