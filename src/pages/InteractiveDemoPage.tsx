import { SEO } from '../components/SEO';
import { StackedCardsInteractionDemo } from '../components/StackedCardsDemo';
import { Sparkles } from 'lucide-react';

export default function InteractiveDemoPage() {
  return (
    <main className="bg-paper flex flex-col pt-32 pb-20 min-h-screen"> 
      <SEO 
        title="Interactive Workflow | Lumina"
        description="Experience our interactive stacked cards component displaying our professional workflow."
      />
      
      <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center">
        <div className="text-center mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full mb-6 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" />
            Component Demo
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-primary tracking-tight mb-6">Interactive Stacked Cards</h1>
          <p className="text-secondary text-lg font-light">
            This is a dedicated page to showcase the requested interactive component. Hover over the cards below to see the animation effect.
          </p>
        </div>

        <div className="w-full max-w-4xl bg-white p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-primary/5 flex items-center justify-center py-24">
          <StackedCardsInteractionDemo />
        </div>
      </div>
    </main>
  );
}
