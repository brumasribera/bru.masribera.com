// Language detection based on geographic location
export interface LanguageSuggestion {
  languageCode: string;
  confidence: number;
  reason: string;
  country?: string;
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
    country: country
  }));
}

// Get the best language suggestion for a country
export function getBestLanguageForCountry(countryCode: string): LanguageSuggestion | null {
  const suggestions = getLanguageSuggestionsByCountry(countryCode);
  if (suggestions.length === 0) return null;
  
  // Return the suggestion with highest confidence
  return suggestions.reduce((best, current) => 
    current.confidence > best.confidence ? current : best
  );
}

// Detect user's location and suggest language
export async function detectLocationAndSuggestLanguage(): Promise<LanguageSuggestion | null> {
  try {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      return null;
    }

    // Get current position
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      });
    });

    // Reverse geocode to get country
    const { latitude, longitude } = position.coords;
    const countryCode = await reverseGeocodeToCountry(latitude, longitude);
    
    if (countryCode) {
      return getBestLanguageForCountry(countryCode);
    }

    return null;
  } catch (error) {
    console.log('Location detection failed:', error);
    return null;
  }
}

// Reverse geocode coordinates to country using a free service
async function reverseGeocodeToCountry(lat: number, lon: number): Promise<string | null> {
  try {
    // Use OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=3&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'BruMasriberaWebsite/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.address?.country_code?.toUpperCase() || null;
  } catch (error) {
    console.log('Reverse geocoding failed:', error);
    return null;
  }
}

// Get language suggestions based on browser language
export function getLanguageSuggestionsByBrowser(): LanguageSuggestion[] {
  const suggestions: LanguageSuggestion[] = [];
  
  // Check navigator.languages
  if (navigator.languages && navigator.languages.length > 0) {
    navigator.languages.forEach((lang, index) => {
      const langCode = lang.split('-')[0].toLowerCase();
      const confidence = Math.max(0.9 - (index * 0.1), 0.1); // Higher confidence for first languages
      
      if (isSupportedLanguage(langCode)) {
        suggestions.push({
          languageCode: langCode,
          confidence,
          reason: `Browser language preference #${index + 1}`,
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
        confidence: 0.8,
        reason: 'Browser primary language',
      });
    }
  }

  return suggestions;
}

// Check if a language code is supported
function isSupportedLanguage(langCode: string): boolean {
  const supportedLanguages = ['en', 'de', 'fr', 'es', 'ca', 'it', 'pt', 'rm'];
  return supportedLanguages.includes(langCode);
}

// Get comprehensive language suggestions combining all methods
export async function getComprehensiveLanguageSuggestions(): Promise<LanguageSuggestion[]> {
  const suggestions: LanguageSuggestion[] = [];
  
  // Add browser-based suggestions
  const browserSuggestions = getLanguageSuggestionsByBrowser();
  suggestions.push(...browserSuggestions);
  
  // Add location-based suggestions
  try {
    const locationSuggestion = await detectLocationAndSuggestLanguage();
    if (locationSuggestion) {
      // Check if we already have this language from browser
      const existingIndex = suggestions.findIndex(s => s.languageCode === locationSuggestion.languageCode);
      if (existingIndex >= 0) {
        // Boost confidence if both methods suggest the same language
        suggestions[existingIndex].confidence = Math.min(0.98, suggestions[existingIndex].confidence + 0.1);
        suggestions[existingIndex].reason += ` + ${locationSuggestion.reason}`;
      } else {
        suggestions.push(locationSuggestion);
      }
    }
  } catch (error) {
    console.log('Location-based detection failed:', error);
  }
  
  // Sort by confidence (highest first)
  return suggestions.sort((a, b) => b.confidence - a.confidence);
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
