/**
 * Free Translation Service for ReserveApp
 * Uses multiple free translation APIs as fallbacks - NO API KEYS REQUIRED
 */

export interface TranslationRequest {
  text: string;
  fromLang: string;
  toLang: string;
}

export interface TranslationResponse {
  translatedText: string;
  confidence?: number;
  service?: string;
}

/**
 * Language mapping for different services
 */
const LANGUAGE_CODES = {
  en: 'en',
  de: 'de', 
  fr: 'fr',
  es: 'es',
  ca: 'ca',
  it: 'it',
  pt: 'pt',
  rm: 'rm' // Romansh - will fallback to closest language
};

/**
 * Free translation using LibreTranslate (completely free, no API key)
 * Uses the public instance: https://libretranslate.com/
 */
async function translateWithLibreTranslate(request: TranslationRequest): Promise<TranslationResponse | null> {
  try {
    const { text, fromLang, toLang } = request;
    
    // LibreTranslate doesn't support Romansh, use German as fallback
    const targetLang = toLang === 'rm' ? 'de' : toLang;
    
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: fromLang,
        target: targetLang,
        format: 'text'
      })
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.translatedText) {
      return {
        translatedText: data.translatedText,
        confidence: 0.85,
        service: 'LibreTranslate'
      };
    }
    
    return null;
  } catch (error) {
    console.warn('LibreTranslate failed:', error);
    return null;
  }
}

/**
 * Free translation using MyMemory API (no API key required)
 * Limit: 10,000 characters/day per IP
 */
async function translateWithMyMemory(request: TranslationRequest): Promise<TranslationResponse | null> {
  try {
    const { text, fromLang, toLang } = request;
    
    // MyMemory doesn't support Romansh, use German as fallback
    const targetLang = toLang === 'rm' ? 'de' : toLang;
    
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${targetLang}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return {
        translatedText: data.responseData.translatedText,
        confidence: data.responseData.match || 0.7,
        service: 'MyMemory'
      };
    }
    
    return null;
  } catch (error) {
    console.warn('MyMemory translation failed:', error);
    return null;
  }
}

/**
 * Free translation using Lingva API (Google Translate proxy - no API key)
 * No rate limits but less reliable
 */
async function translateWithLingva(request: TranslationRequest): Promise<TranslationResponse | null> {
  try {
    const { text, fromLang, toLang } = request;
    
    // Lingva doesn't support Romansh, use German as fallback
    const targetLang = toLang === 'rm' ? 'de' : toLang;
    
    const response = await fetch(
      `https://lingva.ml/api/v1/${fromLang}/${targetLang}/${encodeURIComponent(text)}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.translation) {
      return {
        translatedText: data.translation,
        confidence: 0.8,
        service: 'Lingva'
      };
    }
    
    return null;
  } catch (error) {
    console.warn('Lingva translation failed:', error);
    return null;
  }
}

/**
 * Free translation using Google Translate web scraping (no API key)
 * Most reliable but slower
 */
async function translateWithGoogleTranslate(request: TranslationRequest): Promise<TranslationResponse | null> {
  try {
    const { text, fromLang, toLang } = request;
    
    // Google Translate doesn't support Romansh, use German as fallback
    const targetLang = toLang === 'rm' ? 'de' : toLang;
    
    // Use a free Google Translate proxy service
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return {
        translatedText: data[0][0][0],
        confidence: 0.9,
        service: 'GoogleTranslate'
      };
    }
    
    return null;
  } catch (error) {
    console.warn('Google Translate failed:', error);
    return null;
  }
}

/**
 * Comprehensive fallback translations for common words/phrases
 */
const FALLBACK_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Common UI elements
  'Search projects...': {
    de: 'Projekte suchen...',
    fr: 'Rechercher des projets...',
    es: 'Buscar proyectos...',
    ca: 'Cercar projectes...',
    it: 'Cerca progetti...',
    pt: 'Pesquisar projetos...',
    rm: 'Tschertgar projects...'
  },
  'Home': {
    de: 'Startseite',
    fr: 'Accueil',
    es: 'Inicio',
    ca: 'Inici',
    it: 'Home',
    pt: 'Início',
    rm: 'Chasa'
  },
  'Back': {
    de: 'Zurück',
    fr: 'Retour',
    es: 'Atrás',
    ca: 'Enrere',
    it: 'Indietro',
    pt: 'Voltar',
    rm: 'Enavos'
  },
  'Loading...': {
    de: 'Lädt...',
    fr: 'Chargement...',
    es: 'Cargando...',
    ca: 'Carregant...',
    it: 'Caricamento...',
    pt: 'Carregando...',
    rm: 'Chargia...'
  },
  'Continue': {
    de: 'Weiter',
    fr: 'Continuer',
    es: 'Continuar',
    ca: 'Continuar',
    it: 'Continua',
    pt: 'Continuar',
    rm: 'Cuntinuar'
  },
  'Cancel': {
    de: 'Abbrechen',
    fr: 'Annuler',
    es: 'Cancelar',
    ca: 'Cancel·lar',
    it: 'Annulla',
    pt: 'Cancelar',
    rm: 'Annullar'
  },
  'Save': {
    de: 'Speichern',
    fr: 'Enregistrer',
    es: 'Guardar',
    ca: 'Desar',
    it: 'Salva',
    pt: 'Salvar',
    rm: 'Memorisar'
  },
  'Delete': {
    de: 'Löschen',
    fr: 'Supprimer',
    es: 'Eliminar',
    ca: 'Eliminar',
    it: 'Elimina',
    pt: 'Excluir',
    rm: 'Stizzar'
  },
  'Edit': {
    de: 'Bearbeiten',
    fr: 'Modifier',
    es: 'Editar',
    ca: 'Editar',
    it: 'Modifica',
    pt: 'Editar',
    rm: 'Modifitgar'
  },
  'Settings': {
    de: 'Einstellungen',
    fr: 'Paramètres',
    es: 'Configuración',
    ca: 'Configuració',
    it: 'Impostazioni',
    pt: 'Configurações',
    rm: 'Configuraziun'
  },
  'Language': {
    de: 'Sprache',
    fr: 'Langue',
    es: 'Idioma',
    ca: 'Idioma',
    it: 'Lingua',
    pt: 'Idioma',
    rm: 'Lingua'
  },
  'Project': {
    de: 'Projekt',
    fr: 'Projet',
    es: 'Proyecto',
    ca: 'Projecte',
    it: 'Progetto',
    pt: 'Projeto',
    rm: 'Project'
  },
  'Area': {
    de: 'Bereich',
    fr: 'Zone',
    es: 'Área',
    ca: 'Àrea',
    it: 'Area',
    pt: 'Área',
    rm: 'Zona'
  },
  'Price': {
    de: 'Preis',
    fr: 'Prix',
    es: 'Precio',
    ca: 'Preu',
    it: 'Prezzo',
    pt: 'Preço',
    rm: 'Pretsch'
  },
  'Select': {
    de: 'Auswählen',
    fr: 'Sélectionner',
    es: 'Seleccionar',
    ca: 'Seleccionar',
    it: 'Seleziona',
    pt: 'Selecionar',
    rm: 'Tscherner'
  },
  'Choose': {
    de: 'Wählen',
    fr: 'Choisir',
    es: 'Elegir',
    ca: 'Triar',
    it: 'Scegli',
    pt: 'Escolher',
    rm: 'Tscherner'
  }
};

/**
 * Get fallback translation for common phrases
 */
function getFallbackTranslation(text: string, toLang: string): string | null {
  return FALLBACK_TRANSLATIONS[text]?.[toLang] || null;
}

/**
 * Cache for translations to avoid repeated API calls
 */
const translationCache = new Map<string, TranslationResponse>();

function getCacheKey(text: string, fromLang: string, toLang: string): string {
  return `${fromLang}-${toLang}-${text}`;
}

/**
 * Main translation function with multiple fallbacks
 */
export async function translateText(request: TranslationRequest): Promise<string> {
  const { text, fromLang, toLang } = request;
  
  // Return original text if same language
  if (fromLang === toLang) {
    return text;
  }
  
  // Check cache first
  const cacheKey = getCacheKey(text, fromLang, toLang);
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached.translatedText;
  }
  
  // Try fallback translations for common phrases first
  const fallback = getFallbackTranslation(text, toLang);
  if (fallback) {
    translationCache.set(cacheKey, { translatedText: fallback, service: 'Fallback' });
    return fallback;
  }
  
  // Try translation services in order of preference (most reliable first)
  const services = [
    translateWithGoogleTranslate,    // Most reliable
    translateWithLibreTranslate,     // Good reliability, no rate limits
    translateWithMyMemory,          // Good but has daily limits
    translateWithLingva             // Least reliable but no limits
  ];
  
  for (const service of services) {
    try {
      const result = await service(request);
      if (result?.translatedText) {
        // Cache successful translation
        translationCache.set(cacheKey, result);
        return result.translatedText;
      }
    } catch (error) {
      console.warn(`Translation service failed:`, error);
    }
  }
  
  // Return original text if all translation attempts fail
  console.warn(`All translation attempts failed for: ${text}`);
  return text;
}

/**
 * Batch translation for multiple texts
 */
export async function translateBatch(
  texts: string[], 
  fromLang: string, 
  toLang: string
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  
  // Process translations in parallel but with delay to respect rate limits
  const translations = await Promise.allSettled(
    texts.map(async (text, index) => {
      // Add small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, index * 200));
      
      const translated = await translateText({ text, fromLang, toLang });
      return { original: text, translated };
    })
  );
  
  translations.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      results[result.value.original] = result.value.translated;
    } else {
      // Fallback to original text if translation fails
      results[texts[index]] = texts[index];
    }
  });
  
  return results;
}

/**
 * Check if a language is supported by the translation service
 */
export function isLanguageSupported(langCode: string): boolean {
  return Object.keys(LANGUAGE_CODES).includes(langCode);
}

/**
 * Get the closest supported language for unsupported languages
 */
export function getClosestSupportedLanguage(langCode: string): string {
  // Romansh -> German (closest related language)
  if (langCode === 'rm') return 'de';
  
  // Default to English for unsupported languages
  return Object.keys(LANGUAGE_CODES).includes(langCode) ? langCode : 'en';
}

/**
 * Get translation service status and health
 */
export async function getTranslationServiceStatus(): Promise<{
  services: Array<{ name: string; status: 'available' | 'unavailable' | 'unknown' }>;
  totalServices: number;
  availableServices: number;
}> {
  const services = [
    { name: 'Google Translate', testFn: translateWithGoogleTranslate },
    { name: 'LibreTranslate', testFn: translateWithLibreTranslate },
    { name: 'MyMemory', testFn: translateWithMyMemory },
    { name: 'Lingva', testFn: translateWithLingva }
  ];
  
  const statuses = await Promise.allSettled(
    services.map(async (service) => {
      try {
        const result = await service.testFn({
          text: 'Hello',
          fromLang: 'en',
          toLang: 'es'
        });
        return { name: service.name, status: result ? 'available' : 'unavailable' as const };
      } catch {
        return { name: service.name, status: 'unavailable' as const };
      }
    })
  );
  
  const results: Array<{ name: string; status: 'available' | 'unavailable' | 'unknown' }> = statuses.map((result, index) => 
    result.status === 'fulfilled' ? result.value : { name: services[index].name, status: 'unknown' as 'available' | 'unavailable' | 'unknown' }
  );
  
  const availableServices = results.filter(r => r.status === 'available').length;
  
  return {
    services: results,
    totalServices: services.length,
    availableServices
  };
}
