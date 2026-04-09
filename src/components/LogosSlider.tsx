import { InfiniteSlider } from './ui/infinite-slider';
import { ProgressiveBlur } from './ui/progressive-blur';
import { ShieldCheck, Leaf, Sparkles, Medal, Award, CheckCircle } from 'lucide-react';

const logos = [
  {
    id: "logo-1",
    name: "Eco-Friendly",
    Icon: Leaf,
    className: "h-8 w-8 text-green-600",
  },
  {
    id: "logo-2",
    name: "Fully Insured",
    Icon: ShieldCheck,
    className: "h-8 w-8 text-blue-600",
  },
  {
    id: "logo-3",
    name: "Top Rated",
    Icon: Star,
    className: "h-8 w-8 text-yellow-500",
  },
  {
    id: "logo-4",
    name: "100% Guaranteed",
    Icon: Award,
    className: "h-8 w-8 text-purple-600",
  },
  {
    id: "logo-5",
    name: "Vetted Staff",
    Icon: CheckCircle,
    className: "h-8 w-8 text-teal-600",
  },
  {
    id: "logo-6",
    name: "Spotless Clean",
    Icon: Sparkles,
    className: "h-8 w-8 text-amber-500",
  },
];

// Re-using lucide-react Star since it's used elsewhere
import { Star } from 'lucide-react';

export function LogosSlider() {
  return (
    <div className='relative h-[120px] w-full overflow-hidden bg-paper/50 flex items-center justify-center border-y border-black/5'>
      <InfiniteSlider 
        className='flex h-full w-full items-center' 
        duration={30}
        gap={64}
      >
        {logos.map((logo) => (
          <div 
            key={logo.id} 
            className='flex items-center justify-center gap-4 text-primary/80 grayscale hover:grayscale-0 transition-all duration-300'
          >
            <logo.Icon className={logo.className} />
            <span className="font-serif text-2xl tracking-tight uppercase">{logo.name}</span>
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[150px] md:w-[250px]'
        direction='left'
        blurIntensity={1.5}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[150px] md:w-[250px]'
        direction='right'
        blurIntensity={1.5}
      />
    </div>
  );
}
