type SEOProps = {
    title: string;
    description: string;
  };
  
  export default function SEO({ title, description }: SEOProps) {
    return (
      <>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </>
    );
  }
  