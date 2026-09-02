import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, SlidersHorizontal } from 'lucide-react';
import type { EffectItem } from '../data/registry';

interface InspectorDrawerProps {
  effect: EffectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({ effect, isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isOpen && drawerRef.current) {
        gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
      } else if (!isOpen && drawerRef.current) {
        gsap.to(drawerRef.current, { x: '100%', duration: 0.3, ease: "power2.in" });
      }
    });
    return () => ctx.revert();
  }, [isOpen]);

  if (!effect) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 w-full md:w-[400px] h-[100dvh] bg-primary border-l border-black/10 z-50 shadow-2xl flex flex-col translate-x-full"
      >
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-primary">
          <div className="flex items-center gap-2 text-dark/80">
            <SlidersHorizontal className="w-4 h-4" />
            <h2 className="font-semibold text-base">Inspecteur</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-black/5 text-dark/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-8">
            <h3 className="font-semibold text-xl mb-1 text-dark">{effect.name}</h3>
            <p className="text-dark/60 text-sm">{effect.description}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-xs text-dark/50 mb-2 uppercase tracking-wider">Tailwind Classes</label>
              <div className="bg-dark text-white/90 p-4 rounded-xl border border-black/10 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
                {effect.tailwindClasses}
              </div>
            </div>
            
            {effect.css && (
              <div>
                <label className="block font-medium text-xs text-dark/50 mb-2 uppercase tracking-wider">Custom CSS</label>
                <div className="bg-dark text-white/90 p-4 rounded-xl border border-black/10 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
                  {effect.css}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-5 border-t border-black/10 bg-primary">
          <button 
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium text-sm hover:bg-black/90 transition-colors shadow-md"
            onClick={() => navigator.clipboard.writeText(effect.tailwindClasses)}
          >
            Copier le code
          </button>
        </div>
      </div>
    </>
  );
};
