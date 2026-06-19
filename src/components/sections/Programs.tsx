import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { CheckCircle2 } from 'lucide-react';
import { usePricing, PriceItem } from '../../hooks/usePricing';

export const Programs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paket' | 'satuan' | 'pte'>('paket');
  const { pricing, calculateFinalPrice, formatRupiah } = usePricing();

  const renderCard = (item: PriceItem, features: string[], type: 'paket' | 'satuan' | 'pte', extraLabel?: string) => {
    const isDiscounted = item.discountPercentage > 0;
    const finalPrice = calculateFinalPrice(item.basePrice, item.discountPercentage);

    return (
      <div key={item.id} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
          type === 'paket' ? 'from-primary to-accent' : 
          type === 'satuan' ? 'from-indigo-500 to-blue-500' : 
          'from-rose-500 to-orange-500'
        }`}></div>
        
        {isDiscounted && (
          <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Diskon {item.discountPercentage}%
          </div>
        )}

        <div className="mb-6 mt-4">
          <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.name} {type === 'satuan' && 'Class'}</h3>
          {extraLabel && (
            <span className={`inline-block px-3 py-1 font-semibold text-xs rounded-lg ${
              type === 'satuan' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}>
              {extraLabel}
            </span>
          )}
        </div>

        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Investasi</h4>
          {isDiscounted ? (
            <>
              <p className="text-slate-400 line-through text-md font-medium mb-1">
                {formatRupiah(item.basePrice)}
              </p>
              <p className="text-3xl font-black text-primary-dark tracking-tight">
                {formatRupiah(finalPrice)}
              </p>
            </>
          ) : (
            <p className="text-3xl font-black text-primary-dark tracking-tight">
              {formatRupiah(item.basePrice)}
            </p>
          )}
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${
                type === 'paket' ? 'text-green-500' : 
                type === 'satuan' ? 'text-blue-500' : 
                'text-rose-500'
              }`} />
              <span className="text-sm font-medium text-slate-600 leading-tight">{feat}</span>
            </li>
          ))}
        </ul>

        <Button href="#daftar" variant={type === 'pte' ? 'primary' : 'outline'} className={`w-full ${type === 'pte' ? 'bg-gradient-to-r from-rose-500 to-orange-500 border-none hover:from-rose-600 hover:to-orange-600 text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
          Daftar Sekarang
        </Button>
      </div>
    );
  };

  return (
    <section id="kelas" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Pilih Program Belajar Anda" 
          subtitle="Tersedia berbagai pilihan paket komprehensif, kelas satuan spesifik, hingga persiapan tes PTE dengan harga terbaik."
        />

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['paket', 'satuan', 'pte'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-lg shadow-blue-900/20 scale-105 border border-primary-light' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab === 'paket' ? 'Paket Kelas' : tab === 'satuan' ? 'Kelas Satuan' : 'PTE Class'}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            
            {activeTab === 'paket' && (
              <motion.div
                key="paket"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-10 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-primary-dark mb-4">Paket Kelas Lengkap</h3>
                  <p className="text-slate-600">Satu paket mencakup 4 materi esensial (Speaking, Grammar, Vocabulary, Pronunciation) secara terintegrasi untuk hasil yang maksimal.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {pricing.paket.map(item => renderCard(
                    item, 
                    ['Speaking Practice', 'Grammar Mastery', 'Vocabulary Enrichment', 'Pronunciation Correction'], 
                    'paket',
                    'Semua Level Tersedia'
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'satuan' && (
              <motion.div
                key="satuan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-10 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-primary-dark mb-4">Fokus Pada Satu Keahlian</h3>
                  <p className="text-slate-600">Pilih spesifik materi yang ingin Anda kembangkan secara intensif.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pricing.satuan.map(item => renderCard(
                    item, 
                    ['Fokus Materi Spesifik', 'Modul Komprehensif', 'Latihan Intensif', 'Feedback Langsung'], 
                    'satuan',
                    'Durasi: 2 Minggu'
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'pte' && (
              <motion.div
                key="pte"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-10 max-w-2xl mx-auto">
                  <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 font-bold text-xs rounded-full uppercase tracking-wide border border-rose-200 mb-4 shadow-sm">
                    🔥 Program Spesial
                  </div>
                  <h3 className="text-2xl font-bold text-primary-dark mb-4">PTE Preparation Class</h3>
                  <p className="text-slate-600">Program intensif persiapan Pearson Test of English untuk target beasiswa dan visa migrasi luar negeri.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {pricing.pte.map(item => renderCard(
                    item, 
                    ['Mock Test Simulation', 'Personal Review Feedback', 'Scoring Strategies & Tips', 'Computer-based Practice'], 
                    'pte'
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
