# 🌍 Multilingual System Implementation

This project now includes a comprehensive multilingual system using `react-i18next` with support for 7 languages.

## 🚀 Features

- **7 Languages Supported**: English, German, French, Spanish, Catalan, Italian, Portuguese
- **Automatic Language Detection**: Detects user's preferred language from browser settings
- **Persistent Language Selection**: Remembers user's language choice in localStorage
- **Fallback System**: Falls back to English if a translation is missing
- **Comprehensive Coverage**: All app content including Reserve app and all projects
- **Easy Language Switching**: Globe icon in header for quick language changes

## 📁 File Structure

```
src/
├── i18n.ts                           # Main i18n configuration
├── locales/                          # Translation files directory
│   ├── en/translation.json          # English translations
│   ├── de/translation.json          # German translations
│   ├── fr/translation.json          # French translations
│   ├── es/translation.json          # Spanish translations
│   ├── ca/translation.json          # Catalan translations
│   ├── it/translation.json          # Italian translations
│   └── pt/translation.json          # Portuguese translations
components/
├── ui/
│   └── LanguageSwitcher.tsx         # Language switcher component
└── layout/
    └── Header.tsx                   # Updated header with language switcher
```

## 🛠️ Installation & Setup

### 1. Dependencies
The following packages are already installed:
```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

### 2. Configuration
The `src/i18n.ts` file is already configured with:
- Language detection from localStorage, browser, and HTML tag
- Fallback to English
- All 7 language resources loaded

### 3. App Integration
The `src/main.tsx` already imports the i18n configuration.

## 📖 How to Use

### Basic Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hero.description')}</p>
      <button onClick={() => i18n.changeLanguage('de')}>
        Switch to German
      </button>
    </div>
  );
}
```

### Available Translation Keys

#### Navigation
- `t('navigation.home')` → "Home" / "Startseite" / "Accueil" / etc.
- `t('navigation.about')` → "About" / "Über uns" / "À propos" / etc.
- `t('navigation.projects')` → "Projects" / "Projekte" / "Projets" / etc.

#### Hero Section
- `t('hero.title')` → "Hi, I'm Bru Masribera" / "Hallo, ich bin Bru Masribera" / etc.
- `t('hero.subtitle')` → "Full Stack Developer & UI/UX Designer" / etc.
- `t('hero.description')` → "Passionate about creating..." / etc.

#### Projects (including Reserve)
- `t('reserve.title')` → "Reserve" / "Reserve" / "Reserve" / etc.
- `t('reserve.description')` → "A comprehensive reservation..." / etc.
- `t('reserve.openApp')` → "Open App" / "App öffnen" / "Ouvrir l'app" / etc.
- `t('clathes.title')` → "Clathes" / "Clathes" / "Clathes" / etc.
- `t('moodleNet.title')` → "MoodleNet" / "MoodleNet" / "MoodleNet" / etc.

#### Common Actions
- `t('common.loading')` → "Loading..." / "Wird geladen..." / "Chargement..." / etc.
- `t('common.save')` → "Save" / "Speichern" / "Sauvegarder" / etc.
- `t('common.cancel')` → "Cancel" / "Abbrechen" / "Annuler" / etc.

### Language Switching

```tsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('de')}>Deutsch</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      {/* ... other languages */}
    </div>
  );
}
```

## 🌐 Language Codes

| Language | Code | Native Name |
|----------|------|-------------|
| English | `en` | English |
| German | `de` | Deutsch |
| French | `fr` | Français |
| Spanish | `es` | Español |
| Catalan | `ca` |Català |
| Italian | `it` | Italiano |
| Portuguese | `pt` | Português |

## 🔧 Adding New Translations

### 1. Add New Keys to All Language Files

**English (`src/locales/en/translation.json`):**
```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "New section description"
  }
}
```

**German (`src/locales/de/translation.json`):**
```json
{
  "newSection": {
    "title": "Neuer Abschnitt Titel",
    "description": "Neuer Abschnitt Beschreibung"
  }
}
```

### 2. Use in Components

```tsx
const { t } = useTranslation();

return (
  <div>
    <h2>{t('newSection.title')}</h2>
    <p>{t('newSection.description')}</p>
  </div>
);
```

## 🎯 Best Practices

1. **Always use translation keys**: Never hardcode text strings
2. **Use nested keys**: Organize translations logically (e.g., `reserve.features.title`)
3. **Provide fallbacks**: Always have English translations as fallback
4. **Test all languages**: Ensure translations work in all supported languages
5. **Keep translations concise**: Avoid very long translation strings

## 🚨 Troubleshooting

### Common Issues

1. **Translation not showing**: Check if the key exists in all language files
2. **Language not switching**: Ensure `i18n.changeLanguage()` is called correctly
3. **Build errors**: Check if all translation files are properly formatted JSON

### Debug Mode

To enable debug mode, set `debug: true` in `src/i18n.ts`:

```tsx
i18n.init({
  // ... other options
  debug: true, // Enable debug logging
});
```

## 📱 Mobile Support

The language switcher is fully responsive and works on all screen sizes. The globe icon in the header provides easy access to language switching on mobile devices.

## 🔄 Future Enhancements

- [ ] Add more languages (e.g., Dutch, Swedish, Norwegian)
- [ ] Implement RTL language support (Arabic, Hebrew)
- [ ] Add language-specific date/time formatting
- [ ] Implement number formatting per locale
- [ ] Add language-specific currency formatting

## 📚 Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [i18next Browser Language Detector](https://github.com/i18next/i18next-browser-languagedetector)

---

**Note**: This multilingual system covers the entire application including the Reserve app and all project pages. All user-facing text should use translation keys for consistency across languages.

