# Automatic PWA Support

This project now includes automatic PWA (Progressive Web App) support that works for any route without code duplication.

## How It Works

The system automatically:
- Detects the current route when a page loads
- Creates a route-specific PWA manifest with `start_url` pointing to that exact route
- Adds all necessary PWA meta tags for mobile installation
- Works on both Android and iOS devices
- Restores the original site manifest when leaving the page

## Usage

### Option 1: Using the HOC (Recommended)

Simply wrap any page component with `withPWASupport`:

```tsx
import { withPWASupport } from '../hocs/withPWASupport'

function MyPage() {
  return <div>My page content</div>
}

// Export with PWA support - just one line!
export default withPWASupport(MyPage, {
  name: 'My Page - Bru Mas Ribera',
  short_name: 'My Page',
  description: 'Description of my page',
  categories: ['productivity', 'utilities']
})
```

### Option 2: Using the Hook Directly

For more control, use the `usePWAManifest` hook directly:

```tsx
import { usePWAManifest } from '../hooks/usePWAManifest'

function MyPage() {
  usePWAManifest({
    name: 'My Page - Bru Mas Ribera',
    short_name: 'My Page',
    description: 'Description of my page',
    categories: ['productivity', 'utilities']
  })

  return <div>My page content</div>
}
```

## Configuration Options

All configuration options are optional and have sensible defaults:

```tsx
interface PWAManifestConfig {
  name?: string                    // Full app name
  short_name?: string             // Short app name (for home screen)
  description?: string            // App description
  start_url?: string              // URL to open when app launches (defaults to current route)
  scope?: string                  // App scope (defaults to current route)
  theme_color?: string            // Theme color (defaults to #3b82f6)
  background_color?: string       // Background color (defaults to #ffffff)
  display?: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'  // Display mode
  orientation?: 'portrait' | 'landscape' | 'portrait-primary' | 'landscape-primary'
  categories?: string[]           // App categories
}
```

## Benefits

✅ **Zero Code Duplication**: One hook/HOC handles all PWA functionality
✅ **Automatic Route Detection**: No need to manually specify routes
✅ **Cross-Platform**: Works on Android, iOS, and desktop
✅ **Performance**: No impact on build time, minimal runtime overhead
✅ **Maintainable**: Centralized PWA logic, easy to update
✅ **Flexible**: Can override any setting when needed

## Example: Adding PWA Support to Any Page

Before (manual approach):
```tsx
// ❌ Manual PWA setup - lots of code duplication
useEffect(() => {
  // Set manifest
  const manifest = document.querySelector("link[rel='manifest']")
  manifest.href = '/my-page/manifest.webmanifest'
  
  // Add meta tags
  const meta = document.createElement('meta')
  meta.name = 'mobile-web-app-capable'
  meta.content = 'yes'
  document.head.appendChild(meta)
  
  // Cleanup...
}, [])
```

After (automatic approach):
```tsx
// ✅ Automatic PWA setup - just one line!
export default withPWASupport(MyPage, {
  name: 'My Page - Bru Mas Ribera'
})
```

## Browser Support

- ✅ Chrome/Edge (Android)
- ✅ Safari (iOS)
- ✅ Firefox (Android)
- ✅ Samsung Internet
- ✅ All modern browsers

## Installation Process

1. User visits any page on your site
2. Page automatically gets PWA manifest for that specific route
3. User can install the page as an app from browser menu
4. When launched, the app opens directly to that specific route
5. No more redirecting to root - users get exactly what they expect!

## Troubleshooting

If PWA installation isn't working:

1. Check that the page has a proper `<title>` tag
2. Ensure the page is served over HTTPS (required for PWA)
3. Verify that the `usePWAManifest` hook or `withPWASupport` HOC is being used
4. Check browser console for any errors
5. Test on a supported browser/device

## Performance Notes

- The PWA manifest is generated dynamically using Blob URLs
- No additional network requests for manifest files
- Minimal memory footprint
- Automatic cleanup when components unmount
- No impact on initial page load time
