import React from "react";
import { motion, Variants } from "motion/react";

interface ThreeDTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

export function ThreeDText({ text, className = "", delay = 0, wordMode = false }: ThreeDTextProps) {
  const items = wordMode ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: delay * i,
        cascade: true
      },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      transformPerspective: 1000,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      z: 300,
      rotateX: -90,
      transformPerspective: 1000,
    },
  };

  return (
    <motion.div
      style={{ display: "inline-flex", flexWrap: "wrap", transformStyle: "preserve-3d" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", marginRight: wordMode && item !== "" ? "0.25em" : "0em" }}
          className={className}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.div>
  );
}
