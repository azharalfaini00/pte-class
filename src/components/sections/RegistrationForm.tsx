import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { PaymentSimulationModal } from '../ui/PaymentSimulationModal';
import { Send, User, Phone, Mail, Book, Target, CalendarDays } from 'lucide-react';
import { usePricing } from '../../hooks/usePricing';

export const RegistrationForm: React.FC = () => {
  const { pricing } = usePricing();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    level: '',
    program: '',
    schedule: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  
  // Payment Gateway states
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [registeredStudentId, setRegisteredStudentId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentItemName, setPaymentItemName] = useState('');

  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        if (data.students) setStudentCount(data.students.length);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) {
      alert("Nama dan Nomor WhatsApp wajib diisi.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const result = await res.json();
        setRegisteredStudentId(result.student.id);
        
        // Calculate Amount & Item Name based on selected program
        let amount = 0;
        let itemName = 'Kelas Bahasa Inggris';
        if (pricing) {
          const allItems = [...(pricing.paket || []), ...(pricing.satuan || []), ...(pricing.pte || [])];
          const selectedItem = allItems.find(item => item.id === formData.program);
          if (selectedItem) {
            itemName = selectedItem.name;
            amount = selectedItem.basePrice - (selectedItem.basePrice * (selectedItem.discountPercentage / 100));
          }
        }
        
        setPaymentAmount(amount);
        setPaymentItemName(itemName);
        
        // Open payment modal
        setIsPaymentModalOpen(true);
        
      } else {
        alert("Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsSuccess(true);
    setStudentCount(prev => prev + 1);
    setFormData({ name: '', whatsapp: '', email: '', level: '', program: '', schedule: '' });
    setTimeout(() => setIsSuccess(false), 8000);
  };

  return (
    <section id="daftar" className="py-24 bg-primary-dark relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <SectionHeading 
            title="Mulai Perjalanan Bahasa Inggris Anda Hari Ini" 
            subtitle="Isi form di bawah ini untuk mendaftar kelas atau mengambil Placement Test Gratis jika Anda belum yakin."
            light={true}
          />
          {studentCount > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white font-medium shadow-lg"
            >
              <User className="w-4 h-4 text-accent" />
              <span>Bergabung bersama <span className="text-accent font-bold">{studentCount}</span> siswa lainnya!</span>
            </motion.div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto glass-card-dark rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gradient border effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-accent to-purple-500"></div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Lengkap */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Masukkan nama lengkap"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Nomor WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-slate-400" />
                  </div>
                  <input 
                    type="tel" 
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="Contoh: 08123456789"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-slate-300">Alamat Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Masukkan alamat email aktif"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Level Saat Ini */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Estimasi Level Saat Ini</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Book className="w-5 h-5 text-slate-400" />
                  </div>
                  <select 
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none transition-all"
                  >
                    <option value="" className="text-slate-800">Pilih Estimasi Level</option>
                    <option value="beginner" className="text-slate-800">Beginner (Pemula)</option>
                    <option value="intermediate" className="text-slate-800">Intermediate (Menengah)</option>
                    <option value="advanced" className="text-slate-800">Advanced (Lanjutan)</option>
                    <option value="dont_know" className="text-slate-800">Tidak Tahu / Belum Pernah Tes</option>
                  </select>
                </div>
              </div>

              {/* Pilihan Program Kelas */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Pilihan Program Belajar</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Target className="w-5 h-5 text-slate-400" />
                  </div>
                  <select 
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none transition-all"
                  >
                    <option value="" className="text-slate-800">Pilih Kelas yang Diinginkan</option>
                    
                    <optgroup label="Paket Kelas Lengkap" className="text-slate-800">
                      {pricing.paket?.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </optgroup>
                    
                    <optgroup label="Kelas Satuan (Spesifik)" className="text-slate-800">
                      {pricing.satuan?.map(s => (
                        <option key={s.id} value={s.id}>{s.name} Class</option>
                      ))}
                    </optgroup>
                    
                    <optgroup label="PTE Preparation" className="text-slate-800">
                      {pricing.pte?.map(p => (
                        <option key={p.id} value={p.id}>PTE - {p.name}</option>
                      ))}
                    </optgroup>
                    
                    <optgroup label="Lainnya" className="text-slate-800">
                      <option value="placement_test">Hanya ingin Placement Test</option>
                      <option value="consultation">Hanya ingin Konsultasi</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Jadwal Pilihan */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-slate-300">Preferensi Jadwal Kelas</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CalendarDays className="w-5 h-5 text-slate-400" />
                  </div>
                  <select 
                    value={formData.schedule}
                    onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none transition-all"
                  >
                    <option value="" className="text-slate-800">Pilih Waktu Belajar</option>
                    {pricing.schedules?.map(s => (
                      <option key={s.id} value={s.id} className="text-slate-800">{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-xl text-center"
              >
                Pendaftaran berhasil! Tim kami akan segera menghubungi Anda melalui WhatsApp.
              </motion.div>
            )}

            <div className="pt-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full text-lg h-14" 
                icon={<Send className="w-5 h-5" />} 
                iconPosition="right"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Mengirim Data...' : 'Daftar Sekarang'}
              </Button>
              <p className="text-center text-slate-400 text-xs mt-4">
                Dengan mendaftar, Anda menyetujui Syarat dan Ketentuan serta Kebijakan Privasi kami. <br/>
                Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      <PaymentSimulationModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        studentId={registeredStudentId}
        amount={paymentAmount}
        itemName={paymentItemName}
      />
    </section>
  );
};
