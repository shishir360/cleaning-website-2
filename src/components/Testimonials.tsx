import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "The elite service exceeded all expectations. Our penthouse has never looked this immaculate. Truly a top 1% experience.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Penthouse Owner",
  },
  {
    text: "Setting up recurring cleaning was effortless. Their attention to detail on fine marble surfaces is unmatched.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Estate Manager",
  },
  {
    text: "The post-construction cleanup was thorough and incredibly fast. Highly recommended for luxury properties.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Architect",
  },
  {
    text: "Professional, discreet, and highly detail-oriented. They truly understand what luxury care entails.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "The deep cleaning revived our delicate fabrics perfectly. Their artisans are absolute masters of their craft.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Interior Designer",
  },
  {
    text: "An absolute game-changer for our corporate office. Cleanliness is now something we never have to worry about.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Operations Director",
  },
  {
    text: "Their team was punctual and respectful of our privacy. Fantastic results every single time.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Homeowner",
  },
  {
    text: "The booking process was seamless, and the execution was flawless. This is the only service we trust.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Real Estate Broker",
  },
  {
    text: "Best investment in our property maintenance. Their elite rating is well deserved.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Property Manager",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const Testimonials = () => {
  return (
    <section className="bg-paper py-32 relative overflow-hidden" id="reviews">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tertiary/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none"></div>
      <div className="max-w-[1400px] z-10 mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[740px] mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="border border-tertiary/30 py-1.5 px-4 rounded-full text-xs font-bold uppercase tracking-widest text-tertiary bg-white/50 backdrop-blur">
              Client Reviews
            </div>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-primary tracking-tight leading-[1]">
            What our clients say
          </h2>
          <p className="text-secondary text-lg lg:text-xl mt-6 font-light">
            Hear directly from those who have experienced our uncompromising standard of elite cleanliness.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block w-full max-w-xs" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block w-full max-w-xs" duration={17} />
        </div>
      </div>
    </section>
  );
};
