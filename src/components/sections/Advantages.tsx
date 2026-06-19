import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { BookOpen, Award, MonitorPlay, Users, Clock, ShieldCheck, LineChart, Map } from 'lucide-react';

export const Advantages: React.FC = () => {
  const advantagesData = [
    { icon: <BookOpen className="w-8 h-8 text-blue-500" />, title: "Kurikulum CEFR", desc: "Berstandar internasional dari beginner hingga expert." },
    { icon: <Award className="w-8 h-8 text-indigo-500" />, title: "Tutor Tersertifikasi", desc: "Pengajar profesional dengan sertifikasi CELTA/TESOL." },
    { icon: <MonitorPlay className="w-8 h-8 text-teal-500" />, title: "Live Interaktif", desc: "Bukan sekadar rekaman video, belajar langsung via Zoom." },
    { icon: <Users className="w-8 h-8 text-rose-500" />, title: "Small Group", desc: "Maksimal 10 orang per kelas untuk fokus maksimal." },
    { icon: <Clock className="w-8 h-8 text-purple-500" />, title: "Jadwal Fleksibel", desc: "Pilih jadwal pagi, siang, atau malam sesuai kesibukan." },
    { icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />, title: "Garansi Mengulang", desc: "Belum paham? Bebas mengulang kelas tanpa biaya tambahan." },
    { icon: <LineChart className="w-8 h-8 text-amber-500" />, title: "Progress Tracking", desc: "Laporan perkembangan mingguan dari tutor Anda." },
    { icon: <Map className="w-8 h-8 text-cyan-500" />, title: "Personal Roadmap", desc: "Jalur belajar spesifik sesuai target dan level awal Anda." }
  ];

  return (
    <section id="keunggulan" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Mengapa Memilih EnglishPRO Linguits Academy?" 
          subtitle="Fasilitas dan ekosistem belajar premium yang didesain khusus untuk kesuksesan Anda."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {advantagesData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
