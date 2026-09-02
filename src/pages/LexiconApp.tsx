import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Header } from '../components/Header';
import { EffectCard } from '../components/EffectCard';
import { InspectorDrawer } from '../components/InspectorDrawer';
import { Toast } from '../components/Toast';
import { Footer } from './Landing';
import { effectRegistry, CATEGORIES } from '../data/registry';
import type { EffectItem } from '../data/registry';

export const LexiconApp: React.FC = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [inspectedEffect, setInspectedEffect] = useState<EffectItem | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const handleCopy = (id: string) => {
    const effect = effectRegistry.find(e => e.id === id);
    if (effect) {
      navigator.clipboard.writeText(effect.tailwindClasses);
      setToastMessage(`Copié: ${effect.name}`);
      setShowToast(true);
    }
  };

  const filteredEffects = effectRegistry.filter((effect) => {
    const matchesSearch = effect.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          effect.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || 
                            activeCategory === '✨ Nouveautés' || 
                            effect.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background relative text-dark pt-32">
      <svg className="noise-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <Header showSearch={true} />
      
      <div className="bg-background px-8 md:px-16 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col justify-center items-center gap-8 mb-16">
          <div className="relative w-full max-w-2xl shadow-xl shadow-accent/5 rounded-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un effet, composant, animation..." 
              className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-16 py-4 text-base text-dark focus:outline-none focus:border-accent/30 transition-colors placeholder:text-dark/40 shadow-inner" 
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
               <span className="bg-background border border-black/10 text-xs px-1.5 py-0.5 rounded">⌘</span>
               <span className="bg-background border border-black/10 text-xs px-1.5 py-0.5 rounded">K</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            {CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab;
              return (
                <button 
                  key={tab} 
                  onClick={() => setActiveCategory(tab)}
                  className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${isActive ? 'btn-gradient' : 'bg-white border border-black/5 text-dark/70 hover:bg-black/5'}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-dark">
            {activeCategory === 'Tous' ? 'Tous les composants' : activeCategory}
          </h2>
          <span className="text-sm font-medium text-dark/40">{filteredEffects.length} composants</span>
        </div>
        <div className="max-w-6xl mx-auto min-h-[40vh]">
          {filteredEffects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEffects.map((effect) => (
                <EffectCard 
                  key={effect.id} 
                  effect={effect} 
                  onCopy={handleCopy} 
                  onInspect={(e) => setInspectedEffect(e)} 
                />
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-dark/40 bg-white/50 rounded-3xl border border-black/5">
              <div className="text-4xl mb-4">🔍</div>
              <p>Aucun composant trouvé pour "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <InspectorDrawer 
        effect={inspectedEffect} 
        isOpen={!!inspectedEffect} 
        onClose={() => setInspectedEffect(null)} 
      />

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};
