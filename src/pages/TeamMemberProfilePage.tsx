import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import { Star, ShieldCheck, Award, Sparkles, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '../components/ui/TiltCard';

export default function TeamMemberProfilePage() {
  const { slug } = useParams();
  const member = siteConfig.socialProof.team.find(m => (m as any).slug === slug);

  if (!member) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center text-inverted">
        <div className="text-center">
          <h1 className="font-serif text-4xl mb-6">Artisan Not Found</h1>
          <Link to="/team" className="text-tertiary flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Team
          </Link>
        </div>
      </div>
    );
  }

  const { name, role, img, rating, experience, specialties, bio } = member as any;

  return (
    <div className="bg-primary min-h-screen pb-24">
      {/* ─── Navigation Header ───────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 h-20 z-50 px-6 flex items-center">
        <Link to="/team" className="group flex items-center gap-3 text-inverted/40 hover:text-tertiary transition-colors">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-tertiary transition-colors">
             <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em]">All Artisans</span>
        </Link>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* ─── Left: Cinematic Image ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard depth={20} className="w-full">
               <div className="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
                 <img src={img} alt={name} className="w-full aspect-[4/5] object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 scale-105 group-hover:scale-100" />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                 
                 {/* Floating Label */}
                 <div className="absolute bottom-10 left-10">
                    <div className="bg-tertiary/20 backdrop-blur-xl border border-tertiary/40 px-6 py-4 rounded-3xl">
                       <p className="text-tertiary text-[10px] font-bold uppercase tracking-[0.4em] mb-1">Status</p>
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-tertiary rounded-full animate-pulse" />
                         <span className="text-inverted font-serif text-xl italic">Active Deployment</span>
                       </div>
                    </div>
                 </div>
               </div>
            </TiltCard>
          </motion.div>

          {/* ─── Right: Profile Content ───────────────────────────────────── */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <Sparkles className="w-4 h-4 text-tertiary" />
                 <span className="text-tertiary text-xs font-bold uppercase tracking-[0.4em]">{role}</span>
              </div>
              <h1 className="font-serif text-6xl md:text-8xl text-inverted leading-none mb-4">{name}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-tertiary">
                   <Star className="w-4 h-4 fill-tertiary" />
                   <span className="text-xl font-serif italic text-inverted">{rating} Elite Rating</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-inverted/40 text-[10px] font-bold uppercase tracking-[0.2em]">{experience} Tenure</span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { label: "Vetted Score", value: "99.2%" },
                { label: "Clients Served", value: "450+" },
                { label: "Specialty", value: "Luxury Detailing" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl"
                >
                  <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-inverted/30 mb-2">{stat.label}</p>
                  <p className="font-serif text-2xl text-tertiary">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-tertiary text-[10px] font-bold uppercase tracking-[0.4em]">The Artisan's Journey</h2>
              <div className="h-px bg-gradient-to-r from-tertiary/30 to-transparent w-full" />
              <p className="text-inverted/60 text-lg md:text-xl font-light leading-relaxed italic">
                "{bio}"
              </p>
            </motion.div>

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-tertiary text-[10px] font-bold uppercase tracking-[0.4em]">Personalized Mastery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialties.map((spec: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-tertiary/[0.03] border border-tertiary/10 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-tertiary" />
                    <span className="text-inverted/80 text-sm font-light">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Booking CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-8"
            >
              <Link to="/booking" className="inline-flex items-center gap-4 bg-tertiary text-primary px-10 py-5 group rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all">
                Book {name} Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
