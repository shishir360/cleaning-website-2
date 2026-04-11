import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface LuxurySelectProps {
  label: string;
  options: Option[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const LuxurySelect: React.FC<LuxurySelectProps> = ({ 
  label, 
  options, 
  placeholder = "Select an option", 
  value, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-[9px] uppercase tracking-[0.25em] font-bold text-tertiary/80 mb-1.5 transition-colors group-hover:text-tertiary">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md px-4 py-3.5 border transition-all duration-300 relative group overflow-hidden ${
          isOpen ? 'border-tertiary shadow-[0_0_20px_rgba(192,160,98,0.2)]' : 'border-white/10 hover:border-tertiary/40'
        }`}
      >
        {/* Selection highlight (subtle) */}
        {isOpen && <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-tertiary/50 to-transparent" />}
        
        <span className={`text-sm tracking-wide truncate ${selectedOption ? 'text-inverted' : 'text-inverted/40 font-light'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-tertiary' : 'text-tertiary/40 group-hover:text-tertiary/70'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-[100] top-full left-0 right-0 mt-2 bg-primary/95 backdrop-blur-3xl border border-tertiary/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="max-h-[240px] overflow-y-auto no-scrollbar py-2 relative z-10">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-3.5 text-sm transition-all duration-200 group relative ${
                      isSelected ? 'text-tertiary bg-white/[0.05]' : 'text-inverted/60 hover:text-inverted hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Item glow on hover */}
                    <div className="absolute inset-0 bg-tertiary/0 group-hover:bg-tertiary/[0.03] transition-colors" />
                    
                    <span className="relative z-10 tracking-wide font-light group-hover:font-normal">
                      {option.label}
                    </span>
                    
                    {isSelected && (
                      <motion.div
                        layoutId="active-check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10"
                      >
                        <Check className="w-3.5 h-3.5 text-tertiary" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
