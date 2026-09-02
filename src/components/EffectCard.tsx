import { Copy } from 'lucide-react';
import type { EffectItem } from '../data/registry';

interface EffectCardProps {
  effect: EffectItem;
  onCopy: (id: string) => void;
  onInspect: (effect: EffectItem) => void;
}

export const EffectCard: React.FC<EffectCardProps> = ({ effect, onCopy, onInspect }) => {
  return (
    <div className="flex flex-col bg-primary rounded-2xl shadow-xl shadow-black/5 overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      {/* Visualization Area */}
      <div 
        className="h-64 bg-surface relative flex items-center justify-center p-8 overflow-hidden cursor-pointer border-b border-white/5"
        onClick={() => onInspect(effect)}
      >
        {effect.css && <style>{effect.css}</style>}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none"></div>
          
          <div className={`${effect.tailwindClasses.replace('rounded-[2rem]', 'rounded-2xl')} ${effect.id === 'shimmer-button' ? 'shimmer-btn' : ''} max-w-full max-h-full relative z-10`}>
            {effect.id === 'bento-asymmetric' ? (
              <>
                <div className="bg-white/10 rounded-lg h-20 border border-white/5"></div>
                <div className="bg-white/5 rounded-lg h-28 md:col-span-2 border border-white/5"></div>
                <div className="bg-black/50 rounded-lg h-16 md:col-span-3 border border-white/5"></div>
              </>
            ) : effect.id === 'shimmer-button' ? (
              'Survolez-moi'
            ) : effect.id === 'glassmorphism' ? (
              <div className="text-white font-medium text-sm">Glassmorphism</div>
            ) : (
              <div className="w-20 h-20 bg-white/10 rounded-xl border border-white/5"></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Info Area */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-lg text-white mb-1">{effect.name}</h3>
          <p className="text-white/50 text-sm line-clamp-2">{effect.description}</p>
        </div>
        
        <div className="flex items-center gap-3 mt-auto pt-2">
          <button 
            onClick={() => onInspect(effect)}
            className="flex-1 bg-white/5 text-white/80 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-all border border-white/5"
          >
            Inspecter
          </button>
          <button 
            onClick={() => onCopy(effect.id)}
            className="flex items-center justify-center gap-2 btn-gradient px-4 py-2.5 rounded-xl text-sm font-medium hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20"
          >
            <Copy className="w-4 h-4" />
            <span>Copier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
