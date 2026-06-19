import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, FileText, BookOpen, Mic2, Target, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

export const SuitableClass: React.FC = () => {
  const painPoints = [
    {
      pain: "Saya sulit berbicara dalam bahasa Inggris",
      class: "Speaking Class",
      desc: "Latih kepercayaan diri dan kelancaran berbicara melalui interaksi intensif.",
      icon: <MessageCircle className="w-8 h-8 text-accent" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      pain: "Saya sering salah Grammar",
      class: "Grammar Class",
      desc: "Pahami struktur kalimat dan tata bahasa dengan cara yang mudah diingat.",
      icon: <FileText className="w-8 h-8 text-indigo-500" />,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      pain: "Saya kekurangan Vocabulary",
      class: "Vocabulary Class",
      desc: "Perbanyak kosa kata akademik dan sehari-hari untuk komunikasi yang lebih kaya.",
      icon: <BookOpen className="w-8 h-8 text-teal-500" />,
      color: "from-teal-500 to-teal-600"
    },
    {
      pain: "Saya ingin memperbaiki Pronunciation",
      class: "Pronunciation Class",
      desc: "Perbaiki aksen dan pelafalan agar terdengar lebih natural layaknya native speaker.",
      icon: <Mic2 className="w-8 h-8 text-purple-500" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      pain: "Saya ingin mencapai target skor PTE",
      class: "PTE Preparation",
      desc: "Strategi komprehensif dan simulasi tes untuk meraih skor PTE idaman Anda.",
      icon: <Target className="w-8 h-8 text-rose-500" />,
      color: "from-rose-500 to-rose-600"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Kelas Mana yang Cocok Untuk Saya?" 
          subtitle="Pilih program yang paling sesuai dengan kebutuhan dan kendala bahasa Inggris Anda saat ini."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {painPoints.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 rounded-bl-full transition-transform duration-500 group-hover:scale-150`}></div>
              
              <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              <div className="flex-1">
                <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">Kendala Anda:</p>
                <h3 className="text-xl font-bold text-primary-dark mb-4 group-hover:text-accent transition-colors">"{item.pain}"</h3>
                
                <div className="bg-accent-light/50 p-4 rounded-xl mb-6 border border-accent-light">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-5 h-5 text-accent" />
                    <span className="font-bold text-primary-dark">{item.class}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
              
              <a href="#kelas" className="inline-flex items-center text-accent font-semibold hover:text-accent-hover transition-colors group/btn">
                Lihat Detail Kelas 
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
