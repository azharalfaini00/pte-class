import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePricing } from '../../hooks/usePricing';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { pricing } = usePricing();

  const faqs = pricing.faqs || [];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Pertanyaan yang Sering Diajukan" 
          subtitle="Temukan jawaban cepat untuk pertanyaan seputar program, pendaftaran, dan sistem belajar kami."
        />

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          
          <div className="flex-1 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id || index} 
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  openIndex === index ? 'border-primary shadow-md bg-white' : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className={`font-semibold text-lg pr-4 ${openIndex === index ? 'text-primary' : 'text-slate-700'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Need Help Card */}
          <div className="md:w-80 shrink-0">
            <div className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100 sticky top-24">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-3">Masih Punya Pertanyaan?</h3>
              <p className="text-slate-600 text-sm mb-6">Tim konsultan pendidikan kami siap membantu Anda memilih program terbaik.</p>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button variant="primary" className="w-full">
                  Hubungi via WhatsApp
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
