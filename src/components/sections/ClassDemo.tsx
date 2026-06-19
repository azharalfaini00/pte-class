import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { PlayCircle, Video, MessageSquare, MonitorPlay, X } from 'lucide-react';
import { usePricing } from '../../hooks/usePricing';

export const ClassDemo: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { pricing } = usePricing();
  
  const rawUrl = pricing.settings?.demoVideoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };
  
  const videoUrl = getEmbedUrl(rawUrl);

  const features = [
    { icon: <Video className="w-5 h-5" />, text: "Kualitas HD & Audio Jernih" },
    { icon: <MessageSquare className="w-5 h-5" />, text: "Contoh Koreksi Speaking" },
    { icon: <MonitorPlay className="w-5 h-5" />, text: "Simulasi Interaksi Live" }
  ];

  return (
    <section className="py-24 bg-primary-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -mt-40 -mr-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -mb-40 -ml-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Rasakan Pengalaman Belajar Sebelum Mendaftar" 
          subtitle="Tonton cuplikan suasana kelas kami yang interaktif, menyenangkan, dan berorientasi pada hasil."
          light={true}
        />

        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onClick={() => setIsVideoOpen(true)}
            className="relative rounded-3xl overflow-hidden aspect-video bg-slate-900 shadow-2xl border border-white/10 group cursor-pointer"
          >
            {/* Video Thumbnail Placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Class Demo Thumbnail" 
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60"></div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 transform group-hover:scale-110 transition-transform duration-300">
                  <PlayCircle className="w-16 h-16 text-white" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Bottom Gradient Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h4 className="text-xl font-bold text-white">Live Session: Advanced Speaking Practice</h4>
                <div className="flex gap-4">
                  {features.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-300 text-sm hidden md:flex">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <Button variant="primary" size="lg" icon={<PlayCircle />} iconPosition="left" onClick={() => setIsVideoOpen(true)}>
              Tonton Demo Gratis (Full Video)
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video itself
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                title="Tutup Video"
              >
                <X className="w-6 h-6" />
              </button>
              
              <iframe 
                src={videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`}
                title="Class Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
