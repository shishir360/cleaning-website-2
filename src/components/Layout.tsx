import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, Share2, MessageCircle, Link as LinkIcon, Globe, Feather, Send, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import UnifiedAgent from './UnifiedAgent';
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav bar — dark glass matching the site's primary palette */}
      <div className="bg-primary/95 backdrop-blur-xl border-b border-tertiary/20 shadow-[0_4px_40px_rgba(0,0,0,0.4)] px-4 sm:px-8 py-0 flex items-center justify-between h-[70px] sm:h-[80px]">
        
        {/* Logo */}
        <TiltCard depth={20}>
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group"
          >
            {siteConfig.brand.logoUrl ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, transition: { duration: 0.4 } }}
                transition={{ type: 'spring', damping: 14, stiffness: 120 }}
                src={siteConfig.brand.logoUrl}
                alt={siteConfig.brand.name}
                className="h-7 sm:h-9 object-contain invert drop-shadow-[0_0_12px_rgba(192,160,98,0.5)]"
              />
            ) : (
              <span className="flex items-center justify-center h-9 w-9 border border-dashed border-tertiary/40 text-[8px] font-bold uppercase tracking-wide text-tertiary/60 leading-tight text-center px-1">
                Logo
              </span>
            )}
            <span className="font-serif text-base sm:text-lg tracking-[0.12em] text-inverted group-hover:text-tertiary transition-colors duration-300">
              {siteConfig.brand.name}
            </span>
          </Link>
        </TiltCard>

        {/* Desktop Nav */}
        <NavHeader />

        {/* Right side — phone + CTA + hamburger */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-inverted/60 border-r border-tertiary/25 pr-5">
            <Phone className="w-3.5 h-3.5 text-tertiary" />
            {siteConfig.contact.phone}
          </div>
          <Link
            to="/booking"
            className="hidden sm:inline-flex items-center gap-2 bg-tertiary text-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-inverted transition-all duration-300 shadow-[0_0_20px_rgba(192,160,98,0.3)] hover:shadow-[0_0_30px_rgba(192,160,98,0.5)]"
          >
            Book Now <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            className="md:hidden p-2 text-inverted focus:outline-none z-[60] relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen
              ? <X className="w-5 h-5 text-tertiary" />
              : <Menu className="w-5 h-5" />
            }
          </button>
        </div>
      </div>

      {/* Thin gold accent line under header */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-tertiary/50 to-transparent" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 min-h-screen bg-primary z-[55] flex flex-col pt-[90px] px-8 pb-12 overflow-y-auto"
          >
            {/* Gold separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-tertiary/60 to-transparent mb-10" />

            <nav className="flex flex-col gap-2">
              {siteConfig.navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-inverted text-2xl sm:text-3xl font-serif tracking-widest hover:text-tertiary transition-colors border-b border-inverted/10 py-5"
                  >
                    {link.label}
                    <ArrowRight className="w-5 h-5 text-tertiary/50" />
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link
                  to="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-8 block bg-tertiary text-primary px-8 py-5 text-center text-sm font-bold uppercase tracking-[0.25em] hover:bg-inverted shadow-xl transition-all duration-300"
                >
                  Book Now
                </Link>
                <div className="pt-8 text-center text-tertiary/80 text-xs font-bold tracking-widest flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
                </div>
              </motion.div>
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
                 <Link to="/team" className="text-inverted/60 hover:text-tertiary block duration-150 font-light text-sm">Our Artisans</Link>
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
      <UnifiedAgent />
    </div>
  );
}
