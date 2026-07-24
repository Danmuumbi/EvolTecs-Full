const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://evoltecs.com/#organization",
    name: "EvolTechs Software Solutions",
    url: "https://evoltecs.com",
    logo: "https://evoltecs.com/og-image.png",
    description:
      "EvolTechs Software Solutions provides custom software development, domain registration, web hosting, business email, cloud solutions, cybersecurity, AI, and digital technology solutions.",
    sameAs: [
      // Add your official social media URLs here later
    ],
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

export default OrganizationSchema;