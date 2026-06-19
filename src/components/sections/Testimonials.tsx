import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Star, Quote, X, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePricing } from '../../hooks/usePricing';

export const Testimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pricing, addTestimonial } = usePricing();

  // Filter approved only
  const testimonialsData = pricing.testimonials?.filter(t => t.isApproved) || [];
  
  const filters = ['Semua', ...Array.from(new Set(testimonialsData.map(t => t.category)))];

  const filteredTestimonials = activeFilter === 'Semua' 
    ? testimonialsData 
    : testimonialsData.filter(t => t.category === activeFilter);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    category: 'PTE',
    rating: 5,
    before: '',
    after: '',
    text: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial({
      ...formData,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
    });
    setIsModalOpen(false);
    setFormData({
      name: '',
      profession: '',
      category: 'PTE',
      rating: 5,
      before: '',
      after: '',
      text: '',
    });
  };

  return (
    <section id="testimoni" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <SectionHeading 
            title="Dengar Langsung Dari Mereka yang Berhasil" 
            subtitle="Ribuan alumni telah membuktikan efektivitas metode pembelajaran kami dalam mencapai target mereka."
          />
          <Button variant="outline" className="mt-4 border-indigo-200 text-indigo-600 hover:bg-indigo-50" onClick={() => setIsModalOpen(true)}>
            <Star className="w-4 h-4 mr-2" />
            Tulis Ulasan Anda
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="min-h-[400px]">
          {filteredTestimonials.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {filteredTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow relative"
                  >
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100 rotate-180" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <img src={testimonial.photo} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
                      <div>
                        <h4 className="font-bold text-lg text-primary-dark">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500 mb-1">{testimonial.profession}</p>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Before / After */}
                    { (testimonial.before || testimonial.after) && (
                      <div className="bg-slate-50 rounded-xl p-4 mb-6 text-sm border border-slate-100">
                        {testimonial.before && (
                          <div className="flex items-start gap-2 mb-2">
                            <span className="font-bold text-rose-500 w-16 shrink-0">Sebelum:</span>
                            <span className="text-slate-600 italic">"{testimonial.before}"</span>
                          </div>
                        )}
                        {testimonial.after && (
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-green-500 w-16 shrink-0">Sesudah:</span>
                            <span className="text-slate-800 font-medium">"{testimonial.after}"</span>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-slate-600 leading-relaxed relative z-10">
                      "{testimonial.text}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Belum ada ulasan untuk kategori ini.
            </div>
          )}
        </div>

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                <h3 className="font-bold text-lg text-slate-800">Tulis Ulasan Anda</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Profesi</label>
                      <input required type="text" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} placeholder="Contoh: Mahasiswa / Karyawan" className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Program yang Diikuti</label>
                      <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Contoh: PTE / Speaking" className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Rating (1-5)</label>
                      <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Kondisi Sebelum Belajar</label>
                    <input required type="text" value={formData.before} onChange={e => setFormData({...formData, before: e.target.value})} placeholder="Contoh: Susah berbicara bahasa Inggris" className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Kondisi Setelah Belajar</label>
                    <input required type="text" value={formData.after} onChange={e => setFormData({...formData, after: e.target.value})} placeholder="Contoh: Lancar presentasi" className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Ulasan Detail</label>
                    <textarea required rows={3} value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} placeholder="Ceritakan pengalaman belajar Anda di EnglishPRO Linguits Academy..." className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full flex justify-center py-3">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Kirim Ulasan
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
