import { useState } from 'react';
import { Copy, Check, Globe } from 'lucide-react';
import { Button } from './button';
import { useLanguageRouting } from '../hooks/useLanguageRouting';
import { useTranslation } from 'react-i18next';

export function LanguageURL() {
  const { currentLanguage, getLocalizedPath } = useLanguageRouting();
  const { t } = useTranslation(['common']);
  const [copied, setCopied] = useState(false);

  const currentURL = window.location.origin + getLocalizedPath(window.location.pathname);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <Globe className="h-4 w-4 text-gray-500" />
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {t('languages.currentLanguage')}: <strong>{currentLanguage.toUpperCase()}</strong>
      </span>
      <div className="flex-1 min-w-0">
        <code className="text-xs text-gray-700 dark:text-gray-300 truncate block">
          {currentURL}
        </code>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
