import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-8 md:px-16 bg-background relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 mb-16 lg:mb-0">
          <span className="btn-gradient text-transparent bg-clip-text font-bold text-sm tracking-widest uppercase mb-2 block">Nouveautés</span>
          <h2 className="font-semibold text-3xl tracking-tight mb-4 text-dark">Outils de précision</h2>
          <p className="text-dark/60 text-base mb-8">Des artefacts fonctionnels interactifs conçus pour optimiser votre flux de travail de conception et accélérer vos projets.</p>
          <a href="#" className="text-sm font-medium text-dark flex items-center gap-2 hover:opacity-70 transition-opacity">
            Voir tous les composants &rarr;
          </a>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <MelangeurDiagnostique />
          <MachineEcrireTelemetrie />
          <PlanificateurCurseur />
        </div>
      </div>
    </section>
  );
};

const MelangeurDiagnostique = () => {
  const [cards, setCards] = useState(['Primary', 'Secondary', 'Ghost']);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        if (last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary rounded-2xl p-6 flex flex-col h-80 shadow-xl shadow-black/5">
      <div className="relative flex-1 w-full flex items-center justify-center mb-6">
        {cards.map((label, index) => {
          const isTop = index === 0;
          return (
            <div 
              key={label}
              className={`absolute w-3/4 py-3 px-6 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-700 ${isTop ? 'btn-gradient shadow-lg shadow-accent/20' : 'bg-surface border border-white/5 text-white/50'}`}
              style={{
                transform: `translateY(${index * 12}px) scale(${1 - index * 0.05})`,
                zIndex: 10 - index,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
      <div>
        <h3 className="font-medium text-lg mb-1 text-white">Boutons</h3>
        <p className="text-sm text-white/50">24 composants</p>
      </div>
    </div>
  );
};

const MachineEcrireTelemetrie = () => {
  return (
    <div className="bg-primary rounded-2xl p-6 flex flex-col h-80 shadow-xl shadow-black/5">
      <div className="bg-surface rounded-xl p-4 flex-1 overflow-hidden relative shadow-inner mb-6 border border-white/5 flex flex-col justify-center">
        <div className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white/50 mb-3">Input field</div>
        <div className="w-full bg-white/5 border border-accent rounded-lg p-3 text-sm text-white flex justify-between items-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          Input field
          <div className="w-4 h-4 rounded-full btn-gradient flex items-center justify-center">
             <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white stroke-current stroke-2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-lg mb-1 text-white">Champs de saisie</h3>
        <p className="text-sm text-white/50">18 composants</p>
      </div>
    </div>
  );
};

const PlanificateurCurseur = () => {
  const cursorRef = useRef<SVGSVGElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 80, y: 50, duration: 0.8, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(btnRef.current, { backgroundColor: '#6366F1', color: '#FFFFFF', duration: 0.2 }, "-=0.1")
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 })
        .to(btnRef.current, { backgroundColor: 'transparent', color: 'rgba(255,255,255,0.5)', duration: 0.1 }, "+=0.5");
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-primary rounded-2xl p-6 flex flex-col h-80 shadow-xl shadow-black/5 md:col-span-2 lg:col-span-1">
      <div className="relative w-full flex-1 border border-white/5 rounded-xl bg-surface p-4 mb-6 flex flex-col items-center justify-center gap-3">
        <div className="px-4 py-1.5 rounded-full border border-white/10 text-white text-xs flex items-center gap-2">
          Label <span className="opacity-50">✕</span>
        </div>
        <div ref={btnRef} className="px-4 py-1.5 rounded-full border border-white/10 text-white/50 text-xs flex items-center gap-2 transition-colors">
          Label <span className="opacity-50">✕</span>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-xs flex items-center gap-2">
          Label <span className="opacity-50">✕</span>
        </div>

        <svg 
          ref={cursorRef} 
          className="absolute top-0 left-0 w-5 h-5 text-black drop-shadow-md z-20 pointer-events-none" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="#FFF" stroke="black" />
        </svg>
      </div>
      <div>
        <h3 className="font-medium text-lg mb-1 text-white">Étiquettes</h3>
        <p className="text-sm text-white/50">14 composants</p>
      </div>
    </div>
  );
};
