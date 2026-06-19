import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { TrendingUp, Globe, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';

export const Results: React.FC = () => {
  const resultsData = [
    {
      level: "BEGINNER",
      icon: <GraduationCap className="w-10 h-10 text-white" />,
      color: "from-blue-400 to-blue-600",
      points: [
        "Perkenalan diri lancar & natural",
        "Memahami percakapan dasar sehari-hari",
        "Menyusun kalimat sederhana dengan benar"
      ]
    },
    {
      level: "INTERMEDIATE",
      icon: <Briefcase className="w-10 h-10 text-white" />,
      color: "from-indigo-400 to-indigo-600",
      points: [
        "Mampu mengikuti diskusi akademik",
        "Menulis email profesional & formal",
        "Melakukan presentasi bahasa Inggris sederhana"
      ]
    },
    {
      level: "ADVANCED",
      icon: <Globe className="w-10 h-10 text-white" />,
      color: "from-accent to-primary",
      points: [
        "Public Speaking yang percaya diri",
        "Aktif dalam meeting profesional internasional",
        "Komunikasi lintas budaya tanpa hambatan",
        "Fluent Communication layaknya native speaker"
      ]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Hasil Nyata yang Akan Anda Capai" 
          subtitle="Setiap tahapan didesain untuk memberikan hasil yang spesifik dan terukur bagi perkembangan karir maupun akademik Anda."
        />

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-stretch">
          {resultsData.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex-1 flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-br ${result.color} p-8 text-center relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {result.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">{result.level}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 bg-white">
                <ul className="space-y-4">
                  {result.points.map((point, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + (idx * 0.1) + 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Impact Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto bg-primary-dark rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-accent/20 p-4 rounded-full border border-accent/30">
              <TrendingUp className="w-12 h-12 text-accent-light" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-2">Siap Buka Peluang Global?</h4>
              <p className="text-blue-200">Bergabunglah dengan 5.000+ alumni kami yang sudah sukses di kancah internasional.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
