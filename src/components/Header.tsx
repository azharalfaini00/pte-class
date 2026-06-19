import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Keunggulan', id: 'keunggulan' },
    { label: 'Daftar Kelas', id: 'kelas' },
    { label: 'Testimoni', id: 'testimoni' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="logo-btn"
            onClick={() => handleItemClick('beranda')}
            className="flex items-center space-x-2.5 focus:outline-none cursor-pointer group"
          >
            <div className="bg-blue-600 text-white p-2 ml-1 rounded-lg shadow-sm shadow-blue-100 group-hover:bg-blue-700 transition-colors">
              <BookOpen className="h-5.5 w-5.5" />
            </div>
            <div className="text-left font-sans">
              <span className="block text-xl font-bold text-slate-800 tracking-tight leading-none">
                English<span className="text-blue-600">Pro</span>
              </span>
              <span className="block text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1 leading-none">
                Linguist Academy
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-sm font-semibold transition-colors duration-200 cursor-pointer relative py-1.5 focus:outline-none group ${
                  activeSection === item.id || (activeSection === '' && item.id === 'beranda')
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                    activeSection === item.id || (activeSection === '' && item.id === 'beranda')
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              id="cta-whatsapp"
              href="https://wa.me/6285860709120"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors py-2 px-3 gap-1.5 bg-slate-50 hover:bg-blue-50/50 rounded-lg border border-slate-100"
            >
              <Phone className="h-4 w-4 text-blue-600" />
              <span>Tanya CS (+62 858-6070-9120)</span>
            </a>
            <button
              id="header-cta-btn"
              onClick={() => handleItemClick('daftar')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 p-2 rounded-lg focus:outline-none bg-slate-50 hover:bg-blue-50 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-navigation"
        className={`md:hidden bg-white border-b border-slate-200 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1.5">
          {navItems.map((item) => (
            <button
              id={`mobile-nav-link-${item.id}`}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 space-y-3 px-4">
            <a
              id="mobile-whatsapp"
              href="https://wa.me/6285860709120"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center justify-center text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors py-2.5 w-full bg-slate-50 rounded-lg gap-2 border border-slate-100"
            >
              <Phone className="h-4 w-4 text-blue-600" />
              <span>CS WhatsApp</span>
            </a>
            <button
              id="mobile-cta-btn"
              onClick={() => handleItemClick('daftar')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-lg text-sm text-center transition-all cursor-pointer"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
