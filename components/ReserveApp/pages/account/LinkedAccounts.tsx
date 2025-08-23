import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Link2,
  Check,
  X,
  Shield,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Leaf,
  RefreshCw,
  Zap,
  Building2,
  Globe,
  TreePine,
  Satellite
} from "lucide-react";



interface LinkedAccountsProps {
  onBack: () => void;
}

interface ConnectedAccount {
  id: string;
  name: string;
  type: 'bank' | 'fintech' | 'carbon' | 'fitness' | 'social' | 'productivity' | 'sustainability';
  description: string;
  icon: string | React.ReactElement;
  isConnected: boolean;
  connectionDate?: string;
  permissions: string[];
  benefits: string[];
  dataShared: string[];
  status: 'active' | 'pending' | 'error' | 'disconnected';
  canAutomate?: boolean;
  automationEnabled?: boolean;
  lastSync?: string;
}

interface AccountCategory {
  title: string;
  description: string;
  icon: any;
  accounts: ConnectedAccount[];
}

export function LinkedAccounts({ onBack }: LinkedAccountsProps) {
  const { t } = useTranslation('reserve');
  
  const [showConnectionModal, setShowConnectionModal] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [accountCategories] = useState<AccountCategory[]>([
    {
      title: "Roundup Donations",
      description: "Connect your bank and payment apps for automatic roundup contributions",
      icon: CreditCard,
      accounts: [
                                   {
            id: 'my_bank',
            name: 'My Bank',
            type: 'bank',
            description: 'Round up purchases and automatically contribute spare change to nature projects',
            icon: <Building2 className="w-6 h-6 text-slate-700" />,
            isConnected: true,
            connectionDate: '2024-01-18',
            permissions: ['Read transactions', 'Round up purchases'],
            benefits: ['Automatic micro-donations', 'Round-up contributions', 'Everyday impact'],
            dataShared: ['Transaction amounts', 'Roundup amounts'],
            status: 'active',
            canAutomate: true,
            automationEnabled: true,
            lastSync: '2024-01-19T14:30:00Z'
          },
                 {
           id: 'paypal',
           name: 'PayPal',
           type: 'fintech',
           description: 'Enable one-click environmental contributions and roundup donations',
           icon: '/components/ReserveApp/assets/logos/financial/paypal-logo.png',
           isConnected: true,
           connectionDate: '2024-01-12',
           permissions: ['Process payments', 'Round up purchases'],
           benefits: ['Quick contributions', 'Roundup donations', 'Secure payments'],
           dataShared: ['Payment confirmations', 'Roundup amounts'],
           status: 'active',
           lastSync: '2024-01-19T11:15:00Z'
         }
      ]
    },
    {
      title: "Nature Projects",
      description: "Connect with essential conservation and restoration platforms",
      icon: Leaf,
      accounts: [
                 {
           id: 'restor_eco',
           name: 'Restor.eco',
           type: 'sustainability',
           description: 'Track global restoration projects and conservation impact',
           icon: '/components/ReserveApp/assets/logos/conservation/restor-eco-favicon.ico',
           isConnected: true,
           connectionDate: '2024-01-15',
           permissions: ['Access restoration data', 'View project progress'],
           benefits: ['Global restoration tracking', 'Scientific validation', 'Impact measurement'],
           dataShared: ['Restoration contributions', 'Project locations'],
           status: 'active',
           canAutomate: true,
           automationEnabled: true,
           lastSync: '2024-01-19T08:30:00Z'
         },
                 {
           id: 'one_tree_planted',
           name: 'One Tree Planted',
           type: 'sustainability',
           description: 'Connect tree planting donations and track reforestation impact',
           icon: '/components/ReserveApp/assets/logos/conservation/One_Tree_Planted-logo-round.png',
           isConnected: false,
           permissions: ['Donation tracking', 'Project updates', 'Impact reporting'],
           benefits: ['Tree planting coordination', 'Reforestation tracking', 'Impact verification'],
           dataShared: ['Donation history', 'Project preferences', 'Geographic interests'],
           status: 'disconnected'
         },
                 {
           id: 'wwf',
           name: 'World Wildlife Fund',
           type: 'sustainability',
           description: 'Support wildlife conservation and habitat protection',
           icon: '/components/ReserveApp/assets/logos/organizations/wwf.jpg',
           isConnected: false,
           permissions: ['Conservation projects', 'Species tracking', 'Habitat monitoring'],
           benefits: ['Wildlife protection', 'Habitat conservation', 'Species monitoring'],
           dataShared: ['Conservation interests', 'Species preferences', 'Project support'],
           status: 'disconnected'
         },
                 {
           id: 'global_forest_watch',
           name: 'Global Forest Watch',
           type: 'sustainability',
           description: 'Monitor deforestation and forest changes worldwide',
           icon: '/components/ReserveApp/assets/logos/conservation/gfw.png',
           isConnected: false,
           permissions: ['Forest loss data', 'Satellite monitoring', 'Alert subscriptions'],
           benefits: ['Deforestation monitoring', 'Forest change alerts', 'Data visualization'],
           dataShared: ['Monitored regions', 'Alert preferences', 'Conservation focus areas'],
           status: 'disconnected'
         },
                 {
           id: 'openforests',
           name: 'OpenForests',
           type: 'sustainability',
           description: 'Monitor forest health and deforestation alerts',
           icon: '/components/ReserveApp/assets/logos/conservation/openforests.png',
           isConnected: false,
           permissions: ['Forest monitoring data', 'Deforestation alerts'],
           benefits: ['Real-time forest monitoring', 'Deforestation prevention', 'Satellite tracking'],
           dataShared: ['Forest watch preferences', 'Alert locations'],
           status: 'disconnected',
           canAutomate: true,
           automationEnabled: false
         }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'disconnected':
        return <X className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'error':
        return 'text-red-700 bg-red-100 border-red-200';
      case 'disconnected':
        return 'text-gray-700 bg-gray-100 border-gray-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const allAccounts = accountCategories.flatMap(category => category.accounts);
  const connectedCount = allAccounts.filter(account => account.isConnected).length;

  const filteredCategories = selectedCategory === 'all' 
    ? accountCategories 
    : accountCategories.filter(category => 
        category.accounts.some(account => account.type === selectedCategory)
      );

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="linked-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="2" fill="white"/>
              <circle cx="45" cy="45" r="2" fill="white"/>
              <line x1="15" y1="15" x2="45" y2="45" stroke="white" strokeWidth="1" opacity="0.3"/>
              <circle cx="45" cy="15" r="1" fill="white" opacity="0.6"/>
              <circle cx="15" cy="45" r="1" fill="white" opacity="0.6"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#linked-pattern)" />
          </svg>
        </div>
        
        {/* Navigation */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 z-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        {/* Title & Stats */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <Link2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Linked Accounts</h1>
          <p className="text-teal-100 text-sm text-center">
            {connectedCount} of {allAccounts.length} accounts connected
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: 'all', label: 'All', icon: Link2 },
            { key: 'bank', label: 'Roundup', icon: CreditCard },
            { key: 'sustainability', label: 'Projects', icon: Leaf }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === key
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Categories */}
        {filteredCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            {/* Category Header */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>

            {/* Accounts in Category */}
            <div className="space-y-3">
              {category.accounts.map((account) => (
                <div key={account.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                                     {/* Account Header */}
                   <div className="flex items-start gap-3 mb-3">
                     <div className="w-8 h-8 flex items-center justify-center">
                       {typeof account.icon === 'string' && account.icon.startsWith('/') ? (
                         <img src={account.icon} alt={account.name} className="w-6 h-6 object-contain" />
                       ) : typeof account.icon === 'string' ? (
                         <span className="text-2xl">{account.icon}</span>
                       ) : (
                         account.icon
                       )}
                     </div>
                                          <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-1">
                         <h4 className="text-sm font-medium text-gray-900">{account.name}</h4>
                         {account.isConnected && (
                           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(account.status)}`}>
                             {getStatusIcon(account.status)}
                             {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                           </span>
                         )}
                       </div>
                      <p className="text-xs text-gray-600 mb-2">{account.description}</p>
                      
                      
                    </div>
                    
                    {/* Action Button */}
                    <button
                      onClick={() => setShowConnectionModal(account.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        account.isConnected
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-teal-500 text-white hover:bg-teal-600'
                      }`}
                    >
                      {account.isConnected ? 'Manage' : 'Connect'}
                    </button>
                  </div>

                                     {/* Benefits */}
                   <div className="mb-3">
                     <div className="flex flex-wrap gap-1">
                       {account.benefits.slice(0, 3).map((benefit, index) => (
                         <span key={index} className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-lg">
                           {benefit}
                         </span>
                       ))}
                     </div>
                   </div>

                  {/* Automation Toggle */}
                  {account.canAutomate && account.isConnected && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium text-gray-700">Automation</span>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          account.automationEnabled ? 'bg-teal-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            account.automationEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-3xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Your Data is Secure</h4>
              <p className="text-xs text-blue-700 mb-2">
                All connections use industry-standard OAuth protocols. We never store your login credentials.
              </p>
              <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
                Learn more about our security practices →
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">Why Connect Accounts?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Roundup Donations</p>
                <p className="text-xs text-teal-100">Automatically contribute spare change to nature projects</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Track Impact</p>
                <p className="text-xs text-teal-100">Monitor your conservation contributions and project progress</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Nature Protection</p>
                <p className="text-xs text-teal-100">Support forest restoration and conservation efforts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Modal (placeholder for now) */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConnectionModal(null)}>
          <div className="bg-white rounded-3xl p-6 m-4 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Account Connection</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connection modal would appear here with OAuth flow or management options.
            </p>
            <button
              onClick={() => setShowConnectionModal(null)}
              className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
