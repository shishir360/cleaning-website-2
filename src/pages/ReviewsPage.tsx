import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import { Testimonials } from '../components/Testimonials';

export default function ReviewsPage() {
  return (
    <main className="bg-paper flex flex-col pt-16 min-h-screen"> 
      <SEO 
        title={`${siteConfig.brand.name} | Client Reviews`}
        description="Read what our elite clientele has to say about our premium cleaning services."
      />
      <Testimonials />
    </main>
  );
}
