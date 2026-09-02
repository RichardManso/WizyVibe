import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isVisible && toastRef.current) {
        gsap.fromTo(toastRef.current,
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
        );
        
        gsap.delayedCall(3, () => {
          gsap.to(toastRef.current, {
            y: 20, opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in",
            onComplete: onClose
          });
        });
      }
    });
    
    return () => ctx.revert();
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <div ref={toastRef} className="bg-dark text-white px-6 py-4 rounded-[2rem] shadow-xl flex items-center gap-3 border border-white/10">
        <CheckCircle2 className="w-5 h-5 text-accent" />
        <span className="font-mono text-sm">{message}</span>
      </div>
    </div>
  );
};

