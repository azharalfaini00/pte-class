import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, Home } from 'lucide-react';
import { Button } from '../ui/Button';

interface OwnerLoginProps {
  onLoginSuccess: () => void;
}

export const OwnerLogin: React.FC<OwnerLoginProps> = ({ onLoginSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setError(false);
        // In a real app, store data.token in localStorage here
        onLoginSuccess();
      } else {
        setError(true);
        setPin('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[100px] pointer-events-none"></div>

      <motion.div 
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl shadow-blue-900/5 border border-slate-100 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button 
          onClick={() => window.location.href = '/'}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
          title="Kembali ke Beranda"
        >
          <Home className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6 mt-4">
          <div className="bg-blue-50 p-4 rounded-full text-blue-600">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Owner Login</h2>
        <p className="text-center text-slate-500 text-sm mb-8">
          Silakan masukkan PIN Anda untuk masuk ke Dashboard pengaturan harga.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">PIN Akses</label>
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Masukkan PIN"
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors ${
                error 
                  ? 'border-red-300 focus:ring-red-400 bg-red-50' 
                  : 'border-slate-200 focus:ring-blue-500 bg-slate-50'
              }`}
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-500 text-xs font-semibold mt-2"
              >
                PIN salah. Silakan coba lagi.
              </motion.p>
            )}
          </div>

          <Button type="submit" variant="primary" className="w-full flex justify-center py-3">
            <span>Masuk Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
          <p>Sistem ini dienkripsi secara lokal. Gunakan PIN yang telah disepakati.</p>
        </div>
      </motion.div>
    </div>
  );
};
