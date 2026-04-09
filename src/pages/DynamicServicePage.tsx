import { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { SEO } from '../components/SEO';

export default function DynamicServicePage() {
  const { slug } = useParams();
  
  const service = siteConfig.services.find(s => s.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main className="bg-paper flex flex-col pt-16">
      <SEO 
        title={`${service.title} | ${siteConfig.brand.name}`}
        description={service.shortDesc}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <img 
          src={service.imgUrl} 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
          alt={service.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <span className="text-tertiary text-xs font-bold uppercase tracking-[0.3em]">{siteConfig.brand.name} Service Protocol</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-inverted mb-6 max-w-3xl leading-[1.1]"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-inverted/80 max-w-2xl font-light leading-relaxed mb-10"
          >
            {service.shortDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
             <Link to="/booking" className="inline-flex items-center gap-3 bg-tertiary text-primary hover:bg-inverted transition-colors px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-xl">
               Book This Service <ArrowRight className="w-4 h-4" />
             </Link>
          </motion.div>
        </div>
      </section>

      {/* Protocol Details */}
      <section className="py-32 bg-paper relative">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-tertiary text-sm font-bold tracking-widest uppercase mb-4 block">The Methodology</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-8">Systematic Execution.</h2>
            <p className="text-secondary text-lg font-light leading-relaxed mb-8">
              {service.fullDesc}
            </p>
            <div className="space-y-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b border-primary/5 pb-4">
                   <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-tertiary" />
                   </div>
                   <span className="font-medium text-primary">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative"
          >
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
               <img src={service.imgUrl} alt={service.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-primary/10"></div>
             </div>
             <div className="absolute top-10 -left-10 w-full h-full rounded-[3rem] border border-tertiary/30 z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-center px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-inverted mb-8">Require absolute perfection?</h2>
        <Link to="/booking" className="inline-block bg-tertiary text-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-inverted transition-colors">
          Initiate Booking
        </Link>
      </section>
    </main>
  );
}
