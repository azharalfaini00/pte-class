import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { ArrowRight, Users, Star, Award, Clock, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-primary-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-blue-200 text-sm font-medium mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Platform Pembelajaran Bahasa Inggris Premium</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Kuasai Bahasa Inggris, <br className="hidden lg:block"/>
              <span className="text-gradient-light">Buka Peluang Global</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Program pembelajaran bahasa Inggris terstruktur untuk kebutuhan akademik, karier, sertifikasi internasional, dan komunikasi global.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button href="#placement-test" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                Ambil Placement Test Gratis
              </Button>
              <Button href="#kelas" variant="glass" size="lg">
                Lihat Program Kelas
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <div className="flex flex-col items-center lg:items-start">
                <Users className="w-6 h-6 text-blue-400 mb-2" />
                <h4 className="text-2xl font-bold text-white">5.000+</h4>
                <p className="text-sm text-slate-400">Alumni</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Star className="w-6 h-6 text-yellow-400 mb-2" />
                <h4 className="text-2xl font-bold text-white">98%</h4>
                <p className="text-sm text-slate-400">Tingkat Kepuasan</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Award className="w-6 h-6 text-purple-400 mb-2" />
                <h4 className="text-xl font-bold text-white mt-1">Bersertifikasi</h4>
                <p className="text-sm text-slate-400">Tutor Profesional</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Clock className="w-6 h-6 text-green-400 mb-2" />
                <h4 className="text-xl font-bold text-white mt-1">Fleksibel</h4>
                <p className="text-sm text-slate-400">Pilihan Jadwal</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: CEFR Visual */}
          <motion.div 
            className="flex-1 w-full max-w-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card-dark rounded-3xl p-8 relative">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">CEFR Fluency Progress</h3>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-6 bottom-6 w-1 bg-white/10 rounded-full"></div>
                <motion.div 
                  className="absolute left-6 top-6 w-1 bg-gradient-to-b from-blue-400 to-accent rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 2, delay: 1 }}
                />

                {cefrLevels.map((level, index) => (
                  <motion.div 
                    key={level} 
                    className="flex items-center gap-6 mb-8 last:mb-0 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg
                      ${index === cefrLevels.length - 1 ? 'bg-accent text-white ring-4 ring-accent/30' : 'bg-primary-light text-blue-200 border border-white/20'}`}>
                      {level}
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                      <h4 className="text-white font-medium flex items-center gap-2">
                        Level {level}
                        {index === cefrLevels.length - 1 && <span className="text-xs bg-accent px-2 py-0.5 rounded-full">Target</span>}
                      </h4>
                      <p className="text-sm text-slate-400 mt-1">
                        {index === 0 && "Beginner / Dasar"}
                        {index === 1 && "Pre-Intermediate"}
                        {index === 2 && "Intermediate"}
                        {index === 3 && "Upper Intermediate"}
                        {index === 4 && "Advanced"}
                        {index === 5 && "Proficient / Master"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
