import { BENEFITS_DATA } from '../data';
import { Briefcase, Award, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Benefits() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="h-5 w-5" />;
      case 'Award':
        return <Award className="h-5 w-5" />;
      case 'MessageSquare':
        return <MessageSquare className="h-5 w-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'violet':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'amber':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <section id="keunggulan" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-lg">
            Kenapa Memilih Kami?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Metode Modern untuk Hasil Terbaik & Terukur
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Kami memadukan pendekatan komunikasi interaktif, teknologi digital, dan instruktur ahli untuk memberikan garansi sukses belajar bahasa Inggris Anda.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS_DATA.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/80 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start space-y-4"
            >
              {/* Icon Container */}
              <div className={`p-2.5 rounded-lg border ${getColorClasses(benefit.color)}`}>
                {getIcon(benefit.icon)}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-800 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Fact / Social Proof Bar */}
        <div className="mt-12 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full border-2 border-white bg-blue-600 text-white font-extrabold flex items-center justify-center text-[10px]">A</div>
              <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-800 text-white font-extrabold flex items-center justify-center text-[10px]">S</div>
              <div className="w-9 h-9 rounded-full border-2 border-white bg-amber-500 text-white font-extrabold flex items-center justify-center text-[10px]">K</div>
              <div className="w-9 h-9 rounded-full border-2 border-white bg-teal-500 text-white font-extrabold flex items-center justify-center text-[10px]">M</div>
            </div>
            <div>
              <span className="block text-sm font-extrabold text-slate-800 leading-none">Bergabung bersama 5.000+ Alumni</span>
              <span className="text-[11px] text-slate-500 mt-1 block">Mulai dari pelajar, profesional karir, hingga eksekutif perusahaan</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 p-1.5 rounded-lg">
            <span className="px-3 py-1 bg-white shadow-xs rounded border border-slate-200">💻 Belajar Online</span>
            <span className="px-3 py-1 bg-white shadow-xs rounded border border-slate-200">🏫 Belajar Offline</span>
            <span className="px-3 py-1 bg-white shadow-xs rounded border border-slate-200">🗣️ Live Practice</span>
          </div>
        </div>

      </div>
    </section>
  );
}
