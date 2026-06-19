import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10 flex flex-col items-end gap-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div 
        className="bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 hidden md:block"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <p className="text-sm font-semibold text-slate-700">Tanya program? Chat kami 👇</p>
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-slate-100 transform rotate-45"></div>
      </motion.div>

      <motion.a 
        href="https://wa.me/6285860709120?text=Halo%20Alfa%20Course,%20saya%20ingin%20bertanya%20tentang%20program%20kelasnya."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(34,197,94,0.4)] hover:bg-green-600 transition-colors flex items-center justify-center relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
        <MessageCircle className="w-8 h-8 relative z-10" />
      </motion.a>
    </motion.div>
  );
};
