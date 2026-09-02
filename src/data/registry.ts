export interface EffectItem {
  id: string;
  name: string;
  description: string;
  tailwindClasses: string;
  css?: string;
}

export const effectRegistry: EffectItem[] = [
  {
    id: "glassmorphism",
    name: "Glassmorphism Card",
    description: "Une carte translucide avec un effet de flou arrière-plan.",
    tailwindClasses: "bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-8",
  },
  {
    id: "bento-asymmetric",
    name: "Bento Asymmetric",
    description: "Mise en page asymétrique de style Apple à 3 colonnes.",
    tailwindClasses: "grid grid-cols-1 md:grid-cols-3 gap-4 rounded-[2rem] overflow-hidden p-4 bg-white/5",
  },
  {
    id: "shimmer-button",
    name: "Shimmer Button",
    description: "Bouton avec une lumière réfléchissante animée au survol.",
    tailwindClasses: "relative overflow-hidden bg-primary text-white px-8 py-4 rounded-[2rem] font-heading font-bold shadow-lg",
    css: ".shimmer-btn::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent); transform: rotate(45deg); animation: shimmer 3s infinite; } @keyframes shimmer { 0% { transform: translateX(-100%) rotate(45deg); } 100% { transform: translateX(100%) rotate(45deg); } }"
  },
  {
    id: "spring-modal",
    name: "Spring Modal",
    description: "Transition physique élastique pour les modales.",
    tailwindClasses: "bg-background rounded-[2rem] p-8 shadow-2xl border border-white/10",
  }
];

