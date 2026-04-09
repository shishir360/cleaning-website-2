import { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { SEO } from '../components/SEO';

export default function DynamicLocationPage() {
  const { slug } = useParams();
  
  const location = siteConfig.locations.find(l => l.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  return (
    <main className="bg-paper flex flex-col pt-16">
      <SEO 
        title={`${location.title} Cleaning Services | ${siteConfig.brand.name}`}
        description={`${siteConfig.brand.name} serves ${location.title} and surrounding areas with premium luxury cleaning services.`}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <img 
          src={location.imgUrl} 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
          alt={location.title}
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-tertiary/30 bg-black/20 backdrop-blur-md rounded-full">
              <MapPin className="w-4 h-4 text-tertiary" />
              <span className="text-inverted text-xs font-bold uppercase tracking-[0.2em]">{siteConfig.brand.name} Operating Territory</span>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-inverted mb-6 leading-[1.1]"
          >
            {location.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-inverted/80 max-w-2xl mx-auto font-light leading-relaxed mb-10"
          >
            {location.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
             <Link to="/booking" className="inline-flex items-center gap-3 bg-tertiary text-primary hover:bg-inverted transition-colors px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-xl">
               Schedule Service <ArrowRight className="w-4 h-4" />
             </Link>
          </motion.div>
        </div>
      </section>

      {/* Services List for Location */}
      <section className="py-24 bg-paper relative">
        <div className="max-w-[1200px] mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="font-serif text-4xl text-primary mb-4">Our Services in {location.title}</h2>
              <p className="text-secondary">We deliver all of our premium curation services to this territory.</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
              {siteConfig.services.map((service, idx) => (
                 <Link key={idx} to={`/services/${service.slug}`} className="group flex gap-6 p-6 border border-primary/10 rounded-2xl hover:border-tertiary/50 hover:bg-inverted transition-all shadow-sm">
                    <img src={service.imgUrl} className="w-24 h-24 object-cover rounded-xl shrink-0" alt={service.title} />
                    <div className="flex flex-col justify-center">
                       <h3 className="font-serif text-2xl text-primary group-hover:text-tertiary transition-colors">{service.title}</h3>
                       <p className="text-sm text-secondary line-clamp-2 mt-2">{service.shortDesc}</p>
                    </div>
                 </Link>
              ))}
           </div>
        </div>
      </section>
    </main>
  );
}
