import { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { useLanguageRouting } from '../hooks/useLanguageRouting';

// Approximate native+L2 speakers to sort by reach
const languages = [
  { code: 'en', flag: '/icons/flags/england-flag.png', speakers: 1500 },
  { code: 'es', flag: '/icons/flags/spain-flag.png', speakers: 560 },
  { code: 'fr', flag: '/icons/flags/france-flag.png', speakers: 320 },
  { code: 'pt', flag: '/icons/flags/portugal-flag.png', speakers: 260 },
  { code: 'de', flag: '/icons/flags/germany-flag.png', speakers: 200 },
  { code: 'it', flag: '/icons/flags/italy-flag.png', speakers: 85 },
  { code: 'ca', flag: '/icons/flags/canada-flag.png', speakers: 10 },
  { code: 'rm', flag: '/icons/flags/romania-flag.png', speakers: 0.06 },
].sort((a, b) => b.speakers - a.speakers);

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguageRouting();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hasUserSelectedLang, setHasUserSelectedLang] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hasUserSelectedLang') === '1';
    } catch {
      return false;
    }
  });

  const getLanguageName = (code: string) => {
    const key = `languages.${code}`;
    const localized = t(key);
    if (localized === key && code === 'rm') return 'Rumantsch';
    return localized;
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = async (languageCode: string) => {
    if (isChanging || languageCode === currentLanguage) return;
    
    setIsChanging(true);
    
    // Save scroll position immediately for instant response
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    
    // Dispatch custom event to save scroll position before language change
    window.dispatchEvent(new CustomEvent('languageChange'));
    
    // Change language immediately for instant response
    changeLanguage(languageCode);
    setIsOpen(false);
    
    try {
      localStorage.setItem('hasUserSelectedLang', '1');
    } catch {}
    setHasUserSelectedLang(true);
    
    // Reset loading state after a short delay
    setTimeout(() => setIsChanging(false), 100);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Show all languages including Romansh
  const displayed = languages;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleButtonClick}
        disabled={isChanging}
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-8 h-8 transition-opacity"
      >
        {isChanging ? (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        ) : hasUserSelectedLang ? (
          <span className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
            {currentLanguage.toUpperCase()}
          </span>
        ) : (
          <Globe className="w-4 h-4" />
        )}
      </Button>
      
      {/* Language dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
          {displayed.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isChanging}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center ${
                currentLanguage === language.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <img 
                src={language.flag} 
                alt={`${getLanguageName(language.code)} flag`}
                className="w-6 h-4 mr-3 rounded-sm object-cover"
              />
              <span className="flex-1 text-gray-700 dark:text-gray-300">{getLanguageName(language.code)}</span>
              {currentLanguage === language.code && (
                <span className="ml-2 text-blue-600 dark:text-blue-400 text-sm">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
