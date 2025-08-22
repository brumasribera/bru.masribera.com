import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  CreditCard, 
  Plus,
  Edit3,
  Trash2,
  Shield,
  Check,
  AlertCircle,
  Receipt,
  Download,
  Calendar,
  DollarSign,
  Star,
  Lock,
  ChevronRight
} from "lucide-react";

interface PaymentPageProps {
  onBack: () => void;
  onNavigateToTransactionHistory: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  nickname?: string;
  email?: string;
  accountEnding?: string;
}

interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
}

interface RecentTransaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  projectName: string;
  paymentMethod: string;
}

export function PaymentPage({ onBack, onNavigateToTransactionHistory }: PaymentPageProps) {
  const { t } = useTranslation('reserve');
  
  const [activeTab, setActiveTab] = useState<'methods' | 'billing' | 'transactions'>('methods');
  const [showAddCard, setShowAddCard] = useState(false);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'card_1',
      type: 'card',
      brand: 'Mastercard',
      last4: '5678',
      expiryMonth: 9,
      expiryYear: 2028,
      isDefault: true,
      nickname: 'Personal Card'
    },
    {
      id: 'card_2',
      type: 'card',
      brand: 'Visa',
      last4: '9999',
      expiryMonth: 3,
      expiryYear: 2027,
      isDefault: false,
      nickname: 'Business Card'
    },
    {
      id: 'paypal_1',
      type: 'paypal',
      email: 'sonia.rodriguez@email.com',
      isDefault: false
    },
    {
      id: 'bank_1',
      type: 'bank',
      accountEnding: '5678',
      isDefault: false,
      nickname: 'Wells Fargo Checking'
    }
  ]);

  const [billingInfo] = useState<BillingInfo>({
    firstName: 'Sonia',
    lastName: 'Rodriguez',
    email: 'sonia.rodriguez@email.com',
    address: {
      line1: '456 Mountain View Drive',
      line2: 'Unit 7C',
      city: 'Denver',
      state: 'CO',
      postalCode: '80202',
      country: 'United States'
    },
    phone: '+1 (555) 987-6543'
  });

  const [recentTransactions] = useState<RecentTransaction[]>([
    {
      id: 'txn_001',
      date: '2024-01-20T14:30:00Z',
      amount: 95.00,
      currency: 'USD',
      description: 'Protected 158m² of rainforest',
      status: 'completed',
      projectName: 'Tapajós Rainforest',
      paymentMethod: 'Mastercard •••• 5678'
    },
    {
      id: 'txn_002',
      date: '2024-01-12T16:20:00Z',
      amount: 65.00,
      currency: 'USD',
      description: 'Protected 108m² of mangroves',
      status: 'completed',
      projectName: 'Yucatán Mangroves',
      paymentMethod: 'PayPal'
    },
    {
      id: 'txn_003',
      date: '2024-01-05T11:15:00Z',
      amount: 150.00,
      currency: 'USD',
      description: 'Protected 250m² of coral reef',
      status: 'completed',
      projectName: 'Great Barrier Reef',
      paymentMethod: 'Visa •••• 9999'
    }
  ]);

  const getCardIcon = (brand: string) => {
    const icons: { [key: string]: string } = {
      'Visa': '💳',
      'Mastercard': '💳',
      'American Express': '💳',
      'Discover': '💳'
    };
    return icons[brand] || '💳';
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'paypal':
        return <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>;
      case 'bank':
        return <div className="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">B</div>;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'failed':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto" style={{ maxHeight: '700px', maxWidth: '380px' }}>
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="payment-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="20" height="12" rx="2" fill="white" opacity="0.3"/>
              <circle cx="50" cy="50" r="3" fill="white" opacity="0.2"/>
              <path d="M60 20 L70 20 L70 30 L60 30 Z" fill="white" opacity="0.25"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#payment-pattern)" />
          </svg>
        </div>
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        
        {/* Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <CreditCard className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment & Billing</h1>
          <p className="text-green-100 text-sm text-center px-4">Manage your payment methods and billing information</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-8">
          {[
            { key: 'methods', label: 'Payment Methods', icon: CreditCard },
            { key: 'billing', label: 'Billing Info', icon: Receipt },
            { key: 'transactions', label: 'Recent', icon: Calendar }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <>
            {/* Add New Payment Method */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
              <button
                onClick={() => setShowAddCard(true)}
                className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-green-300 rounded-2xl text-green-600 hover:bg-green-50 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Payment Method</span>
              </button>
            </div>

            {/* Payment Methods List */}
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    {/* Payment Method Icon */}
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                      {getPaymentIcon(method.type)}
                    </div>
                    
                    {/* Payment Method Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {method.type === 'card' && `${method.brand} •••• ${method.last4}`}
                          {method.type === 'paypal' && `PayPal (${method.email})`}
                          {method.type === 'bank' && `Bank •••• ${method.accountEnding}`}
                        </h3>
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      
                      {method.nickname && (
                        <p className="text-xs text-gray-500">{method.nickname}</p>
                      )}
                      
                      {method.type === 'card' && method.expiryMonth && method.expiryYear && (
                        <p className="text-xs text-gray-500">
                          Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                        </p>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Info */}
            <div className="bg-blue-50 rounded-3xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Secure Payment Processing</h4>
                  <p className="text-xs text-blue-700">
                    All payment information is encrypted and securely stored. We never store your full card details.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Billing Info Tab */}
        {activeTab === 'billing' && (
          <>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
                <button className="text-blue-600 hover:text-blue-700">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {billingInfo.firstName} {billingInfo.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{billingInfo.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-900">{billingInfo.address.line1}</p>
                  {billingInfo.address.line2 && (
                    <p className="text-sm text-gray-900">{billingInfo.address.line2}</p>
                  )}
                  <p className="text-sm text-gray-900">
                    {billingInfo.address.city}, {billingInfo.address.state} {billingInfo.address.postalCode}
                  </p>
                  <p className="text-sm text-gray-900">{billingInfo.address.country}</p>
                </div>
                
                {billingInfo.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone: {billingInfo.phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tax Information */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-yellow-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Tax-Deductible Contributions</p>
                    <p className="text-xs text-yellow-700">Your environmental contributions may be tax-deductible.</p>
                  </div>
                </div>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Download Tax Summary</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Recent Transactions Tab */}
        {activeTab === 'transactions' && (
          <>
            {/* View All Transactions Button */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-green-100">
              <button
                onClick={onNavigateToTransactionHistory}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">View All Transactions</p>
                    <p className="text-xs text-gray-500">Complete payment history & receipts</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Recent Transactions List */}
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{transaction.description}</h4>
                      <p className="text-xs text-gray-500">{transaction.projectName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(transaction.date)}</span>
                    <span>{transaction.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Summary */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">This Month</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-green-100 text-sm">Total Contributed</p>
                  <p className="text-2xl font-bold">$245.00</p>
                </div>
                <div>
                  <p className="text-green-100 text-sm">Transactions</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">You're making a real difference!</span>
                </div>
                <p className="text-xs text-green-100 mt-1">
                  Your contributions this month helped protect 408m² of critical ecosystems.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
