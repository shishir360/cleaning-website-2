import { motion } from 'motion/react';
import { Star, Shield, Trophy, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export default function CareersPage() {
  const benefits = [
    { icon: Trophy, title: "Top 1% Compensation", desc: "We pay significantly above market rate to secure the absolute best talent in the city." },
    { icon: Shield, title: "Full Benefits Suite", desc: "Comprehensive health, dental, and vision curation for all full-time artisans." },
    { icon: Star, title: "Elite Client Roster", desc: "Work exclusively translating beautiful spaces for high-net-worth individuals and luxury estates." }
  ];

  return (
    <div className="pt-28 pb-32 bg-paper min-h-screen">
      <SEO 
        title="Careers | Lumina Artisans"
        description="Join Lumina's elite team of residential cleaning artisans. We offer top-tier compensation for perfectionists."
      />

      {/* Cinematic Hero */}
      <div className="relative h-[600px] mb-24 overflow-hidden rounded-[3rem] mx-6 max-w-[1400px] xl:mx-auto">
         <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" alt="Elite Cleaning Professional" className="absolute inset-0 w-full h-full object-cover" />
         <div className="absolute inset-0 bg-primary/80"></div>
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-inverted tracking-tight mb-6">Become an Artisan.</h1>
            <p className="text-xl text-inverted/80 font-light max-w-2xl">
              We are actively seeking meticulous, hospitality-driven perfectionists to join our elite curation team. Only 1.4% of applicants make the cut.
            </p>
         </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-12"
         >
            <div>
              <h2 className="font-serif text-4xl text-primary mb-4">A standard above.</h2>
              <p className="text-secondary font-light text-lg">
                Working at Lumina is not a typical cleaning job. It is a career in luxury hospitality. Our artisans are respected, highly compensated, and trusted with curating some of the most beautiful residences in New York.
              </p>
            </div>

            <div className="space-y-8">
               {benefits.map((b, i) => (
                 <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0 border border-tertiary/30">
                       <b.icon className="w-6 h-6 text-tertiary" />
                    </div>
                    <div>
                       <h3 className="text-xl font-serif text-primary mb-2">{b.title}</h3>
                       <p className="text-secondary font-light">{b.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="bg-inverted p-12 rounded-[2rem] shadow-2xl border border-black/5"
         >
            <h3 className="font-serif text-3xl text-primary mb-8">Apply for Consideration</h3>
            <form className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-2">First Name</label>
                   <input type="text" className="w-full bg-paper border border-black/10 rounded-none p-4 focus:outline-none focus:border-tertiary text-primary" />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-2">Last Name</label>
                   <input type="text" className="w-full bg-paper border border-black/10 rounded-none p-4 focus:outline-none focus:border-tertiary text-primary" />
                 </div>
               </div>
               
               <div>
                 <label className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-2">Email Address</label>
                 <input type="email" className="w-full bg-paper border border-black/10 rounded-none p-4 focus:outline-none focus:border-tertiary text-primary" />
               </div>

               <div>
                 <label className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-2">Years of Luxury Experience</label>
                 <select className="w-full bg-paper border border-black/10 rounded-none p-4 focus:outline-none focus:border-tertiary text-primary appearance-none">
                    <option>0-2 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years (Hospitality/Luxury)</option>
                 </select>
               </div>
               
               <div>
                 <label className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-2">Why Lumina?</label>
                 <textarea rows={3} className="w-full bg-paper border border-black/10 rounded-none p-4 focus:outline-none focus:border-tertiary text-primary resize-none"></textarea>
               </div>

               <button type="button" className="w-full bg-primary text-inverted py-5 uppercase tracking-widest text-xs font-bold hover:bg-tertiary hover:text-primary transition-colors flex items-center justify-center gap-3">
                 Submit Dossier <ArrowRight className="w-4 h-4" />
               </button>
            </form>
         </motion.div>

      </div>

      {/* Culture Gallery */}
      <div className="max-w-[1400px] mx-auto px-6 mt-32">
         <div className="mb-12">
            <h2 className="font-serif text-4xl text-primary mb-2">Our Culture in Action</h2>
            <p className="text-secondary font-light">Join a firm that values progression, perfection, and camaraderie.</p>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" alt="Culture" className="w-full h-48 md:h-72 object-cover rounded-[2rem] hover:opacity-80 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop" alt="Culture" className="w-full h-48 md:h-72 object-cover rounded-[2rem] hover:opacity-80 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" alt="Culture" className="w-full h-48 md:h-72 object-cover rounded-[2rem] hover:opacity-80 transition-opacity md:col-span-1 col-span-2 hidden md:block" />
         </div>
      </div>
    </div>
  );
}
