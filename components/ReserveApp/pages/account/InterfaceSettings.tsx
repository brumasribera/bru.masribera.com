import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Palette,
  Monitor,
  Sun,
  Moon,
  Smartphone,
  Eye,
  Type,
  Zap,
  Volume2,
  VolumeX,
  Vibrate,
  Grid3X3,
  Layout,
  Sliders,
  Sparkles,
  Contrast,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Download,
  Upload
} from "lucide-react";

interface InterfaceSettingsProps {
  onBack: () => void;
}

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

interface FontOption {
  id: string;
  name: string;
  family: string;
  preview: string;
}

export function InterfaceSettings({ onBack }: InterfaceSettingsProps) {
  const { t } = useTranslation('reserve');
  
  const [activeTab, setActiveTab] = useState<'theme' | 'display' | 'interaction' | 'accessibility'>('theme');
  
  // Theme Settings
  const [selectedTheme, setSelectedTheme] = useState('nature');
  const [darkMode, setDarkMode] = useState(false);
  const [autoTheme, setAutoTheme] = useState(true);
  
  // Display Settings
  const [fontSize, setFontSize] = useState(16);
  const [selectedFont, setSelectedFont] = useState('system');
  const [compactMode, setCompactMode] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  
  // Interaction Settings
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [gestureControls, setGestureControls] = useState(true);
  const [quickActions, setQuickActions] = useState(true);
  
  // Accessibility Settings
  const [screenReaderSupport, setScreenReaderSupport] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [largeTargets, setLargeTargets] = useState(false);

  const [themeOptions] = useState<ThemeOption[]>([
    {
      id: 'nature',
      name: 'Nature Green',
      description: 'Inspired by forests and natural landscapes',
      preview: '🌿',
      colors: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#34d399',
        background: '#f0fdf4'
      }
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      description: 'Reflecting marine conservation efforts',
      preview: '🌊',
      colors: {
        primary: '#0ea5e9',
        secondary: '#0284c7',
        accent: '#38bdf8',
        background: '#f0f9ff'
      }
    },
    {
      id: 'earth',
      name: 'Earth Tones',
      description: 'Warm browns and golden hues',
      preview: '🌍',
      colors: {
        primary: '#d97706',
        secondary: '#b45309',
        accent: '#fbbf24',
        background: '#fffbeb'
      }
    },
    {
      id: 'sunset',
      name: 'Sunset',
      description: 'Vibrant oranges and pinks',
      preview: '🌅',
      colors: {
        primary: '#f97316',
        secondary: '#ea580c',
        accent: '#fb923c',
        background: '#fff7ed'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple design',
      preview: '⚪',
      colors: {
        primary: '#6b7280',
        secondary: '#4b5563',
        accent: '#9ca3af',
        background: '#f9fafb'
      }
    }
  ]);

  const [fontOptions] = useState<FontOption[]>([
    {
      id: 'system',
      name: 'System Default',
      family: '-apple-system, BlinkMacSystemFont, sans-serif',
      preview: 'Aa'
    },
    {
      id: 'inter',
      name: 'Inter',
      family: 'Inter, sans-serif',
      preview: 'Aa'
    },
    {
      id: 'roboto',
      name: 'Roboto',
      family: 'Roboto, sans-serif',
      preview: 'Aa'
    },
    {
      id: 'poppins',
      name: 'Poppins',
      family: 'Poppins, sans-serif',
      preview: 'Aa'
    },
    {
      id: 'opensans',
      name: 'Open Sans',
      family: 'Open Sans, sans-serif',
      preview: 'Aa'
    }
  ]);

  const resetToDefaults = () => {
    setSelectedTheme('nature');
    setDarkMode(false);
    setAutoTheme(true);
    setFontSize(16);
    setSelectedFont('system');
    setCompactMode(false);
    setShowAnimations(true);
    setHighContrast(false);
    setHapticFeedback(true);
    setSoundEffects(true);
    setGestureControls(true);
    setQuickActions(true);
    setScreenReaderSupport(false);
    setReduceMotion(false);
    setLargeTargets(false);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto" style={{ maxHeight: '700px', maxWidth: '380px' }}>
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="interface-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="15" height="15" rx="3" fill="white" opacity="0.4"/>
              <rect x="30" y="30" width="15" height="15" rx="3" fill="white" opacity="0.3"/>
              <rect x="50" y="10" width="15" height="15" rx="3" fill="white" opacity="0.2"/>
              <circle cx="60" cy="60" r="5" fill="white" opacity="0.3"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#interface-pattern)" />
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
          
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Reset</span>
          </button>
        </div>
        
        {/* Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <Palette className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Interface</h1>
          <p className="text-purple-100 text-sm text-center px-4">Customize your app experience</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-6 overflow-x-auto">
          {[
            { key: 'theme', label: 'Theme', icon: Palette },
            { key: 'display', label: 'Display', icon: Monitor },
            { key: 'interaction', label: 'Controls', icon: Zap },
            { key: 'accessibility', label: 'Access', icon: Eye }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === key
                  ? 'border-purple-500 text-purple-600'
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
        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <>
            {/* Dark Mode Toggle */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance Mode</h3>
              
              <div className="space-y-4">
                {/* Auto Theme */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Automatic</p>
                      <p className="text-xs text-gray-500">Follow system setting</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAutoTheme(!autoTheme)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoTheme ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoTheme ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Manual Mode Selection */}
                {!autoTheme && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                        !darkMode ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                        darkMode ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Moon className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Color Themes */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Theme</h3>
              
              <div className="space-y-3">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-colors text-left ${
                      selectedTheme === theme.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Color Preview */}
                    <div className="flex gap-1">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    
                    {/* Theme Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{theme.preview}</span>
                        <span className="text-sm font-medium text-gray-900">{theme.name}</span>
                        {selectedTheme === theme.id && (
                          <Check className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{theme.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Display Tab */}
        {activeTab === 'display' && (
          <>
            {/* Font Settings */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
              
              <div className="space-y-4">
                {/* Font Size */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Font Size</label>
                    <span className="text-sm text-purple-600 font-medium">{fontSize}px</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ZoomOut className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="12"
                        max="24"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((fontSize - 12) / 12) * 100}%, #e5e7eb ${((fontSize - 12) / 12) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    <button
                      onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ZoomIn className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Font Family</label>
                  <div className="space-y-2">
                    {fontOptions.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors ${
                          selectedFont === font.id 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="text-2xl font-medium"
                            style={{ fontFamily: font.family }}
                          >
                            {font.preview}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{font.name}</span>
                        </div>
                        {selectedFont === font.id && (
                          <Check className="w-5 h-5 text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Settings */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout & Display</h3>
              
              <div className="space-y-4">
                {/* Compact Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Compact Mode</p>
                      <p className="text-xs text-gray-500">Reduce spacing and padding</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCompactMode(!compactMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      compactMode ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      compactMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Animations */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Animations</p>
                      <p className="text-xs text-gray-500">Enable smooth transitions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAnimations(!showAnimations)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showAnimations ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showAnimations ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Contrast className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">High Contrast</p>
                      <p className="text-xs text-gray-500">Increase color contrast</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      highContrast ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Interaction Tab */}
        {activeTab === 'interaction' && (
          <>
            {/* Feedback Settings */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback</h3>
              
              <div className="space-y-4">
                {/* Haptic Feedback */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Vibrate className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Haptic Feedback</p>
                      <p className="text-xs text-gray-500">Vibration on interactions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHapticFeedback(!hapticFeedback)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      hapticFeedback ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      hapticFeedback ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {soundEffects ? <Volume2 className="w-5 h-5 text-gray-600" /> : <VolumeX className="w-5 h-5 text-gray-600" />}
                    <div>
                      <p className="text-sm font-medium text-gray-900">Sound Effects</p>
                      <p className="text-xs text-gray-500">Audio feedback for actions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSoundEffects(!soundEffects)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      soundEffects ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEffects ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Control Settings */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Controls</h3>
              
              <div className="space-y-4">
                {/* Gesture Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Gesture Controls</p>
                      <p className="text-xs text-gray-500">Swipe and pinch gestures</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setGestureControls(!gestureControls)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      gestureControls ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      gestureControls ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Quick Actions</p>
                      <p className="text-xs text-gray-500">Shortcuts and fast access</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setQuickActions(!quickActions)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      quickActions ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      quickActions ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Accessibility Tab */}
        {activeTab === 'accessibility' && (
          <>
            {/* Screen Reader */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessibility</h3>
              
              <div className="space-y-4">
                {/* Screen Reader Support */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Screen Reader Support</p>
                      <p className="text-xs text-gray-500">Enhanced accessibility labels</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setScreenReaderSupport(!screenReaderSupport)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      screenReaderSupport ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      screenReaderSupport ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Reduce Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Layout className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reduce Motion</p>
                      <p className="text-xs text-gray-500">Minimize animations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setReduceMotion(!reduceMotion)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      reduceMotion ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      reduceMotion ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Large Touch Targets */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Large Touch Targets</p>
                      <p className="text-xs text-gray-500">Bigger buttons and controls</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setLargeTargets(!largeTargets)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      largeTargets ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      largeTargets ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Export/Import Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings Backup</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-6 h-6 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Export</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Upload className="w-6 h-6 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Import</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
