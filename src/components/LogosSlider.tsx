import { InfiniteSlider } from './ui/infinite-slider';
import { ProgressiveBlur } from './ui/progressive-blur';
import { ShieldCheck, Leaf, Sparkles, Medal, Award, CheckCircle } from 'lucide-react';

const logos = [
  {
    id: "logo-1",
    name: "Eco-Friendly",
    Icon: Leaf,
    className: "h-5 w-5 md:h-8 md:w-8 text-tertiary",
  },
  {
    id: "logo-2",
    name: "Fully Insured",
    Icon: ShieldCheck,
    className: "h-5 w-5 md:h-8 md:w-8 text-tertiary",
  },
  {
    id: "logo-3",
    name: "Top Rated",
    Icon: Star,
    className: "h-5 w-5 md:h-8 md:w-8 text-tertiary",
  },
  {
    id: "logo-4",
    name: "100% Guaranteed",
    Icon: Award,
    className: "h-5 w-5 md:h-8 md:w-8 text-tertiary",
  },
  {
    id: "logo-5",
    name: "Vetted Staff",
    Icon: CheckCircle,
    className: "h-5 w-5 md:h-8 md:w-8 text-tertiary",
  },
  {
    id: "logo-6",
    name: "Spotless Clean",
    Icon: Sparkles,
    className: "h-5 w-5 md:h-8 md:w-8 text-tertiary",
  },
];

// Re-using lucide-react Star since it's used elsewhere
import { Star } from 'lucide-react';

export function LogosSlider() {
  return (
    <div className='relative h-[100px] md:h-[120px] w-full overflow-hidden bg-paper/30 flex items-center justify-center border-y border-inverted/5'>
      <InfiniteSlider 
        className='flex h-full w-full items-center' 
        duration={30}
        gap={40}
      >
        {logos.map((logo) => (
          <div 
            key={logo.id} 
            className='flex items-center justify-center gap-3 md:gap-4 text-primary/80 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300'
          >
            <logo.Icon className={logo.className} />
            <span className="font-serif text-lg md:text-2xl tracking-tighter sm:tracking-tight uppercase">{logo.name}</span>
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[60px] md:w-[250px]'
        direction='left'
        blurIntensity={1.2}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[60px] md:w-[250px]'
        direction='right'
        blurIntensity={1.2}
      />
    </div>
  );
}
