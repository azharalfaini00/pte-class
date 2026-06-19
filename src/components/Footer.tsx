import React, { useState } from 'react';
import { BookOpen, Send, Mail, Phone, MapPin, Check } from 'lucide-react';
import { usePricing } from '../hooks/usePricing';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const [emailValue, setEmailValue] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { pricing } = usePricing();
  
  const centers = pricing.centers || [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim() || !/\S+@\S+\.\S+/.test(emailValue)) return;

    setIsSubscribed(true);
    setEmailValue('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  const navLinks = [
    { label: 'Tentang Kami', id: 'beranda' },
    { label: 'Keunggulan', id: 'keunggulan' },
    { label: 'Pilihan Kelas', id: 'kelas' },
    { label: 'Ulasan Alumni', id: 'testimoni' },
    { label: 'Tanya Jawab', id: 'faq' },
  ];

  return (
    <footer id="footer-section" className="bg-indigo-950 text-indigo-200 pt-16 pb-12 border-t border-indigo-900/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content list */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-indigo-900">
          
          {/* Col 1: Logo and address info */}
          <div className="md:col-span-4 space-y-4 text-left">
            <button
              id="footer-logo-btn"
              onClick={() => onNavClick('beranda')}
              className="flex items-center space-x-2 focus:outline-none cursor-pointer group text-white"
            >
              <div className="bg-indigo-600 text-white p-2 rounded-xl group-hover:bg-indigo-700 transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold tracking-tight">
                  English<span className="text-indigo-400">Pro</span>
                </span>
                <span className="block text-[9px] text-indigo-300 font-semibold uppercase tracking-widest leading-none">
                  Language Academy
                </span>
              </div>
            </button>

            <p className="text-xs text-indigo-300 leading-relaxed max-w-sm">
              EnglishPro adalah lembaga profesional pelatihan bahasa Inggris tepercaya. Kami berdedikasi memperkuat kompetensi global Anda untuk meraih beasiswa & akselerasi karir masa depan.
            </p>

            <div className="space-y-2.5 text-xs text-indigo-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Gedung AIA Central Lt. 15, Jl. Jend. Sudirman Kav. 48, Karet Semanggi, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                <span>0812-3456-7890 (CS WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                <span>hello@englishpro.co.id</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation link structures */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white mb-4">Navigasi</h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-nav-${link.id}`}
                    onClick={() => onNavClick(link.id)}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Branches kota */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white mb-4">Pusat Belajar</h4>
            <ul className="space-y-2.5 text-xs text-indigo-300">
              {centers.map(center => (
                <li key={center.id}>📍 {center.name}</li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter subscription input */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white">Langganan Info Promo</h4>
            <p className="text-xs text-indigo-300 leading-relaxed">
              Dapatkan tips beasiswa luar negeri, infografis tata bahasa Inggris mingguan, dan info kupon promo diskon kelas. Gratis!
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              {isSubscribed ? (
                <div className="bg-indigo-900/80 border border-indigo-700 p-3 rounded-xl flex items-center justify-center gap-2 text-xs text-emerald-400">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Email Anda berhasil didaftarkan!</span>
                </div>
              ) : (
                <div className="flex items-stretch bg-indigo-900/60 border border-indigo-800 focus-within:border-indigo-600 rounded-xl overflow-hidden p-1">
                  <input
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Masukkan email Anda"
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white px-3 py-2"
                  />
                  <button
                    id="newsletter-subscribe-btn"
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-2 transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              )}
            </form>

            <span className="block text-[10px] text-indigo-400">✓ Bebas spam. Batalkan langganan kapan saja demi privacy Anda.</span>
          </div>

        </div>

        {/* Bottom Attribution copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-indigo-400 gap-4">
          <div>
            © {new Date().getFullYear()} EnglishPro Language Academy. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex gap-4">
            <a href="#daftar" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#daftar" className="hover:text-white transition-colors">Ketentuan Layanan</a>
            <a href="#faq" className="hover:text-white transition-colors">Pusat Hub Bantuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
