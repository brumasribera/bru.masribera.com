import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Legacy single-namespace files used by parts of the app (navigation, languages, etc.)
import enTranslation from './locales/en/translation.json';
import deTranslation from './locales/de/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import caTranslation from './locales/ca/translation.json';
import itTranslation from './locales/it/translation.json';
import ptTranslation from './locales/pt/translation.json';
import rmTranslation from './locales/rm/translation.json';

// Structured namespaces
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enOpenHuts from './locales/en/pages/openhuts.json';
import enReserve from './locales/en/pages/reserve.json';
import enCv from './locales/en/cv.json';
import enMoodlenet from './locales/en/pages/moodlenet.json';
import enPix4d from './locales/en/pages/pix4d.json';
import enPomoca from './locales/en/pages/pomoca.json';
import enClathes from './locales/en/pages/clathes.json';
import enWegaw from './locales/en/pages/wegaw.json';

// German translations - some fallback to English
import deCommon from './locales/en/common.json';
import deHome from './locales/de/home.json';
import deOpenHuts from './locales/de/pages/openhuts.json';
import deReserve from './locales/de/pages/reserve.json';
import deCv from './locales/de/cv.json';
import deMoodlenet from './locales/de/pages/moodlenet.json';
import dePix4d from './locales/de/pages/pix4d.json';
import dePomoca from './locales/de/pages/pomoca.json';
import deClathes from './locales/de/pages/clathes.json';
import deWegaw from './locales/de/pages/wegaw.json';

// French translations - some fallback to English
import frCommon from './locales/en/common.json';
import frHome from './locales/fr/home.json';
import frOpenHuts from './locales/fr/pages/openhuts.json';
import frReserve from './locales/fr/pages/reserve.json';
import frCv from './locales/fr/cv.json';
import frMoodlenet from './locales/fr/pages/moodlenet.json';
import frPix4d from './locales/fr/pages/pix4d.json';
import frPomoca from './locales/fr/pages/pomoca.json';
import frClathes from './locales/fr/pages/clathes.json';
import frWegaw from './locales/fr/pages/wegaw.json';

// Spanish translations - some fallback to English
import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esOpenHuts from './locales/es/pages/openhuts.json';
import esReserve from './locales/es/pages/reserve.json';
import esCv from './locales/es/cv.json';
import esMoodlenet from './locales/es/pages/moodlenet.json';
import esPix4d from './locales/es/pages/pix4d.json';
import esPomoca from './locales/es/pages/pomoca.json';
import esClathes from './locales/es/pages/clathes.json';
import esWegaw from './locales/es/pages/wegaw.json';

// Catalan translations - some fallback to English
import caCommon from './locales/ca/common.json';
import caHome from './locales/ca/home.json';
import caOpenHuts from './locales/ca/pages/openhuts.json';
import caReserve from './locales/ca/pages/reserve.json';
import caCv from './locales/ca/cv.json';
import caMoodlenet from './locales/ca/pages/moodlenet.json';
import caPix4d from './locales/ca/pages/pix4d.json';
import caPomoca from './locales/ca/pages/pomoca.json';
import caClathes from './locales/ca/pages/clathes.json';
import caWegaw from './locales/ca/pages/wegaw.json';

import itCommon from './locales/en/common.json';
import itHome from './locales/it/home.json';
import itOpenHuts from './locales/it/pages/openhuts.json';
import itReserve from './locales/it/pages/reserve.json';
import itCv from './locales/it/cv.json';
import itMoodlenet from './locales/it/pages/moodlenet.json';
import itPix4d from './locales/it/pages/pix4d.json';
import itPomoca from './locales/it/pages/pomoca.json';
import itClathes from './locales/it/pages/clathes.json';
import itWegaw from './locales/it/pages/wegaw.json';

import ptCommon from './locales/en/common.json';
import ptHome from './locales/pt/home.json';
import ptOpenHuts from './locales/pt/pages/openhuts.json';
import ptReserve from './locales/pt/pages/reserve.json';
import ptCv from './locales/pt/cv.json';
import ptMoodlenet from './locales/pt/pages/moodlenet.json';
import ptPix4d from './locales/pt/pages/pix4d.json';
import ptPomoca from './locales/pt/pages/pomoca.json';
import ptClathes from './locales/pt/pages/clathes.json';
import ptWegaw from './locales/pt/pages/wegaw.json';
import rmCommon from './locales/rm/common.json';
import rmHome from './locales/rm/home.json';
import rmOpenHuts from './locales/rm/pages/openhuts.json';
import rmReserve from './locales/rm/pages/reserve.json';
import rmCv from './locales/rm/cv.json';
import rmMoodlenet from './locales/rm/pages/moodlenet.json';
import rmPix4d from './locales/rm/pages/pix4d.json';
import rmPomoca from './locales/rm/pages/pomoca.json';
import rmClathes from './locales/rm/pages/clathes.json';
import rmWegaw from './locales/rm/pages/wegaw.json';

// Supported languages
export const supportedLanguages = ['en', 'de', 'fr', 'es', 'ca', 'it', 'pt', 'rm'];

// Function to get language from URL
export const getLanguageFromUrl = (): string => {
  const pathname = window.location.pathname;
  const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return langMatch ? langMatch[1] : 'en';
};

// Function to get path without language prefix
export const getPathWithoutLanguage = (pathname: string): string => {
  const langMatch = pathname.match(/^\/([a-z]{2})(\/.*|$)/);
  return langMatch ? langMatch[2] || '/' : pathname;
};

// Function to add language to path
export const addLanguageToPath = (path: string, language: string): string => {
  if (language === 'en') {
    return path;
  }
  return `/${language}${path}`;
};

const resources = {
  en: {
    translation: enTranslation,
    common: enCommon,
    home: enHome,
    openhuts: enOpenHuts,
    reserve: enReserve,
    moodlenet: enMoodlenet,
    pix4d: enPix4d,
    pomoca: enPomoca,
    clathes: enClathes,
    wegaw: enWegaw,
    cv: enCv,
  },
  de: {
    translation: deTranslation,
    common: deCommon,
    home: deHome,
    openhuts: deOpenHuts,
    reserve: deReserve,
    moodlenet: deMoodlenet,
    pix4d: dePix4d,
    pomoca: dePomoca,
    clathes: deClathes,
    wegaw: deWegaw,
    cv: deCv,
  },
  fr: {
    translation: frTranslation,
    common: frCommon,
    home: frHome,
    openhuts: frOpenHuts,
    reserve: frReserve,
    moodlenet: frMoodlenet,
    pix4d: frPix4d,
    pomoca: frPomoca,
    clathes: frClathes,
    wegaw: frWegaw,
    cv: frCv,
  },
  es: {
    translation: esTranslation,
    common: esCommon,
    home: esHome,
    openhuts: esOpenHuts,
    reserve: esReserve,
    moodlenet: esMoodlenet,
    pix4d: esPix4d,
    pomoca: esPomoca,
    clathes: esClathes,
    wegaw: esWegaw,
    cv: esCv,
  },
  ca: {
    translation: caTranslation,
    common: caCommon,
    home: caHome,
    openhuts: caOpenHuts,
    reserve: caReserve,
    moodlenet: caMoodlenet,
    pix4d: caPix4d,
    pomoca: caPomoca,
    clathes: caClathes,
    wegaw: caWegaw,
    cv: caCv,
  },
  it: {
    translation: itTranslation,
    common: itCommon,
    home: itHome,
    openhuts: itOpenHuts,
    reserve: itReserve,
    moodlenet: itMoodlenet,
    pix4d: itPix4d,
    pomoca: itPomoca,
    clathes: itClathes,
    wegaw: itWegaw,
    cv: itCv,
  },
  pt: {
    translation: ptTranslation,
    common: ptCommon,
    home: ptHome,
    openhuts: ptOpenHuts,
    reserve: ptReserve,
    moodlenet: ptMoodlenet,
    pix4d: ptPix4d,
    pomoca: ptPomoca,
    clathes: ptClathes,
    wegaw: ptWegaw,
    cv: ptCv,
  },
  rm: {
    translation: rmTranslation,
    common: rmCommon,
    home: rmHome,
    openhuts: rmOpenHuts,
    reserve: rmReserve,
    moodlenet: rmMoodlenet,
    pix4d: rmPix4d,
    pomoca: rmPomoca,
    clathes: rmClathes,
    wegaw: rmWegaw,
    cv: rmCv,
  },
};

const initI18n = async () => {
  try {
    // Get initial language from URL
    const initialLang = getLanguageFromUrl();
    
    const enabledLocize = (import.meta as any).env?.VITE_LOCIZE_ENABLED

    let i18nInstance = i18n.use(LanguageDetector).use(initReactI18next)

    if (enabledLocize) {
      try {
        const backendModuleName = 'i18next-locize-backend'
        const editorModuleName = 'locize-editor'
        // @vite-ignore prevents pre-bundling when not installed
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { default: LocizeBackend } = await import(/* @vite-ignore */ backendModuleName)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { default: LocizeEditor } = await import(/* @vite-ignore */ editorModuleName)
        // @ts-ignore dynamic plugin
        i18nInstance = i18nInstance.use(LocizeBackend)
        // @ts-ignore dynamic plugin
        i18nInstance = i18nInstance.use(LocizeEditor)
      } catch (e) {
        console.warn('Locize not available, continuing without it', e)
      }
    }

    // Initialize i18n
    i18n.init({
      resources,
      lng: initialLang,
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false
      }
    }).then(() => {
      // i18n initialized successfully
    }).catch((error) => {
      console.error('Failed to initialize i18n:', error)
    })
    
    // Re-apply any locally saved edits to persist across reloads
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key) continue
        if (key.startsWith('translations-edits:')) {
          const [, composite] = key.split(':')
          const [lng, ns] = (composite || '').split(':')
          if (lng && ns) {
            const raw = localStorage.getItem(key)
            if (raw) {
              const bundle = JSON.parse(raw)
              i18n.addResourceBundle(lng, ns, bundle, true, true)
            }
          }
        }
      }
    } catch (e) {
      console.warn('Failed to re-apply local translation edits', e)
    }

  } catch (error) {
    console.error('Failed to initialize i18n:', error);
  }
};

// Initialize i18n immediately
const initPromise = initI18n();

// Export a function to check if i18n is ready
export const isI18nReady = () => i18n.isInitialized;

// Export the ready promise
export const i18nReady = initPromise;

export default i18n;
