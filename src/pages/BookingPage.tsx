import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowLeft, Lock, Receipt, Calendar, MapPin, SearchCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { TiltCard } from '../components/ui/TiltCard';
import PaymentMethodRadio from '../components/ui/payment-method-radio';
import { InvoicePrint } from '../components/ui/InvoicePrint';
import { PaymentDetailsInput } from '../components/ui/PaymentDetailsInput';

const stepVariants: any = {
  initial: { opacity: 0, rotateY: 90, scale: 0.9, transformPerspective: 1000 },
  animate: { opacity: 1, rotateY: 0, scale: 1, transformPerspective: 1000, transition: { type: "spring", damping: 15, stiffness: 100 } },
  exit: { opacity: 0, rotateY: -90, scale: 0.9, transformPerspective: 1000, transition: { duration: 0.3 } }
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form State
  const [bedrooms, setBedrooms] = useState<number | 'Studio'>('Studio');
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [serviceType, setServiceType] = useState('standard');
  const [frequency, setFrequency] = useState('one-time');
  const [date, setDate] = useState('Apr 07');
  const [timeWindow, setTimeWindow] = useState('08:00 AM');
  
  // Step 4: Where
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [entryMethod, setEntryMethod] = useState('Doorman');
  const [pets, setPets] = useState('No Pets');
  const [addons, setAddons] = useState<string[]>([]);

  // Step 5: Checkout
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [tipAmount, setTipAmount] = useState<number>(0);

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('luxuryBookingData');
    if (saved) {
      try {
        const d = JSON.parse(saved);
        if (d.step) setStep(d.step);
        if (d.bedrooms) setBedrooms(d.bedrooms);
        if (d.bathrooms) setBathrooms(d.bathrooms);
        if (d.serviceType) setServiceType(d.serviceType);
        if (d.frequency) setFrequency(d.frequency);
        if (d.date) setDate(d.date);
        if (d.timeWindow) setTimeWindow(d.timeWindow);
        if (d.address) setAddress(d.address);
        if (d.apt) setApt(d.apt);
        if (d.zipCode) setZipCode(d.zipCode);
        if (d.addons) setAddons(d.addons);
      } catch (e) {
        console.error("Local storage error", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (isLoaded && !isSuccess) {
      const d = { step, bedrooms, bathrooms, serviceType, frequency, date, timeWindow, address, apt, zipCode, addons };
      localStorage.setItem('luxuryBookingData', JSON.stringify(d));
    }
  }, [isLoaded, isSuccess, step, bedrooms, bathrooms, serviceType, frequency, date, timeWindow, address, apt, zipCode, addons]);

  // Pricing Logic
  const basePrice = useMemo(() => {
    let base = 150;
    if (serviceType === 'deep') base = 250;
    if (serviceType === 'move') base = 350;
    
    let bedMult = bedrooms === 'Studio' ? 0 : bedrooms;
    base += (bedMult * 20);
    base += ((bathrooms - 1) * 30);
    return base;
  }, [bedrooms, bathrooms, serviceType]);

  const addonTotal = useMemo(() => {
    return addons.length * 55; // $55 per addon
  }, [addons]);

  const subtotal = basePrice + addonTotal;

  const discountAmount = useMemo(() => {
    if (frequency === 'weekly') return subtotal * 0.20;
    if (frequency === 'biweekly') return subtotal * 0.15;
    if (frequency === 'monthly') return subtotal * 0.10;
    return 0;
  }, [frequency, subtotal]);

  const preTaxSubtotal = subtotal - discountAmount;
  const tax = preTaxSubtotal * 0.08875;
  const total = preTaxSubtotal + tax + tipAmount;

  const handleNext = () => setStep(s => Math.min(5, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleCompleteBooking = () => {
    setErrors([]);
    if (step === 5) {
      if (paymentMethod === 'Credit Card') {
        if (!cardNumber || cardNumber.length < 15) return setErrors(['Valid Card Number required']);
        if (!expiry) return setErrors(['Valid Expiry required']);
      }
      
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        localStorage.removeItem('luxuryBookingData');
      }, 2000);
    }
  };

  if (!isLoaded) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-32 bg-primary relative overflow-hidden flex items-center justify-center font-sans px-4">
        <SEO title="Booking Confirmed | Lumina" description="Your premium cleaning reservation is confirmed." />
        
        {/* Cinematic Backdrop - hidden on print */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tertiary/20 blur-[150px] rounded-full pointer-events-none -mt-32 -mr-32 print:hidden"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-inverted/5 blur-[120px] rounded-full pointer-events-none -mb-32 -ml-32 print:hidden"></div>

        {/* Invoice rendered strictly for print payload */}
        <div className="hidden print:block absolute inset-0 z-50 bg-white">
           <InvoicePrint data={{
             bookingId: `LUM-${Math.floor(Math.random() * 90000) + 10000}`,
             date, timeWindow, address, serviceType, frequency,
             bedrooms, bathrooms, addons, basePrice, addonTotal,
             discountAmount, tax, tipAmount, total
           }} />
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="relative z-10 w-full max-w-3xl print:hidden"
        >
          <TiltCard depth={10}>
            <div className="bg-inverted border border-tertiary/30 rounded-[2rem] sm:rounded-[3rem] luxury-shadow-3d overflow-hidden flex flex-col md:flex-row">
              
              {/* Left Side: Summary & Action */}
              <div className="p-8 sm:p-10 md:p-14 md:w-[55%] flex flex-col justify-center">
                 <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mb-8 border border-tertiary/20">
                    <CheckCircle2 className="w-8 h-8 text-tertiary" />
                 </div>
                 <h2 className="font-serif text-3xl md:text-4xl text-primary tracking-tight mb-4">Reservation<br/>Confirmed.</h2>
                 <p className="text-secondary font-light tracking-wide text-sm leading-relaxed mb-8">
                   Your booking has been secured. A confirmation email and digital access pass has been sent to your inbox. Our artisans are preparing for your arrival.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4">
                   <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-3 bg-tertiary text-primary py-4 px-8 rounded-none hover:bg-white hover:text-primary transition-colors duration-500 uppercase tracking-widest font-bold text-xs shadow-xl border border-tertiary">
                     <Receipt className="w-4 h-4" /> Save Receipt
                   </button>
                   <a href="/" className="inline-flex items-center justify-center gap-3 bg-primary text-inverted py-4 px-8 rounded-none hover:bg-black transition-colors duration-500 uppercase tracking-widest font-bold text-xs shadow-xl group border border-primary">
                     Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </a>
                 </div>
              </div>

              {/* Right Side: Receipt Details */}
              <div className="bg-paper p-8 sm:p-10 md:p-14 md:w-[45%] border-t md:border-t-0 md:border-l border-black/5 relative flex flex-col justify-center">
                 {/* Decorative background element inside receipt */}
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Lock className="w-32 h-32 text-primary" />
                 </div>
                 
                 <div className="relative z-10">
                    <div className="uppercase tracking-[0.2em] text-tertiary text-[10px] font-bold mb-8">Booking Identifier #LUM-{Math.floor(Math.random() * 90000) + 10000}</div>
                    
                    <ul className="space-y-6">
                      <li>
                        <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Arrival Window</p>
                        <p className="text-sm text-primary font-medium">{date} &mdash; {timeWindow}</p>
                      </li>
                      <li>
                        <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Location</p>
                        <p className="text-sm text-primary font-medium">{address || 'Location provided'}</p>
                      </li>
                      <li>
                        <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Service Tier</p>
                        <p className="text-sm text-primary font-medium capitalize">{serviceType} Cleaning, {frequency.replace('-', ' ')}</p>
                      </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-black/10">
                       <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Need Assistance?</p>
                       <p className="text-xs text-primary/70 mb-1">Contact our dedicated concierge team:</p>
                       <p className="text-sm font-bold text-primary">(212) 555-0198</p>
                    </div>
                 </div>
              </div>
           </div>
          </TiltCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-20 sm:pt-28 pb-16 sm:pb-20 font-sans">
      <SEO title="Book a Cleaning | Lumina" description="Reserve your elite residential cleaning service instantly." />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
         {/* Page Header */}
         <div className="mb-8 pl-4 border-l-2 border-tertiary">
            <h1 className="font-serif text-3xl md:text-5xl text-primary tracking-tight mb-2">Reserve your service</h1>
            <p className="text-secondary font-light text-lg">Curating the highest standard of cleanliness.</p>
         </div>

         <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-8 items-start">
            
            {/* MAIN FORM — full width on mobile, 65% on desktop */}
            <div className="w-full lg:w-[65%] lg:order-1">
               
               <AnimatePresence mode="wait">
                 {/* STEP 1: SPACE */}
                 {step === 1 && (
                   <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 origin-center">
                      {/* Segmented Controls for Beds/Baths mimicking image */}
                      <div className="bg-inverted rounded-2xl shadow-sm border border-black/5 p-2 overflow-hidden flex flex-col md:flex-row gap-4 justify-between items-center">
                         <span className="font-bold text-primary w-24 pl-4 text-sm tracking-widest uppercase">Bedroom</span>
                         <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-2 w-full pb-1">
                            {['Studio', 1, 2, 3, 4, 5].map(v => (
                              <button 
                                key={v} onClick={() => setBedrooms(v as any)}
                                className={`h-11 flex items-center justify-center font-medium rounded-xl transition-all text-sm ${bedrooms === v ? 'bg-primary text-inverted' : 'bg-transparent text-secondary border hover:border-primary/20'}`}
                              >
                                {v}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="bg-inverted rounded-2xl shadow-sm border border-black/5 p-2 overflow-hidden flex flex-col md:flex-row gap-4 justify-between items-center">
                         <span className="font-bold text-primary w-24 pl-4 text-sm tracking-widest uppercase">Bathroom</span>
                         <div className="flex flex-wrap justify-center gap-2">
                            {[1, 2, 3, 4, 5].map(v => (
                              <button 
                                key={v} onClick={() => setBathrooms(v)}
                                className={`h-12 w-12 flex items-center justify-center font-medium rounded-xl transition-all ${bathrooms === v ? 'bg-primary text-inverted' : 'bg-transparent text-secondary border hover:border-primary/20'}`}
                              >
                                {v}
                              </button>
                            ))}
                         </div>
                      </div>

                      {/* Service Cards mimicking image */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                         <button 
                           onClick={() => setServiceType('standard')}
                           className={`relative bg-inverted rounded-2xl border-2 text-left origin-top transition-all duration-300 ${serviceType === 'standard' ? 'border-primary shadow-xl scale-[1.02]' : 'border-transparent shadow-sm hover:border-black/5'}`}
                         >
                            {serviceType === 'standard' && <div className="absolute top-2 right-2 bg-tertiary rounded-full p-0.5 z-10"><CheckCircle2 className="w-4 h-4 fill-tertiary text-primary" /></div>}
                            <div className={`w-full text-center py-2 text-xs font-bold uppercase tracking-widest ${serviceType === 'standard' ? 'bg-primary text-inverted' : 'bg-black/5 text-secondary'}`}>Our Go-To Clean</div>
                            <div className="p-6">
                              <h3 className="font-serif text-2xl text-primary mb-6">Standard</h3>
                              <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-secondary"><CheckCircle2 className="w-4 h-4 text-tertiary" /> 60pt Checklist</li>
                                <li className="flex items-center gap-3 text-sm text-secondary"><CheckCircle2 className="w-4 h-4 text-tertiary" /> Recurring discounts available</li>
                                <li className="flex items-center gap-3 text-sm text-secondary"><CheckCircle2 className="w-4 h-4 text-tertiary" /> Add-ons available</li>
                              </ul>
                              <div className="bg-paper p-3 text-center text-xs text-secondary rounded-lg font-medium">Between 2 and 2.5 hours</div>
                            </div>
                         </button>

                         <button 
                           onClick={() => setServiceType('deep')}
                           className={`relative bg-inverted rounded-2xl border-2 text-left origin-top transition-all duration-300 ${serviceType === 'deep' ? 'border-primary shadow-xl scale-[1.02]' : 'border-transparent shadow-sm hover:border-black/5'}`}
                         >
                            {serviceType === 'deep' && <div className="absolute top-2 right-2 bg-tertiary rounded-full p-0.5 z-10"><CheckCircle2 className="w-4 h-4 fill-tertiary text-primary" /></div>}
                            <div className={`w-full text-center py-2 text-xs font-bold uppercase tracking-widest ${serviceType === 'deep' ? 'bg-tertiary text-primary' : 'bg-tertiary/10 text-tertiary'}`}>Enhanced Essentials</div>
                            <div className="p-6">
                              <h3 className="font-serif text-2xl text-primary mb-6">Deep Clean</h3>
                              <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-secondary"><CheckCircle2 className="w-4 h-4 text-tertiary" /> 75pt Deep Checklist</li>
                                <li className="flex items-center gap-3 text-sm text-secondary"><CheckCircle2 className="w-4 h-4 text-tertiary" /> Spot-cleaning walls & baseboards</li>
                                <li className="flex items-center gap-3 text-sm text-secondary"><CheckCircle2 className="w-4 h-4 text-tertiary" /> 50% Additional time</li>
                              </ul>
                              <div className="bg-paper p-3 text-center text-xs text-secondary rounded-lg font-medium">Between 3.5 and 5 hours</div>
                            </div>
                         </button>
                      </div>
                   </motion.div>
                 )}

                 {/* STEP 2: FREQUENCY */}
                 {step === 2 && (
                   <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 origin-center">
                      <h2 className="font-serif text-2xl text-primary mb-2">How frequent?</h2>
                      <p className="text-sm text-secondary mb-6">With our recurring schedule, you can save substantially and live pristine.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {[
                           { id: 'one-time', title: 'One time', sub: 'No recurring discount', badge: '' },
                           { id: 'weekly', title: 'Weekly', sub: 'Save 20%', badge: 'Best value' },
                           { id: 'biweekly', title: 'Every two weeks', sub: 'Save 15%', badge: '' },
                           { id: 'monthly', title: 'Every four weeks', sub: 'Save 10%', badge: '' },
                         ].map(opt => (
                            <div 
                              onClick={() => setFrequency(opt.id)}
                              key={opt.id}
                              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${frequency === opt.id ? 'border-primary bg-primary/5 shadow-md' : 'border-black/5 bg-inverted hover:border-black/10'}`}
                            >
                               <h3 className="font-bold text-primary mb-1">{opt.title}</h3>
                               <p className="text-secondary text-sm font-light">{opt.sub}</p>
                               {opt.badge && <span className="absolute top-4 right-4 bg-tertiary text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1">{opt.badge}</span>}
                            </div>
                         ))}
                      </div>
                   </motion.div>
                 )}

                 {/* STEP 3: WHEN */}
                 {step === 3 && (
                   <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 origin-center">
                      <h2 className="font-serif text-2xl text-primary mb-2">When should we arrive?</h2>
                      <p className="text-sm text-secondary mb-6">Choose your preferred date and arrival window.</p>
                      
                      <div className="space-y-3">
                         {[
                           { d: 'Apr 07', day: 'Tue', save: '' },
                           { d: 'Apr 08', day: 'Wed', save: 'Up to $20.00 off' },
                           { d: 'Apr 09', day: 'Thu', save: 'Up to $15.00 off' },
                         ].map(d => (
                            <div key={d.d} className="flex flex-col">
                              <div onClick={() => setDate(d.d)} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${date === d.d ? 'border-primary bg-primary/5 shadow-md' : 'border-black/5 bg-inverted'}`}>
                                 <div className="flex gap-6 items-center">
                                    <div className="text-center w-12">
                                       <div className="text-xs text-secondary font-bold uppercase">{d.day}</div>
                                       <div className="text-2xl font-serif">{d.d.split(' ')[1]}</div>
                                    </div>
                                    <div className="flex flex-col">
                                       <div className="text-sm text-secondary font-medium flex items-center gap-2"><Calendar className="w-4 h-4"/> Flexible Arrival</div>
                                       {d.save && <div className="mt-1 bg-tertiary/20 text-[#a07c12] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full w-max">{d.save}</div>}
                                    </div>
                                 </div>
                              </div>
                              {date === d.d && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="ml-8 mt-2 p-4 border border-black/5 rounded-xl bg-inverted">
                                  <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-4">Specific Time Options</p>
                                  <div className="grid grid-cols-2 gap-3">
                                    {['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM'].map(t => (
                                      <button onClick={() => setTimeWindow(t)} key={t} className={`p-3 text-sm font-medium rounded-lg border transition-all ${timeWindow === t ? 'border-primary bg-primary text-inverted' : 'border-black/5 bg-paper hover:border-black/20 text-primary'}`}>
                                        {t}
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                         ))}
                      </div>
                   </motion.div>
                 )}

                 {/* STEP 4: WHERE */}
                 {step === 4 && (
                   <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 origin-center">
                      <div>
                        <h2 className="font-serif text-2xl text-primary mb-2">Location Details</h2>
                        <div className="space-y-4">
                           <input type="text" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} className="w-full bg-inverted border border-black/10 p-4 rounded-xl text-primary focus:outline-none focus:border-primary" />
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="Apt, Suite..." value={apt} onChange={e=>setApt(e.target.value)} className="w-full bg-inverted border border-black/10 p-4 rounded-xl text-primary focus:outline-none focus:border-primary" />
                              <input type="text" placeholder="Zip Code" value={zipCode} onChange={e=>setZipCode(e.target.value)} className="w-full bg-inverted border border-black/10 p-4 rounded-xl text-primary focus:outline-none focus:border-primary" />
                           </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="font-serif text-2xl text-primary mb-4">Access Details</h2>
                        <div className="grid grid-cols-2 gap-3">
                           {['Someone is at location', 'Doorman', 'Hidden Key', 'Other'].map(opt => (
                              <div onClick={() => setEntryMethod(opt)} key={opt} className={`p-4 border-2 rounded-xl text-sm font-medium cursor-pointer ${entryMethod === opt ? 'border-primary bg-primary/5 text-primary' : 'border-black/5 bg-inverted text-secondary'}`}>
                                {opt}
                              </div>
                           ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="font-serif text-2xl text-primary mb-4">Do you have pets?</h2>
                        <div className="grid grid-cols-3 gap-3">
                           {['No Pets', 'Dog', 'Cat'].map(opt => (
                              <div onClick={() => setPets(opt)} key={opt} className={`p-4 border-2 text-center rounded-xl text-sm font-medium cursor-pointer ${pets === opt ? 'border-primary bg-primary text-inverted' : 'border-black/5 bg-inverted text-secondary'}`}>
                                {opt}
                              </div>
                           ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="font-serif text-2xl text-primary mb-4">Enhancements</h2>
                        <div className="space-y-3">
                           {[{id: 'Inside Fridge', icon: SearchCheck}, {id: 'Inside Oven', icon: SearchCheck}, {id: 'Baseboards Extra', icon: SearchCheck}].map(addon => (
                              <div 
                                key={addon.id} 
                                onClick={() => {
                                  if (addons.includes(addon.id)) setAddons(prev => prev.filter(a => a !== addon.id));
                                  else setAddons(prev => [...prev, addon.id]);
                                }}
                                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${addons.includes(addon.id) ? 'border-tertiary bg-tertiary/5' : 'border-black/5 bg-inverted hover:border-black/10'}`}
                              >
                                 <div className="flex items-center gap-3">
                                   <div className={`w-6 h-6 rounded flex items-center justify-center ${addons.includes(addon.id) ? 'bg-tertiary text-primary' : 'bg-black/5'}`}>
                                     {addons.includes(addon.id) && <CheckCircle2 className="w-4 h-4" />}
                                   </div>
                                   <span className="font-medium text-primary">{addon.id}</span>
                                 </div>
                                 <span className="text-sm font-bold text-secondary">+$55</span>
                              </div>
                           ))}
                        </div>
                      </div>
                   </motion.div>
                 )}

                 {/* STEP 5: CHECKOUT */}
                 {step === 5 && (
                   <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 origin-center">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-serif text-2xl text-primary">Finalize Investment</h2>
                        <Lock className="w-5 h-5 text-tertiary" />
                      </div>
                      
                      {errors.length > 0 && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-bold">
                          {errors.map((err, i) => <div key={i}>• {err}</div>)}
                        </div>
                      )}

                      <PaymentMethodRadio value={paymentMethod} onChange={setPaymentMethod} />

                      {paymentMethod === 'Credit Card' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-inverted p-6 mt-6 rounded-2xl border border-black/10">
                           <PaymentDetailsInput 
                             onValidChange={(isValid, data) => {
                               setCardNumber(data.number);
                               setExpiry(data.expiry);
                               setCvc(data.cvc);
                             }}
                           />
                        </motion.div>
                      )}
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Navigation Buttons */}
               <div className="mt-8 sm:mt-12 flex items-center justify-between border-t border-black/5 pt-6 sm:pt-8 gap-3">
                  {step > 1 ? (
                    <button onClick={handlePrev} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border border-black/10 px-6 py-4 rounded-none bg-inverted">
                      <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                  ) : <div></div>}
                  
                  {step < 5 ? (
                    <button onClick={handleNext} className="flex items-center justify-center gap-3 w-48 text-sm font-bold uppercase tracking-widest text-inverted bg-primary px-6 py-4 rounded-none hover:bg-tertiary transition-colors shadow-lg">
                      Proceed <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={handleCompleteBooking} disabled={isSubmitting} className="flex items-center justify-center gap-3 w-48 text-sm font-bold uppercase tracking-[0.2em] text-primary bg-tertiary px-6 py-4 rounded-none hover:bg-[#d4af37] disabled:opacity-70 transition-all shadow-xl">
                      {isSubmitting ? 'Processing...' : 'Checkout'}
                    </button>
                  )}
               </div>
            </div>

            {/* SIDEBAR — below form on mobile, right column on desktop */}
            <div className="w-full lg:w-[35%] lg:order-2 relative">
               <div className="sticky top-32">
                 <TiltCard depth={5}>
                   <div className="bg-primary rounded-[2rem] overflow-hidden luxury-shadow-3d border border-tertiary/20">
                      {/* Header */}
                  <div className="bg-primary/95 text-inverted p-6 flex border-b border-inverted/10">
                    <Receipt className="w-6 h-6 mr-3 text-tertiary" />
                    <h3 className="font-serif tracking-widest text-lg text-tertiary">Portfolio Receipt</h3>
                  </div>

                  <div className="bg-inverted p-6 relative">
                     {/* Vertical Tracking Setup */}
                     <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-black/5"></div>

                     <ul className="space-y-6 relative z-10">
                        {/* Tracker 1: Space */}
                        <li className="flex gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-inverted transition-colors ${step > 1 ? 'border-primary bg-primary text-inverted' : 'border-primary text-primary font-bold'}`}>
                            {step > 1 ? <CheckCircle2 className="w-5 h-5 text-tertiary" /> : "1"}
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-secondary">Your Estate</p>
                            <p className="text-sm font-medium text-primary">{bedrooms} Bedroom, {bathrooms} Bath</p>
                            <p className="text-xs text-primary/70">{serviceType === 'deep' ? 'Deep Cleaning' : 'Standard Cleaning'}</p>
                          </div>
                        </li>

                        {/* Tracker 2: Frequency */}
                        <li className="flex gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-inverted transition-colors ${step > 2 ? 'border-primary bg-primary text-inverted' : step === 2 ? 'border-primary text-primary font-bold' : 'border-black/20 text-black/40 font-bold'}`}>
                            {step > 2 ? <CheckCircle2 className="w-5 h-5 text-tertiary" /> : "2"}
                          </div>
                          <div>
                            <p className={`text-xs font-bold uppercase tracking-widest transition-colors ${step >= 2 ? 'text-secondary' : 'text-black/30'}`}>Frequency</p>
                            {step > 2 && <p className="text-sm font-medium text-primary capitalize">{frequency.replace('-', ' ')}</p>}
                          </div>
                        </li>

                        {/* Tracker 3: When */}
                        <li className="flex gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-inverted transition-colors ${step > 3 ? 'border-primary bg-primary text-inverted' : step === 3 ? 'border-primary text-primary font-bold' : 'border-black/20 text-black/40 font-bold'}`}>
                            {step > 3 ? <CheckCircle2 className="w-5 h-5 text-tertiary" /> : "3"}
                          </div>
                          <div>
                            <p className={`text-xs font-bold uppercase tracking-widest transition-colors ${step >= 3 ? 'text-secondary' : 'text-black/30'}`}>Schedule</p>
                            {step > 3 && <p className="text-sm font-medium text-primary">{date} at {timeWindow}</p>}
                          </div>
                        </li>

                        {/* Tracker 4 & 5... */}
                        <li className="flex gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-inverted transition-colors ${step > 4 ? 'border-primary bg-primary text-inverted' : step === 4 ? 'border-primary text-primary font-bold' : 'border-black/20 text-black/40 font-bold'}`}>
                            {step > 4 ? <CheckCircle2 className="w-5 h-5 text-tertiary" /> : "4"}
                          </div>
                          <div><p className={`text-xs font-bold uppercase tracking-widest mt-1.5 transition-colors ${step >= 4 ? 'text-secondary' : 'text-black/30'}`}>Address & Extras</p></div>
                        </li>
                        <li className="flex gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-inverted transition-colors ${step === 5 ? 'border-primary text-primary font-bold' : 'border-black/20 text-black/40 font-bold'}`}>
                            5
                          </div>
                          <div><p className={`text-xs font-bold uppercase tracking-widest mt-1.5 transition-colors ${step >= 5 ? 'text-secondary' : 'text-black/30'}`}>Investment</p></div>
                        </li>
                     </ul>

                     {/* Price Breakdown */}
                     <div className="mt-8 pt-6 border-t border-black/10">
                       <div className="flex justify-between mb-3 text-sm">
                         <span className="text-secondary">Base Appraisal</span>
                         <span className="font-bold text-primary">${basePrice.toFixed(2)}</span>
                       </div>
                       {addons.length > 0 && (
                         <div className="flex justify-between mb-3 text-sm">
                           <span className="text-secondary">Enhancements</span>
                           <span className="font-bold border-b border-primary/20 border-dotted cursor-help text-primary">${addonTotal.toFixed(2)}</span>
                         </div>
                       )}
                       {discountAmount > 0 && (
                         <div className="flex justify-between mb-3 text-sm text-[#a07c12] font-medium">
                           <span>Recurring Preference</span>
                           <span>-${discountAmount.toFixed(2)}</span>
                         </div>
                       )}
                       <div className="flex justify-between mb-3 text-sm">
                         <span className="text-secondary">Tax (8.875%)</span>
                         <span className="text-primary">${tax.toFixed(2)}</span>
                       </div>

                       {/* Tip Selection matching screenshot aesthetic */}
                       {step === 5 && (
                         <div className="mt-6 mb-4">
                           <div className="flex gap-2 bg-paper p-1 rounded-lg border border-black/10">
                              {[10, 20, 30].map(amt => (
                                <button key={amt} onClick={() => setTipAmount(amt)} className={`flex-1 py-1 text-xs font-bold rounded ${tipAmount === amt ? 'bg-primary text-inverted' : 'text-secondary hover:bg-inverted'}`}>
                                  ${amt}
                                </button>
                              ))}
                              <button onClick={() => setTipAmount(0)} className={`flex-1 py-1 text-xs font-bold rounded ${tipAmount === 0 ? 'bg-primary text-inverted' : 'text-secondary hover:bg-inverted'}`}>
                                None
                              </button>
                           </div>
                         </div>
                       )}

                       <div className="flex justify-between items-end mt-6 pt-4 border-t border-black/10">
                         <span className="font-bold uppercase tracking-widest text-primary text-sm">Total</span>
                         <span className="font-serif text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                       </div>
                     </div>
                  </div>
                 </div>
                 </TiltCard>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
