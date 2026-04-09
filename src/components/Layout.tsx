import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, Share2, MessageCircle, Link as LinkIcon, Globe, Feather, Send, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import FloatingChatbot from './FloatingChatbot';
import FloatingVoiceAgent from './FloatingVoiceAgent';
import { NavHeader } from './ui/nav-header';
import { TiltCard } from './ui/TiltCard';

function Header() {
  const location = useLocation();
  const isDarkArea = location.pathname.includes('/locations') || location.pathname === '/careers' || location.pathname.includes('/services/');
  const isHome = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6">
      <div className="max-w-[1400px] mx-auto bg-inverted/80 backdrop-blur-xl border border-tertiary/20 shadow-sm rounded-none px-4 sm:px-8 py-3 sm:py-5 flex items-center justify-between">
        
        <TiltCard depth={25}>
          <Link to="/" className="text-xl sm:text-3xl font-serif tracking-widest text-primary font-semibold flex items-center gap-2 sm:gap-3 drop-shadow-xl hover:scale-105 transition-transform duration-300">
            {siteConfig.brand.logoUrl ? (
               <motion.img 
                  initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotateY: 180, transition: { duration: 0.8 } }}
                  transition={{ type: "spring", damping: 12, stiffness: 100 }}
                  src={siteConfig.brand.logoUrl} 
                  alt={siteConfig.brand.name} 
                  className="h-8 sm:h-10 object-contain drop-shadow-2xl [animation:float-3d_6s_ease-in-out_infinite]" 
                />
            ) : (
               <span className="flex items-center justify-center h-10 w-10 border-2 border-dashed border-primary/40 rounded text-[9px] font-bold uppercase tracking-wide text-primary/50 leading-tight text-center px-1">Your Logo Here</span>
            )}
            <span className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-primary/70 hidden xs:block sm:block truncate max-w-[100px] sm:max-w-none">{siteConfig.brand.name}</span>
          </Link>
        </TiltCard>
        
        <NavHeader />
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-r border-tertiary/30 pr-6">
             <Phone className="w-4 h-4 text-tertiary" /> {siteConfig.contact.phone}
          </div>
          <Link to="/booking" className="hidden sm:inline-block bg-primary text-inverted px-6 py-3 rounded-none text-xs font-bold uppercase tracking-[0.2em] hover:bg-tertiary transition-colors duration-500 shadow-md">
            Acquire Quote
          </Link>
          <button 
            className="md:hidden p-2 text-primary focus:outline-none z-[60] relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-inverted" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 min-h-screen bg-primary z-[55] flex flex-col pt-32 px-8 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {siteConfig.navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-inverted text-3xl font-serif tracking-widest hover:text-tertiary transition-colors border-b border-white/10 pb-4"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                  to="/booking" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-8 bg-tertiary text-primary px-8 py-5 text-center text-sm font-bold uppercase tracking-[0.2em] hover:bg-white shadow-xl transition-colors duration-500"
              >
                  Acquire Quote
              </Link>
              <div className="pt-12 text-center text-tertiary text-sm font-bold tracking-widest">
                <Phone className="w-4 h-4 inline-block mr-2" /> {siteConfig.contact.phone}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { siteConfig } from '../config/siteConfig';

function Footer() {
  return (
    <footer className="bg-primary text-inverted pt-24 border-t border-tertiary/20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            {siteConfig.brand.logoUrl ? (
              <img src={siteConfig.brand.logoUrl} alt={siteConfig.brand.name} className="h-10 object-contain mb-6 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] [animation:logo-spin-3d_10s_linear_infinite]" />
            ) : (
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-10 w-10 border-2 border-dashed border-inverted/30 rounded text-[9px] font-bold uppercase tracking-wide text-inverted/40 leading-tight text-center px-1">Your Logo Here</span>
                <h3 className="font-serif text-2xl tracking-widest text-tertiary">{siteConfig.brand.name}</h3>
              </div>
            )}
            <p className="font-light text-inverted/60 mb-6 max-w-sm tracking-wide">
              {siteConfig.brand.taglineSubheading}
            </p>
            <div className="flex items-center gap-2 text-inverted/80 font-light">
              <Phone className="w-4 h-4 text-tertiary" /> {siteConfig.contact.phone}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-3">
             <div className="space-y-4 text-sm">
                <span className="block font-bold uppercase tracking-[0.2em] text-xs mb-6 text-inverted">Services</span>
                {siteConfig.services.map((service) => (
                   <Link key={service.id} to={`/services/${service.slug}`} className="text-inverted/60 hover:text-tertiary block duration-150 font-light text-sm">{service.title}</Link>
                ))}
             </div>
             <div className="space-y-4 text-sm">
                <span className="block font-bold uppercase tracking-[0.2em] text-xs mb-6 text-inverted">Company</span>
                <Link to="/about" className="text-inverted/60 hover:text-tertiary block duration-150 font-light text-sm">The Firm</Link>
                <Link to="/pricing" className="text-inverted/60 hover:text-tertiary block duration-150 font-light text-sm">Investment & FAQ</Link>
                <Link to="/contact" className="text-inverted/60 hover:text-tertiary block duration-150 font-light text-sm">Concierge</Link>
             </div>
             <div className="space-y-4 text-sm">
                <Link to="/locations"><span className="block font-bold uppercase tracking-[0.2em] text-xs mb-6 text-inverted hover:text-tertiary transition-colors">Service Areas</span></Link>
                {siteConfig.locations.slice(0, 4).map((loc) => (
                   <Link key={loc.id} to={`/locations/${loc.slug}`} className="text-inverted/60 hover:text-tertiary block duration-150 font-light text-sm">{loc.title}</Link>
                ))}
             </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-inverted/10 py-6">
            <span className="text-inverted/40 order-last block text-center text-xs uppercase tracking-widest font-light md:order-first">© {new Date().getFullYear()} {siteConfig.brand.name}, All rights reserved.</span>
            <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                <a href="#" aria-label="Share" className="text-inverted/40 hover:text-tertiary block transition-colors">
                    <Share2 className="size-5" />
                </a>
                <a href="#" aria-label="Message" className="text-inverted/40 hover:text-tertiary block transition-colors">
                    <MessageCircle className="size-5" />
                </a>
                <a href="#" aria-label="Link" className="text-inverted/40 hover:text-tertiary block transition-colors">
                    <LinkIcon className="size-5" />
                </a>
                <a href="#" aria-label="Globe" className="text-inverted/40 hover:text-tertiary block transition-colors">
                    <Globe className="size-5" />
                </a>
                <a href="#" aria-label="Feather" className="text-inverted/40 hover:text-tertiary block transition-colors">
                    <Feather className="size-5" />
                </a>
                <a href="#" aria-label="Send" className="text-inverted/40 hover:text-tertiary block transition-colors">
                    <Send className="size-5" />
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}

// Global scroll to top on route change wrapper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <div className="overflow-x-hidden min-h-screen w-full relative">
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <Footer />
      <FloatingVoiceAgent />
      <FloatingChatbot />
    </div>
  );
}
