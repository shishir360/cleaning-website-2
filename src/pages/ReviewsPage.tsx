import { motion } from 'motion/react';
import { Star, MessageSquare } from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import { Testimonials } from '../components/Testimonials';
import { ThreeDText } from '../components/ui/ThreeDText';

export default function ReviewsPage() {
  const metaStats = [
    { label: "Client Satisfaction", value: "98.8%" },
    { label: "Elite Members", value: "1,200+" },
    { label: "Years of Excellence", value: "12+" },
  ];

  return (
    <main className="bg-primary flex flex-col min-h-screen"> 
      <SEO 
        title={`Elite Testimonials | ${siteConfig.brand.name}`}
        description="Read what our elite clientele has to say about our premium cleaning services."
      />

      {/* Luxury Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(192,160,98,0.08)_0%,transparent_70%)] z-10" />
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tertiary/20 bg-tertiary/5 text-tertiary text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              <Star className="w-3 h-3 fill-tertiary" /> Client Testimonials
            </motion.div>
            
            <h1 className="font-serif text-5xl md:text-8xl text-inverted mb-8 tracking-tight">
              <ThreeDText text="Client" wordMode={true} /> <br />
              <span className="text-tertiary">Voices.</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-inverted/60 font-light max-w-2xl mx-auto leading-relaxed mb-16"
            >
              Our reputation is built upon the trust of New York's most discerning residents. Discover why Lumina remains the premier choice for luxury home curation.
            </motion.p>

            {/* Quick Stats Block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-y border-inverted/10 py-12">
              {metaStats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="space-y-1"
                >
                  <p className="text-tertiary text-3xl font-serif">{stat.value}</p>
                  <p className="text-inverted/40 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="py-20 bg-primary relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <Testimonials />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative overflow-hidden bg-primary border-t border-inverted/5">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <MessageSquare className="w-12 h-12 text-tertiary mx-auto mb-8" />
          <h2 className="font-serif text-4xl md:text-5xl text-inverted mb-6">Experience the Difference.</h2>
          <p className="text-inverted/60 font-light text-lg mb-10 mb-8">Ready to elevate your living standard? Your sanctuary deserves the Lumina touch.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/booking" className="bg-tertiary text-primary px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-inverted transition-all shadow-[0_0_30px_rgba(192,160,98,0.3)]">
              Inquire Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
