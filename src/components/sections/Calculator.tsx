import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Calculator as CalcIcon, Clock, ArrowRight } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1); // 1-6 (A1-C2)
  const [targetLevel, setTargetLevel] = useState(3);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [estimatedWeeks, setEstimatedWeeks] = useState(0);

  const levels = [
    { value: 1, label: 'Beginner (A1)' },
    { value: 2, label: 'Pre-Intermediate (A2)' },
    { value: 3, label: 'Intermediate (B1)' },
    { value: 4, label: 'Upper Intermediate (B2)' },
    { value: 5, label: 'Advanced (C1)' },
    { value: 6, label: 'Proficient (C2)' }
  ];

  // Base calculation logic: ~100 hours of guided learning per CEFR level increment
  useEffect(() => {
    if (targetLevel <= currentLevel) {
      setEstimatedWeeks(0);
      return;
    }
    
    const levelsToClimb = targetLevel - currentLevel;
    const totalHoursNeeded = levelsToClimb * 100; // rough estimate
    const weeksNeeded = Math.ceil(totalHoursNeeded / hoursPerWeek);
    
    setEstimatedWeeks(weeksNeeded);
  }, [currentLevel, targetLevel, hoursPerWeek]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-primary-dark rounded-3xl overflow-hidden shadow-2xl relative">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[100px] opacity-50 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side: Form */}
            <div className="p-8 md:p-12 z-10 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <CalcIcon className="w-6 h-6 text-blue-300" />
                </div>
                <h2 className="text-3xl font-bold text-white">Target Kalkulator</h2>
              </div>
              <p className="text-blue-100 mb-10 text-lg">Hitung estimasi waktu yang Anda butuhkan untuk mencapai kefasihan bahasa Inggris.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Level Saat Ini</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(Number(e.target.value))}
                  >
                    {levels.map(l => (
                      <option key={l.value} value={l.value} className="text-slate-800">{l.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Target Level</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(Number(e.target.value))}
                  >
                    {levels.map(l => (
                      <option key={l.value} value={l.value} className="text-slate-800" disabled={l.value <= currentLevel}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                    <label>Komitmen Belajar per Minggu</label>
                    <span>{hoursPerWeek} Jam</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="20" 
                    step="1"
                    className="w-full accent-accent"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Santai (2j)</span>
                    <span>Intensif (20j)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Result */}
            <div className="bg-gradient-to-br from-accent to-blue-600 p-8 md:p-12 flex flex-col justify-center text-center text-white relative z-10 border-l border-white/10">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                <Clock className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-xl font-medium text-blue-100 mb-2">Estimasi Waktu Belajar</h3>
              
              {estimatedWeeks > 0 ? (
                <motion.div
                  key={estimatedWeeks}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-8"
                >
                  <span className="text-7xl font-black">{estimatedWeeks}</span>
                  <span className="text-2xl font-bold ml-2 text-blue-200">Minggu</span>
                  <p className="mt-4 text-sm text-blue-100 max-w-xs mx-auto">
                    Dengan durasi {hoursPerWeek} jam per minggu, Anda diproyeksikan mencapai level target dalam {estimatedWeeks} minggu.
                  </p>
                </motion.div>
              ) : (
                <div className="mb-8">
                  <span className="text-4xl font-bold">Target Tercapai!</span>
                  <p className="mt-2 text-blue-100">Silakan pilih target level yang lebih tinggi.</p>
                </div>
              )}

              <Button variant="glass" size="lg" className="w-full" icon={<ArrowRight />} iconPosition="right">
                Dapatkan Learning Plan Gratis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
