import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";

import { siteConfig } from '../../config/siteConfig';

export function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto hidden md:flex w-fit rounded-full border border-white/40 bg-white/70 backdrop-blur-xl p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {siteConfig.navLinks.map((link) => (
        <Tab key={link.path} setPosition={setPosition} to={link.path}>
          {link.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  to,
  key
}: {
  children: React.ReactNode;
  setPosition: any;
  to: string;
  key?: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className={`relative z-10 block cursor-pointer px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 md:px-7 md:py-3.5 ${isActive ? 'text-primary' : 'text-primary/60 hover:text-primary/90'}`}
    >
      <Link to={to} className="w-full h-full block">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-10 rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-tertiary/40 border border-tertiary/50 md:h-[46px] pointer-events-none shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)] mix-blend-multiply"
    />
  );
};
