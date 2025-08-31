# Language URL Feature

This project now supports language-specific URLs, allowing you to share your site with specific languages.

## How It Works

### URL Structure
- **English (default)**: `/` → `/en`
- **Spanish**: `/es`
- **Catalan**: `/ca`
- **French**: `/fr`
- **German**: `/de`
- **Italian**: `/it`
- **Portuguese**: `/pt`

### Examples
- **Home page in Spanish**: `https://bru.masribera.com/es`
- **OpenHuts project in Catalan**: `https://bru.masribera.com/ca/openhuts`
- **Reserve project in French**: `https://bru.masribera.com/fr/reserve`
- **CV page in German**: `https://bru.masribera.com/de/cv`

## Features

### 1. Automatic Language Detection
- The site automatically detects the language from the URL
- If no language is specified, it redirects to English (`/en`)
- Legacy URLs without language prefixes automatically redirect to English

### 2. Language Switching
- Use the language switcher in the header to change languages
- The URL automatically updates when switching languages
- All navigation maintains the selected language

### 3. Shareable URLs
- Each language has its own unique URL
- Share specific language versions with others
- Bookmark pages in your preferred language

### 4. SEO Friendly
- Search engines can index different language versions
- Each language version has its own URL path
- Proper language meta tags for better search results

## Usage

### For Visitors
1. **Direct Access**: Navigate directly to a language-specific URL
2. **Language Switcher**: Use the globe icon in the header to change languages
3. **Bookmarking**: Bookmark pages in your preferred language

### For Sharing
- **Spanish speakers**: Share `/es` URLs
- **Catalan speakers**: Share `/ca` URLs
- **French speakers**: Share `/fr` URLs
- And so on for all supported languages

### For Developers
The system includes:
- `useLanguageRouting` hook for language-aware navigation
- Automatic URL generation with `getLocalizedPath()`
- Language detection from URL paths
- Seamless integration with React Router

## Technical Implementation

### Components
- `useLanguageRouting` - Custom hook for language routing
- `LanguageURL` - Component showing current language URL
- Updated routing in `App.tsx`
- Language-aware navigation in all components

### Routing
- All routes are prefixed with language codes
- Automatic redirects for legacy URLs
- Language state management with i18n

### URL Generation
```typescript
const { getLocalizedPath } = useLanguageRouting();
const spanishUrl = getLocalizedPath('/openhuts', 'es'); // /es/openhuts
const currentLangUrl = getLocalizedPath('/reserve'); // Uses current language
```

## Benefits

1. **Better User Experience**: Users can bookmark and share specific language versions
2. **SEO Improvement**: Search engines can properly index different language versions
3. **Professional Appearance**: Shows commitment to international users
4. **Easy Sharing**: Simple URLs for each language
5. **Accessibility**: Clear language identification in URLs

## Supported Languages

- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇨🇦 Catalan (ca)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)

## Future Enhancements

- Language-specific meta descriptions
- Hreflang tags for better SEO
- Language detection based on user's browser settings
- Automatic language switching based on geographic location
