// Language detection using multiple legal methods without user permissions
export interface LanguageSuggestion {
  languageCode: string;
  confidence: number;
  reason: string;
  country?: string;
  method: string;
}

// Country to language mapping with confidence scores
const countryLanguageMap: Record<string, Array<{ lang: string; confidence: number; reason: string }>> = {
  // Europe
  'DE': [{ lang: 'de', confidence: 0.95, reason: 'Primary language of Germany' }],
  'AT': [{ lang: 'de', confidence: 0.95, reason: 'Primary language of Austria' }],
  'CH': [
    { lang: 'de', confidence: 0.65, reason: 'German-speaking region of Switzerland' },
    { lang: 'fr', confidence: 0.25, reason: 'French-speaking region of Switzerland' },
    { lang: 'it', confidence: 0.08, reason: 'Italian-speaking region of Switzerland' },
    { lang: 'rm', confidence: 0.02, reason: 'Romansh-speaking region of Switzerland' }
  ],
  'FR': [{ lang: 'fr', confidence: 0.95, reason: 'Primary language of France' }],
  'BE': [
    { lang: 'fr', confidence: 0.55, reason: 'French-speaking region of Belgium' },
    { lang: 'de', confidence: 0.45, reason: 'German-speaking region of Belgium' }
  ],
  'IT': [{ lang: 'it', confidence: 0.95, reason: 'Primary language of Italy' }],
  'ES': [
    { lang: 'es', confidence: 0.85, reason: 'Primary language of Spain' },
    { lang: 'ca', confidence: 0.15, reason: 'Catalan-speaking regions of Spain' }
  ],
  'PT': [{ lang: 'pt', confidence: 0.95, reason: 'Primary language of Portugal' }],
  'GB': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of United Kingdom' }],
  'IE': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Ireland' }],

  // Americas
  'US': [{ lang: 'en', confidence: 0.85, reason: 'Primary language of United States' }],
  'CA': [
    { lang: 'en', confidence: 0.60, reason: 'English-speaking regions of Canada' },
    { lang: 'fr', confidence: 0.25, reason: 'French-speaking regions of Canada' }
  ],
  'MX': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Mexico' }],
  'BR': [{ lang: 'pt', confidence: 0.95, reason: 'Primary language of Brazil' }],
  'AR': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Argentina' }],
  'CO': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Colombia' }],
  'PE': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Peru' }],
  'VE': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Venezuela' }],
  'CL': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Chile' }],
  'EC': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Ecuador' }],
  'BO': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Bolivia' }],
  'PY': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Paraguay' }],
  'UY': [{ lang: 'es', confidence: 0.95, reason: 'Primary language of Uruguay' }],

  // Africa
  'ZA': [
    { lang: 'en', confidence: 0.40, reason: 'English-speaking regions of South Africa' },
    { lang: 'fr', confidence: 0.15, reason: 'French influence in South Africa' }
  ],
  'EG': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Egypt' }],
  'NG': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Nigeria' }],
  'KE': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Kenya' }],
  'TZ': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Tanzania' }],
  'UG': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Uganda' }],
  'GH': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Ghana' }],
  'ET': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Ethiopia' }],

  // Asia
  'IN': [
    { lang: 'en', confidence: 0.60, reason: 'English as business language in India' },
    { lang: 'pt', confidence: 0.05, reason: 'Portuguese influence in Goa' }
  ],
  'PK': [{ lang: 'en', confidence: 0.40, reason: 'English as business language in Pakistan' }],
  'BD': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Bangladesh' }],
  'LK': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Sri Lanka' }],
  'MY': [{ lang: 'en', confidence: 0.40, reason: 'English as business language in Malaysia' }],
  'SG': [{ lang: 'en', confidence: 0.70, reason: 'English as business language in Singapore' }],
  'PH': [{ lang: 'en', confidence: 0.60, reason: 'English as business language in Philippines' }],
  'HK': [{ lang: 'en', confidence: 0.50, reason: 'English as business language in Hong Kong' }],

  // Oceania
  'AU': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Australia' }],
  'NZ': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of New Zealand' }],
  'FJ': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Fiji' }],
  'PG': [{ lang: 'en', confidence: 0.95, reason: 'Primary language of Papua New Guinea' }],

  // Middle East
  'IL': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Israel' }],
  'AE': [{ lang: 'en', confidence: 0.40, reason: 'English as business language in UAE' }],
  'SA': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Saudi Arabia' }],
  'QA': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Qatar' }],
  'KW': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Kuwait' }],
  'BH': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Bahrain' }],
  'OM': [{ lang: 'en', confidence: 0.30, reason: 'English as business language in Oman' }]
};

// Timezone to language mapping (for regions with strong language associations)
const timezoneLanguageMap: Record<string, Array<{ lang: string; confidence: number; reason: string }>> = {
  'Europe/Berlin': [{ lang: 'de', confidence: 0.85, reason: 'German timezone' }],
  'Europe/Vienna': [{ lang: 'de', confidence: 0.85, reason: 'Austrian timezone' }],
  'Europe/Zurich': [
    { lang: 'de', confidence: 0.60, reason: 'Swiss German timezone' },
    { lang: 'fr', confidence: 0.25, reason: 'Swiss French timezone' },
    { lang: 'it', confidence: 0.10, reason: 'Swiss Italian timezone' }
  ],
  'Europe/Paris': [{ lang: 'fr', confidence: 0.90, reason: 'French timezone' }],
  'Europe/Brussels': [
    { lang: 'fr', confidence: 0.50, reason: 'Belgian French timezone' },
    { lang: 'de', confidence: 0.40, reason: 'Belgian German timezone' }
  ],
  'Europe/Rome': [{ lang: 'it', confidence: 0.90, reason: 'Italian timezone' }],
  'Europe/Madrid': [
    { lang: 'es', confidence: 0.80, reason: 'Spanish timezone' },
    { lang: 'ca', confidence: 0.15, reason: 'Catalan regions timezone' }
  ],
  'Europe/Lisbon': [{ lang: 'pt', confidence: 0.90, reason: 'Portuguese timezone' }],
  'Europe/London': [{ lang: 'en', confidence: 0.90, reason: 'British timezone' }],
  'Europe/Dublin': [{ lang: 'en', confidence: 0.90, reason: 'Irish timezone' }],
  'America/New_York': [{ lang: 'en', confidence: 0.80, reason: 'US Eastern timezone' }],
  'America/Chicago': [{ lang: 'en', confidence: 0.80, reason: 'US Central timezone' }],
  'America/Denver': [{ lang: 'en', confidence: 0.80, reason: 'US Mountain timezone' }],
  'America/Los_Angeles': [{ lang: 'en', confidence: 0.80, reason: 'US Pacific timezone' }],
  'America/Toronto': [
    { lang: 'en', confidence: 0.60, reason: 'Canadian English timezone' },
    { lang: 'fr', confidence: 0.25, reason: 'Canadian French timezone' }
  ],
  'America/Mexico_City': [{ lang: 'es', confidence: 0.90, reason: 'Mexican timezone' }],
  'America/Sao_Paulo': [{ lang: 'pt', confidence: 0.90, reason: 'Brazilian timezone' }],
  'America/Buenos_Aires': [{ lang: 'es', confidence: 0.90, reason: 'Argentine timezone' }],
  'Australia/Sydney': [{ lang: 'en', confidence: 0.90, reason: 'Australian timezone' }],
  'Australia/Melbourne': [{ lang: 'en', confidence: 0.90, reason: 'Australian timezone' }],
  'Pacific/Auckland': [{ lang: 'en', confidence: 0.90, reason: 'New Zealand timezone' }]
};

// Get language suggestions based on country code
export function getLanguageSuggestionsByCountry(countryCode: string): LanguageSuggestion[] {
  const country = countryCode.toUpperCase();
  const suggestions = countryLanguageMap[country];
  
  if (!suggestions) {
    return [];
  }

  return suggestions.map(suggestion => ({
    languageCode: suggestion.lang,
    confidence: suggestion.confidence,
    reason: suggestion.reason,
    country: country,
    method: 'country-mapping'
  }));
}

// Get language suggestions based on timezone
export function getLanguageSuggestionsByTimezone(): LanguageSuggestion[] {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const suggestions = timezoneLanguageMap[timezone];
    
    if (!suggestions) {
      return [];
    }

    return suggestions.map(suggestion => ({
      languageCode: suggestion.lang,
      confidence: suggestion.confidence,
      reason: suggestion.reason,
      method: 'timezone-inference'
    }));
  } catch (error) {
    console.log('Timezone detection failed:', error);
    return [];
  }
}

// Get language suggestions based on browser language
export function getLanguageSuggestionsByBrowser(): LanguageSuggestion[] {
  const suggestions: LanguageSuggestion[] = [];
  
  // Check navigator.languages (most reliable)
  if (navigator.languages && navigator.languages.length > 0) {
    navigator.languages.forEach((lang, index) => {
      const langCode = lang.split('-')[0].toLowerCase();
      const confidence = Math.max(0.95 - (index * 0.1), 0.1); // Higher confidence for first languages
      
      if (isSupportedLanguage(langCode)) {
        suggestions.push({
          languageCode: langCode,
          confidence,
          reason: `Browser language preference #${index + 1}`,
          method: 'browser-languages'
        });
      }
    });
  }
  
  // Check navigator.language as fallback
  if (navigator.language) {
    const langCode = navigator.language.split('-')[0].toLowerCase();
    if (isSupportedLanguage(langCode) && !suggestions.find(s => s.languageCode === langCode)) {
      suggestions.push({
        languageCode: langCode,
        confidence: 0.85,
        reason: 'Browser primary language',
        method: 'browser-language'
      });
    }
  }

  return suggestions;
}

// Get language suggestions based on Accept-Language header (if available)
export function getLanguageSuggestionsByAcceptLanguage(): LanguageSuggestion[] {
  const suggestions: LanguageSuggestion[] = [];
  
  try {
    // This would typically come from server-side, but we can check if it's available
    // For client-side, we'll use navigator.language as a proxy
    if (navigator.language) {
      const langCode = navigator.language.split('-')[0].toLowerCase();
      if (isSupportedLanguage(langCode)) {
        suggestions.push({
          languageCode: langCode,
          confidence: 0.80,
          reason: 'Accept-Language header equivalent',
          method: 'accept-language'
        });
      }
    }
  } catch (error) {
    console.log('Accept-Language detection failed:', error);
  }

  return suggestions;
}

// Detect country from IP using a free, legal service
export async function detectCountryFromIP(): Promise<string | null> {
  try {
    // Use ipapi.co (free tier, no API key required, GDPR compliant)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'BruMasriberaWebsite/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.country_code || null;
  } catch (error) {
    console.log('IP-based country detection failed:', error);
    return null;
  }
}

// Get language suggestions based on IP geolocation
export async function getLanguageSuggestionsByIP(): Promise<LanguageSuggestion[]> {
  try {
    const countryCode = await detectCountryFromIP();
    if (countryCode) {
      return getLanguageSuggestionsByCountry(countryCode);
    }
    return [];
  } catch (error) {
    console.log('IP-based language detection failed:', error);
    return [];
  }
}

// Check if a language code is supported
function isSupportedLanguage(langCode: string): boolean {
  const supportedLanguages = ['en', 'de', 'fr', 'es', 'ca', 'it', 'pt', 'rm'];
  return supportedLanguages.includes(langCode);
}

// Get comprehensive language suggestions using all available methods
export async function getComprehensiveLanguageSuggestions(): Promise<LanguageSuggestion[]> {
  const suggestions: LanguageSuggestion[] = [];
  
  // 1. Browser language preferences (highest confidence, most reliable)
  const browserSuggestions = getLanguageSuggestionsByBrowser();
  suggestions.push(...browserSuggestions);
  
  // 2. Timezone-based inference (good confidence, no network needed)
  const timezoneSuggestions = getLanguageSuggestionsByTimezone();
  suggestions.push(...timezoneSuggestions);
  
  // 3. IP-based country detection (good confidence, requires network)
  try {
    const ipSuggestions = await getLanguageSuggestionsByIP();
    suggestions.push(...ipSuggestions);
  } catch (error) {
    console.log('IP-based detection failed:', error);
  }
  
  // 4. Accept-Language header equivalent
  const acceptLanguageSuggestions = getLanguageSuggestionsByAcceptLanguage();
  suggestions.push(...acceptLanguageSuggestions);
  
  // Merge duplicate languages and boost confidence for multiple methods
  const mergedSuggestions = mergeLanguageSuggestions(suggestions);
  
  // Sort by confidence (highest first)
  return mergedSuggestions.sort((a, b) => b.confidence - a.confidence);
}

// Merge duplicate language suggestions and boost confidence
function mergeLanguageSuggestions(suggestions: LanguageSuggestion[]): LanguageSuggestion[] {
  const languageMap = new Map<string, LanguageSuggestion>();
  
  suggestions.forEach(suggestion => {
    const existing = languageMap.get(suggestion.languageCode);
    
    if (existing) {
      // Boost confidence when multiple methods suggest the same language
      const confidenceBoost = Math.min(0.15, existing.confidence * 0.1);
      existing.confidence = Math.min(0.98, existing.confidence + confidenceBoost);
      existing.reason += ` + ${suggestion.reason}`;
      existing.method += `, ${suggestion.method}`;
    } else {
      languageMap.set(suggestion.languageCode, { ...suggestion });
    }
  });
  
  return Array.from(languageMap.values());
}

// Get the best overall language suggestion
export async function getBestLanguageSuggestion(): Promise<LanguageSuggestion | null> {
  const suggestions = await getComprehensiveLanguageSuggestions();
  return suggestions.length > 0 ? suggestions[0] : null;
}

// Automatically select the best language for the user
export async function autoSelectBestLanguage(): Promise<string | null> {
  try {
    const bestSuggestion = await getBestLanguageSuggestion();
    
    if (bestSuggestion && bestSuggestion.confidence >= 0.7) {
      // Only auto-select if confidence is high enough (70%+)
      return bestSuggestion.languageCode;
    }
    
    return null;
  } catch (error) {
    console.log('Auto language selection failed:', error);
    return null;
  }
}

// Check if we should auto-select a language (first visit, no manual selection)
export function shouldAutoSelectLanguage(): boolean {
  try {
    // Check if user has manually selected a language before
    const hasUserSelectedLang = localStorage.getItem('hasUserSelectedLang') === '1';
    const hasAutoSelectedLang = localStorage.getItem('autoLanguageSelected') === 'true';
    
    // Auto-select if user hasn't manually selected AND we haven't auto-selected before
    return !hasUserSelectedLang && !hasAutoSelectedLang;
  } catch {
    // localStorage not available, allow auto-selection
    return true;
  }
}

// Mark that auto-language selection has been performed
export function markAutoLanguageSelected(): void {
  try {
    localStorage.setItem('autoLanguageSelected', 'true');
  } catch {
    // localStorage not available
  }
}
