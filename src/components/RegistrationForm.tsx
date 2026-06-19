import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLASSES_DATA } from '../data';
import { Registration } from '../types';
import { CheckCircle2, ChevronRight, Sparkles, Send, Trash2, Calendar, ClipboardCheck, PhoneCall } from 'lucide-react';

interface RegistrationFormProps {
  prefilledClassId: string;
  onClearPrefill: () => void;
}

export default function RegistrationForm({ prefilledClassId, onClearPrefill }: RegistrationFormProps) {
  // Registrations state list
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  
  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [classId, setClassId] = useState('');
  const [level, setLevel] = useState('unknown');
  const [sessionTime, setSessionTime] = useState<'pagi' | 'siang' | 'sore' | 'malam'>('malam');
  const [notes, setNotes] = useState('');

  // UI state controllers
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReg, setSubmittedReg] = useState<Registration | null>(null);

  // Preference load
  useEffect(() => {
    const saved = localStorage.getItem('englishpro_registrations');
    if (saved) {
      try {
        setRegistrations(JSON.parse(saved));
      } catch (e) {
        setRegistrations([]);
      }
    }
  }, []);

  // Sync prefilled class from parent selection click
  useEffect(() => {
    if (prefilledClassId) {
      setClassId(prefilledClassId);
    }
  }, [prefilledClassId]);

  // Handle validating inputs
  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!fullName.trim()) tempErrors.fullName = 'Nama lengkap wajib diisi.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Format email tidak valid.';
    if (!phone.trim() || phone.length < 9) tempErrors.phone = 'Nomor WhatsApp tidak valid (min 9 digit).';
    if (!classId) tempErrors.classId = 'Pilih salah satu program kelas.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database post delay for pristine high quality UX
    setTimeout(() => {
      const newRegistration: Registration = {
        id: `REG-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName,
        email,
        phone,
        classId,
        level,
        sessionTime,
        notes: notes.trim() || undefined,
        createdAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'terkonfirmasi',
      };

      const updated = [newRegistration, ...registrations];
      setRegistrations(updated);
      localStorage.setItem('englishpro_registrations', JSON.stringify(updated));

      // Show succeed view
      setSubmittedReg(newRegistration);
      setIsSubmitting(false);

      // Clear input form
      setFullName('');
      setEmail('');
      setPhone('');
      setClassId('');
      setLevel('unknown');
      setSessionTime('malam');
      setNotes('');
      onClearPrefill();
    }, 1500);
  };

  const handleDeleteReg = (id: string) => {
    const updated = registrations.filter((r) => r.id !== id);
    setRegistrations(updated);
    localStorage.setItem('englishpro_registrations', JSON.stringify(updated));
  };

  const getClassNameById = (id: string) => {
    const item = CLASSES_DATA.find((c) => c.id === id);
    return item ? item.title : 'Kelas Kustom';
  };

  return (
    <section id="daftar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-lg">
            Formulir Pendaftaran
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Ambil Langkah Pertama Meraih Kesuksesanmu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Isi data diri Anda di bawah ini. Tim Akademik CS kami akan segera menghubungi Anda dalam waktu 30 menit melalui WhatsApp untuk melakukan verifikasi, penjadwalan, dan aktivasi gratis.
          </p>
        </div>

        {/* Form Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Benefit Columns on Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-blue-600" />
                <span>Hak Istimewa Setelah Mendaftar:</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg text-blue-600 border border-slate-200 shadow-sm shrink-0">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-800">Placement Test Gratis</span>
                    <span className="text-xs text-slate-500 mt-1 block leading-relaxed">Tes diagnostic lengkap untuk mengetahui level Bahasa Inggris akurat Anda (senilai Rp 250.000).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg text-blue-600 border border-slate-200 shadow-sm shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-800">Orientasi Kelas Eksklusif</span>
                    <span className="text-xs text-slate-500 mt-1 block leading-relaxed">Akses awal ke modul digital panduan tata bahasa dasar dan vocabs starter kit.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg text-blue-600 border border-slate-200 shadow-sm shrink-0">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-800">Konsultasi Karir & Akademik</span>
                    <span className="text-xs text-slate-500 mt-1 block leading-relaxed">Sesi bimbingan 15 menit dengan tim kurator untuk mencocokkan target belajar Anda.</span>
                  </div>
                </div>
              </div>

              {/* Promo Info Badge */}
              <div className="bg-slate-900 text-white rounded-lg p-5 text-xs font-semibold space-y-1.5 shadow-sm">
                <p className="text-blue-400">⚡ Promo Minggu Ini:</p>
                <p className="text-slate-300 font-normal leading-relaxed">Pendaftaran gratis tanpa biaya admin dan diskon s/d 15% untuk semua paket kelas reguler.</p>
              </div>
            </div>

            {/* Quote of guarantee */}
            <div className="border border-slate-200 rounded-lg p-6 text-xs text-slate-500 leading-relaxed space-y-2">
              <p className="font-bold text-slate-700">🔒 Perlindungan Data Pribadi</p>
              <p>EnglishPro menjamin kerahasiaan nomor WhatsApp dan alamat email Anda. Kami hanya menggunakannya untuk proses registrasi dan penyediaan layanan konsultasi kursus.</p>
            </div>
          </div>

          {/* Interactive Form on Right */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submittedReg ? (
                // Success Voucher / Confirmation card
                <motion.div
                  id="registration-success-card"
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 text-white p-6 sm:p-8 rounded-lg shadow-xl space-y-6 relative overflow-hidden"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
                  
                  {/* Voucher Header */}
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg shadow-lg">
                      ✓
                    </div>
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Invoice Pendaftaran</span>
                    <h3 className="text-lg sm:text-xl font-bold">Selamat, Pendaftaran Berhasil!</h3>
                  </div>

                  {/* Voucher body table */}
                  <div className="bg-slate-950/65 border border-slate-800 rounded-lg p-5 space-y-4 text-xs sm:text-sm">
                    <div className="flex justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">ID Registrasi</span>
                      <span className="font-mono font-bold text-emerald-400">{submittedReg.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Nama Pendaftar</span>
                      <span className="font-semibold">{submittedReg.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Pilihan Kelas</span>
                      <span className="font-semibold text-right">{getClassNameById(submittedReg.classId)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Level Saat Ini</span>
                      <span className="font-semibold">
                        {submittedReg.level === 'unknown' ? 'Ragu-ragu (Tes Placement Gratis)' : submittedReg.level.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Sesi Belajar</span>
                      <span className="font-semibold uppercase">Kelas {submittedReg.sessionTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Waktu Daftar</span>
                      <span>{submittedReg.createdAt}</span>
                    </div>
                  </div>

                  {/* Instruction bottom */}
                  <div className="bg-slate-950/30 p-4 rounded-lg text-center text-xs text-slate-300">
                    <p className="font-semibold text-emerald-400">📲 Langkah Selanjutnya:</p>
                    <p className="mt-1 leading-relaxed">Screenshot struk ini. Tim CS WhatsApp kami akan segera menghubungi Anda ke nomor <strong className="text-white">{submittedReg.phone}</strong> untuk koordinasi jadwal kelas perdana.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      id="share-whatsapp-direct"
                      href={`https://wa.me/6281234567890?text=Halo%20EnglishPro,%20saya%20sudah%2520mendaftar%2520kelas%2520dengan%2520ID%2520${submittedReg.id}.%2520Nama%2520saya%2520${submittedReg.fullName}.%2520Tolong%2520verifikasi%2520pendaftaran%2520saya.`}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg text-center text-xs sm:text-sm cursor-pointer transition-colors"
                    >
                      Hubungi CS via WhatsApp
                    </a>
                    <button
                      id="reset-form-success"
                      onClick={() => setSubmittedReg(null)}
                      className="bg-slate-800 hover:bg-slate-750 text-white font-semibold py-3 px-5 rounded-lg text-xs sm:text-sm cursor-pointer transition-colors"
                    >
                      Daftar Kelas Lain
                    </button>
                  </div>
                </motion.div>
              ) : (
                // Traditional input form
                <motion.div
                  id="registration-entry-form"
                  key="form-entry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm"
                >
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {prefilledClassId && (
                      <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs font-semibold flex items-center justify-between border border-blue-100">
                        <span>🎯 Prefill Otomatis: Kelas <strong>{getClassNameById(prefilledClassId)}</strong> telah dipilih!</span>
                        <button
                          type="button"
                          onClick={() => {
                            setClassId('');
                            onClearPrefill();
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 underline font-extrabold cursor-pointer"
                        >
                          Ubah
                        </button>
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label id="lbl-fullname" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Nama Lengkap</label>
                      <input
                        id="input-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Masukkan nama lengkap Anda"
                        className={`w-full p-3 text-sm border rounded-lg outline-none transition-all ${
                          errors.fullName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 font-semibold">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email address */}
                      <div className="space-y-1.5">
                        <label id="lbl-email" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Alamat Email</label>
                        <input
                          id="input-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contoh@gmail.com"
                          className={`w-full p-3 text-sm border rounded-lg outline-none transition-all ${
                            errors.email ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                        {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
                      </div>

                      {/* Phone number */}
                      <div className="space-y-1.5">
                        <label id="lbl-phone" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Nomor WhatsApp</label>
                        <input
                          id="input-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contoh: 08123456789"
                          className={`w-full p-3 text-sm border rounded-lg outline-none transition-all ${
                            errors.phone ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Choice of class program */}
                      <div className="space-y-1.5">
                        <label id="lbl-program" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Pilih Hub Kelas</label>
                        <select
                          id="select-program"
                          value={classId}
                          onChange={(e) => setClassId(e.target.value)}
                          className={`w-full p-3 text-sm border rounded-lg outline-none bg-white transition-all ${
                            errors.classId ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        >
                          <option value="">-- Pilih Kelas --</option>
                          {CLASSES_DATA.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                        {errors.classId && <p className="text-xs text-red-500 font-semibold">{errors.classId}</p>}
                      </div>

                      {/* Estimasi Level Target / Assessment */}
                      <div className="space-y-1.5">
                        <label id="lbl-level" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Tingkat Kemampuan Saat Ini</label>
                        <select
                          id="select-level"
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          className="w-full p-3 text-sm border border-slate-200 rounded-lg outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        >
                          <option value="unknown">Saya Ragu / Ikut Placement Test Gratis</option>
                          <option value="beginner">Beginner (Dasar / Pemula)</option>
                          <option value="intermediate">Intermediate (Menengah / Bisa Pasif)</option>
                          <option value="advanced">Advanced (Lancar Berbicara / Menulis)</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred study sessions slot */}
                    <div className="space-y-2">
                      <label id="lbl-session" className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block font-sans">Preferensi Jadwal Kuliah / Sesi</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'pagi', label: 'Pagi', desc: '09:00 - 11:00' },
                          { id: 'siang', label: 'Siang', desc: '13:00 - 15:00' },
                          { id: 'sore', label: 'Sore', desc: '16:00 - 18:00' },
                          { id: 'malam', label: 'Malam', desc: '19:00 - 21:00' },
                        ].map((sess) => (
                          <button
                            id={`session-selector-${sess.id}`}
                            key={sess.id}
                            type="button"
                            onClick={() => setSessionTime(sess.id as any)}
                            className={`p-2.5 border rounded-lg text-center cursor-pointer transition-all ${
                              sessionTime === sess.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                                : 'bg-slate-50 text-slate-750 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span className="block text-xs font-bold leading-none">{sess.label}</span>
                            <span className={`block text-[9px] mt-1 ${sessionTime === sess.id ? 'text-blue-100 font-normal' : 'text-slate-400 font-normal'}`}>{sess.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Extra Notes */}
                    <div className="space-y-1.5">
                      <label id="lbl-notes" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Catatan Tambahan (Opsional)</label>
                      <textarea
                        id="textarea-notes"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Contoh: Ingin lulus TOEFL iBT min 100 untuk daftar beasiswa LPDP, atau mengasah kemampuan negosiasi..."
                        className="w-full p-3 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none font-sans"
                      />
                    </div>

                    {/* Submit Registration button */}
                    <button
                      id="btn-register-submit"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-lg flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sistem Memverifikasi Data...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Daftar Kelas & Dapatkan Placement Test</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Dynamic Registered active lists block saved in localStorage, making the page beautifully live */}
        {registrations.length > 0 && (
          <div className="mt-16 bg-slate-50 rounded-lg p-6 sm:p-8 border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-blue-600" />
              <span>Registrasi Terkini Anda ({registrations.length})</span>
            </h3>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Data pendaftaran di bawah tersimpan di browser Anda melalui localStorage, mensimulasikan pencatatan real-time.
            </p>

            <div className="space-y-3">
              {registrations.map((reg) => (
                <div
                  id={`saved-reg-${reg.id}`}
                  key={reg.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {reg.id}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {reg.fullName}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                        Aktivasi CS Pending
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-0.5">
                      <span>Program: <strong className="text-slate-700">{getClassNameById(reg.classId)}</strong></span>
                      <span className="hidden sm:inline text-slate-300">|</span>
                      <span>Sesi: <strong className="uppercase text-slate-700">{reg.sessionTime}</strong></span>
                      <span className="hidden sm:inline text-slate-300">|</span>
                      <span>Daftar: <span className="font-semibold text-slate-700">{reg.createdAt}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end self-end sm:self-auto">
                    <a
                      id={`wa-chat-link-${reg.id}`}
                      href={`https://wa.me/6281234567890?text=Halo%2520EnglishPro,%2520saya%2520hendak%2520verifikasi%2520kursus%2520ID%2520${reg.id}.%2520Nama:%2520${reg.fullName}`}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-850 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors"
                    >
                      Chat CS Verification
                    </a>
                    <button
                      id={`delete-reg-btn-${reg.id}`}
                      onClick={() => handleDeleteReg(reg.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded cursor-pointer transition-colors border border-transparent hover:border-red-100"
                      title="Batalkan Pendaftaran"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
