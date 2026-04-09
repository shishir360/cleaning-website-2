import { motion } from 'motion/react';
import { CheckCircle2, Diamond, Link as LinkIcon, Sparkle, Star, Droplets } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { FAQ } from '../components/FAQ';
import { siteConfig } from '../config/siteConfig';
import InteractiveBentoGallery from '../components/ui/interactive-bento-gallery';
import { CreativePricing } from '../components/ui/creative-pricing';
import type { PricingTier } from '../components/ui/creative-pricing';

export default function PricingPage() {
  const creativeTiers: PricingTier[] = [
    {
      name: "Standard Estate",
      icon: <Sparkle className="w-6 h-6" />,
      price: 150,
      description: "Immaculate upkeep for well-maintained residences.",
      color: "amber",
      ctaLabel: "Acquire Service",
      ctaHref: "/booking",
      features: [
        "60-Point precision checklist",
        "Hospitality-trained artisans",
        "Premium formulations used",
        "Perfect for weekly or bi-weekly",
        "Includes standard supplies"
      ]
    },
    {
      name: "The Platinum Deep",
      icon: <Star className="w-6 h-6" />,
      price: 250,
      description: "Our most comprehensive restorative curation.",
      color: "blue",
      popular: true,
      ctaLabel: "Acquire Service",
      ctaHref: "/booking",
      features: [
        "75-Point exhaustive checklist",
        "Hand-wiping baseboards & detailing",
        "Inside oven & fridge included",
        "Interior window gleam",
        "Ideal for seasonal resetting"
      ]
    },
    {
      name: "Transition Service",
      icon: <Droplets className="w-6 h-6" />,
      price: 350,
      description: "Sterilizing unoccupied spaces perfectly.",
      color: "purple",
      ctaLabel: "Acquire Service",
      ctaHref: "/booking",
      features: [
        "Total space sanitization",
        "Inside all empty cabinetry",
        "Heavy dust & debris removal",
        "Move-in/Move-out specific",
        "Secure key exchange protocols"
      ]
    }
  ];

  const pricingGalleryItems = [
    {
      id: 1,
      type: "image",
      title: "Standard Clean",
      desc: "Pristine surfaces, gleaming floors.",
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 2,
      type: "image",
      title: "Platinum Deep Clean",
      desc: "Every detail restored to perfection.",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 3,
      type: "image",
      title: "Bathroom Sanitation",
      desc: "Hospital-grade hygiene, every visit.",
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 4,
      type: "image",
      title: "Luxury Living Room",
      desc: "Dust-free, immaculate, and inviting.",
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2058&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 5,
      type: "image",
      title: "Transition Service",
      desc: "Move-in ready from day one.",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 6,
      type: "image",
      title: "Premium Bedroom",
      desc: "Fresh linens, spotless floors.",
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 7,
      type: "image",
      title: "Post-Construction",
      desc: "Construction debris cleared flawlessly.",
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1969&auto=format&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
  ];

  return (
    <div className="pt-28 pb-32 bg-paper min-h-screen">
      <SEO 
        title="Investment | Lumina Premium Cleaning"
        description="Transparent investments for our elite residential cleaning services in NYC."
      />
      
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Cinematic Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-tertiary/20">
             <Diamond className="w-8 h-8 text-tertiary" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-primary tracking-tight mb-8"
          >
            Your Investment in<br />Immaculate Living
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary font-light leading-relaxed max-w-2xl mx-auto"
          >
            Clear, uncompromising value. Select the tier that matches the demands of your residence. Recurring portfolios receive preferred adjustments.
          </motion.p>
        </div>

        {/* Investment Cards — CreativePricing */}
        <div className="mb-16">
          <CreativePricing
            tag="Investment Tiers"
            title="Your Path to Immaculate Living"
            description="Clear, uncompromising value. Recurring portfolios receive preferred adjustments."
            tiers={creativeTiers}
          />
        </div>

        {/* Adjustments Info */}
        <div className="mt-24 text-center mb-24">
           <p className="text-secondary text-sm uppercase tracking-[0.2em] font-bold mb-4">Portfolio Adjustments</p>
           <p className="font-serif text-2xl text-primary">Save up to 20% on Weekly recurring schedules.</p>
        </div>

        {/* The Experience Block */}
        <div className="mb-32 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
               <div className="absolute inset-0 bg-tertiary/20 blur-[50px] -z-10 rounded-full"></div>
               <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" alt="Experience" className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl border border-white/50" />
            </div>
            <div className="space-y-8">
               <h2 className="font-serif text-4xl text-primary">Beyond The Surface</h2>
               <p className="text-secondary font-light text-lg leading-relaxed">
                 An investment in {siteConfig.brand.name} is not merely a transaction for cleaning; it is an acquisition of time, peace of mind, and the preservation of your sanctuary's luxury assets.
               </p>
               <ul className="space-y-4">
                 {[
                   "Fully insured and bonded firm.",
                   "Secure key handling & alarm management.",
                   "No rigid contracts. Adjust anytime.",
                   "Direct line to your personal concierge."
                 ].map((t, i) => (
                   <li key={i} className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center border border-tertiary/30">
                        <CheckCircle2 className="w-4 h-4 text-tertiary" />
                     </div>
                     <span className="font-medium text-primary">{t}</span>
                   </li>
                 ))}
               </ul>
            </div>
        </div>
      </div>

      {/* Bento Gallery Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-4">
          <span className="text-tertiary text-sm font-bold tracking-widest uppercase mb-4 block">Our Results</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-4">See The Difference</h2>
          <p className="text-secondary max-w-xl mx-auto text-lg font-light">
            Every service tier delivers breathtaking results. Drag and explore our work.
          </p>
        </div>
        <InteractiveBentoGallery
          mediaItems={pricingGalleryItems}
          title=""
          description=""
        />
      </div>
      
      <FAQ />
    </div>
  );
}
