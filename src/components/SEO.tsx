import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Francisco Menendez - Full Stack Developer & Designer',
  description = 'I build beautiful, responsive, and user-friendly web applications with modern technologies. Experienced in React, TypeScript, Node.js, and more.',
  keywords = 'Francisco Menendez, Full Stack Developer, React Developer, TypeScript, JavaScript, Web Developer, Frontend, Backend, Portfolio',
  author = 'Francisco Menendez',
  image = '/og-image.jpg',
  url = 'https://fmenemo.github.io',
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('robots', 'index, follow');

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Francisco Menendez Portfolio', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO meta tags
    updateMetaTag('theme-color', '#0066cc');
    updateMetaTag('msapplication-TileColor', '#0066cc');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);
  }, [title, description, keywords, author, image, url]);

  return null;
};

export default SEO;
