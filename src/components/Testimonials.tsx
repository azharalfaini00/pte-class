import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA, CLASS_CATEGORIES } from '../data';
import { TestimonialItem } from '../types';
import { Star, Quote, Plus, Check, MessageSquareCode } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Review form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState<'general' | 'exam' | 'business' | 'kids'>('general');
  const [score, setScore] = useState(5);
  const [text, setText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load testimonials from local storage or use defaults
  useEffect(() => {
    const saved = localStorage.getItem('englishpro_reviews');
    if (saved) {
      try {
        setTestimonials(JSON.parse(saved));
      } catch (e) {
        setTestimonials(TESTIMONIALS_DATA);
      }
    } else {
      setTestimonials(TESTIMONIALS_DATA);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !text) return;

    // Create avatar from initials
    const initials = name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const newTestimonial: TestimonialItem = {
      id: `testi-custom-${Date.now()}`,
      name,
      role,
      score,
      text,
      avatar: initials || 'ST',
      classCategory: category,
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('englishpro_reviews', JSON.stringify(updated));

    // Reset form states
    setName('');
    setRole('');
    setCategory('general');
    setScore(5);
    setText('');
    setSuccessMessage('Terima kasih! Review Anda telah dipublikasikan secara langsung.');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
      setIsFormOpen(false);
    }, 4000);
  };

  // Filter testimonials lists
  const filteredTestimonials = filterCategory === 'all'
    ? testimonials
    : testimonials.filter((t) => t.classCategory === filterCategory);

  return (
    <section id="testimoni" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left max-w-2xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-lg inline-block">
              Cerita Sukses Alumni
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-none">
              Dengar Langsung dari Mereka yang Telah Berhasil
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Ribuan alumni kami telah melampaui skor target IELTS/TOEFL dan berkomunikasi lancar di tempat kerja global.
            </p>
          </div>

          <button
            id="write-testimonial-trigger"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer text-xs sm:text-sm shadow-sm shrink-0 self-start md:self-end"
          >
            <Plus className="h-4 w-4" />
            <span>Tulis Review Anda</span>
          </button>
        </div>

        {/* Dynamic filter for Testimonials */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white border border-slate-200 p-1.5 rounded-lg w-max max-w-full">
          {CLASS_CATEGORIES.map((cat) => (
            <button
              id={`testi-filter-${cat.id}`}
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Interactive Add Review Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              id="add-review-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg mb-12 shadow-sm relative overflow-hidden"
            >
              <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MessageSquareCode className="h-5 w-5 text-blue-600" />
                <span>Bagikan Pengalaman Belajar Anda</span>
              </h3>

              {successMessage ? (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-lg flex items-center gap-3">
                  <div className="bg-emerald-500 text-white rounded-full p-1.5 shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold">{successMessage}</span>
                </div>
              ) : (
                <form id="new-testimonial-form" onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Sarah Azhari"
                        className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Pekerjaan / Instansi</label>
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Contoh: Mahasiswi Unpad atau HR di Tokopedia"
                        className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Jenis Kelas yang Diikuti</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      >
                        <option value="general">General English</option>
                        <option value="exam">IELTS/TOEFL Prep</option>
                        <option value="business">Business English</option>
                        <option value="kids">Kids & Teens</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Rating Kepuasan</label>
                      <div className="flex items-center space-x-1.5 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setScore(star)}
                            className="p-1 cursor-pointer focus:outline-none"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= score ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Ulasan Pengalaman Anda</label>
                    <textarea
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={3}
                      placeholder="Bagikan ulasan jujur mengenai materi, tutor, atau metode belajar..."
                      className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer shadow-sm"
                    >
                      Kirim Review
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Masonry or Grid list */}
        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 font-semibold">Tidak ada review untuk kategori kelas ini saat ini. Jadilah yang pertama memberikan ulasan!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredTestimonials.map((item) => (
                <motion.div
                  id={`review-card-${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Stars and quote element */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.score ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <Quote className="h-6 w-6 text-slate-200" />
                    </div>

                    {/* Review sentence content */}
                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Reviewer details */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 mt-6">
                    {/* Visual color bubble avatar */}
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs tracking-wider uppercase shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-800 leading-snug">
                        {item.name}
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
