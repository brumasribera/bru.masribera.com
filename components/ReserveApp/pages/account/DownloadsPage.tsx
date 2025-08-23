import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Download,
  Trash2,
  HardDrive,
  Globe,
  Leaf,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  ExternalLink,
  Wifi,
  WifiOff,
  Settings
} from "lucide-react";

interface DownloadsPageProps {
  onBack: () => void;
}

interface DownloadedItem {
  id: string;
  name: string;
  type: 'project' | 'language' | 'map' | 'content';
  size: string;
  downloadDate: string;
  lastAccessed: string;
  status: 'downloaded' | 'downloading' | 'failed' | 'updating';
  progress?: number;
  icon: any;
  description: string;
}

export function DownloadsPage({ onBack }: DownloadsPageProps) {
  const { t } = useTranslation('reserve');
  
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'projects' | 'languages' | 'maps'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [showOfflineMode, setShowOfflineMode] = useState(true);

  const [downloadedItems] = useState<DownloadedItem[]>([
    {
      id: '1',
      name: 'Tapajós Rainforest Conservation',
      type: 'project',
      size: '298 MB',
      downloadDate: '2024-01-18',
      lastAccessed: '3 hours ago',
      status: 'downloaded',
      icon: Leaf,
      description: 'Complete project data and satellite imagery'
    },
    {
      id: '2',
      name: 'Spanish Language Pack',
      type: 'language',
      size: '89 MB',
      downloadDate: '2024-01-15',
      lastAccessed: '1 day ago',
      status: 'downloaded',
      icon: Globe,
      description: 'Offline Spanish translations and voice data'
    },
    {
      id: '3',
      name: 'Colorado Regional Maps',
      type: 'map',
      size: '856 MB',
      downloadDate: '2024-01-12',
      lastAccessed: '2 days ago',
      status: 'downloaded',
      icon: MapPin,
      description: 'High-resolution maps for offline navigation'
    },
    {
      id: '4',
      name: 'Yucatán Mangroves',
      type: 'project',
      size: '203 MB',
      downloadDate: '2024-01-08',
      lastAccessed: '1 week ago',
      status: 'downloaded',
      icon: Leaf,
      description: 'Mangrove ecosystem project data'
    },
    {
      id: '5',
      name: 'French Language Pack',
      type: 'language',
      size: '92 MB',
      downloadDate: '2024-01-05',
      lastAccessed: '1 week ago',
      status: 'downloaded',
      icon: Globe,
      description: 'Offline French translations and voice data'
    },
    {
      id: '6',
      name: 'Great Barrier Reef Protection',
      type: 'project',
      size: '345 MB',
      downloadDate: '2024-01-02',
      lastAccessed: '1 week ago',
      status: 'downloaded',
      icon: Leaf,
      description: 'Marine conservation project data'
    }
  ]);

  const filteredItems = downloadedItems.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.downloadDate).getTime() - new Date(a.downloadDate).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'downloaded':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'downloading':
        return <Download className="w-4 h-4 text-blue-600 animate-bounce" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'updating':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'downloaded':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'downloading':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'failed':
        return 'text-red-700 bg-red-100 border-red-200';
      case 'updating':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Leaf className="w-4 h-4" />;
      case 'language':
        return <Globe className="w-4 h-4" />;
      case 'map':
        return <MapPin className="w-4 h-4" />;
      case 'content':
        return <Download className="w-4 h-4" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'language':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'map':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'content':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const calculateTotalSize = () => {
    return downloadedItems.reduce((total, item) => {
      const size = parseFloat(item.size);
      return total + size;
    }, 0).toFixed(1);
  };

  const handleDeleteItem = (itemId: string) => {
    // In real app, this would call an API to delete the item
    console.log('Deleting item:', itemId);
  };

  const handleUpdateItem = (itemId: string) => {
    // In real app, this would check for updates and download them
    console.log('Updating item:', itemId);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="downloads-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="8" height="8" fill="white" opacity="0.3"/>
              <rect x="20" y="20" width="8" height="8" fill="white" opacity="0.2"/>
              <circle cx="30" cy="10" r="2" fill="white" opacity="0.4"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#downloads-pattern)" />
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
            <HardDrive className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Downloads</h1>
          <p className="text-green-100 text-sm text-center">Manage your offline content</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Storage Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-green-600" />
            Storage Overview
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">{downloadedItems.length}</div>
              <div className="text-xs text-gray-600">Items Downloaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">{calculateTotalSize()} GB</div>
              <div className="text-xs text-gray-600">Total Size</div>
            </div>
          </div>
          
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">35% of available storage used</div>
        </div>

        {/* Offline Mode Toggle */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Offline Mode</p>
                <p className="text-xs text-gray-500">Access content without internet connection</p>
              </div>
            </div>
            <button
              onClick={() => setShowOfflineMode(!showOfflineMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showOfflineMode ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showOfflineMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          {showOfflineMode && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700">
                  Offline mode is enabled. You can access downloaded content without internet.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters & Sort</h3>
          
          <div className="space-y-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="projects">Projects</option>
                <option value="languages">Languages</option>
                <option value="maps">Maps</option>
              </select>
            </div>
            
            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="date">Download Date</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
              </select>
            </div>
          </div>
        </div>

        {/* Downloaded Items List */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Downloaded Content</h3>
          
          <div className="space-y-3">
            {sortedItems.map((item) => {
              const IconComponent = item.icon;
              
              return (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>Downloaded {item.downloadDate}</span>
                        <span>•</span>
                        <span>Last accessed {item.lastAccessed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateItem(item.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Check for updates"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {sortedItems.length === 0 && (
            <div className="text-center py-8">
              <Download className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No downloads yet</h3>
              <p className="text-sm text-gray-500">Download projects, languages, and maps for offline access</p>
            </div>
          )}
        </div>

        {/* Download Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-green-600" />
            Download Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-update Downloads</p>
                <p className="text-xs text-gray-500">Automatically update downloaded content</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Download over Mobile</p>
                <p className="text-xs text-gray-500">Allow downloads over mobile data</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Storage Warnings</p>
                <p className="text-xs text-gray-500">Notify when storage is running low</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Download Tips */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Download Tips</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Download projects before traveling to areas with poor internet</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Language packs enable offline translation capabilities</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Maps provide offline navigation in remote areas</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Regularly update downloads to get the latest data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
