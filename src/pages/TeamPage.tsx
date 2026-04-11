import React from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import { Star, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';
import { TiltCard } from '../components/ui/TiltCard';

export default function TeamPage() {
  return (
    <div className="bg-primary min-h-screen pt-[120px] pb-24">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative px-6 mb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-tertiary/10 to-transparent blur-3xl opacity-50" />
        
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-tertiary text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
          >
            Elite Craftsmanship
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-8xl text-inverted leading-none tracking-tight mb-8"
          >
            Meet Our <span className="text-tertiary italic">Artisans</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-inverted/60 text-lg md:text-xl font-light leading-relaxed mb-12"
          >
            We reject the gig-economy. Our cleaners are fully retained, heavily vetted specialists who take absolute pride in their craft.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: ShieldCheck, text: "Vetted & Insured" },
              { icon: Award, text: "Elite Rated" },
              { icon: Heart, text: "Passion For Detail" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-3 text-tertiary/80 text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                <item.icon className="w-4 h-4" />
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Grid ───────────────────────────────────────────────────── */}
      <section className="px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.socialProof.team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard depth={20} className="h-full">
                <div className="group relative bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-tertiary/30 transition-all duration-500 luxury-shadow-3d h-full">
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105" 
                    />
                    
                    {/* Floating Elite Badge */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="bg-primary/90 backdrop-blur-md border border-tertiary/40 px-3 py-1.5 rounded-full flex items-center gap-2">
                        <Star className="w-3.5 h-3.5 fill-tertiary text-tertiary" />
                        <span className="text-inverted text-[10px] font-bold tracking-widest uppercase">{member.rating} ELITE</span>
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                  </div>

                  {/* Content */}
                  <div className="p-8 relative z-20">
                    <div className="flex items-center gap-2 mb-2">
                       <Sparkles className="w-3 h-3 text-tertiary" />
                       <span className="text-tertiary text-[10px] font-bold uppercase tracking-[0.3em]">{member.role}</span>
                    </div>
                    <h3 className="font-serif text-3xl text-inverted mb-4">{member.name}</h3>
                    
                    <div className="h-px w-full bg-white/5 mb-6" />
                    
                    <p className="text-inverted/50 text-sm font-light leading-relaxed mb-6">
                      A dedicated specialist focused on delivering immaculate standards. Vetted through our 50-point background check for absolute peace of mind.
                    </p>
                    
                    <button className="w-full py-4 bg-transparent border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white/5 hover:text-white transition-all">
                      View Artisan Profile
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Call to Action ──────────────────────────────────────────────── */}
      <section className="mt-32 px-6">
        <div className="max-w-4xl mx-auto bg-tertiary p-12 lg:p-20 text-center rounded-[3rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">Ready to experience the <span className="italic">Artisan</span> difference?</h2>
            <p className="text-primary/80 text-lg mb-12 max-w-xl mx-auto font-light">Join the thousands of NYC residents who trust our retained specialists with their most private spaces.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/booking" className="w-full sm:w-auto px-10 py-5 bg-primary text-inverted font-bold uppercase tracking-[0.2em] text-[11px] rounded-full hover:scale-105 transition-transform">Book Your Artisan</a>
              <a href="/contact" className="w-full sm:w-auto px-10 py-5 bg-transparent border border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-primary/5 transition-all">Consult Our Concierge</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
