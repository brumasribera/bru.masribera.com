import { useEffect } from 'react';

interface OpenGraphMeta {
  title: string;
  description: string;
  image: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterCard?: string;
}

export function useOpenGraph(meta: OpenGraphMeta) {
  useEffect(() => {
    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) ||
                   document.querySelector(`meta[name="${property}"]`);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Basic Open Graph tags
    updateMetaTag('og:title', meta.title);
    updateMetaTag('og:description', meta.description);
    updateMetaTag('og:image', meta.image);
    updateMetaTag('og:url', meta.url || window.location.href);
    updateMetaTag('og:type', meta.type || 'website');
    updateMetaTag('og:site_name', meta.siteName || 'Bru Mas Ribera');

    // Twitter Card tags
    updateMetaTag('twitter:card', meta.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:title', meta.title);
    updateMetaTag('twitter:description', meta.description);
    updateMetaTag('twitter:image', meta.image);

    // Additional meta tags for better social sharing
    updateMetaTag('description', meta.description);
    
    // Set page title
    document.title = meta.title;

    // Cleanup function to remove dynamically added meta tags
    return () => {
      const dynamicMetaTags = document.querySelectorAll('meta[property^="og:"], meta[property^="twitter:"]');
      dynamicMetaTags.forEach(tag => {
        if (tag.getAttribute('property')?.startsWith('og:') || 
            tag.getAttribute('property')?.startsWith('twitter:')) {
          tag.remove();
        }
      });
    };
  }, [meta]);
}

export default useOpenGraph;
