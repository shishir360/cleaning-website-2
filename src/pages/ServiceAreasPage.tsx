import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function ServiceAreasPage() {
  const boroughs = [
    { title: "Manhattan", path: "/locations/manhattan", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop", desc: "Serving the Upper East Side, Tribeca, SoHo, and beyond." },
    { title: "Brooklyn", path: "/locations/brooklyn", img: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?q=80&w=2142&auto=format&fit=crop", desc: "Curating townhouses and brownstones from Williamsburg to Park Slope." },
    { title: "Queens", path: "/locations/queens", img: "https://images.unsplash.com/photo-1555529813-f8a47012354c?q=80&w=1954&auto=format&fit=crop", desc: "Precision services across Long Island City, Astoria, and Forest Hills." },
    { title: "The Bronx", path: "/locations/bronx", img: "https://images.unsplash.com/photo-1582298642750-60b54ad58994?q=80&w=1974&auto=format&fit=crop", desc: "Dedicated concierge cleaning for Riverdale and prominent neighborhoods." }
  ];

  return (
    <div className="pt-32 pb-32 bg-primary min-h-screen">
      <SEO 
        title="Territories | Lumina Elite New York"
        description="Lumina provides premier residential cleaning services across Manhattan, Brooklyn, Queens, and The Bronx."
      />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-tertiary/10 blur-[150px] rounded-full mix-blend-screen -translate-x-1/2"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <MapPin className="w-8 h-8 text-tertiary mx-auto mb-8" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-inverted mb-6 tracking-tight"
          >
            Our Territories.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-inverted/70 font-light leading-relaxed"
          >
            We curate fine residences across New York City. Select your borough below to discover specialized services and local availability.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {boroughs.map((b, i) => (
            <Link to={b.path} key={i} className="group block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative rounded-[2rem] overflow-hidden min-h-[450px] border border-tertiary/20 group-hover:border-tertiary/60 transition-colors"
               >
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out absolute inset-0 opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
                
                <div className="absolute inset-x-0 bottom-0 p-10 z-10 flex flex-col items-center text-center">
                  <h3 className="font-serif text-4xl tracking-tight text-tertiary mb-3">{b.title}</h3>
                  <p className="text-inverted/80 text-sm font-light mb-8 max-w-xs">{b.desc}</p>
                  <div className="inline-flex items-center justify-center w-max gap-3 bg-inverted/10 backdrop-blur-md text-inverted uppercase text-[10px] tracking-[0.2em] px-8 py-4 font-bold border border-inverted/20 group-hover:bg-tertiary group-hover:text-primary group-hover:border-tertiary transition-all">
                    View Territory <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
