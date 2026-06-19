import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';
import { Clock, Mic, BookOpen, PenTool, Map, ArrowRight, RotateCcw, Award } from 'lucide-react';

const questions = [
  {
    question: "Pilih kalimat yang benar secara tata bahasa (Grammar):",
    options: [
      "She don't like apples.",
      "She doesn't likes apples.",
      "She doesn't like apples.",
      "She don't likes apples."
    ],
    correctAnswer: 2
  },
  {
    question: "Pilih sinonim yang paling tepat untuk kata 'Enormous'.",
    options: [
      "Tiny (Kecil)",
      "Huge (Sangat Besar)",
      "Average (Rata-rata)",
      "Weak (Lemah)"
    ],
    correctAnswer: 1
  },
  {
    question: "Lengkapi kalimat ini: If I _____ rich, I would travel the world.",
    options: [
      "am",
      "was",
      "were",
      "have been"
    ],
    correctAnswer: 2
  }
];

export const PlacementTest: React.FC = () => {
  const [testState, setTestState] = useState<'idle' | 'testing' | 'result'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const features = [
    { icon: <Clock className="w-6 h-6 text-accent" />, text: "Tes online cepat" },
    { icon: <PenTool className="w-6 h-6 text-accent" />, text: "Analisis Grammar" },
    { icon: <BookOpen className="w-6 h-6 text-accent" />, text: "Analisis Vocabulary" },
    { icon: <Map className="w-6 h-6 text-accent" />, text: "Rekomendasi level otomatis" },
  ];

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setTestState('result');
    }
  };

  const getResult = () => {
    if (score === 3) return { 
      level: 'Advanced', 
      msg: 'Luar biasa! Anda memiliki dasar bahasa Inggris yang sangat kuat.', 
      rec: 'PTE Class atau Kelas Speaking (Advanced)' 
    };
    if (score === 2) return { 
      level: 'Intermediate', 
      msg: 'Bagus! Anda sudah cukup paham, tinggal dipoles sedikit lagi.', 
      rec: 'Paket Kelas 1 Bulan (Intermediate)' 
    };
    return { 
      level: 'Beginner', 
      msg: 'Tidak apa-apa! Mari kita bangun pondasi bahasa Inggris Anda bersama-sama.', 
      rec: 'Paket Kelas 2 Minggu / 3 Bulan (Beginner)' 
    };
  };

  return (
    <section id="placement-test" className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-3xl p-8 md:p-12 border-t-4 border-t-accent shadow-2xl relative overflow-hidden min-h-[500px] flex items-center">
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-light rounded-full mix-blend-multiply filter blur-3xl opacity-70 -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -ml-20 -mb-20 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            
            {/* STATE: IDLE */}
            {testState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative z-10 flex flex-col md:flex-row items-center gap-12 w-full"
              >
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                    Tidak Tahu Harus Mulai Dari Mana?
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Ikuti <span className="font-semibold text-accent">Placement Test Gratis</span> untuk mengetahui level kemampuan bahasa Inggris Anda dan mendapatkan rekomendasi kelas yang paling sesuai.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="bg-white p-2 rounded-md shadow-sm">
                          {feature.icon}
                        </div>
                        <span className="font-medium text-slate-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="primary" size="lg" icon={<ArrowRight />} iconPosition="right" className="w-full sm:w-auto" onClick={() => setTestState('testing')}>
                    Mulai Placement Test
                  </Button>
                </div>

                <div className="flex-1 w-full flex justify-center">
                  <div className="relative w-full max-w-sm aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-light to-blue-50 rounded-full animate-pulse opacity-50"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Students taking test" 
                      className="rounded-2xl shadow-xl object-cover w-full h-full relative z-10 border-4 border-white"
                    />
                    <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 z-20">
                      <p className="text-sm font-bold text-accent mb-1">Score Result</p>
                      <p className="text-2xl font-black text-primary-dark">Intermediate</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STATE: TESTING */}
            {testState === 'testing' && (
              <motion.div 
                key="testing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative z-10 w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
              >
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                  <span className="font-bold text-slate-400">Pertanyaan {currentQuestion + 1} dari {questions.length}</span>
                  <div className="flex gap-1">
                    {questions.map((_, idx) => (
                      <div key={idx} className={`h-2 w-8 rounded-full ${idx <= currentQuestion ? 'bg-primary' : 'bg-slate-200'}`}></div>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-blue-50 transition-all font-medium text-slate-700 hover:text-primary-dark"
                    >
                      {String.fromCharCode(65 + idx)}. {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STATE: RESULT */}
            {testState === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl mx-auto text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                  <Award className="w-10 h-10" />
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Selesai!</h2>
                <p className="text-slate-500 mb-8">Terima kasih telah mengikuti tes singkat ini.</p>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Estimasi Level Anda</p>
                  <p className="text-4xl font-black text-primary-dark mb-4">{getResult().level}</p>
                  <p className="text-slate-600 mb-6">{getResult().msg}</p>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium mb-1">Rekomendasi Kelas:</p>
                    <p className="font-bold text-blue-800">{getResult().rec}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" icon={<RotateCcw />} onClick={() => {
                    setTestState('idle');
                    setCurrentQuestion(0);
                    setScore(0);
                  }}>
                    Ulangi Tes
                  </Button>
                  <Button variant="primary" href="#daftar">
                    Daftar Sekarang
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
