import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Header: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titlePart1Ref = useRef<HTMLSpanElement>(null);
  const titlePart2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);



  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -20'
      });

      gsap.fromTo([titlePart1Ref.current, titlePart2Ref.current, subtitleRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-500">
        <nav ref={navRef} className={`flex items-center justify-between px-3 py-3 rounded-2xl transition-all duration-500 bg-primary shadow-2xl`}>
          <div className="flex items-center gap-2 pl-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2L2 22H6L12 10L18 22H22L12 2Z" fill="url(#paint0_linear)"/>
               <defs>
                 <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                   <stop stopColor="#4F46E5"/>
                   <stop offset="1" stopColor="#A855F7"/>
                 </linearGradient>
               </defs>
            </svg>
            <div className="font-semibold text-lg tracking-tight text-white">WizyVibe</div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#lexicon" className="hover:text-white transition-colors">Lexique</a>
            <a href="#pricing" className="hover:text-white transition-colors">Tarification</a>
            <a href="#" className="hover:text-white transition-colors">Ressources</a>
            <span className="bg-white/10 text-white/70 text-[10px] px-2 py-0.5 rounded-full">BETA</span>
          </div>
          <button className="btn-gradient px-6 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] shadow-lg shadow-accent/20">
            Commencer
          </button>
        </nav>
      </div>

      <section ref={heroRef} className="relative min-h-[90dvh] w-full flex items-center justify-center pt-20 px-8 bg-hero-waves">
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-60"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <h1 className="flex flex-col leading-[1.1] tracking-tight">
            <span ref={titlePart1Ref} className="font-bold text-5xl md:text-[5.5rem] opacity-0 text-dark">
              Concevez plus vite.
            </span>
            <span ref={titlePart2Ref} className="font-bold text-5xl md:text-[5.5rem] opacity-0 text-gradient pb-2">
              Livrez mieux.
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-dark/60 opacity-0 mt-4" ref={subtitleRef}>
            WizyVibe vous fournit des artefacts fonctionnels et interactifs pour booster votre créativité et accélérer vos projets.
          </p>
        </div>
      </section>
      
      <div id="lexicon" className="bg-background pt-10 px-8 md:px-16 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col justify-center items-center gap-8">
          <div className="relative w-full max-w-2xl shadow-xl shadow-accent/5 rounded-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
            <input type="text" placeholder="Rechercher un effet, composant, animation..." className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-16 py-4 text-base text-dark focus:outline-none focus:border-accent/30 transition-colors placeholder:text-dark/40" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
               <span className="bg-background border border-black/10 text-xs px-1.5 py-0.5 rounded">⌘</span>
               <span className="bg-background border border-black/10 text-xs px-1.5 py-0.5 rounded">K</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 w-full pb-2 md:pb-0">
            {['Tous', '✨ Nouveautés', 'UI Components', 'Interactions', 'Data Display', 'Feedback', 'Navigation'].map((tab, i) => (
              <button key={tab} className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${i === 0 ? 'btn-gradient' : 'bg-white border border-black/5 text-dark/70 hover:bg-black/5'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
