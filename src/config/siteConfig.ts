// siteConfig.ts
// Central Configuration for White-Labeling the application.

export const siteConfig = {
  // 1. BRAND IDENTITY
  brand: {
    name: "Your Business Name",
    abbreviation: "YBN",
    logoUrl: "", // Leave empty to show placeholder logo box
    taglineHeading: "Your Tagline Goes Here.",
    taglineSubheading: "Premium cleaning services for homes, offices, and everything in between.",
    establishedYear: 2022,
  },

  // 2. CONTACT INFORMATION & LOCAL SEO
  contact: {
    phone: "(929) 498-5704",
    email: "info@fressclean.com",
    address: "244 Madison Ave, New York, NY 10016",
    businessHours: "Mon-Fri 8:00 AM - 8:00 PM, Weekends 9:00 AM - 5:00 PM",
  },
  
  // 3. NAVIGATION
  navLinks: [
    { label: "Home", path: "/" },
    { label: "Reviews", path: "/reviews" },
    { label: "Services", path: "/services" },
    { label: "Team", path: "/team" },
    { label: "About Us", path: "/about" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" }
  ],

  // 4. CORE SERVICES
  services: [
    {
      id: "standard-cleaning",
      title: "Standard / Recurring Cleaning",
      slug: "standard",
      shortDesc: "Consistent, reliable apartment cleaning services tailored for busy NYC residents.",
      fullDesc: "Ensure your home remains a sanctuary with our consistent, detail-oriented standard cleaning service. We cover all essential areas of your home or office, including dusting and wiping all surfaces, vacuuming and mopping floors, kitchen countertops, sinks, appliances' exteriors, bathroom sanitation, and trash removal.",
      imgUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1974&auto=format&fit=crop",
      basePrice: 150,
      features: ["Dusting & Wiping Surfaces", "Vacuuming & Mopping Floors", "Kitchen & Bathroom Sanitation", "Trash Removal"]
    },
    {
      id: "deep-cleaning",
      title: "Deep Cleaning",
      slug: "deep",
      shortDesc: "A thorough top-to-bottom clean that targets built-up dirt and high-touch areas.",
      fullDesc: "Our deep cleaning service is a restorative top-to-bottom clean targeting built-up dirt, high-touch areas, and overlooked details for a true refresh. Perfect for a seasonal overhaul or when your space needs extra attention.",
      imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      basePrice: 350,
      features: ["Baseboard Detailing", "Built-up Dirt Removal", "High-touch Disinfection", "Inside Appliances (Add-on)"]
    },
    {
      id: "move-in-out",
      title: "Move-In/Move-Out Cleaning",
      slug: "move-in",
      shortDesc: "Make moving easier with a detailed cleaning that prepares your space for handoff.",
      fullDesc: "Make moving easier with a detailed cleaning that prepares your space for arrival, inspection, or a smooth handoff. We ensure empty residences receive a meticulous cleaning to guarantee a perfect transition.",
      imgUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1969&auto=format&fit=crop",
      basePrice: 400,
      features: ["Inside Cabinets & Drawers", "Inside Fridge & Oven", "Comprehensive Sanitization", "Dust Removal"]
    },
    {
      id: "post-construction",
      title: "Post Construction Cleaning",
      slug: "post-construction",
      shortDesc: "Final cleaning services that remove dust and contractor debris after renovations.",
      fullDesc: "Final cleaning services that remove dust, debris, and residue after renovations so your space is polished and ready to use. We use specialized equipment to safely remove fine construction dust from every surface.",
      imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      basePrice: 600,
      features: ["Micro-dust Removal", "Window Track Detailing", "Floor Polishing", "Residue Cleanup"]
    }
  ],

  // 4. SERVICE AREAS (Territories)
  locations: [
    {
      id: "manhattan",
      title: "Manhattan",
      slug: "manhattan",
      imgUrl: "https://images.unsplash.com/photo-1522083111811-925232ba9741?q=80&w=2000&auto=format&fit=crop",
      description: "Servicing all of Midtown, Financial District, Upper East Side, Chelsea, and surrounding neighborhoods."
    },
    {
      id: "brooklyn",
      title: "Brooklyn",
      slug: "brooklyn",
      imgUrl: "https://images.unsplash.com/photo-1605335191599-5638c4cb7061?q=80&w=2000&auto=format&fit=crop",
      description: "Serving Williamsburg, DUMBO, Park Slope, and premium Brooklyn residences."
    },
    {
      id: "queens",
      title: "Queens",
      slug: "queens",
      imgUrl: "https://images.unsplash.com/photo-1628151015968-3a479ff73a9e?q=80&w=2000&auto=format&fit=crop",
      description: "Delivering immaculate standards to Astoria, Long Island City, and surrounding areas."
    },
    {
      id: "bronx",
      title: "The Bronx",
      slug: "bronx",
      imgUrl: "https://images.unsplash.com/photo-1523455734267-0c7fbe8e9cf9?q=80&w=2000&auto=format&fit=crop",
      description: "We clean homes and estates across Riverdale and select Bronx neighborhoods."
    }
  ],

  // 5. SOCIAL PROOF & TESTIMONIALS
  socialProof: {
    overallRating: "4.9",
    totalReviews: "1,288+",
    badges: [
      { id: "eco", title: "Eco-Friendly Products", text: "Safe & sustainable." },
      { id: "insured", title: "Fully Insured", text: "100% Satisfaction Guaranteed." },
      { id: "staff", title: "Vetted Pros", text: "Background checked." },
      { id: "guarantee", title: "Done Right Promise", text: "We'll return to fix it at no cost." }
    ],
    team: [
      { name: "John D.", role: "Lead Cleaner", rating: "4.9", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
      { name: "Maria S.", role: "Deep Clean Spec.", rating: "5.0", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" },
      { name: "David L.", role: "Post-Const. Lead", rating: "4.9", img: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070&auto=format&fit=crop" }
    ],
    gallery: {
      beforeAfter1: {
        before: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
        label: "Deep Clean"
      },
      beforeAfter2: {
        before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        label: "Post-Const."
      }
    }
  },

  // 6. BOOKING WIZARD VARIABLES
  bookingLogic: {
    baseCurrency: "$",
    sizeMultiplierLabel: "Apartment Size",
    sizeOptions: [
      { label: "Studio / 1 Bedroom", value: "1", multiplier: 1 },
      { label: "2 Bedrooms", value: "2", multiplier: 1.4 },
      { label: "3 Bedrooms", value: "3", multiplier: 1.8 },
      { label: "4+ Bedrooms", value: "4", multiplier: 2.2 }
    ],
    serviceMultipliers: {
      "standard": 1.0,
      "deep": 1.75,
      "move-in": 2.2,
      "post-construction": 3.0
    },
    minimumCalloutFee: 150
  },

  // 7. CORE IMAGES
  images: {
    homeHero: "/hero-poster.png",
    aboutHero: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop",
    pricingHero: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=2000&auto=format&fit=crop",
    servicesHero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    locationsHero: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2000&auto=format&fit=crop"
  }
};
