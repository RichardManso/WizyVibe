import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isApp = location.pathname === '/app';
  const { isAuthenticated, user, login, logout } = useAuth();

  useEffect(() => {
    // Animation d'apparition
    let ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-500">
      <nav ref={navRef} className="flex items-center justify-between px-3 py-3 rounded-2xl transition-all duration-500 bg-primary shadow-2xl border border-white/5">
        <Link to="/" className="flex items-center gap-2 pl-4 group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
             <path d="M12 2L2 22H6L12 10L18 22H22L12 2Z" fill="url(#paint0_linear_header)"/>
             <defs>
               <linearGradient id="paint0_linear_header" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#4F46E5"/>
                 <stop offset="1" stopColor="#A855F7"/>
               </linearGradient>
             </defs>
          </svg>
          <div className="font-semibold text-lg tracking-tight text-white">WizyVibe</div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          {!isApp ? (
            <>
              <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
              <Link to="/app" className="hover:text-white transition-colors">Lexique</Link>
              <a href="#pricing" className="hover:text-white transition-colors">Tarification</a>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-white transition-colors">Retour à l'accueil</Link>
              <a href="#" className="hover:text-white transition-colors">Ressources</a>
            </>
          )}
          <span className="bg-white/10 text-white/70 text-[10px] px-2 py-0.5 rounded-full border border-white/5">BETA</span>
        </div>
        {!isApp ? (
          <Link to="/app" className="btn-gradient px-6 py-2 rounded-xl text-sm font-medium transition-transform hover:scale-[1.02] shadow-lg shadow-accent/20">
            Ouvrir le Lexique
          </Link>
        ) : isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white/80">{user.name}</span>
            <button onClick={logout} className="w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-accent transition-colors" title="Se déconnecter">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </button>
          </div>
        ) : (
          <button onClick={login} className="bg-white/10 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/20 border border-white/5">
            Se connecter
          </button>
        )}
      </nav>
    </div>
  );
};