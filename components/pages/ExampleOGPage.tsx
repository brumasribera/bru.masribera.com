
import { DynamicOGImage } from '../ui/DynamicOGImage';
import { useOpenGraph } from '../hooks/useOpenGraph';

export function ExampleOGPage() {
  // Example Open Graph meta data for this page
  const ogMeta = {
    title: 'Open Huts Nature Network - Example Page',
    description: 'Connecting nature enthusiasts with sustainable mountain experiences worldwide',
    image: '/og-images/openhuts.png',
    url: 'https://bru.masribera.com/openhuts',
    type: 'website',
    siteName: 'Bru Mas Ribera Portfolio',
    twitterCard: 'summary_large_image'
  };

  // Apply Open Graph meta tags
  useOpenGraph(ogMeta);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Open Graph Image Example
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How to Use Open Graph Components
          </h2>
          
          <p className="text-gray-600 mb-4">
            This page demonstrates how to use the Open Graph components and hooks for social media sharing.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Key Features:</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Automatic meta tag generation</li>
              <li>• Responsive preview images</li>
              <li>• Dynamic content injection</li>
              <li>• Social media optimization</li>
            </ul>
          </div>
        </div>

        {/* Live Preview of the Open Graph Image */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Live Preview (Responsive)
          </h2>
          
          <p className="text-gray-600 mb-4">
            This is how your Open Graph image will look when shared on social media:
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <DynamicOGImage
              title="Open Huts Nature Network"
              subtitle="Connecting nature enthusiasts with sustainable mountain experiences worldwide"
              imageUrl="/open-huts/hut-view.png"
              projectType="project"
              projectCountry="Global"
              className="mx-auto"
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>This preview automatically scales to fit different screen sizes</p>
            <p>The actual generated image is 1200x630px for optimal social media sharing</p>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Implementation Code
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`import { DynamicOGImage } from '../ui/DynamicOGImage';
import { useOpenGraph } from '../hooks/useOpenGraph';

export function YourPage() {
  // Define Open Graph meta data
  const ogMeta = {
    title: 'Your Page Title',
    description: 'Your page description',
    image: '/og-images/your-page.png',
    url: 'https://bru.masribera.com/your-page',
    type: 'website'
  };

  // Apply meta tags automatically
  useOpenGraph(ogMeta);

  return (
    <div>
      {/* Your page content */}
      
      {/* Optional: Live preview component */}
      <DynamicOGImage
        title="Your Title"
        subtitle="Your subtitle"
        imageUrl="/path/to/image.jpg"
        projectType="project"
        projectCountry="Country"
      />
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Usage Instructions
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">1. Generate Images</h3>
              <p className="text-gray-600">Run the generation script to create all preview images:</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm run generate-og-images</code>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">2. Add Meta Tags</h3>
              <p className="text-gray-600">Use the useOpenGraph hook in your page component:</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">useOpenGraph(ogMeta)</code>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">3. Optional Preview</h3>
              <p className="text-gray-600">Add the DynamicOGImage component for live previews:</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">&lt;DynamicOGImage /&gt;</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExampleOGPage;
