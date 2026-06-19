import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLASSES_DATA, CLASS_CATEGORIES } from '../data';
import { Star, Clock, GraduationCap, CheckCircle, ArrowUpRight, Percent } from 'lucide-react';

interface ClassListProps {
  onSelectClass: (classId: string) => void;
}

export default function ClassList({ onSelectClass }: ClassListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Format currency to Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter classes based on selected category
  const filteredClasses = selectedCategory === 'all'
    ? CLASSES_DATA
    : CLASSES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <section id="kelas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-lg">
            Program & Kelas Kami
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Pilih Kelas Sesuai Kebutuhan & Target Karirmu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Dari pemula hingga ahli, kelas intensif kami diformulasikan untuk percepatan prestasi berbahasa Inggris Anda. Klik salah satu kelas untuk mendaftar langsung.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CLASS_CATEGORIES.map((cat) => (
            <button
              id={`cat-filter-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Classes Catalog Grid */}
        <motion.div
          id="classes-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((item) => (
              <motion.div
                id={`class-card-${item.id}`}
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
              >
                {/* Header Graphic representing Class */}
                <div className={`h-40 w-full relative p-6 flex flex-col justify-between text-white ${item.image}`}>
                  {/* Decorative background visual accent */}
                  <div className="absolute inset-0 bg-[linear-gradient(225deg,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

                  {/* Hot labels */}
                  <div className="flex justify-between items-start relative z-10">
                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wide">
                      {item.category === 'exam' ? 'Exam Prep' : item.category === 'general' ? 'General' : item.category === 'business' ? 'Business' : 'Kids'}
                    </span>
                    
                    {item.discountBadge && (
                      <span className="bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                        <Percent className="h-2.5 w-2.5" />
                        {item.discountBadge}
                      </span>
                    )}

                    {item.isBestSeller && !item.discountBadge && (
                      <span className="bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                        Terpopuler 🔥
                      </span>
                    )}
                  </div>

                  {/* Rating or metric overlay */}
                  <div className="flex justify-between items-end relative z-10">
                    <div className="flex items-center space-x-1 text-[10px] font-bold bg-black/30 backdrop-blur-md py-1 px-2.5 rounded">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating} ({item.totalReviews} ulasan)</span>
                    </div>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    {/* Class title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                      {item.title}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Target level & duration */}
                    <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-650 font-semibold">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <GraduationCap className="h-4 w-4 text-blue-600 shrink-0" />
                        <span className="truncate" title={item.level}>{item.level}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    {/* Syllabus Features bulletpoint */}
                    <div className="space-y-1.5 pt-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apa yang Anda peroleh:</span>
                      <ul className="space-y-1">
                        {item.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start text-xs text-slate-500 gap-1.5 leading-tight">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {item.features.length > 3 && (
                          <li className="text-[10px] text-slate-400 font-semibold italic pl-5">
                            + {item.features.length - 3} benefit eksklusif lainnya...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Action bottom zone */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
                    <div>
                      {item.originalPrice && (
                        <span className="block text-xs text-slate-450 line-through leading-none mb-1">
                          {formatRupiah(item.originalPrice)}
                        </span>
                      )}
                      <span className="block text-base sm:text-lg font-bold text-blue-650 leading-none">
                        {formatRupiah(item.price)}
                      </span>
                    </div>

                    <button
                      id={`enroll-btn-${item.id}`}
                      onClick={() => onSelectClass(item.id)}
                      className="bg-slate-900 hover:bg-slate-850 text-white px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <span>Ambil Kelas</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Informative advice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-semibold">
            🎯 Ingin program khusus korporat atau private 1 on 1? Hubungi tim konsultasi kami untuk kurikulum kustom.
          </p>
        </div>

      </div>
    </section>
  );
}
