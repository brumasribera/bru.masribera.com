import { useState } from "react";
import { 
  ArrowLeft, 
  Palette,
  Monitor
} from "lucide-react";

interface InterfaceSettingsProps {
  onBack: () => void;
}

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  preview: string;
}

export function InterfaceSettings({ onBack }: InterfaceSettingsProps) {
  
  // Theme Settings
  const [selectedTheme, setSelectedTheme] = useState('nature');
  const [darkMode, setDarkMode] = useState(false);
  
  // Display Settings
  const [fontSize, setFontSize] = useState(16);
  const [compactMode, setCompactMode] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);

  const [themeOptions] = useState<ThemeOption[]>([
    {
      id: 'nature',
      name: 'Nature',
      description: 'Earth tones and natural colors',
      preview: 'bg-gradient-to-br from-green-400 to-emerald-600'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      description: 'Cool blues and teals',
      preview: 'bg-gradient-to-br from-blue-400 to-cyan-600'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      description: 'Warm oranges and purples',
      preview: 'bg-gradient-to-br from-orange-400 to-purple-600'
    }
  ]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto relative">
      {/* Header */}
      <div className="relative h-32 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="settings-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white"/>
              <circle cx="10" cy="10" r="0.5" fill="white"/>
              <circle cx="50" cy="20" r="0.5" fill="white"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#settings-pattern)" />
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
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">App Settings</h1>
            <p className="text-white/80 text-sm">Customize your experience</p>
          </div>
          
          <div className="w-10 h-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Theme Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            Theme
          </h3>
          
          <div className="space-y-4">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Choose Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedTheme === theme.id
                        ? 'border-purple-500 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-xl mb-2 ${theme.preview}`} />
                    <div className="text-center">
                      <div className="font-medium text-sm text-gray-900">{theme.name}</div>
                      <div className="text-xs text-gray-500">{theme.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-gray-900">Dark Mode</div>
                <div className="text-sm text-gray-500">Switch to dark theme</div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            Display
          </h3>
          
          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-gray-900">Compact Mode</div>
                <div className="text-sm text-gray-500">Reduce spacing between elements</div>
              </div>
              <button
                onClick={() => setCompactMode(!compactMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  compactMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    compactMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-gray-900">Show Animations</div>
                <div className="text-sm text-gray-500">Enable smooth transitions</div>
              </div>
              <button
                onClick={() => setShowAnimations(!showAnimations)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showAnimations ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showAnimations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-4">
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
