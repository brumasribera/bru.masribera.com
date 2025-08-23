import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Download,
  Link2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Heart,
  Leaf,
  Zap,
  TrendingUp,
  DollarSign,
  Eye,
  ChevronRight
} from "lucide-react";
import { ImageModal } from "../../components/ImageModal";

interface AccountMainProps {
  onBack: () => void;
  onNavigateToProfile: () => void;
  onNavigateToPayment: () => void;
  onNavigateToDownloads: () => void;
  onNavigateToLinkedAccounts?: () => void;
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

interface UserStats {
  totalContributions: number;
  totalAreaProtected: number;
  co2Offset: number;
  treesPlanted: number;
  joinDate: string;
  currentStreak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export function AccountMain({ 
  onBack, 
  onNavigateToProfile,
  onNavigateToPayment,
  onNavigateToDownloads,
  onNavigateToLinkedAccounts,
  user
}: AccountMainProps) {
  const { t } = useTranslation('reserve');
  
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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const [stats] = useState<UserStats>({
    totalContributions: 12,
    totalAreaProtected: 2847, // in m²
    co2Offset: 156, // in tons
    treesPlanted: 47,
    joinDate: "2023-03-15",
    currentStreak: 8
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: "first_contribution",
      title: "First Steps",
      description: "Made your first contribution",
      icon: Leaf,
      unlocked: true
    },
    {
      id: "area_protector",
      title: "Area Protector",
      description: "Protected 1000m² of nature",
      icon: Award,
      unlocked: true
    },
    {
      id: "climate_warrior",
      title: "Climate Warrior",
      description: "Offset 100 tons of CO₂",
      icon: Zap,
      unlocked: true
    },
    {
      id: "forest_guardian",
      title: "Forest Guardian",
      description: "Plant 50 trees",
      icon: Award,
      unlocked: false,
      progress: 47,
      maxProgress: 50
    },
    {
      id: "consistent_contributor",
      title: "Consistent Contributor",
      description: "7-day contribution streak",
      icon: TrendingUp,
      unlocked: true
    },
    {
      id: "generous_heart",
      title: "Generous Heart",
      description: "Contribute over €500",
      icon: Heart,
      unlocked: false,
      progress: 340,
      maxProgress: 500
    }
  ]);

  const menuSections = [
    {
      title: "Profile & Account",
      items: [
        {
          id: "profile",
          title: "Personal Information",
          description: "Manage your profile details",
          icon: User,
          action: onNavigateToProfile,
          color: "bg-blue-500"
        },
        {
          id: "payment",
          title: "Payment Methods",
          description: "Cards, billing & receipts",
          icon: CreditCard,
          action: onNavigateToPayment,
          color: "bg-green-500"
        }
      ]
    },
    {
      title: "Data & Support",
      items: [
        {
          id: "linked",
          title: "Linked Accounts",
          description: "Connect external apps & services",
          icon: Link2,
          action: onNavigateToLinkedAccounts,
          color: "bg-cyan-500"
        },
        {
          id: "downloads",
          title: "Export Data",
          description: "Download your contributions",
          icon: Download,
          action: onNavigateToDownloads,
          color: "bg-teal-500"
        }
      ]
    }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return Math.round(num).toString();
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto relative">
      {/* Header with Profile */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700" />
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="nature-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" opacity="0.3"/>
              <path d="M15 20 Q20 15 25 20 Q20 25 15 20 Z" fill="white" opacity="0.2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#nature-pattern)" />
          </svg>
        </div>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 z-[40]"
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
              onClick={handleImageClick}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
              }}
            />
            {currentUser.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <Award className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          {/* User Info */}
          <h1 className="text-2xl font-bold mb-1">{currentUser.name}</h1>
          <p className="text-green-100 text-sm mb-1">{currentUser.email}</p>
          <p className="text-green-200 text-xs">Member since {currentUser.memberSince}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Impact Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Your Impact</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-100">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-700">{formatNumber(stats.totalAreaProtected)}</div>
              <div className="text-xs text-green-600">m² Protected</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border border-blue-100">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-700">{stats.co2Offset}</div>
              <div className="text-xs text-blue-600">Tons CO₂ Offset</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center border border-purple-100">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-700">{stats.totalContributions}</div>
              <div className="text-xs text-purple-600">Contributions</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 text-center border border-orange-100">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-700">{stats.currentStreak}</div>
              <div className="text-xs text-orange-600">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {achievements.slice(0, 6).map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`relative p-3 rounded-2xl text-center transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className={`text-xs font-medium ${
                    achievement.unlocked ? 'text-yellow-700' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </div>
                  
                  {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-yellow-500 h-1 rounded-full transition-all"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.progress}/{achievement.maxProgress}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
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
          <h3 className="text-lg font-semibold mb-3">Ready to make more impact?</h3>
          <p className="text-emerald-100 text-sm mb-4">
            Continue protecting nature and growing your positive environmental footprint.
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-2xl transition-colors backdrop-blur-sm border border-white/20"
          >
            <Leaf className="w-4 h-4 inline mr-2" />
            Explore Projects
          </button>
        </div>
      </div>
      
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
