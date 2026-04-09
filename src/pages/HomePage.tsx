import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowRight, Star, MoveRight } from 'lucide-react';
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
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      <img 
        src={siteConfig.images.homeHero} 
        className="absolute inset-0 w-full h-full object-cover scale-105" 
        alt={`${siteConfig.brand.name} Hero`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-none border border-tertiary/20 backdrop-blur-md bg-white/5 mb-8 w-max"
          >
            <Star className="w-4 h-4 text-tertiary fill-tertiary" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-tertiary">#1 Ranked Service</span>
          </motion.div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[7.5rem] text-inverted leading-[0.95] tracking-tight mb-6 sm:mb-8">
            <ThreeDText text={siteConfig.brand.taglineHeading.split('.')[0] + '.'} wordMode={true} />
            <br/>
            <span className="text-tertiary italic font-light"><ThreeDText text={siteConfig.brand.name} delay={0.3} wordMode={true} /></span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl text-inverted/80 max-w-xl mb-8 sm:mb-12 font-light leading-relaxed tracking-wide"
          >
            {siteConfig.brand.taglineSubheading}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
        >
          <div className="bg-inverted p-5 sm:p-8 lg:p-10 rounded-[2rem] shadow-2xl border border-primary/5 w-full max-w-[420px] relative overflow-hidden group">
            <h3 className="font-serif text-3xl text-primary mb-8">Reserve {siteConfig.brand.abbreviation}</h3>
            
            <div className="space-y-4 mb-8">
              <div className="relative">
                <select defaultValue="" className="w-full bg-paper appearance-none p-4 rounded-xl border border-primary/5 text-primary focus:outline-none focus:ring-1 focus:ring-tertiary/50 cursor-pointer text-sm">
                  <option value="" disabled hidden>{siteConfig.bookingLogic.sizeMultiplierLabel}</option>
                  {siteConfig.bookingLogic.sizeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <Plus className="w-5 h-5 text-primary/30 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <select defaultValue="" className="w-full bg-paper appearance-none p-4 rounded-xl border border-primary/5 text-primary focus:outline-none focus:ring-1 focus:ring-tertiary/50 cursor-pointer text-sm">
                  <option value="" disabled hidden>Level of Curation</option>
                  {siteConfig.services.map(service => (
                     <option key={service.id} value={service.slug}>{service.title}</option>
                  ))}
                </select>
                <Plus className="w-5 h-5 text-primary/30 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            
            <Link to="/booking" className="w-full bg-primary text-inverted font-bold tracking-[0.2em] uppercase text-xs rounded-none py-5 hover:bg-tertiary hover:text-primary transition-all duration-500 text-center flex items-center justify-center gap-3">
              Acquire Quote <ArrowRight className="w-4 h-4" />
            </Link>
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
    <section className="py-16 sm:py-24 lg:py-32 bg-paper relative overflow-hidden">
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

        <div className="relative w-full overflow-hidden -mx-6 px-6 py-4">
          <InfiniteSlider duration={40} gap={32} className="flex h-full w-full pb-8">
            {siteConfig.socialProof.team.map((member, i) => (
              <div key={i} className="w-[280px] sm:w-[320px] md:w-[380px] shrink-0 h-full">
               <TiltCard depth={15} className="h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="bg-inverted rounded-[2.5rem] overflow-hidden luxury-shadow-3d group border border-tertiary/10 relative h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[2s] pointer-events-none z-10"></div>
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] scale-105 group-hover:scale-100" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-6 pt-24 text-inverted translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 z-20">
                       <div className="flex items-center gap-1 mb-1 text-tertiary">
                         <Star className="w-4 h-4 fill-tertiary" /><span className="text-sm font-bold tracking-wider text-inverted ml-1">{member.rating} Elite Rating</span>
                       </div>
                    </div>
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
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[100px] md:w-[200px] z-20"
            direction="left"
            blurIntensity={1.5}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[100px] md:w-[200px] z-20"
            direction="right"
            blurIntensity={1.5}
          />
        </div>
      </div>
    </section>
  )
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
    </main>
  );
}

