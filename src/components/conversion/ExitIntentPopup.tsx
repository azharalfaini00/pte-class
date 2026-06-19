import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Show when cursor leaves the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVisible(false)}
        />
        
        <motion.div
          className="bg-white rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="bg-gradient-to-br from-accent to-blue-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md relative z-10">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Tunggu Sebentar!</h3>
            <p className="text-blue-100 relative z-10">Jangan lewatkan kesempatan untuk mengetahui level bahasa Inggrismu secara akurat.</p>
          </div>

          <div className="p-8 text-center bg-white">
            <h4 className="text-xl font-bold text-slate-800 mb-4">
              Ambil Placement Test <span className="text-accent">GRATIS</span> Sekarang!
            </h4>
            <p className="text-slate-600 mb-6 text-sm">
              Selesaikan tes dalam 15 menit dan dapatkan rekomendasi Roadmap Belajar personal dari konsultan pendidikan kami.
            </p>
            
            <Button 
              variant="primary" 
              className="w-full mb-3" 
              icon={<ArrowRight />} 
              iconPosition="right"
              onClick={() => {
                setIsVisible(false);
                document.getElementById('placement-test')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ya, Saya Mau Placement Test
            </Button>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors"
            >
              Tidak terima kasih, saya ingin melihat-lihat dulu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
