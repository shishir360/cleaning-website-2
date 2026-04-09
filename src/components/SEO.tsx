import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export function SEO({ title, description, image }: SEOProps) {
  const defaultTitle = `${siteConfig.brand.name} | ${siteConfig.brand.taglineHeading}`;
  const fullTitle = title 
    ? (title.includes(siteConfig.brand.name) ? title : `${title} | ${siteConfig.brand.name}`) 
    : defaultTitle;
  
  const metaDescription = description || siteConfig.brand.taglineSubheading;
  const metaImage = image || siteConfig.images.homeHero || siteConfig.brand.logoUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
    </Helmet>
  );
}
