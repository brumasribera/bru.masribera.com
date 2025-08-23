import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Calendar, 
  Download,
  Filter,
  Search,
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Leaf,
  Shield,
  MapPin,
  Eye,
  RefreshCw
} from "lucide-react";

interface TransactionHistoryProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  type: 'contribution' | 'refund' | 'fee' | 'bonus';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  description: string;
  projectName: string;
  projectId: string;
  areaProtected?: number;
  paymentMethod: string;
  transactionId: string;
  receiptUrl?: string;
  co2Offset?: number;
  location?: {
    country: string;
    coordinates: { lat: number; lng: number };
  };
}

export function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const { t } = useTranslation('reserve');
  
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | '7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [transactions] = useState<Transaction[]>([
    {
      id: 'txn_12345',
      date: '2024-01-20T14:30:00Z',
      amount: 95.00,
      currency: 'USD',
      type: 'contribution',
      status: 'completed',
      description: 'Protected 158m² of rainforest habitat',
      projectName: 'Tapajós Rainforest Conservation',
      projectId: 'br-amazon',
      areaProtected: 158,
      paymentMethod: 'Mastercard •••• 5678',
      transactionId: 'TXN_95A23B',
      receiptUrl: '#',
      co2Offset: 10.7,
      location: { country: 'Brazil', coordinates: { lat: -2.8, lng: -54.9 } }
    },
    {
      id: 'txn_12344',
      date: '2024-01-12T16:20:00Z',
      amount: 65.00,
      currency: 'USD',
      type: 'contribution',
      status: 'completed',
      description: 'Protected 108m² of mangrove ecosystem',
      projectName: 'Yucatán Mangroves',
      projectId: 'mx-mangroves',
      areaProtected: 108,
      paymentMethod: 'PayPal',
      transactionId: 'TXN_65C14D',
      receiptUrl: '#',
      co2Offset: 8.1,
      location: { country: 'Mexico', coordinates: { lat: 21.1, lng: -89.1 } }
    },
    {
      id: 'txn_12343',
      date: '2024-01-05T11:15:00Z',
      amount: 150.00,
      currency: 'USD',
      type: 'contribution',
      status: 'completed',
      description: 'Protected 250m² of coral reef sanctuary',
      projectName: 'Great Barrier Reef Protection',
      projectId: 'au-reef',
      areaProtected: 250,
      paymentMethod: 'Visa •••• 9999',
      transactionId: 'TXN_150E56F',
      receiptUrl: '#',
      co2Offset: 6.0,
      location: { country: 'Australia', coordinates: { lat: -18.2, lng: 147.7 } }
    },
    {
      id: 'txn_12342',
      date: '2023-12-28T18:45:00Z',
      amount: 35.00,
      currency: 'USD',
      type: 'bonus',
      status: 'completed',
      description: 'Year-end bonus contribution',
      projectName: 'Madagascar Forests',
      projectId: 'mg-madagascar',
      areaProtected: 58,
      paymentMethod: 'Reserve Credits',
      transactionId: 'TXN_BONUS_28',
      co2Offset: 2.9,
      location: { country: 'Madagascar', coordinates: { lat: -18.8, lng: 47.2 } }
    },
    {
      id: 'txn_12341',
      date: '2023-12-18T13:30:00Z',
      amount: 110.00,
      currency: 'USD',
      type: 'contribution',
      status: 'completed',
      description: 'Protected 183m² of boreal forest',
      projectName: 'Canadian Boreal Shield',
      projectId: 'ca-boreal',
      areaProtected: 183,
      paymentMethod: 'Mastercard •••• 5678',
      transactionId: 'TXN_110G78H',
      receiptUrl: '#',
      co2Offset: 15.2,
      location: { country: 'Canada', coordinates: { lat: 54.7, lng: -113.5 } }
    },
    {
      id: 'txn_12340',
      date: '2023-12-10T15:20:00Z',
      amount: 25.00,
      currency: 'USD',
      type: 'refund',
      status: 'completed',
      description: 'Partial refund for project adjustment',
      projectName: 'Andean Cloud Forest',
      projectId: 'pe-cloud',
      paymentMethod: 'Mastercard •••• 5678',
      transactionId: 'REF_25I90J',
      location: { country: 'Peru', coordinates: { lat: -13.2, lng: -72.5 } }
    },
    {
      id: 'txn_12339',
      date: '2023-12-03T09:00:00Z',
      amount: 225.00,
      currency: 'USD',
      type: 'contribution',
      status: 'completed',
      description: 'Protected 375m² of wetland habitat',
      projectName: 'Iberá Wetlands',
      projectId: 'ar-wetlands',
      areaProtected: 375,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN_225K12L',
      receiptUrl: '#',
      co2Offset: 17.8,
      location: { country: 'Argentina', coordinates: { lat: -28.5, lng: -57.1 } }
    },
    {
      id: 'txn_12338',
      date: '2023-11-26T20:30:00Z',
      amount: 75.00,
      currency: 'USD',
      type: 'contribution',
      status: 'pending',
      description: 'Processing: 125m² of seagrass meadows',
      projectName: 'Bali Seagrass Conservation',
      projectId: 'id-seagrass',
      areaProtected: 125,
      paymentMethod: 'PayPal',
      transactionId: 'TXN_75M34N',
      co2Offset: 4.0,
      location: { country: 'Indonesia', coordinates: { lat: -8.3, lng: 115.1 } }
    },
    {
      id: 'txn_12337',
      date: '2023-11-20T16:15:00Z',
      amount: 55.00,
      currency: 'USD',
      type: 'contribution',
      status: 'failed',
      description: 'Failed: 92m² of savanna grassland',
      projectName: 'Laikipia Savanna',
      projectId: 'ke-savanna',
      paymentMethod: 'Mastercard •••• 5678',
      transactionId: 'TXN_55O56P',
      location: { country: 'Kenya', coordinates: { lat: 0.5, lng: 36.8 } }
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'failed':
        return 'text-red-700 bg-red-100 border-red-200';
      case 'refunded':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contribution':
        return <Leaf className="w-4 h-4 text-green-600" />;
      case 'refund':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case 'bonus':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'fee':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatAmount = (amount: number, currency: string, type: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
    
    if (type === 'refund') {
      return `+${formatted}`;
    }
    return formatted;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Status filter
    if (selectedStatus !== 'all' && transaction.status !== selectedStatus) {
      return false;
    }
    
    // Search filter
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !transaction.projectName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Date filter
    if (selectedPeriod !== 'all') {
      const transactionDate = new Date(transaction.date);
      const now = new Date();
      const daysAgo = {
        '7d': 7,
        '30d': 30,
        '90d': 90,
        '1y': 365
      }[selectedPeriod] || 0;
      
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      if (transactionDate < cutoffDate) {
        return false;
      }
    }
    
    return true;
  });

  const calculateSummary = () => {
    const completed = filteredTransactions.filter(t => t.status === 'completed');
    const totalAmount = completed.reduce((sum, t) => sum + (t.type === 'refund' ? -t.amount : t.amount), 0);
    const totalArea = completed.reduce((sum, t) => sum + (t.areaProtected || 0), 0);
    const totalCO2 = completed.reduce((sum, t) => sum + (t.co2Offset || 0), 0);
    
    return { totalAmount, totalArea, totalCO2, count: completed.length };
  };

  const summary = calculateSummary();

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="transaction-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="8" height="8" fill="white" opacity="0.3"/>
              <rect x="20" y="20" width="8" height="8" fill="white" opacity="0.2"/>
              <circle cx="30" cy="10" r="2" fill="white" opacity="0.4"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#transaction-pattern)" />
          </svg>
        </div>
        
        {/* Navigation */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 z-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        {/* Title & Summary */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <Receipt className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Transaction History</h1>
          <div className="text-center">
            <p className="text-purple-100 text-sm">{summary.count} transactions</p>
            <p className="text-white font-semibold">{formatAmount(summary.totalAmount, 'USD', 'contribution')}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
          />
        </div>
        
        {/* Filter Toggles */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {/* Period Filter */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All time</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
            
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-3 text-center border border-green-100">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-green-700">{summary.totalArea.toLocaleString()}</div>
            <div className="text-xs text-green-600">m² Protected</div>
          </div>
          
          <div className="bg-white rounded-2xl p-3 text-center border border-blue-100">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-blue-700">{summary.totalCO2.toFixed(1)}</div>
            <div className="text-xs text-blue-600">Tons CO₂</div>
          </div>
          
          <div className="bg-white rounded-2xl p-3 text-center border border-purple-100">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-purple-700">{summary.count}</div>
            <div className="text-xs text-purple-600">Transactions</div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{transaction.description}</h4>
                    <p className="text-xs text-gray-500">{transaction.projectName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(transaction.status)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    transaction.type === 'refund' ? 'text-green-600' : 
                    transaction.type === 'fee' ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatAmount(transaction.amount, transaction.currency, transaction.type)}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>

              {/* Details */}
              {transaction.status === 'completed' && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {transaction.areaProtected && (
                    <div className="bg-green-50 rounded-xl p-2">
                      <div className="text-xs text-green-600 mb-1">Area Protected</div>
                      <div className="text-sm font-semibold text-green-700">{transaction.areaProtected} m²</div>
                    </div>
                  )}
                  
                  {transaction.co2Offset && (
                    <div className="bg-blue-50 rounded-xl p-2">
                      <div className="text-xs text-blue-600 mb-1">CO₂ Offset</div>
                      <div className="text-sm font-semibold text-blue-700">{transaction.co2Offset} tons</div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{transaction.location?.country}</span>
                  <span>•</span>
                  <span>{transaction.paymentMethod}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{transaction.transactionId}</span>
                  {transaction.receiptUrl && transaction.status === 'completed' && (
                    <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Eye className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-100">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Export Options */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Export Options</h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">PDF Report</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">CSV Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
