import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isOpen && modalRef.current) {
        gsap.fromTo(modalRef.current, 
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateLogin = () => {
    login();
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
        <div 
          ref={modalRef}
          className="w-full max-w-md bg-[#121214] border border-white/10 rounded-[2rem] shadow-2xl p-8 relative overflow-hidden pointer-events-auto"
        >
          {/* Deco gradients */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/20 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/60 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center relative z-10 mb-8 mt-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(251,191,36,0.3)] border border-yellow-300/50">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Débloquez le Lexique Premium</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Accédez instantanément aux composants les plus avancés, aux animations GSAP premium et aux mises à jour prioritaires.
            </p>
          </div>

          <div className="space-y-3 relative z-10">
            <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3.5 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02] shadow-md">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continuer avec Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#24292F] text-white py-3.5 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02] border border-white/5">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Continuer avec GitHub
            </button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#121214] px-2 text-white/40">Mode Développeur</span>
              </div>
            </div>
            
            <button 
              onClick={handleSimulateLogin}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-purple-500 text-white py-3.5 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02] shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Simuler la connexion
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
