const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://evoltecs.com/#website",
    name: "EvolTechs Software Solutions",
    url: "https://evoltecs.com/",
    description:
      "Software, hosting, domains, cloud, cybersecurity and digital solutions for modern businesses.",
    publisher: {
      "@id": "https://evoltecs.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default WebsiteSchema;