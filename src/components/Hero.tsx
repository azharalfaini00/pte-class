import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, GraduationCap, Users, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onCtaClick: (sectionId: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  // Get time-based greeting for high personalization
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 11) return 'Selamat Pagi! 🌅 Ready to level up?';
    if (hours < 15) return 'Selamat Siang! ☀️ Mari capai impianmu!';
    if (hours < 18) return 'Selamat Sore! 🌆 Investasikan waktumu!';
    return 'Selamat Malam! 🌌 Waktu tepat untuk belajar!';
  };

  return (
    <section
      id="beranda"
      className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 left-0 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Dynamic time-based greeting badge */}
            <motion.div
              id="greeting-badge"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-1.5 py-1.5 px-3.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>{getGreeting()}</span>
            </motion.div>

            {/* Hook Headline */}
            <h1 id="hero-headline" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
              Kuasai Bahasa Inggris,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650">
                Buka Peluang Global!
              </span>
            </h1>

            {/* Informative Subdescription */}
            <p id="hero-subtext" className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
              Program pelatihan bahasa Inggris terstruktur dengan tutor bersertifikasi CELTA/IELTS. Bergaransi mengulang gratis sampai meraih skor impian Anda — siap karir global, kuliah luar negeri, & speaking makin lancar!
            </p>

            {/* Primary Action Buttons */}
            <div id="hero-actions" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-cta-primary"
                onClick={() => onCtaClick('daftar')}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-blue-100 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-sm gap-2"
              >
                <span>Mulai Belajar Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                id="hero-cta-secondary"
                onClick={() => onCtaClick('kelas')}
                className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all cursor-pointer text-sm gap-1.5"
              >
                <span>Lihat Pilihan Kelas</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Trust bullet features */}
            <div id="hero-proofs" className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                <span>Placement Test & Konsultasi Gratis</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                <span>Tutor Sertifikasi Global & Native Speakers</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                <span>Jaminan Garansi Skor IELTS/TOEFL</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                <span>Jadwal Belajar Fleksibel (Pagi - Malam)</span>
              </div>
            </div>

          </div>

          {/* Interactive visual collage block */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div id="visual-collage" className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Rings */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-2xl rotate-3 -z-10 scale-105" />
              <div className="absolute inset-0 bg-slate-900/5 rounded-2xl -rotate-2 -z-10" />

              {/* Central Premium Glassmorphic Card representing interactive learning */}
              <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between aspect-[4/5] min-h-[380px]">
                
                {/* Visual grid backgrounds */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Top Badge Card overlay */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="bg-blue-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-blue-400/20 text-[11px] font-semibold tracking-wide flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Interactive Classes</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-yellow-400 text-xs font-semibold">
                    ★ 4.9/5.0
                  </div>
                </div>

                {/* Core Visual: Interactive Level Gauge */}
                <div className="my-auto space-y-4 py-6 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Level Target</span>
                    <h3 className="text-xl font-bold">CEFR Fluency Meter</h3>
                  </div>

                  <div className="space-y-3">
                    {/* Level nodes */}
                    <div className="flex justify-between text-[10px] font-semibold text-slate-300">
                      <span>Beginner (A1-A2)</span>
                      <span>Intermediate (B1-B2)</span>
                      <span>Expert (C1-C2)</span>
                    </div>
                    
                    {/* Animated progression bar */}
                    <div className="h-2.5 w-full bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Dialogue snippet bubble */}
                  <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-xl border border-white/10 space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest leading-none">
                      <Users className="h-3 w-3" />
                      <span>Speaking Practice Snippet</span>
                    </div>
                    <p className="text-[11px] italic text-slate-200">
                      "I used to hesitate before replying, but after taking EnglishPro classes, I speak spontaneously/fluently."
                    </p>
                  </div>
                </div>

                {/* Trust stats row */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 relative z-10">
                  <div className="text-center">
                    <span className="block text-lg font-bold text-white leading-none">5.000+</span>
                    <span className="block text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-1">Alumni</span>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <span className="block text-lg font-bold text-white leading-none">98%</span>
                    <span className="block text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-1">Lolos</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-bold text-white leading-none">25+</span>
                    <span className="block text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-1">Tutor</span>
                  </div>
                </div>

              </div>

              {/* Floating Mini Widgets */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -right-4 bg-white p-3.5 rounded-xl shadow-lg border border-slate-150 flex items-center space-x-3 max-w-xs"
              >
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg border border-emerald-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 leading-none">Garansi Ulang</span>
                  <span className="text-[10px] text-slate-50 mt-1 block">Tingkatkan skor tanpa risiko</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -top-6 -left-4 bg-white p-3.5 rounded-xl shadow-lg border border-slate-150 flex items-center space-x-3 max-w-xs"
              >
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg border border-blue-100">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 leading-none">Tes Level Gratis</span>
                  <span className="text-[10px] text-slate-50 mt-1 block">Ukur kemampuan bahasa Inggrismu</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
