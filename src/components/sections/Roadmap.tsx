import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { CheckCircle2, Clock, BookOpen } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const roadmapSteps = [
    {
      level: "BEGINNER",
      duration: "8 Minggu",
      targets: [
        "Memperkenalkan diri dengan percaya diri",
        "Memahami percakapan sehari-hari",
        "Membuat kalimat sederhana"
      ],
      classes: ["Speaking Beginner", "Grammar Beginner", "Vocabulary Beginner"],
      color: "blue"
    },
    {
      level: "PRE-INTERMEDIATE",
      duration: "8 Minggu",
      targets: [
        "Mampu bercerita masa lalu & masa depan",
        "Memahami instruksi bahasa Inggris",
        "Menulis pesan singkat / email dasar"
      ],
      classes: ["Speaking Pre-Int", "Grammar Pre-Int", "Vocabulary Pre-Int"],
      color: "indigo"
    },
    {
      level: "INTERMEDIATE",
      duration: "12 Minggu",
      targets: [
        "Berdiskusi tentang topik umum",
        "Memahami artikel / berita bahasa Inggris",
        "Presentasi sederhana"
      ],
      classes: ["Speaking Int", "Grammar Int", "Pronunciation Int"],
      color: "teal"
    },
    {
      level: "ADVANCED",
      duration: "12 Minggu",
      targets: [
        "Debat dan diskusi kompleks",
        "Menulis esai akademik / laporan",
        "Menonton film tanpa subtitle"
      ],
      classes: ["Speaking Advanced", "Grammar Advanced", "Pronunciation Adv"],
      color: "purple"
    },
    {
      level: "PROFESSIONAL / PTE",
      duration: "1-3 Bulan",
      targets: [
        "Komunikasi bisnis internasional",
        "Mencapai target skor PTE (65+ / 79+)",
        "Siap studi / kerja di luar negeri"
      ],
      classes: ["PTE Preparation", "Business English", "Interview Coaching"],
      color: "rose"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Roadmap Belajar Terstruktur" 
          subtitle="Jalur pembelajaran yang jelas dari pemula hingga fasih atau siap menghadapi tes internasional."
        />

        <div className="relative max-w-5xl mx-auto mt-16">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2"></div>

          <div className="space-y-12">
            {roadmapSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-8 w-12 h-12 rounded-full border-4 border-white bg-white shadow-lg -translate-x-1/2 items-center justify-center z-10 text-xl font-bold text-slate-400">
                    {index + 1}
                  </div>

                  {/* Left Content */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12 md:text-left'}`}>
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group"
                    >
                      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-2 h-full bg-${step.color}-500`}></div>
                      
                      <div className={`inline-block px-3 py-1 rounded-full bg-${step.color}-50 text-${step.color}-600 text-sm font-bold tracking-widest mb-4`}>
                        {step.level}
                      </div>

                      <div className={`flex items-center gap-2 mb-6 text-slate-500 font-medium ${isEven ? 'md:justify-end' : ''}`}>
                        <Clock className="w-5 h-5" />
                        <span>Estimasi: {step.duration}</span>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-800 mb-3 text-lg">Target Kemampuan:</h4>
                        <ul className={`space-y-2 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                          {step.targets.map((target, idx) => (
                            <li key={idx} className={`flex items-start gap-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-slate-600">{target}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`bg-slate-50 p-4 rounded-xl border border-slate-100`}>
                        <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                          <BookOpen className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-slate-800">Kelas Rekomendasi:</span>
                        </div>
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                          {step.classes.map((cls, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  </div>
                  
                  {/* Empty div for right side spacing on desktop */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-2' : ''}`}></div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
