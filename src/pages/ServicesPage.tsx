import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function ServicesPage() {
  const services = [
    { title: "Standard Upkeep", path: "/services/standard", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1964&auto=format&fit=crop", desc: "Meticulous surface cleaning to maintain your home's perfection." },
    { title: "Deep Detail", path: "/services/deep", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1974&auto=format&fit=crop", desc: "An exhaustive scrub of every corner and crevice." },
    { title: "Move In/Out", path: "/services/move-in", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1969&auto=format&fit=crop", desc: "Sterilizing unoccupied spaces for a pristine fresh start." },
    { title: "Post Construction", path: "/services/post-construction", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1983&auto=format&fit=crop", desc: "Heavy extraction of silica dust and renovation debris." }
  ];

  return (
    <div className="pt-32 pb-32 bg-primary min-h-screen">
      <SEO 
        title="Curated Services | Lumina Elite"
        description="Explore our complete range of professional cleaning services in NYC."
      />
      
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tertiary/5 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-inverted/5 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Sparkles className="w-8 h-8 text-tertiary mx-auto mb-8" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-inverted mb-6 tracking-tight"
          >
            Our Repertoire.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-inverted/70 font-light leading-relaxed"
          >
            Select from our curated tiers below. Every service incorporates our ironclad 48-hour guarantee and dedicated concierge support.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((svc, i) => (
            <Link to={svc.path} key={i} className="group block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative rounded-[2rem] overflow-hidden min-h-[500px] border border-tertiary/20 group-hover:border-tertiary/60 transition-colors"
              >
                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out absolute inset-0 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                
                <div className="absolute inset-x-0 bottom-0 p-10 z-10">
                  <h3 className="font-serif text-4xl tracking-tight text-tertiary mb-3">{svc.title}</h3>
                  <p className="text-inverted/80 text-lg font-light mb-8 max-w-sm">{svc.desc}</p>
                  <div className="inline-flex items-center gap-3 bg-tertiary text-primary uppercase text-[10px] tracking-[0.2em] px-6 py-3 font-bold hover:bg-[#d4af37] transition-colors">
                    Explore Details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="mt-32 border-t border-tertiary/20 pt-24">
           <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl text-inverted mb-4">The Matrix</h2>
              <p className="text-inverted/70 font-light">A transparent breakdown of our curation tiers to help you select the appropriate level of intervention for your estate.</p>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                   <tr>
                     <th className="p-4 bg-primary text-tertiary font-bold tracking-widest uppercase text-xs w-1/3">Detail Checkpoints</th>
                     <th className="p-4 bg-tertiary/10 text-tertiary font-bold tracking-widest uppercase text-xs text-center border-x border-tertiary/20">Standard</th>
                     <th className="p-4 bg-tertiary/20 text-tertiary font-bold tracking-widest uppercase text-xs text-center border-r border-tertiary/20">Deep Detail</th>
                     <th className="p-4 bg-tertiary/10 text-tertiary font-bold tracking-widest uppercase text-xs text-center">Move In/Out</th>
                   </tr>
                 </thead>
                 <tbody className="text-inverted/80 font-light text-sm">
                   {[
                     { item: "General Surface Dusting & Wiping", s: true, d: true, m: true },
                     { item: "Floor Vacuuming & Mopping", s: true, d: true, m: true },
                     { item: "Trash Removal & Replenishment", s: true, d: true, m: true },
                     { item: "High-Touch Surface Disinfection", s: false, d: true, m: true },
                     { item: "Baseboard & Trim Detailing", s: false, d: true, m: true },
                     { item: "Behind Appliance Dusting", s: false, d: true, m: true },
                     { item: "Inside Kitchen Cabinets", s: false, d: false, m: true },
                     { item: "Inside Fridge & Oven", s: false, d: false, m: true },
                   ].map((row, idx) => (
                     <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                       <td className="p-4 font-medium border-l border-white/5">{row.item}</td>
                       <td className="p-4 text-center border-x border-white/5">
                         {row.s ? <div className="w-3 h-3 bg-tertiary rounded-full mx-auto" /> : <div className="w-3 h-3 border border-white/20 rounded-full mx-auto" />}
                       </td>
                       <td className="p-4 text-center border-r border-white/5">
                         {row.d ? <div className="w-3 h-3 bg-tertiary rounded-full mx-auto" /> : <div className="w-3 h-3 border border-white/20 rounded-full mx-auto" />}
                       </td>
                       <td className="p-4 text-center border-r border-white/5">
                         {row.m ? <div className="w-3 h-3 bg-tertiary rounded-full mx-auto" /> : <div className="w-3 h-3 border border-white/20 rounded-full mx-auto" />}
                       </td>
                     </tr>
                   ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
