import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, SlidersHorizontal, Code2, Paintbrush } from 'lucide-react';
import type { EffectItem } from '../data/registry';

interface InspectorDrawerProps {
  effect: EffectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({ effect, isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'tailwind' | 'react'>('tailwind');

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

  // Reset tab when effect changes
  useEffect(() => {
    setActiveTab('tailwind');
  }, [effect]);

  if (!effect) return null;

  const handleCopy = () => {
    const textToCopy = activeTab === 'react' && effect.reactCode 
      ? effect.reactCode 
      : effect.tailwindClasses + (effect.css ? '\n\n/* CSS */\n' + effect.css : '');
    
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 w-full md:w-[450px] h-[100dvh] bg-primary border-l border-white/5 z-50 shadow-2xl flex flex-col translate-x-full text-white"
      >
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80">
            <SlidersHorizontal className="w-4 h-4" />
            <h2 className="font-semibold text-base">Inspecteur</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-white/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-accent/20 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">{effect.category}</span>
            </div>
            <h3 className="font-semibold text-2xl mb-2">{effect.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{effect.description}</p>
          </div>

          {effect.reactCode && (
            <div className="flex p-1 bg-surface rounded-xl border border-white/5 mb-6">
              <button
                onClick={() => setActiveTab('tailwind')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'tailwind' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
              >
                <Paintbrush className="w-4 h-4" /> CSS / Tailwind
              </button>
              <button
                onClick={() => setActiveTab('react')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'react' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
              >
                <Code2 className="w-4 h-4" /> Code React
              </button>
            </div>
          )}
          
          <div className="space-y-6">
            {activeTab === 'tailwind' ? (
              <>
                <div>
                  <label className="block font-medium text-xs text-white/40 mb-2 uppercase tracking-wider">Tailwind Classes</label>
                  <div className="bg-[#101012] text-white/90 p-4 rounded-xl border border-white/5 font-mono text-[12px] leading-relaxed overflow-x-auto shadow-inner whitespace-pre-wrap">
                    {effect.tailwindClasses}
                  </div>
                </div>
                
                {effect.css && (
                  <div>
                    <label className="block font-medium text-xs text-white/40 mb-2 uppercase tracking-wider">Custom CSS</label>
                    <div className="bg-[#101012] text-white/90 p-4 rounded-xl border border-white/5 font-mono text-[12px] leading-relaxed overflow-x-auto shadow-inner whitespace-pre-wrap">
                      {effect.css}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className="block font-medium text-xs text-white/40 mb-2 uppercase tracking-wider">Composant React</label>
                <div className="bg-[#101012] text-white/90 p-4 rounded-xl border border-white/5 font-mono text-[12px] leading-relaxed overflow-x-auto shadow-inner whitespace-pre">
                  {effect.reactCode}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-5 border-t border-white/5 bg-primary">
          <button 
            className="w-full btn-gradient py-3 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02] shadow-lg"
            onClick={handleCopy}
          >
            Copier le code {activeTab === 'react' ? 'React' : 'CSS/Tailwind'}
          </button>
        </div>
      </div>
    </>
  );
};
