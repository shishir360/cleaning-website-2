import { Accordion, AccordionContent, AccordionItem } from "./ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

const faqItems = [
  {
    id: "1",
    title: "How does the elite vetting process work?",
    content:
      "Every cleaner undergoes a rigorous 5-step background check, deep interview process, and a 4-week apprenticeship with our master cleaners before ever stepping foot in a client's property. Integrity and discretion are our baseline.",
  },
  {
    id: "2",
    title: "Do you use safe, premium products?",
    content:
      "Absolutely. We utilize exclusively eco-conscious, high-grade cleaning solutions that are tough on grime but gentle on fine materials like marble, exotic woods, and delicate fabrics. Your home's safety and air quality are paramount.",
  },
  {
    id: "3",
    title: "Can I schedule recurring cleanings?",
    content:
      "Yes, our Concierge team can set up daily, weekly, or bi-weekly schedules tailored entirely to your lifestyle. We adapt to your rhythm, ensuring your home is always in pristine condition without you ever needing to ask.",
  },
  {
    id: "4",
    title: "What is your privacy and confidentiality policy?",
    content:
      "We serve high-profile clients and understand the critical nature of privacy. All our professionals sign strict NDAs, and our scheduling and operational protocols are designed to ensure absolute discretion.",
  },
];

export const FAQ = () => {
  return (
    <section className="bg-paper py-32 relative overflow-hidden" id="faq">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[120px] -ml-64 -mt-64 pointer-events-none"></div>
      <div className="max-w-[1400px] z-10 mx-auto px-6 relative flex flex-col lg:flex-row gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="lg:w-1/3 sticky top-32"
        >
          <div className="flex mb-6">
            <div className="border border-tertiary/30 py-1.5 px-4 rounded-full text-xs font-bold uppercase tracking-widest text-tertiary">
              Answers & Expertise
            </div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight leading-[1]">
            Frequently Asked Questions
          </h2>
          <p className="text-secondary text-lg mt-6 font-light">
            Everything you need to know about our elite cleaning standards, processes, and dedication to your comfort.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="lg:w-2/3 space-y-4 w-full"
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item) => (
              <AccordionItem
                value={item.id}
                key={item.id}
                className="rounded-[1.5rem] border border-tertiary/20 bg-inverted/60 backdrop-blur px-6 lg:px-8 py-2 shadow-sm transition-shadow hover:shadow-md"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-5 text-left text-lg font-serif text-primary transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-300 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180 hover:text-tertiary">
                    {item.title}
                    <Plus
                      size={20}
                      strokeWidth={1.5}
                      className="shrink-0 text-tertiary transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-6 pt-2 text-secondary font-light leading-relaxed text-base">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
