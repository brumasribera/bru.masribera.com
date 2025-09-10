# Reserve App Deployment Guide

## 🚀 Complete Setup for Reserve App Integration

### Current Status
- ✅ Reserve app separated into standalone project
- ✅ Smart iframe component created for automatic URL detection
- ✅ Main project updated to use iframe integration
- ✅ Local development working

## 📋 Deployment Steps

### 1. Deploy Reserve App to Vercel

```bash
# Navigate to Reserve app directory
cd reserve-app

# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Note the deployment URL (e.g., https://reserve-app-xyz.vercel.app)
```

### 2. Update Production URL

After deployment, update the production URL in the iframe component:

**File:** `components/ui/ReserveAppIframe.tsx`

```typescript
// Production URL is now configured as:
return 'https://reserve-app-chi.vercel.app'
```

### 3. Deploy Main Project

```bash
# In the main project directory
npm run build
vercel --prod
```

## 🔧 Local Development

### Running Both Apps Locally

**Terminal 1 - Main Project:**
```bash
npm run dev
# Runs on http://localhost:3000 (or next available port)
```

**Terminal 2 - Reserve App:**
```bash
cd reserve-app
npm run dev
# Runs on http://localhost:3002
```

### Testing Integration

1. **Phone Mockup**: Visit `http://localhost:3000/reserve`
2. **Full Screen**: Visit `http://localhost:3000/reserve-app`

## 🌐 Production URLs

### Main Project
- **URL**: `https://bru.masribera.com`
- **Reserve Page**: `https://bru.masribera.com/reserve`
- **Full Screen**: `https://bru.masribera.com/reserve-app`

### Reserve App (Standalone)
- **URL**: `https://reserve-app-chi.vercel.app`
- **Direct Access**: Users can access the app directly

## 🔄 Iframe Integration Points

The Reserve app is now integrated via iframe in these locations:

1. **ReservePage.tsx** - Phone mockup display
2. **ReserveFullScreenPage.tsx** - Full-screen display

Both use the `ReserveAppIframe` component which automatically:
- Uses `http://localhost:3002` in local development
- Uses production URL when deployed

## 🛠️ Configuration Files

### Reserve App (`reserve-app-standalone/`)
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration (port 3002)
- `vercel.json` - Vercel deployment config
- `tailwind.config.ts` - Styling configuration

### Main Project
- `components/ui/ReserveAppIframe.tsx` - Smart iframe component
- `components/pages/ReservePage.tsx` - Updated to use iframe
- `components/pages/ReserveFullScreenPage.tsx` - Updated to use iframe

## 🚨 Important Notes

### CORS Configuration
The Reserve app needs to allow iframe embedding. The `vercel.json` includes:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

### Security Considerations
- Iframe sandbox attributes are configured for security
- Only necessary permissions are granted
- Content Security Policy should be considered for production

## 🔍 Troubleshooting

### Iframe Not Loading
1. Check if Reserve app is running on correct port
2. Verify CORS settings
3. Check browser console for errors
4. Ensure both apps are running simultaneously

### Port Conflicts
- Main app: Will find next available port (3000, 3001, 3002, etc.)
- Reserve app: Always runs on 3002
- Iframe component automatically detects correct URL

### Production Issues
1. Verify Reserve app deployment URL
2. Check iframe component URL configuration
3. Test iframe loading in production environment
4. Verify CORS and security headers

## 📱 Mobile Testing

Test on different screen sizes:
- Desktop: Full iframe experience
- Mobile: Responsive iframe sizing
- Tablet: Proper scaling and touch interactions

## 🎯 Next Steps After Deployment

1. **Test Integration**: Verify iframe loads correctly in production
2. **Performance**: Monitor loading times and optimize if needed
3. **Analytics**: Add tracking for iframe interactions
4. **Custom Domain**: Consider custom domain for Reserve app
5. **Monitoring**: Set up error tracking for both applications

## 🔗 URLs Summary

| Environment | Main App | Reserve App | Integration |
|-------------|----------|-------------|-------------|
| Local Dev | localhost:3000+ | localhost:3002 | ✅ Working |
| Production | bru.masribera.com | reserve-app-chi.vercel.app | ✅ Ready |

The integration is now complete and ready for production deployment!


