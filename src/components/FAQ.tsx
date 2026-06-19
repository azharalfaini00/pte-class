import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS_DATA } from '../data';
import { ChevronDown, HelpCircle, MessageSquareWarning } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-105 px-3.5 py-1.5 rounded-lg inline-block">
            FAQ (Tanya Jawab)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-none font-sans">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Temukan jawaban cepat mengenai opsi kelas, penjaminan kelulusan, penempatan level, s/d metode administrasi pembayaran.
          </p>
        </div>

        {/* Collapsible Accordions List */}
        <div className="space-y-3">
          {FAQS_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                id={`faq-item-${item.id}`}
                key={item.id}
                className={`border rounded-lg transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-blue-200 bg-blue-50/10 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Accordion header button */}
                <button
                  id={`faq-toggle-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-850 text-sm sm:text-base focus:outline-none cursor-pointer gap-4"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {/* Collapsible answer block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="border-t border-slate-100 bg-white"
                    >
                      <div className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <MessageSquareWarning className="h-5 w-5 text-blue-600 shrink-0" />
            <div>
              <span className="block text-xs sm:text-sm font-bold text-slate-800 leading-tight">Ujian atau kebutuhan mendesak lainnya?</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Kebutuhan karir ekspres atau IELTS mendadak bisa kami prioritaskan.</span>
            </div>
          </div>
          <a
            id="faq-wa-chat"
            href="https://wa.me/6281234567890?text=Halo%2520EnglishPro,%2520saya%2520ada%2520pertanyaan%2520khusus%2520yang%2520tidak%2520ada%2520di%2520FAQ."
            target="_blank"
            referrerPolicy="no-referrer"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer shrink-0"
          >
            Konsultasi Langsung via WA
          </a>
        </div>

      </div>
    </section>
  );
}
