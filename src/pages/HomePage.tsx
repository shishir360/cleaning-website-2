import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, MoveRight, ChevronDown, Shield, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { SEO } from '../components/SEO';
import { TiltCard } from '../components/ui/TiltCard';
import { ThreeDText } from '../components/ui/ThreeDText';
import { LogosSlider } from '../components/LogosSlider';
import { InfiniteSlider } from '../components/ui/infinite-slider';
import { ProgressiveBlur } from '../components/ui/progressive-blur';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { StackedCardsInteractionDemo } from '../components/StackedCardsDemo';
import InteractiveBentoGallery from '../components/ui/interactive-bento-gallery';

function CinematicHero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative flex flex-col lg:min-h-[90vh] lg:flex-row lg:items-center lg:justify-center pt-20 sm:pt-24 lg:pt-0 overflow-hidden bg-primary">
      {/* Video - relative on mobile to take up space, absolute on desktop to be background */}
      <div className="relative lg:absolute lg:inset-0 w-full h-[45vh] sm:h-[55vh] lg:h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.png"
          onCanPlay={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Poster Image (Shown while video is loading) */}
        {!videoLoaded && (
          <img 
            src="/hero-poster.png" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
            alt="Loading..."
          />
        )}
        
        {/* Gradients - only visible when video is background (lg) or subtle overlay on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden pointer-events-none z-10" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent pointer-events-none z-10" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
      </div>

      {/* Booking card - follows video on mobile, floats on desktop */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex justify-center lg:justify-end items-center py-10 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30, x: 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full max-w-[400px]"
        >
          {/* Card */}
          <div className="bg-primary/95 backdrop-blur-2xl border border-tertiary/30 shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(192,160,98,0.1)] w-full relative overflow-hidden">
            
            {/* Gold top accent line */}
            <div className="h-[2px] bg-gradient-to-r from-tertiary/60 via-tertiary to-tertiary/60" />

            {/* Card header */}
            <div className="px-7 pt-7 pb-5 border-b border-inverted/10">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-3.5 h-3.5 text-tertiary fill-tertiary" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-tertiary">#1 Rated Service</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-inverted leading-tight">
                Book Your Clean
              </h3>
              <p className="text-inverted/50 text-xs font-light mt-1 tracking-wide">Instant quote • No commitment</p>
            </div>

            {/* Form fields */}
            <div className="px-7 py-6 space-y-3">
              {/* Size select */}
              <div className="relative group">
                <label className="block text-[9px] uppercase tracking-[0.25em] font-bold text-tertiary/80 mb-1.5">Home Size</label>
                <div className="relative">
                  <select
                    defaultValue=""
                    className="w-full bg-inverted/5 hover:bg-inverted/10 appearance-none px-4 py-3.5 border border-inverted/15 hover:border-tertiary/50 focus:border-tertiary text-inverted/80 focus:outline-none cursor-pointer text-sm transition-all duration-200 focus:bg-inverted/10"
                  >
                    <option value="" disabled hidden style={{background:'#050505'}}>{siteConfig.bookingLogic.sizeMultiplierLabel}</option>
                    {siteConfig.bookingLogic.sizeOptions.map(opt => (
                      <option key={opt.value} value={opt.value} style={{background:'#050505'}}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-tertiary/60 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Service select */}
              <div className="relative group">
                <label className="block text-[9px] uppercase tracking-[0.25em] font-bold text-tertiary/80 mb-1.5">Service Type</label>
                <div className="relative">
                  <select
                    defaultValue=""
                    className="w-full bg-inverted/5 hover:bg-inverted/10 appearance-none px-4 py-3.5 border border-inverted/15 hover:border-tertiary/50 focus:border-tertiary text-inverted/80 focus:outline-none cursor-pointer text-sm transition-all duration-200 focus:bg-inverted/10"
                  >
                    <option value="" disabled hidden style={{background:'#050505'}}>Select a service</option>
                    {siteConfig.services.map(service => (
                      <option key={service.id} value={service.slug} style={{background:'#050505'}}>{service.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-tertiary/60 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Link
                  to="/booking"
                  className="group w-full bg-tertiary text-primary font-bold tracking-[0.25em] uppercase text-[11px] py-4 hover:bg-inverted transition-all duration-400 text-center flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(192,160,98,0.4)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.2)] relative overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative">Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>

            {/* Trust badges */}
            <div className="px-7 pb-6 border-t border-inverted/10 pt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                  <span className="text-[10px] text-inverted/50 font-light">Insured & Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                  <span className="text-[10px] text-inverted/50 font-light">Eco-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                  <span className="text-[10px] text-inverted/50 font-light">100% Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-tertiary fill-tertiary flex-shrink-0" />
                  <span className="text-[10px] text-inverted/50 font-light">5-Star Rated</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBadges() {
  return (
    <section className="py-16 bg-primary border-y border-tertiary/20">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {siteConfig.socialProof.badges.map((badge, i) => (
          <TiltCard key={i} depth={10}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex items-center gap-4 group bg-white/5 p-4 rounded-2xl hover:luxury-shadow-3d transition-all duration-300 border border-transparent hover:border-tertiary/20"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-inverted/5 border border-tertiary/20 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-primary transition-colors duration-500 transform group-hover:rotate-y-180">
                <Star className="w-6 h-6" />
              </div>
              <div style={{ transform: "translateZ(30px)" }}>
                <h4 className="font-bold tracking-wider text-tertiary uppercase text-sm mb-1">{badge.title}</h4>
                <span className="text-sm text-inverted/70 font-light">{badge.text}</span>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function MeetTheProfessionals() {
  return (
    <section id="team" className="py-16 sm:py-24 lg:py-32 bg-paper relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-10 lg:mb-16 gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <span className="text-tertiary text-sm font-bold tracking-widest uppercase mb-4 block">The Human Element.</span>
            <h2 className="font-serif text-4xl md:text-6xl text-primary tracking-tight leading-[1]">
              Meet the artisans entering your home.
            </h2>
          </div>
          <p className="text-secondary text-lg font-light max-w-sm">We reject the gig-economy. Our cleaners are fully retained, heavily vetted specialists who take absolute pride in their craft.</p>
        </div>

        {/* Desktop View: Infinite Slider */}
        <div className="hidden sm:block relative w-full overflow-hidden -mx-6 px-6 py-4">
          <InfiniteSlider duration={40} gap={32} className="flex h-full w-full pb-8">
            {siteConfig.socialProof.team.map((member, i) => (
              <div key={i} className="w-[320px] md:w-[380px] shrink-0 h-full">
               <TiltCard depth={15} className="h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="bg-inverted rounded-[2.5rem] overflow-hidden luxury-shadow-3d group border border-tertiary/10 relative h-full"
                >
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-6 pt-24 text-inverted translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 z-20">
                     <div className="flex items-center gap-1 mb-1 text-tertiary">
                       <Star className="w-4 h-4 fill-tertiary" /><span className="text-sm font-bold tracking-wider text-inverted ml-1">{member.rating} Elite Rating</span>
                     </div>
                  </div>
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] scale-105 group-hover:scale-100" />
                  </div>
                  <div className="p-8 pb-10 relative z-20" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="font-serif text-3xl text-primary mb-1">{member.name}</h3>
                    <p className="text-tertiary font-bold tracking-widest text-xs uppercase">{member.role}</p>
                  </div>
                </motion.div>
               </TiltCard>
              </div>
            ))}
          </InfiniteSlider>
          <ProgressiveBlur className="pointer-events-none absolute top-0 left-0 h-full w-[100px] md:w-[200px] z-20" direction="left" />
          <ProgressiveBlur className="pointer-events-none absolute top-0 right-0 h-full w-[100px] md:w-[200px] z-20" direction="right" />
        </div>

        {/* Mobile View: Native Snap Scroll */}
        <div className="sm:hidden -mx-6 px-6 py-4 overflow-x-auto snap-x snap-mandatory flex gap-6 no-scrollbar pb-10">
          {siteConfig.socialProof.team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-[85vw] shrink-0 snap-center"
            >
              <div className="bg-inverted rounded-[2.5rem] overflow-hidden luxury-shadow-3d border border-tertiary/10 h-full">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 z-20">
                      <div className="bg-primary/80 backdrop-blur-md border border-tertiary/40 px-3 py-1 rounded-full flex items-center gap-2">
                        <Star className="w-3 h-3 fill-tertiary text-tertiary" />
                        <span className="text-inverted text-[10px] font-bold tracking-widest uppercase">{member.rating}</span>
                      </div>
                    </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-primary mb-0.5">{member.name}</h3>
                  <p className="text-tertiary font-bold tracking-widest text-[10px] uppercase mb-4">{member.role}</p>
                  <p className="text-secondary/60 text-sm font-light leading-relaxed">Top-rated specialist in NYC with consistent 5-star perfection.</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSliderItem({ before, after, label, initial = 50, delay = 0, direction = "left" }: any) {
  const [position, setPosition] = useState(initial);
  
  return (
    <TiltCard depth={10}>
       <motion.div 
         initial={{ opacity: 0, x: direction === 'left' ? -30 : 30 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ delay }}
         className="group rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative luxury-shadow-3d h-[320px] sm:h-[420px] md:h-[500px]"
       >
          {/* Base image (After) */}
          <div className="absolute inset-0 z-0">
             <img src={after} className="absolute inset-0 w-full h-full object-cover select-none" alt="After" />
             <span className="absolute top-6 right-6 bg-tertiary/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white z-10 pointer-events-none">After {label}</span>
          </div>
          
          {/* Overlay image (Before), clipped by position */}
          <div 
             className="absolute inset-0 z-10 select-none pointer-events-none"
             style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
             <img src={before} className="absolute inset-0 w-full h-full object-cover contrast-75 brightness-75 bg-black" alt="Before" />
             <div className="absolute inset-0 bg-black/10"></div>
             <span className="absolute top-6 left-6 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white/90 z-20 pointer-events-none">Before</span>
          </div>
          
          {/* Divider Line & Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center -translate-x-1/2 pointer-events-none z-20" 
            style={{ left: `${position}%` }}
          >
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl">
                <MoveRight className="w-5 h-5 text-primary" />
             </div>
          </div>
          
          {/* Invisible Range Input for accessibility and interaction */}
          <input 
             type="range"
             min="0"
             max="100"
             value={position}
             onChange={(e) => setPosition(Number(e.target.value))}
             className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
       </motion.div>
    </TiltCard>
  );
}

function BeforeAfterGallery() {
  const g = siteConfig.socialProof.gallery;
  return (
     <section className="py-16 sm:py-24 lg:py-32 bg-primary text-inverted overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-tertiary/10 rounded-full blur-[150px] -ml-96 -mt-96 pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-tertiary text-sm font-bold tracking-widest uppercase mb-4 block">Transformation</span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight mb-6">Visual Proof</h2>
            <p className="text-inverted/60 text-xl font-light max-w-2xl mx-auto">No marketing fluff. Just undeniable, high-resolution results.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
             <BeforeAfterSliderItem 
               before={g.beforeAfter1.before} 
               after={g.beforeAfter1.after} 
               label={g.beforeAfter1.label} 
               initial={50} 
               direction="left" 
             />
             <BeforeAfterSliderItem 
               before={g.beforeAfter2.before} 
               after={g.beforeAfter2.after} 
               label={g.beforeAfter2.label} 
               initial={40} 
               delay={0.2} 
               direction="right" 
             />
          </div>
        </div>
     </section>
  )
}

function ImageHeavyServices() {
  const customSpans = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-8"];
  
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-paper" id="services">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-tertiary text-sm font-bold tracking-widest uppercase mb-4 block">The Portfolio</span>
          <h2 className="font-serif text-4xl md:text-6xl text-primary tracking-tight mb-4">Curated Services</h2>
          <p className="text-secondary max-w-xl mx-auto text-lg font-light px-4">Every space requires a bespoke approach. Explore our primary packages tailored for elite residences.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 h-auto">
          {siteConfig.services.slice(0, 4).map((tier, i) => (
            <TiltCard 
              key={tier.id}
              depth={8}
              className={`${customSpans[i]} sm:col-span-1 relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden group min-h-[280px] sm:min-h-[350px] lg:min-h-[400px] ml-0 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer`}
            >
              <Link to={`/services/${tier.slug}`} className="block w-full h-full">
                <img src={tier.imgUrl} alt={tier.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-in-out z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none"></div>
                
                <div className="absolute bottom-0 left-0 p-8 sm:p-10 md:p-14 w-full flex justify-between items-end pointer-events-none z-20">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl tracking-tight text-inverted font-medium max-w-[70%]">{tier.title}</h3>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white text-primary flex items-center justify-center -translate-x-4 opacity-100 lg:opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-2xl">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackedCardsSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-primary text-inverted overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-tertiary/10 rounded-full blur-[150px] -ml-48 -mt-48 md:-ml-96 md:-mt-96 pointer-events-none"></div>
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="md:w-1/2 text-center md:text-left">
          <span className="text-tertiary text-sm font-bold tracking-widest uppercase mb-4 block">Visual Proof</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6">Interactive Gallery</h2>
          <p className="text-inverted/60 text-xl font-light mb-8">
            Experience our stunning portfolio of work. Hover over the stacked cards to interact and see our comprehensive cleaning approach across different spaces.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center py-10">
          <StackedCardsInteractionDemo />
        </div>
      </div>
    </section>
  );
}

const cleaningGalleryItems = [
  {
    id: 1,
    type: "image",
    title: "Spotless Kitchen",
    desc: "Every surface polished to perfection.",
    url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Luxury Living Room",
    desc: "Dust-free, pristine, and inviting.",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2058&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Sanitized Bathroom",
    desc: "Deep-cleansed for hygiene and shine.",
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Premium Bedroom",
    desc: "Fresh linens, immaculate floors.",
    url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Office Deep Clean",
    desc: "Professional-grade workspace sanitation.",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1969&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Move-In Ready",
    desc: "Every corner prepared for new beginnings.",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Gleaming Windows",
    desc: "Crystal clear views, spotless glass.",
    url: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=1974&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

function BentoGallerySection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-paper relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-4">
          <span className="text-tertiary text-sm font-bold tracking-widest uppercase mb-4 block">Our Work</span>
          <h2 className="font-serif text-4xl md:text-6xl text-primary tracking-tight mb-4">Gallery</h2>
          <p className="text-secondary max-w-xl mx-auto text-lg font-light">
            Drag, click, and explore our portfolio of immaculate spaces.
          </p>
        </div>
        <InteractiveBentoGallery
          mediaItems={cleaningGalleryItems}
          title=""
          description=""
        />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="bg-paper flex flex-col pt-16"> 
      <SEO 
        title={`${siteConfig.brand.name} | ${siteConfig.brand.taglineHeading}`}
        description={siteConfig.brand.taglineSubheading}
      />
      <CinematicHero />
      <TrustBadges />
      <LogosSlider />
      <Testimonials />
      <FAQ />
      <MeetTheProfessionals />
      <ImageHeavyServices />
      <StackedCardsSection />
      <BentoGallerySection />
      {/* Social Proof - Results of Perfection */}
      <section className="bg-primary py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-tertiary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tertiary/20 bg-tertiary/5 text-tertiary text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              <Sparkles className="w-3 h-3" /> Proof of Excellence
            </motion.div>
            <h2 className="font-serif text-5xl md:text-7xl text-inverted mb-6 tracking-tight">Results of Perfection.</h2>
            <p className="text-xl text-inverted/60 font-light max-w-2xl mx-auto leading-relaxed">
              Witness the meticulous transformations our artisans achieve across New York's most prestigious residences.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-8">
              {siteConfig.socialProof.workProof.slice(0, 1).map((proof: any, i: number) => (
                <BeforeAfterSliderItem 
                  key={i}
                  before={proof.before} 
                  after={proof.after} 
                  label={proof.label}
                  initial={65}
                />
              ))}
            </div>
            <div className="space-y-8">
               <h3 className="font-serif text-3xl text-tertiary mb-4">Meticulous Care.</h3>
               <p className="text-inverted/70 font-light leading-relaxed text-lg">
                 From restoration of rare marble finishes to the deep revitalization of fine upholstery, our data-backed cleanup protocols ensure your sanctuary is not just clean, but restored to its peak state.
               </p>
               <div className="grid grid-cols-2 gap-6 pt-6">
                 <div className="p-6 bg-inverted/5 border border-tertiary/20 rounded-2xl">
                    <p className="font-serif text-3xl text-tertiary mb-1">99.8%</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-inverted/40">Dust Elimination</p>
                 </div>
                 <div className="p-6 bg-inverted/5 border border-tertiary/20 rounded-2xl">
                    <p className="font-serif text-3xl text-tertiary mb-1">24k</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-inverted/40">Hours Curated</p>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 mt-12">
             {siteConfig.socialProof.workProof.slice(1).map((proof: any, i: number) => (
                <BeforeAfterSliderItem 
                  key={i}
                  before={proof.before} 
                  after={proof.after} 
                  label={proof.label}
                  initial={50}
                  delay={0.2 * i}
                  direction={i%2 === 0 ? "left" : "right"}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <div className="bg-primary pt-20">
         <Testimonials />
      </div>

      {/* Book Now Mini CTA */}
      <section className="bg-primary py-32 border-t border-inverted/5">
        <div className="max-w-4xl mx-auto px-6">
          <TiltCard depth={5}>
            <div className="bg-tertiary rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <h2 className="font-serif text-4xl sm:text-6xl text-primary mb-6 relative z-10 transition-transform group-hover:scale-105 duration-700">Ready for Perfection?</h2>
               <p className="text-primary/70 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-10 relative z-10">Secure your elite artisanal cleaning today.</p>
               <a href="/booking" className="inline-flex items-center gap-3 bg-primary text-inverted px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-inverted hover:text-primary transition-all relative z-10 shadow-2xl">
                 Book Appointment <ArrowRight className="w-4 h-4" />
               </a>
            </div>
          </TiltCard>
        </div>
      </section>
    </main>
  );
}

