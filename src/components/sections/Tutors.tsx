import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Award, Star, BookOpen, User } from 'lucide-react';
import { usePricing } from '../../hooks/usePricing';

export const Tutors: React.FC = () => {
  const { pricing } = usePricing();
  const tutorsData = pricing.tutors || [];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Belajar Bersama Tutor Bersertifikasi" 
          subtitle="Dibimbing langsung oleh praktisi bahasa Inggris profesional dengan standar kualifikasi pengajaran internasional."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tutorsData.map((tutor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tutor.photo} 
                  alt={tutor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{tutor.name}</h3>
                  <p className="text-blue-200 text-sm font-medium">{tutor.specialty}</p>
                </div>
              </div>

              {/* Body Section */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.certifications.map((cert, idx) => (
                    <span key={idx} className="bg-accent-light/50 text-accent border border-accent-light px-2 py-1 rounded-md text-xs font-bold tracking-wide">
                      {cert}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-1.5 rounded-md"><Award className="w-4 h-4 text-primary" /></div>
                    <span className="text-sm text-slate-700 font-medium">{tutor.experience}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                  <Star className="absolute top-2 right-2 w-4 h-4 text-yellow-400 fill-yellow-400 opacity-50" />
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Pencapaian:</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    "{tutor.achievements}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
