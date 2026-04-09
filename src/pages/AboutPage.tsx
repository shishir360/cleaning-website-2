import { motion } from 'motion/react';
import { ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import { ThreeDText } from '../components/ui/ThreeDText';
import { TiltCard } from '../components/ui/TiltCard';

export default function AboutPage() {
  const stats = [
    { value: "15k+", label: "Estates Curated" },
    { value: "99%", label: "Client Retention" },
    { value: "100%", label: "Vetted Artisans" },
  ];

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-32 bg-paper min-h-screen">
      <SEO 
        title={`Our Story | ${siteConfig.brand.name}`}
        description={`Learn about ${siteConfig.brand.name}'s journey to becoming the premier service firm.`}
      />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Cinematic Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-tertiary/20">
             <Sparkles className="w-8 h-8 text-tertiary" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-primary tracking-tight mb-8">
            <ThreeDText text="Elevating the" wordMode={true} /> <br />
            <ThreeDText text="Standard of Living" wordMode={true} delay={0.2} />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary font-light leading-relaxed px-4"
          >
            {siteConfig.brand.name} was built on a singular premise: your home is your most vital sanctuary. We deploy world-class hospitality protocols to residential perfection.
          </motion.p>
        </div>

        {/* The Founder's Story / Split Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center mb-20 lg:mb-32">
          <TiltCard depth={10}>
            <motion.div 
               initial={{ opacity: 0, x: -30 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true }} 
               className="relative luxury-shadow-3d rounded-[3rem]"
            >
              <div className="absolute inset-0 bg-tertiary/20 blur-[100px] rounded-full hidden"></div>
              <img 
                src={siteConfig.images.aboutHero} 
                alt="Luxury Experience" 
                className="relative z-10 w-full h-[600px] object-cover rounded-[3rem] transition-transform duration-700 hover:scale-105" 
              />
              <div className="absolute -bottom-6 -right-4 sm:-bottom-10 sm:-right-10 bg-primary text-inverted p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl z-20 max-w-[240px] sm:max-w-[280px] border border-tertiary/20" style={{ transform: "translateZ(50px)" }}>
                <p className="font-serif text-2xl sm:text-3xl mb-2 text-tertiary">"Perfection is not an accident."</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-70">— Founder</p>
              </div>
            </motion.div>
          </TiltCard>

          <motion.div 
             initial={{ opacity: 0, x: 30 }} 
             whileInView={{ opacity: 1, x: 0 }} 
             viewport={{ once: true }}
             className="pl-0 lg:pl-10 space-y-8"
          >
            <h2 className="font-serif text-4xl text-primary">The {siteConfig.brand.name} Difference</h2>
            <p className="text-secondary leading-relaxed font-light text-lg">
              We recognized a void in the market: traditional services offered utility, but lacked refinement. We introduced a white-glove approach to residential upkeep. Every artisan is rigorously vetted, trained in hospitality, and equipped with premium formulations.
            </p>
            <ul className="space-y-6 pt-6">
              {[
                { i: ShieldCheck, t: "Immaculately Vetted", d: "Only 1.4% of applicants make the cut. Complete background checks and extensive hospitality training." },
                { i: Award, t: "Uncompromising Quality", d: "An exhaustive 60-point precision checklist executed flawlessly on every single visit." },
                { i: HeartHandshake, t: "Discreet & Professional", d: "Operating with absolute discretion. We curate your space seamlessly while respecting your privacy." }
              ].map((item, idx) => (
                 <li key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0 border border-tertiary/20">
                      <item.i className="w-5 h-5 text-tertiary" />
                    </div>
                    <div>
                       <h3 className="font-bold text-primary tracking-wide">{item.t}</h3>
                       <p className="text-sm text-secondary font-light mt-1">{item.d}</p>
                    </div>
                 </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Core Values Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-primary mb-4">Our Core Tenets</h2>
            <p className="text-secondary font-light max-w-2xl mx-auto">The principles that drive our artisans and govern every interaction with your sanctuary.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { t: "Sustainable Luxury", d: "Using environmentally conscious, premium-grade formulations that are safe for rare finishes, pets, and children.", img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1000&auto=format&fit=crop" },
              { t: "Rigorous Precision", d: "No detail is overlooked. From baseboards to chandeliers, our proprietary 60-point checklist ensures immaculate results.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" },
              { t: "Absolute Discretion", d: "We understand privacy. Our team operates quietly and respectfully, providing a seamless and secure experience.", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=1000&auto=format&fit=crop" }
            ].map((v, idx) => (
              <TiltCard key={idx} depth={5}>
                <div className="bg-white/5 border border-tertiary/20 rounded-[2rem] overflow-hidden luxury-shadow-3d group">
                  <div className="h-48 overflow-hidden relative">
                     <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                     <img src={v.img} alt={v.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                     <h3 className="font-bold text-primary tracking-wide text-lg mb-3">{v.t}</h3>
                     <p className="text-sm text-secondary font-light leading-relaxed">{v.d}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* The Gallery */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div className="max-w-2xl">
               <h2 className="font-serif text-4xl text-primary mb-4">The Standard in Practice</h2>
               <p className="text-secondary font-light">Glimpses into our commitment to curating extraordinary spaces across the city.</p>
             </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" alt="Gallery" className="w-full h-48 md:h-64 object-cover rounded-2xl md:rounded-[2rem] hover:opacity-80 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop" alt="Gallery" className="w-full h-48 md:h-64 object-cover rounded-2xl md:rounded-[2rem] hover:opacity-80 transition-opacity md:translate-y-8" />
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop" alt="Gallery" className="w-full h-48 md:h-64 object-cover rounded-2xl md:rounded-[2rem] hover:opacity-80 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Gallery" className="w-full h-48 md:h-64 object-cover rounded-2xl md:rounded-[2rem] hover:opacity-80 transition-opacity md:translate-y-8" />
           </div>
        </div>

        {/* Elite Stats */}
        <TiltCard depth={5}>
          <div className="bg-primary rounded-[2rem] sm:rounded-[3rem] px-6 sm:px-10 py-12 sm:py-20 text-center relative overflow-hidden border border-tertiary/20 luxury-shadow-3d">
             <div className="absolute inset-0 bg-tertiary/10 blur-[100px]"></div>
             <div className="relative z-10 grid sm:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto" style={{ transform: "translateZ(20px)" }}>
               {stats.map((s, i) => (
                  <div key={i} className="space-y-2">
                    <div className="font-serif text-4xl sm:text-6xl text-tertiary">{s.value}</div>
                    <div className="text-inverted text-sm font-bold uppercase tracking-[0.2em]">{s.label}</div>
                  </div>
               ))}
             </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
