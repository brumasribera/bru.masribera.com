# Preview Images for Social Media Sharing

This project now includes a comprehensive system for generating custom preview images (Open Graph images) that will display when your website is shared on WhatsApp, Instagram, Facebook, Twitter, and other social platforms.

## What It Does

- **Main Page**: Generates a preview image with your profile picture, name, and title
- **Project Pages**: Creates custom previews for each project with relevant images and information
- **Reserve Projects**: Generates 35+ individual preview images for each conservation project
- **Professional Design**: Uses a consistent green gradient theme with your branding

## Features

- **Responsive Design**: 1200x630px images optimized for social media
- **Dynamic Content**: Automatically includes project-specific information
- **Profile Integration**: Your profile picture is prominently displayed
- **Impact Metrics**: For Reserve projects, shows biodiversity, carbon, and community impact scores
- **Consistent Branding**: Maintains your website's visual identity

## Generated Images

### Main Pages
- `main.png` - Homepage with your profile and title
- `openhuts.png` - Open Huts Nature Network project
- `reserve.png` - Reserve conservation platform
- `clathes.png` - Clathes sustainable fashion
- `pix4d.png` - Pix4D 3D mapping solutions
- `wegaw.png` - Wegaw weather intelligence
- `pomoca.png` - Pomoca ski equipment
- `moodlenet.png` - MoodleNet open education

### Reserve Projects (35+ images)
- `reserve-mx-mangroves.png` - Mexico Mangroves
- `reserve-br-amazon.png` - Brazil Amazon
- `reserve-id-seagrass.png` - Indonesia Seagrass
- And many more...

## How to Generate Images

### Prerequisites
- Node.js installed
- Puppeteer (already included in dependencies)

### On-Demand Generation (Recommended)

**Generate main page images only:**
```bash
npm run generate-og-main
```

**Generate Reserve project images only:**
```bash
npm run generate-og-reserve
```

**Generate a single specific image:**
```bash
npm run generate-og-single main
npm run generate-og-single openhuts
npm run generate-og-single reserve
npm run generate-og-single clathes
npm run generate-og-single pix4d
npm run generate-og-single wegaw
npm run generate-og-single pomoca
npm run generate-og-single moodlenet
```

**Generate all images (when you need everything):**
```bash
npm run generate-og-images
```

### Why On-Demand?

- **Faster builds**: No image generation during deployment
- **Selective updates**: Only generate what you need
- **Quick testing**: Generate single images for testing
- **Better workflow**: Generate images when you're ready, not on every build

## How It Works

1. **Image Generation**: Uses Puppeteer to render HTML templates with Tailwind CSS
2. **Dynamic Content**: Injects project-specific data (titles, descriptions, images)
3. **Screenshot Capture**: Takes high-quality screenshots at 1200x630px
4. **File Output**: Saves images to `public/og-images/` directory

## Customization

### Modifying the Design
Edit `components/ui/OpenGraphImage.tsx` or `components/ui/DynamicOGImage.tsx` to change:
- Colors and gradients
- Layout and positioning
- Typography and sizing
- Background patterns

### Adding New Pages
Update the `PAGES` array in `scripts/generate-preview-images.js`:
```javascript
{
  name: 'new-project',
  path: '/new-project',
  title: 'New Project Title',
  subtitle: 'Project description',
  imageUrl: '/path/to/image.jpg',
  type: 'project'
}
```

### Adding New Reserve Projects
Update the `RESERVE_PROJECTS` array in the same file with new project data.

## Integration

### HTML Meta Tags
The system automatically updates your HTML with proper Open Graph meta tags:
- `og:title` - Page title
- `og:description` - Page description  
- `og:image` - Preview image URL
- `twitter:card` - Twitter card type
- And more...

### React Components
Use the `DynamicOGImage` component in your React pages for live previews:
```tsx
import { DynamicOGImage } from '../ui/DynamicOGImage';

<DynamicOGImage
  title="Project Title"
  subtitle="Project description"
  imageUrl="/path/to/image.jpg"
  projectType="project"
  projectCountry="Country Name"
  projectImpact={{ biodiversity: 85, carbon: 72, community: 77 }}
/>
```

## Deployment

1. **Generate Images**: Run `npm run generate-og-images`
2. **Commit Changes**: Add the generated images to your repository
3. **Deploy**: Images will be available at `https://bru.masribera.com/og-images/`

## Testing

### Social Media Debuggers
- **Facebook**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Local Testing
1. Start your dev server: `npm run dev`
2. Generate images: `npm run generate-og-images`
3. Test sharing on social platforms

## Troubleshooting

### Common Issues
- **Images not generating**: Ensure Puppeteer is installed and working
- **Wrong dimensions**: Check that viewport is set to 1200x630px
- **Missing fonts**: Tailwind CSS is loaded via CDN in the generation script
- **Image loading errors**: Verify image paths are correct

### Performance
- **Large file sizes**: Images are optimized PNGs, typically 100-500KB
- **Generation time**: Full generation takes 2-5 minutes depending on system
- **Memory usage**: Puppeteer uses ~100-200MB during generation

## Future Enhancements

- **WebP Support**: Generate modern image formats for better compression
- **Multiple Sizes**: Create images for different social platforms
- **Dynamic Generation**: Server-side image generation on-demand
- **A/B Testing**: Multiple design variations for optimization

## Support

For issues or questions about the preview image system:
1. Check the console output during generation
2. Verify all dependencies are installed
3. Ensure image paths are accessible
4. Check Puppeteer compatibility with your system

---

**Note**: This system generates static images that are then served as static assets. For dynamic content, consider implementing server-side image generation or using services like Vercel's OG Image generation.
