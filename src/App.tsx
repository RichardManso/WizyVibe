import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { EffectCard } from './components/EffectCard';
import { InspectorDrawer } from './components/InspectorDrawer';
import { Toast } from './components/Toast';
import { effectRegistry } from './data/registry';
import type { EffectItem } from './data/registry';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
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
    <div className="min-h-screen bg-background relative text-dark">
      <svg className="noise-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <div className="bg-background px-8 md:px-16 pb-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-dark">
            {activeCategory === 'Tous' ? 'Catégories populaires' : activeCategory}
          </h2>
          <span className="text-sm font-medium text-dark/40">{filteredEffects.length} composants</span>
        </div>
        <div className="max-w-6xl mx-auto">
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
            <div className="w-full py-20 flex flex-col items-center justify-center text-dark/40">
              <div className="text-4xl mb-4">🔍</div>
              <p>Aucun composant trouvé pour "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      <Features />
      <Philosophie />
      <Protocole />
      <Tarification />
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
}

const Philosophie = () => {
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(title1Ref.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: title1Ref.current, start: 'top 80%' } }
      );
      gsap.fromTo(title2Ref.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, delay: 0.1, scrollTrigger: { trigger: title2Ref.current, start: 'top 80%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-40 px-8 md:px-16 bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-hero-waves opacity-20"></div>
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-8 text-center items-center">
        <div ref={title1Ref} className="text-xl md:text-2xl text-white/50 max-w-2xl font-medium tracking-tight">
          La plupart des bibliothèques fournissent du code générique.
        </div>
        <div ref={title2Ref} className="text-4xl md:text-6xl leading-tight font-semibold tracking-tighter">
          Nous fournissons des <span className="text-gradient">artefacts de conception.</span>
        </div>
      </div>
    </section>
  );
};

const Protocole = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="docs" ref={containerRef} className="py-32 bg-background px-8 md:px-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-24">
        <div className="text-center mb-8">
          <h2 className="font-semibold text-3xl md:text-4xl text-dark tracking-tight">Le Workflow</h2>
        </div>
        
        {/* Card 1 */}
        <div className="sticky top-32 bg-primary p-10 rounded-3xl shadow-xl flex flex-col md:flex-row gap-12 items-center min-h-[40vh] border border-white/5">
          <div className="flex-1">
            <div className="font-mono text-accent text-sm mb-4">01</div>
            <h3 className="font-semibold text-2xl mb-3 text-white">Exploration</h3>
            <p className="text-white/60 text-base leading-relaxed">Découvrez le lexique visuel et identifiez l'effet parfait pour votre interface. Chaque micro-interaction compte.</p>
          </div>
          <div className="flex-1 w-full aspect-square flex items-center justify-center bg-surface rounded-2xl border border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-dark opacity-30"></div>
             <div className="w-24 h-24 border-2 border-white/10 rounded-full animate-[spin_10s_linear_infinite] border-t-accent relative z-10"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="sticky top-36 bg-surface p-10 rounded-3xl shadow-xl flex flex-col md:flex-row gap-12 items-center min-h-[40vh] border border-white/5">
          <div className="flex-1">
            <div className="font-mono text-accent text-sm mb-4">02</div>
            <h3 className="font-semibold text-2xl mb-3 text-white">Génération</h3>
            <p className="text-white/60 text-base leading-relaxed">Obtenez des classes Tailwind et des configurations GSAP optimisées pour des performances fluides.</p>
          </div>
          <div className="flex-1 w-full aspect-square flex items-center justify-center bg-primary rounded-2xl relative overflow-hidden border border-white/5">
             <div className="absolute w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2"></div>
             <div className="grid grid-cols-5 gap-2 w-full px-12 z-10">
                {Array.from({length: 25}).map((_, i) => <div key={i} className="aspect-square bg-white/5 rounded-[2px]"></div>)}
             </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="sticky top-40 bg-white p-10 rounded-3xl text-dark shadow-2xl flex flex-col md:flex-row gap-12 items-center min-h-[40vh]">
          <div className="flex-1">
            <div className="font-mono text-accent text-sm mb-4">03</div>
            <h3 className="font-semibold text-2xl mb-3 text-dark">Implémentation</h3>
            <p className="text-dark/70 text-base leading-relaxed">Copiez, collez, et regardez votre application se transformer en un produit digital de classe mondiale.</p>
          </div>
          <div className="flex-1 w-full aspect-square flex items-center justify-center bg-background rounded-2xl border border-black/5">
             <svg viewBox="0 0 100 100" className="w-32 h-32 text-accent stroke-current fill-none stroke-[2]">
                <path d="M20 50 L40 70 L80 30" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

const Tarification = () => {
  return (
    <section id="pricing" className="py-32 px-8 md:px-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-semibold text-3xl md:text-4xl tracking-tight mb-3 text-dark">Adhésion</h2>
          <p className="text-dark/60 text-base max-w-xl mx-auto">Rejoignez l'élite des ingénieurs front-end.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          {/* Essentiel */}
          <div className="bg-primary rounded-3xl p-10 flex flex-col shadow-xl">
            <h3 className="font-medium text-xl mb-1 text-white">Essentiel</h3>
            <div className="font-semibold text-3xl mb-8 tracking-tight text-white">Gratuit</div>
            <ul className="space-y-4 mb-10 flex-1 text-white/70 text-sm">
              <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-accent"/> Accès au lexique de base</li>
              <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-accent"/> Copie des prompts CSS</li>
            </ul>
            <button className="w-full bg-surface text-white py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors border border-white/5">Commencer</button>
          </div>
          
          {/* Performance */}
          <div className="bg-primary border border-accent/30 rounded-3xl p-10 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-waves opacity-10"></div>
            <div className="absolute top-0 right-8 btn-gradient text-white text-[10px] font-bold px-3 py-1 rounded-b-lg tracking-wider uppercase z-10">Recommandé</div>
            <h3 className="font-medium text-xl mb-1 text-white relative z-10">Performance</h3>
            <div className="font-semibold text-3xl mb-8 tracking-tight text-white relative z-10">29€<span className="text-sm text-white/50 font-normal">/mois</span></div>
            <ul className="space-y-4 mb-10 flex-1 text-white/80 text-sm relative z-10">
              <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-accent"/> Accès total au lexique</li>
              <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-accent"/> Composants React & GSAP</li>
              <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-accent"/> Mises à jour prioritaires</li>
            </ul>
            <button className="w-full btn-gradient text-white py-3 rounded-xl text-sm font-medium transition-transform hover:scale-[1.02] shadow-lg relative z-10">S'abonner</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white px-8 md:px-16 pt-20 pb-8 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
             <div className="flex items-center gap-2">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22H6L12 10L18 22H22L12 2Z" fill="url(#paint0_linear_footer)"/>
                  <defs>
                    <linearGradient id="paint0_linear_footer" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4F46E5"/>
                      <stop offset="1" stopColor="#A855F7"/>
                    </linearGradient>
                  </defs>
               </svg>
               <div className="font-semibold text-xl text-white tracking-tight">WizyVibe</div>
             </div>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed">L'outil de conception visuelle pour les ingénieurs d'interfaces modernes.</p>
            <div className="flex items-center gap-2 bg-surface w-fit px-3 py-1.5 rounded-full border border-white/5 mt-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
              <span className="font-mono text-[10px] text-white/70 uppercase tracking-wider">Système Opérationnel</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-medium text-sm text-white mb-2">Navigation</div>
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#lexicon" className="text-sm text-white/50 hover:text-white transition-colors">Lexique</a>
            <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Tarification</a>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-medium text-sm text-white mb-2">Légal</div>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Conditions</a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <div>© {new Date().getFullYear()} WizyVibe.</div>
          <div>All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default App;
