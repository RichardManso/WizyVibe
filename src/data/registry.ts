export interface EffectParameter {
  id: string;
  label: string;
  type: 'color' | 'range' | 'text' | 'select';
  defaultValue: string | number;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface EffectItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tailwindClasses: string;
  css?: string;
  reactCode?: string;
  parameters?: EffectParameter[];
  isPremium?: boolean;
}

export const CATEGORIES = ['Tous', '✨ Nouveautés', 'UI Components', 'Interactions', 'Data Display', 'Feedback', 'Navigation'];

export const effectRegistry: EffectItem[] = [
  {
    id: "shimmer-button",
    name: "Bouton Magnétique",
    description: "Bouton avec un effet de brillance continue et une ombre dynamique au survol.",
    category: "UI Components",
    parameters: [
      { id: "bg_color", label: "Couleur de Fond", type: "color", defaultValue: "#000000" },
      { id: "text_color", label: "Couleur du Texte", type: "color", defaultValue: "#ffffff" },
      { id: "padding_x", label: "Padding Horizontal", type: "range", defaultValue: 8, min: 4, max: 16, step: 1 },
      { id: "padding_y", label: "Padding Vertical", type: "range", defaultValue: 4, min: 2, max: 8, step: 1 },
      { id: "border_radius", label: "Arrondi", type: "select", defaultValue: "2xl", options: ["md", "lg", "xl", "2xl", "3xl", "full"] }
    ],
    tailwindClasses: "relative overflow-hidden bg-[{{bg_color}}] text-[{{text_color}}] px-{{padding_x}} py-{{padding_y}} rounded-{{border_radius}} font-semibold shadow-lg transition-transform hover:scale-[1.02] border border-white/10 group shimmer-btn",
    css: `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .shimmer-btn::after {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0));
        animation: shimmer 2.5s infinite;
      }
    `,
    reactCode: `import React from 'react';

export const ShimmerButton = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="relative overflow-hidden bg-[{{bg_color}}] text-[{{text_color}}] px-{{padding_x}} py-{{padding_y}} rounded-{{border_radius}} font-semibold shadow-lg transition-transform hover:scale-[1.02] border border-white/10 group shimmer-btn"
    >
      {children}
    </button>
  );
};

// N'oubliez pas d'ajouter les keyframes shimmer dans votre fichier CSS !`
  },
  {
    id: "glassmorphism",
    name: "Carte Holographique",
    description: "Carte en verre dépoli avec bordure lumineuse et reflet asymétrique.",
    category: "Data Display",
    isPremium: true,
    tailwindClasses: "w-64 h-40 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] flex items-center justify-center relative overflow-hidden glass-card",
    css: `
      .glass-card::before {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
        transform: rotate(45deg);
        pointer-events: none;
      }
    `,
    reactCode: `import React from 'react';

export const GlassCard = ({ title, children }) => {
  return (
    <div className="w-64 h-40 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-6 relative overflow-hidden glass-card">
      <h3 className="text-white font-medium mb-2 relative z-10">{title}</h3>
      <div className="text-white/70 text-sm relative z-10">
        {children}
      </div>
    </div>
  );
};`
  },
  {
    id: "bento-asymmetric",
    name: "Grille Bento Asymétrique",
    description: "Structure de dashboard minimaliste inspirée du design Bento d'Apple.",
    category: "UI Components",
    tailwindClasses: "grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full",
    reactCode: `import React from 'react';

export const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#F8F9FA] w-full rounded-3xl">
      <div className="bg-[#151518] rounded-2xl h-32 border border-black/10 flex items-center justify-center text-white/50">Widget 1</div>
      <div className="bg-white rounded-2xl h-48 md:col-span-2 border border-black/5 shadow-sm flex items-center justify-center text-dark/50">Graphique Principal</div>
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#A855F7] rounded-2xl h-24 md:col-span-3 border border-black/10 shadow-lg text-white flex items-center p-6 font-medium">Bannière d'action</div>
    </div>
  );
};`
  },
  {
    id: "live-badge",
    name: "Badge Statut Live",
    description: "Un indicateur de statut clignotant pour montrer l'activité en temps réel.",
    category: "Feedback",
    parameters: [
      { id: "dot_color", label: "Couleur du Point", type: "color", defaultValue: "#22c55e" },
      { id: "text", label: "Texte du Badge", type: "text", defaultValue: "Système Opérationnel" }
    ],
    tailwindClasses: "flex items-center gap-2 bg-white border border-black/10 px-3 py-1.5 rounded-full shadow-sm w-fit",
    reactCode: `import React from 'react';

export const LiveBadge = ({ status = "{{text}}" }) => {
  return (
    <div className="flex items-center gap-2 bg-white border border-black/10 px-3 py-1.5 rounded-full shadow-sm w-fit">
      <div className="w-1.5 h-1.5 rounded-full bg-[{{dot_color}}] animate-pulse shadow-[0_0_8px_{{dot_color}}]"></div>
      <span className="font-mono text-[10px] text-dark/70 uppercase tracking-wider">{status}</span>
    </div>
  );
};`
  },
  {
    id: "magnetic-input",
    name: "Input Magnétique",
    description: "Champ de saisie qui réagit au focus avec une bordure néon et une ombre portée colorée.",
    category: "UI Components",
    parameters: [
      { id: "glow_color", label: "Couleur du Halo", type: "select", defaultValue: "indigo-500", options: ["indigo-500", "purple-500", "rose-500", "emerald-500", "blue-500"] },
      { id: "blur_amount", label: "Flou du Halo", type: "select", defaultValue: "xl", options: ["sm", "md", "lg", "xl", "2xl"] }
    ],
    tailwindClasses: "w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-dark focus:outline-none focus:border-[{{glow_color}}] focus:ring-4 focus:ring-[{{glow_color}}]/20 transition-all shadow-sm",
    reactCode: `import React, { useState } from 'react';

export const MagneticInput = ({ placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-sm">
      <input 
        type="text" 
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-dark focus:outline-none focus:border-{{glow_color}} focus:ring-4 focus:ring-{{glow_color}}/20 transition-all shadow-sm relative z-10"
      />
      <div className={\`absolute inset-0 bg-{{glow_color}}/20 blur-{{blur_amount}} rounded-xl transition-opacity duration-300 \${isFocused ? 'opacity-100' : 'opacity-0'}\`}></div>
    </div>
  );
};`
  },
  {
    id: "gsap-text-reveal",
    name: "Révélation Texte (GSAP)",
    description: "Animation d'apparition fluide des mots utilisant GSAP ScrollTrigger.",
    category: "Animations",
    isPremium: true,
    parameters: [
      { id: "duration", label: "Durée (s)", type: "range", defaultValue: 0.8, min: 0.2, max: 2, step: 0.1 },
      { id: "stagger", label: "Décalage (s)", type: "range", defaultValue: 0.05, min: 0.01, max: 0.2, step: 0.01 },
      { id: "y_offset", label: "Décalage Y (px)", type: "range", defaultValue: 50, min: 10, max: 150, step: 10 }
    ],
    tailwindClasses: "font-semibold text-3xl tracking-tight text-dark overflow-hidden flex flex-wrap gap-2",
    reactCode: `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TextReveal = ({ text }) => {
  const containerRef = useRef(null);
  const words = text.split(' ');

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.word', 
        { y: {{y_offset}}, opacity: 0 }, 
        { 
          y: 0, opacity: 1, 
          duration: {{duration}}, 
          stagger: {{stagger}}, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={containerRef} className="font-semibold text-3xl tracking-tight text-dark flex flex-wrap gap-[0.25em]">
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden">
          <span className="word inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
};`
  }
];