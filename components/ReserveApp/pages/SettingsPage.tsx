import { useState } from "react";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  CheckCircle,
  Shield,
  Globe,
  CreditCard,
  Lock,
  Eye,
  Database,
  Bell,
  Monitor,
  ChevronRight
} from "lucide-react";
import { ImageModal } from "../components/ImageModal";
import { useTranslation } from "react-i18next";

interface SettingsPageProps {
  onBack: () => void;
  onNavigateToProfileSettings: () => void;
  onNavigateToPaymentSettings: () => void;
  onNavigateToAccountSettings: () => void;
  onNavigateToLinkedAccounts: () => void;
  user?: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    memberSince: string;
    verified: boolean;
  };
}

export function SettingsPage({ 
  onBack, 
  onNavigateToProfileSettings,
  onNavigateToPaymentSettings,
  onNavigateToAccountSettings,
  onNavigateToLinkedAccounts,
  user
}: SettingsPageProps) {
  const { t } = useTranslation('reserve');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Default user data if none provided
  const defaultUser = {
    name: "Sonia Rodriguez",
    email: "sonia.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    location: "Denver, CO",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
    memberSince: "June 2023",
    verified: true
  };
  
  const currentUser = user || defaultUser;

  const settingsSections = [
    {
      title: t('settings.profile'),
      items: [
        {
          id: "profile",
          title: t('settings.personalInfo'),
          description: t('settings.personalInfoDesc'),
          icon: User,
          action: onNavigateToProfileSettings,
          color: "bg-blue-500"
        },
        {
          id: "account",
          title: t('settings.accountSettings'),
          description: t('settings.accountSettingsDesc'),
          icon: Shield,
          action: onNavigateToAccountSettings,
          color: "bg-purple-500"
        },
        {
          id: "linked",
          title: t('settings.connectedAccounts'),
          description: t('settings.connectedAccountsDesc'),
          icon: Lock,
          action: onNavigateToLinkedAccounts,
          color: "bg-cyan-500"
        }
      ]
    },
    {
      title: t('settings.financial'),
      items: [
        {
          id: "payment",
          title: t('settings.paymentMethods'),
          description: t('settings.paymentMethodsDesc'),
          icon: CreditCard,
          action: onNavigateToPaymentSettings,
          color: "bg-green-500"
        }
      ]
    },
    {
      title: t('settings.privacy'),
      items: [
        {
          id: "data",
          title: "Data & Privacy",
          description: "Manage your data preferences and privacy settings",
          icon: Eye,
          action: () => {}, // TODO: Implement data privacy settings
          color: "bg-indigo-500"
        },
        {
          id: "security",
          title: "Security Settings",
          description: "Two-factor authentication and security preferences",
          icon: Database,
          action: () => {}, // TODO: Implement security settings
          color: "bg-red-500"
        }
      ]
    },
    {
      title: t('settings.preferences'),
      items: [
        {
          id: "notifications",
          title: t('settings.notifications'),
          description: t('settings.notificationsDesc'),
          icon: Bell,
          action: () => {}, // TODO: Implement notifications settings
          color: "bg-yellow-500"
        },
        {
          id: "language",
          title: t('settings.language'),
          description: t('settings.languageDesc'),
          icon: Globe,
          action: () => {}, // TODO: Implement language settings
          color: "bg-pink-500"
        },
        {
          id: "interface",
          title: t('settings.interface'),
          description: t('settings.interfaceDesc'),
          icon: Monitor,
          action: () => {}, // TODO: Implement interface settings
          color: "bg-orange-500"
        }
      ]
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto relative">
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700" />
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="settings-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" opacity="0.3"/>
              <path d="M15 20 Q20 15 25 20 Q20 25 15 20 Z" fill="white" opacity="0.2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#settings-pattern)" />
          </svg>
        </div>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[40]"
        >
          <ArrowLeft className="h-5 w-5 md:w-6 md:h-6" />
        </button>
        
        {/* Profile Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
          {/* Avatar */}
          <div className="relative mb-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setIsImageModalOpen(true)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
              }}
            />
            {currentUser.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <Shield className="w-3 h-3" />
              </div>
            )}
          </div>
          
          {/* User Info */}
          <h1 className="text-2xl font-bold mb-1">{currentUser.name}</h1>
          <p className="text-green-100 text-sm mb-1">{currentUser.email}</p>
          <button
            onClick={onNavigateToProfileSettings}
            className="flex items-center gap-1 text-green-200 text-xs hover:text-white transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            {t('settings.editProfile')}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-3xl shadow-sm border border-green-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">{t('settings.needHelp')}</h3>
          <p className="text-emerald-100 text-sm mb-4">
            {t('settings.supportMessage')}
          </p>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-2xl transition-colors backdrop-blur-sm border border-white/20 text-sm">
              {t('settings.contactSupport')}
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-2xl transition-colors backdrop-blur-sm border border-white/20 text-sm">
              {t('settings.faqHelp')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom spacing */}
      <div className="h-8" />

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={currentUser.avatar}
        altText={currentUser.name}
      />
    </div>
  );
}
