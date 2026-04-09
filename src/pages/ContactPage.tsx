import { motion } from 'motion/react';
import { Mail, Phone, MapPin, SearchCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import { ThreeDText } from '../components/ui/ThreeDText';
import { TiltCard } from '../components/ui/TiltCard';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-32 bg-paper min-h-screen">
      <SEO 
        title={`Contact | ${siteConfig.brand.name}`}
        description={`Contact our dedicated team at ${siteConfig.brand.name} to curate a custom residential schedule.`}
      />
      
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Cinematic Header */}
        <div className="mb-20 pl-4 border-l-2 border-tertiary">
          <h1 className="font-serif text-5xl md:text-7xl text-primary tracking-tight mb-4">
            <ThreeDText text={`${siteConfig.brand.name} Concierge.`} wordMode={true} />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary font-light max-w-2xl"
          >
            Direct access to our dedicated client relations team. We are at your disposal to arrange, adjust, or completely customize your services.
          </motion.p>
        </div>

        {/* Location Cinematic Banner */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="mb-20 w-full h-[300px] md:h-[450px] relative rounded-[2rem] overflow-hidden luxury-shadow-3d"
        >
           <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2000&auto=format&fit=crop" alt="NYC Headquarters" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-10">
              <div className="text-inverted">
                 <h2 className="font-serif text-3xl mb-1">Manhattan Headquarters</h2>
                 <p className="font-light opacity-80 tracking-widest text-xs uppercase">Operating at the heart of the city.</p>
              </div>
           </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
           
           {/* Form Side */}
           <TiltCard depth={10}>
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-primary p-6 sm:p-12 rounded-[2rem] luxury-shadow-3d border border-tertiary/20 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tertiary/5 blur-[100px] pointer-events-none"></div>
                
                <h2 className="font-serif text-3xl text-inverted mb-8 relative z-10" style={{ transform: "translateZ(30px)" }}>Direct Inquiry</h2>
                
                <form className="relative z-10 space-y-6" style={{ transform: "translateZ(40px)" }}>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-inverted/70 block mb-2">First Name</label>
                        <input type="text" className="w-full bg-inverted/10 border-b border-white/20 p-3 text-inverted focus:outline-none focus:border-tertiary transition-colors hover:bg-inverted/20" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-inverted/70 block mb-2">Last Name</label>
                        <input type="text" className="w-full bg-inverted/10 border-b border-white/20 p-3 text-inverted focus:outline-none focus:border-tertiary transition-colors hover:bg-inverted/20" />
                      </div>
                   </div>
                   
                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-inverted/70 block mb-2">Email Address</label>
                      <input type="email" className="w-full bg-inverted/10 border-b border-white/20 p-3 text-inverted focus:outline-none focus:border-tertiary transition-colors hover:bg-inverted/20" />
                   </div>

                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-inverted/70 block mb-2">Nature of Inquiry</label>
                      <select className="w-full bg-inverted/10 border-b border-white/20 p-3 text-inverted focus:outline-none focus:border-tertiary transition-colors appearance-none hover:bg-inverted/20">
                         <option className="text-primary">Curating a New Schedule</option>
                         <option className="text-primary">Adjusting Existing Portfolio</option>
                         <option className="text-primary">Specialized Post-Construction Request</option>
                         <option className="text-primary">Other</option>
                      </select>
                   </div>

                   <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-inverted/70 block mb-2">Details</label>
                      <textarea rows={4} className="w-full bg-inverted/10 border-b border-white/20 p-3 text-inverted focus:outline-none focus:border-tertiary transition-colors resize-none hover:bg-inverted/20"></textarea>
                   </div>

                   <button type="button" className="w-full py-4 mt-6 bg-tertiary text-primary uppercase text-xs font-bold tracking-[0.2em] hover:scale-105 hover:bg-[#d4af37] hover:shadow-xl transition-all duration-300 rounded-none transform active:scale-95">
                     Dispatch Inquiry
                   </button>
                </form>
             </motion.div>
           </TiltCard>

           {/* Info Side */}
           <TiltCard depth={5}>
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
               className="flex flex-col justify-center space-y-12 lg:pl-10 h-full"
             >
                <div style={{ transform: "translateZ(20px)" }}>
                   <h3 className="font-serif text-2xl text-primary mb-6">Headquarters</h3>
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0 shadow-sm">
                         <MapPin className="w-5 h-5 text-tertiary" />
                      </div>
                      <div>
                         <p className="font-bold text-primary text-lg">{siteConfig.brand.name} Operations</p>
                         <p className="text-secondary font-light pre-line whitespace-pre-line">{siteConfig.contact.address.split(',').join(',\n')}</p>
                      </div>
                   </div>
                </div>

                <div style={{ transform: "translateZ(20px)" }}>
                   <h3 className="font-serif text-2xl text-primary mb-6">Direct Lines</h3>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0 shadow-sm">
                            <Phone className="w-5 h-5 text-tertiary" />
                         </div>
                         <div>
                            <p className="text-xs uppercase tracking-widest font-bold text-secondary mb-1">Concierge Desk</p>
                            <p className="font-medium text-primary text-lg">{siteConfig.contact.phone}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0 shadow-sm">
                            <Mail className="w-5 h-5 text-tertiary" />
                         </div>
                         <div>
                            <p className="text-xs uppercase tracking-widest font-bold text-secondary mb-1">Private Email</p>
                            <p className="font-medium text-primary text-lg">{siteConfig.contact.email}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-inverted p-8 rounded-2xl border border-tertiary/20 flex items-start gap-4 mt-8 luxury-shadow-3d hover:scale-105 transition-transform duration-500" style={{ transform: "translateZ(40px)" }}>
                   <SearchCheck className="w-8 h-8 text-tertiary shrink-0" />
                   <div>
                      <h4 className="font-bold text-primary">Response Time Protocol</h4>
                      <p className="text-sm font-light text-secondary mt-1">All Private Inquiries are guaranteed a response from a dedicated manager within 2 hours during normal business operating periods.</p>
                   </div>
                </div>
             </motion.div>
           </TiltCard>
        </div>
      </div>
    </div>
  );
}
