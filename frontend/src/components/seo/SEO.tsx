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

    // Meta Description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute(
      "content",
      description
    );

    // Canonical URL
    if (canonical) {
      let canonicalTag = document.querySelector(
        'link[rel="canonical"]'
      );

      if (!canonicalTag) {
        canonicalTag = document.createElement("link");

        canonicalTag.setAttribute(
          "rel",
          "canonical"
        );

        document.head.appendChild(canonicalTag);
      }

      canonicalTag.setAttribute(
        "href",
        canonical
      );
    }

    // Open Graph: Title
    let ogTitle = document.querySelector(
      'meta[property="og:title"]'
    );

    if (!ogTitle) {
      ogTitle = document.createElement("meta");

      ogTitle.setAttribute(
        "property",
        "og:title"
      );

      document.head.appendChild(ogTitle);
    }

    ogTitle.setAttribute(
      "content",
      title
    );

    // Open Graph: Description
    let ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );

    if (!ogDescription) {
      ogDescription = document.createElement("meta");

      ogDescription.setAttribute(
        "property",
        "og:description"
      );

      document.head.appendChild(ogDescription);
    }

    ogDescription.setAttribute(
      "content",
      description
    );

    // Open Graph: Image
    let ogImage = document.querySelector(
      'meta[property="og:image"]'
    );

    if (!ogImage) {
      ogImage = document.createElement("meta");

      ogImage.setAttribute(
        "property",
        "og:image"
      );

      document.head.appendChild(ogImage);
    }

    ogImage.setAttribute(
      "content",
      "https://evoltecs.com/og-image.png"
    );

    // Open Graph: URL
    if (canonical) {
      let ogUrl = document.querySelector(
        'meta[property="og:url"]'
      );

      if (!ogUrl) {
        ogUrl = document.createElement("meta");

        ogUrl.setAttribute(
          "property",
          "og:url"
        );

        document.head.appendChild(ogUrl);
      }

      ogUrl.setAttribute(
        "content",
        canonical
      );
    }

    // Open Graph: Type
    let ogType = document.querySelector(
      'meta[property="og:type"]'
    );

    if (!ogType) {
      ogType = document.createElement("meta");

      ogType.setAttribute(
        "property",
        "og:type"
      );

      document.head.appendChild(ogType);
    }

    ogType.setAttribute(
      "content",
      "website"
    );

  }, [title, description, canonical]);

  return null;
};

export default SEO;