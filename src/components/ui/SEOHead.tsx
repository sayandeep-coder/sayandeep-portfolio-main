import { useEffect } from 'react';
import { CONTACT_INFO } from '../../data/navigation';
import type { PageSEO } from '../../lib/seo';

interface SEOHeadProps {
  seo: PageSEO;
}

export function SEOHead({ seo }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = seo.title;

    // Helper to set or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Set description
    setMeta('description', seo.description);

    // 2b. Ensure tab favicon is explicitly set to sayandeep logo
    let icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.href = '/sayandeep.png?v=2';

    // 3. Set Canonical URL
    const baseUrl = CONTACT_INFO.siteUrl.replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}${seo.canonicalPath || ''}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:type', seo.ogType || 'website', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:site_name', 'Sayandeep Purkait Portfolio', true);
    if (seo.ogImage) {
      setMeta('og:image', seo.ogImage, true);
      setMeta('og:image:width', '1254', true);
      setMeta('og:image:height', '1254', true);
      setMeta('og:image:alt', seo.title, true);
    }

    // 5. Twitter Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    if (seo.ogImage) {
      setMeta('twitter:image', seo.ogImage);
    }

    // 6. JSON-LD structured data
    let jsonLdScript = document.getElementById('json-ld-seo') as HTMLScriptElement | null;
    if (seo.jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'json-ld-seo';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(seo.jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }
  }, [seo]);

  return null;
}
