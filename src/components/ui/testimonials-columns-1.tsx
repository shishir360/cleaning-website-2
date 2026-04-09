"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string; }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 md:p-10 rounded-[2rem] border border-tertiary/20 shadow-xl shadow-primary/5 bg-inverted/95 backdrop-blur max-w-xs w-full text-primary" key={i}>
                  <div className="font-light italic leading-relaxed text-sm">"{text}"</div>
                  <div className="flex items-center gap-4 mt-6">
                    <img
                      width={48}
                      height={48}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full border-2 border-tertiary/20 object-cover grayscale"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight text-primary leading-5">{name}</div>
                      <div className="text-xs font-medium uppercase tracking-widest text-tertiary mt-1">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
