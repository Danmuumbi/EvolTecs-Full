import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

const SEO = ({
  title,
  description,
  canonical,
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    // Meta description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", description);

    // Canonical URL
    if (canonical) {
      let canonicalTag = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }

      canonicalTag.setAttribute("href", canonical);
    }

    // Open Graph metadata
    const setMeta = (
      property: string,
      content: string
    ) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement | null;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", "website");
    setMeta(
      "og:url",
      canonical || "https://evoltecs.com"
    );
    setMeta(
      "og:image",
      "https://evoltecs.com/og-image.png"
    );

    // Twitter metadata
    const setTwitterMeta = (
      name: string,
      content: string
    ) => {
      let meta = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement | null;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    setTwitterMeta(
      "twitter:card",
      "summary_large_image"
    );
    setTwitterMeta("twitter:title", title);
    setTwitterMeta(
      "twitter:description",
      description
    );
    setTwitterMeta(
      "twitter:image",
      "https://evoltecs.com/og-image.png"
    );
  }, [title, description, canonical]);

  return null;
};

export default SEO;