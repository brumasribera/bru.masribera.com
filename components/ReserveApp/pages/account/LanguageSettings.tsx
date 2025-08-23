import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translateText, getTranslationServiceStatus } from "../../utils/translationService";
import { 
  ArrowLeft, 
  Globe,
  Check,
  Download,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  Thermometer,
  Ruler,
  Volume2,
  Users,
  Wifi,
  Smartphone,
  Search,
  Star,
  ChevronRight
} from "lucide-react";

interface LanguageSettingsProps {
  onBack: () => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isDownloaded: boolean;
  progress?: number;
  region?: string;
  supportedBy: string[];
}

interface RegionSetting {
  id: string;
  name: string;
  value: string;
  icon: any;
  description: string;
  options: { value: string; label: string; }[];
}

export function LanguageSettings({ onBack }: LanguageSettingsProps) {
  const { t, i18n } = useTranslation('reserve');
  
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingLanguages, setDownloadingLanguages] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [translationServiceStatus, setTranslationServiceStatus] = useState<{
    services: Array<{ name: string; status: 'available' | 'unavailable' | 'unknown' }>;
    totalServices: number;
    availableServices: number;
  } | null>(null);
  const [isTestingTranslation, setIsTestingTranslation] = useState(false);
  
  const [languages] = useState<Language[]>([
    // Essential Languages
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      isDownloaded: true,
      region: 'United States',
      supportedBy: ['Google Translate', 'LibreTranslate', 'MyMemory', 'Lingva']
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      isDownloaded: true,
      region: 'Spain',
      supportedBy: ['Google Translate', 'LibreTranslate', 'MyMemory', 'Lingva']
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      isDownloaded: true,
      region: 'France',
      supportedBy: ['Google Translate', 'LibreTranslate', 'MyMemory', 'Lingva']
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      isDownloaded: true,
      region: 'Germany',
      supportedBy: ['Google Translate', 'LibreTranslate', 'MyMemory', 'Lingva']
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      isDownloaded: true,
      region: 'Italy',
      supportedBy: ['Google Translate', 'LibreTranslate', 'MyMemory', 'Lingva']
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇧🇷',
      isDownloaded: true,
      region: 'Brazil',
      supportedBy: ['Google Translate', 'LibreTranslate', 'MyMemory', 'Lingva']
    },
    {
      code: 'ca',
      name: 'Catalan',
      nativeName: 'Català',
      flag: '🏴󠁥󠁳󠁣󠁴󠁿',
      isDownloaded: true,
      region: 'Catalonia',
      supportedBy: ['LibreTranslate', 'MyMemory', 'Lingva']
    },
    {
      code: 'rm',
      name: 'Romansh',
      nativeName: 'Rumantsch',
      flag: '🇨🇭',
      isDownloaded: true,
      region: 'Switzerland',
      supportedBy: ['LibreTranslate', 'MyMemory', 'Lingva']
    }
  ]);

  // Test translation service status
  const testTranslationService = async () => {
    setIsTestingTranslation(true);
    try {
      const status = await getTranslationServiceStatus();
      setTranslationServiceStatus(status);
    } catch (error) {
      console.error('Failed to test translation service:', error);
    } finally {
      setIsTestingTranslation(false);
    }
  };

  // Test on-the-fly translation
  const testOnTheFlyTranslation = async (text: string, fromLang: string, toLang: string) => {
    try {
      const translated = await translateText({ text, fromLang, toLang });
      return translated;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Fallback to original text
    }
  };

  const [regionSettings, setRegionSettings] = useState<RegionSetting[]>([
    {
      id: 'timezone',
      name: 'Time Zone',
      value: 'America/New_York',
      icon: Clock,
      description: 'Your local time zone for scheduling contributions',
      options: [
        { value: 'America/New_York', label: 'Eastern Time (UTC-5)' },
        { value: 'America/Chicago', label: 'Central Time (UTC-6)' },
        { value: 'America/Denver', label: 'Mountain Time (UTC-7)' },
        { value: 'America/Los_Angeles', label: 'Pacific Time (UTC-8)' },
        { value: 'Europe/London', label: 'Greenwich Mean Time (UTC+0)' },
        { value: 'Europe/Paris', label: 'Central European Time (UTC+1)' },
        { value: 'Asia/Tokyo', label: 'Japan Standard Time (UTC+9)' },
        { value: 'Australia/Sydney', label: 'Australian Eastern Time (UTC+10)' }
      ]
    },
    {
      id: 'currency',
      name: 'Currency',
      value: 'USD',
      icon: DollarSign,
      description: 'Display currency for contributions and payments',
      options: [
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'JPY', label: 'Japanese Yen (¥)' },
        { value: 'CAD', label: 'Canadian Dollar (C$)' },
        { value: 'AUD', label: 'Australian Dollar (A$)' },
        { value: 'CHF', label: 'Swiss Franc (CHF)' },
        { value: 'CNY', label: 'Chinese Yuan (¥)' },
        { value: 'SEK', label: 'Swedish Krona (kr)' },
        { value: 'NOK', label: 'Norwegian Krone (kr)' }
      ]
    },
    {
      id: 'dateFormat',
      name: 'Date Format',
      value: 'MM/DD/YYYY',
      icon: Calendar,
      description: 'How dates are displayed throughout the app',
      options: [
        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (UK)' },
        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
        { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (German)' },
        { value: 'DD/MM/YY', label: 'DD/MM/YY (Short)' }
      ]
    },
    {
      id: 'temperature',
      name: 'Temperature',
      value: 'fahrenheit',
      icon: Thermometer,
      description: 'Temperature unit for climate data',
      options: [
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'kelvin', label: 'Kelvin (K)' }
      ]
    },
    {
      id: 'distance',
      name: 'Distance',
      value: 'imperial',
      icon: Ruler,
      description: 'Distance and area measurement units',
      options: [
        { value: 'metric', label: 'Metric (km, m²)' },
        { value: 'imperial', label: 'Imperial (mi, ft²)' }
      ]
    }
  ]);

  const filteredLanguages = languages.filter(lang => {
    // Text search filter
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.region?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Service filter
    const matchesService = selectedService === 'all' || lang.supportedBy.includes(selectedService);
    
    return matchesSearch && matchesService;
  });

  const handleLanguageChange = async (languageCode: string) => {
    if (!languages.find(l => l.code === languageCode)?.isDownloaded) {
      // Simulate download
      setDownloadingLanguages(prev => [...prev, languageCode]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDownloadingLanguages(prev => prev.filter(code => code !== languageCode));
    }
    
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleRegionChange = (settingId: string, newValue: string) => {
    setRegionSettings(prev => 
      prev.map(setting => 
        setting.id === settingId 
          ? { ...setting, value: newValue }
          : setting
      )
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="language-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <text x="10" y="20" fontSize="12" fill="white" opacity="0.4">Aa</text>
              <text x="25" y="35" fontSize="10" fill="white" opacity="0.3">文</text>
              <circle cx="35" cy="15" r="2" fill="white" opacity="0.3"/>
              <rect x="5" y="30" width="8" height="8" rx="2" fill="white" opacity="0.2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#language-pattern)" />
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
            <Globe className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Language & Region</h1>
          <p className="text-indigo-100 text-sm text-center">Customize your regional preferences</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Current Language */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Language</h3>
          
          <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="text-3xl">
              {languages.find(l => l.code === selectedLanguage)?.flag}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-indigo-900">
                {languages.find(l => l.code === selectedLanguage)?.name}
              </h4>
              <p className="text-xs text-indigo-700">
                {languages.find(l => l.code === selectedLanguage)?.nativeName}
              </p>
              <p className="text-xs text-indigo-600">
                {languages.find(l => l.code === selectedLanguage)?.region}
              </p>
            </div>
            <Check className="w-5 h-5 text-indigo-600" />
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Languages</h3>
          
          {/* Search and Service Filter */}
          <div className="space-y-3 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              />
            </div>
            
            {/* Service Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">Filter by service:</span>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
              >
                <option value="all">All Services</option>
                <option value="LibreTranslate">LibreTranslate</option>
                <option value="MyMemory">MyMemory</option>
                <option value="Lingva">Lingva</option>
              </select>
            </div>
          </div>
          
          {/* Service Summary */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-600 mb-2">Languages supported by each service:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">LibreTranslate:</span>
                <span className="font-medium text-blue-600">{languages.filter(l => l.supportedBy.includes('LibreTranslate')).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">MyMemory:</span>
                <span className="font-medium text-blue-600">{languages.filter(l => l.supportedBy.includes('MyMemory')).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Lingva:</span>
                <span className="font-medium text-blue-600">{languages.filter(l => l.supportedBy.includes('Lingva')).length}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Total languages: {languages.length} | 
              All services: {languages.filter(l => l.supportedBy.length === 3).length}
            </p>
          </div>

          {/* Language List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredLanguages.map((language) => {
              const isDownloading = downloadingLanguages.includes(language.code);
              
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  disabled={isDownloading}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                    selectedLanguage === language.code
                      ? 'bg-indigo-50 border-2 border-indigo-200'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  {/* Flag */}
                  <div className="text-2xl">{language.flag}</div>
                  
                                     {/* Language Info */}
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2">
                       <h4 className="text-sm font-medium text-gray-900">{language.name}</h4>
                       {selectedLanguage === language.code && (
                         <Check className="w-4 h-4 text-indigo-600" />
                       )}
                     </div>
                     <p className="text-xs text-gray-600">{language.nativeName}</p>
                     <p className="text-xs text-gray-500">{language.region}</p>
                     
                     {/* Supported Services */}
                     <div className="flex flex-wrap gap-1 mt-1">
                       {language.supportedBy.map((service) => (
                         <span
                           key={service}
                           className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                         >
                           {service === 'LibreTranslate' ? 'LT' : 
                            service === 'MyMemory' ? 'MM' : 'LG'}
                         </span>
                       ))}
                     </div>
                   </div>
                  
                  {/* Download Status */}
                  <div className="flex flex-col items-center gap-1">
                    {isDownloading ? (
                      <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    ) : language.isDownloaded ? (
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Download className="w-3 h-3 text-gray-600" />
                      </div>
                    )}
                    <span className="text-xs text-gray-500">
                      {isDownloading ? 'Downloading...' : language.isDownloaded ? 'Downloaded' : 'Download'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Regional Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Settings</h3>
          
          <div className="space-y-4">
            {regionSettings.map((setting) => {
              const IconComponent = setting.icon;
              
              return (
                <div key={setting.id} className="border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{setting.name}</h4>
                      <p className="text-xs text-gray-500">{setting.description}</p>
                    </div>
                  </div>
                  
                  <select
                    value={setting.value}
                    onChange={(e) => handleRegionChange(setting.id, e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
                  >
                    {setting.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        {/* Language Features */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Features</h3>
          
          <div className="space-y-4">
            {/* Translation Quality */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto-translation</p>
                  <p className="text-xs text-gray-500">Translate project descriptions</p>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            {/* Offline Languages */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Offline Mode</p>
                  <p className="text-xs text-gray-500">Download for offline use</p>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>

            {/* Smart Suggestions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Smart Suggestions</p>
                  <p className="text-xs text-gray-500">AI-powered language help</p>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Translation Service Status */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Translation Service</h3>
          
          <div className="space-y-4">
            {/* Service Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Service Status</p>
                  <p className="text-xs text-gray-500">
                    {translationServiceStatus 
                      ? `${translationServiceStatus.availableServices}/${translationServiceStatus.totalServices} services available`
                      : 'Click test to check service status'
                    }
                  </p>
                </div>
              </div>
              <button 
                onClick={testTranslationService}
                disabled={isTestingTranslation}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white text-sm rounded-lg transition-colors"
              >
                {isTestingTranslation ? 'Testing...' : 'Test Service'}
              </button>
            </div>

            {/* Service Details */}
            {translationServiceStatus && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                {translationServiceStatus.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{service.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      service.status === 'available' ? 'bg-green-100 text-green-800' :
                      service.status === 'unavailable' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {service.status === 'available' ? '✓ Available' :
                       service.status === 'unavailable' ? '✗ Unavailable' :
                       '? Unknown'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Test Translation */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-900 mb-3">Test On-the-Fly Translation</p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ca">Catalan</option>
                    <option value="rm">Romansh</option>
                  </select>
                  <span className="flex items-center text-gray-500">→</span>
                  <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900">
                    <option value="es">Spanish</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ca">Catalan</option>
                    <option value="rm">Romansh</option>
                  </select>
                </div>
                                 <div className="text-xs text-gray-500">
                   <p>• No API keys required</p>
                   <p>• Uses multiple free translation services</p>
                   <p>• Automatic fallback if service unavailable</p>
                   <p>• {languages.length} languages available for translation</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Languages */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Most Popular</h3>
          
          <div className="space-y-3">
            {languages
              .filter(l => l.isDownloaded && l.code !== selectedLanguage)
              .slice(0, 3)
              .map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className="w-full flex items-center gap-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{language.name}</p>
                    <p className="text-xs text-indigo-100">{language.nativeName}</p>
                  </div>
                  <Star className="w-4 h-4 text-yellow-300" />
                </button>
              ))}
          </div>
        </div>

        {/* Language Contribution */}
        <div className="bg-blue-50 rounded-3xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Help Translate</h4>
              <p className="text-xs text-blue-700 mb-2">
                Help make Reserve available in more languages by contributing translations.
              </p>
              <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
                Join the translation community →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
