import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 500px (roughly past hero section)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgb(0,0,0,0.1)] md:hidden flex justify-between items-center gap-4"
        >
          <div className="flex-1">
            <p className="text-xs text-slate-500 font-medium">Placement Test Gratis</p>
            <p className="text-sm font-bold text-primary-dark">Cek Level Bahasa Inggrismu</p>
          </div>
          <a 
            href="#placement-test"
            className="bg-accent hover:bg-accent-hover text-white text-sm font-bold py-3 px-5 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30 shrink-0"
          >
            Mulai Tes <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
