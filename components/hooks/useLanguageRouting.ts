import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromUrl, getPathWithoutLanguage, addLanguageToPath, supportedLanguages } from '../../src/i18n';

export const useLanguageRouting = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(getLanguageFromUrl());
  const languageChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update language when URL changes
  useEffect(() => {
    const urlLanguage = getLanguageFromUrl();
    if (urlLanguage !== currentLanguage) {
      // Update state immediately for instant response
      setCurrentLanguage(urlLanguage);
      
      // Only change i18n language if different to avoid unnecessary operations
      if (i18n.language !== urlLanguage) {
        // Use requestIdleCallback for non-critical language change
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            i18n.changeLanguage(urlLanguage);
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            i18n.changeLanguage(urlLanguage);
          }, 0);
        }
      }
    }
  }, [location.pathname, currentLanguage, i18n]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (languageChangeTimeoutRef.current) {
        clearTimeout(languageChangeTimeoutRef.current);
      }
    };
  }, []);

  // Change language and update URL with debouncing
  const changeLanguage = useCallback((newLanguage: string) => {
    if (!supportedLanguages.includes(newLanguage)) {
      console.warn(`Unsupported language: ${newLanguage}`);
      return;
    }

    // Clear any pending language change
    if (languageChangeTimeoutRef.current) {
      clearTimeout(languageChangeTimeoutRef.current);
    }

    // Update state immediately for instant response
    setCurrentLanguage(newLanguage);
    
    const currentPath = getPathWithoutLanguage(location.pathname);
    
    // Don't change language on timer pages to preserve PWA routing
    if (currentPath.includes('/tools/timer')) {
      console.log('Language change blocked on timer page to preserve PWA routing');
      return;
    }
    
    const newPath = addLanguageToPath(currentPath, newLanguage);
    
    // Update URL immediately
    navigate(newPath, { replace: true });
    
    // Debounce i18n language change to prevent rapid successive changes
    languageChangeTimeoutRef.current = setTimeout(() => {
      if (i18n.language !== newLanguage) {
        i18n.changeLanguage(newLanguage);
      }
      languageChangeTimeoutRef.current = null;
    }, 50); // 50ms debounce for smooth performance
  }, [i18n, location.pathname, navigate]);

  // Get current path without language prefix
  const getCurrentPathWithoutLanguage = () => {
    return getPathWithoutLanguage(location.pathname);
  };

  // Add language to a specific path
  const getLocalizedPath = (path: string, language?: string) => {
    const targetLanguage = language || currentLanguage;
    return addLanguageToPath(path, targetLanguage);
  };

  return {
    currentLanguage,
    changeLanguage,
    getCurrentPathWithoutLanguage,
    getLocalizedPath,
    supportedLanguages,
  };
};
