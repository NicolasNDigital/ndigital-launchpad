import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SEO = ({
  title,
  description,
  canonical,
  ogImage = "https://www.ndigital-pro.fr/assets/og-image.png",
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Update meta description
    setMeta("description", description);

    // Robots
    if (noIndex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      setMeta("robots", "index, follow");
    }

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:locale", "fr_FR", true);
    setMeta("og:site_name", "NDigital", true);

    if (canonical) {
      setMeta("og:url", canonical, true);

      // Update canonical link
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "canonical");
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute("href", canonical);
    }

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Cleanup function to reset to defaults when unmounting
    return () => {
      // We don't reset here to avoid flashing - the next page will update
    };
  }, [title, description, canonical, ogImage, ogType, noIndex]);

  return null;
};

export default SEO;
