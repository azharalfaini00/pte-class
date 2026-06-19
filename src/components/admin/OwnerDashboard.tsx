import React, { useState, useEffect } from 'react';
import { usePricing, PricingState, PriceItem } from '../../hooks/usePricing';
import { Save, LogOut, Plus, Trash2, Upload, Loader2, Users, Tag, BookOpen, Clock, Activity, LayoutDashboard, CheckCircle2, ChevronRight, PlayCircle, Star, AlertCircle, MessageSquare, HelpCircle, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export const OwnerDashboard: React.FC = () => {
  const { 
    pricing, isLoading, 
    updatePriceItem, addPriceItem, removePriceItem, updateSettings, 
    updateTutor, addTutor, removeTutor, 
    addSchedule, updateSchedule, removeSchedule, 
    addFAQ, updateFAQ, removeFAQ,
    addTestimonial, updateTestimonial, removeTestimonial,
    addCenter, updateCenter, removeCenter,
    addPlacementQuestion, updatePlacementQuestion, removePlacementQuestion,
    uploadImage, savePricing, calculateFinalPrice, formatRupiah 
  } = usePricing();
  const [uploadingTutorId, setUploadingTutorId] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'classes' | 'tutors' | 'faqs' | 'testimonials' | 'settings' | 'placement'>('overview');

  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        if (data.students) {
          // Sort by latest registered
          const sorted = data.students.sort((a: any, b: any) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime());
          setStudents(sorted);
        }
      })
      .catch(console.error);
  }, []);

  const handleImageUpload = async (id: string, file: File | null) => {
    if (!file) return;
    setUploadingTutorId(id);
    const url = await uploadImage(file);
    if (url) {
      updateTutor(id, 'photo', url);
    } else {
      alert("Gagal mengunggah foto.");
    }
    setUploadingTutorId(null);
  };

  const handlePriceChange = (category: 'paket' | 'satuan' | 'pte', id: string, field: 'name' | 'basePrice' | 'discountPercentage', value: string) => {
    if (field === 'name') {
      updatePriceItem(category, id, 'name', value);
      return;
    }
    
    const numValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    
    if (field === 'basePrice') {
      updatePriceItem(category, id, 'basePrice', numValue);
    } else {
      let safePercent = numValue > 100 ? 100 : numValue;
      updatePriceItem(category, id, 'discountPercentage', safePercent);
    }
  };

  const totalClasses = (pricing.paket?.length || 0) + (pricing.satuan?.length || 0) + (pricing.pte?.length || 0);
  const totalTutors = pricing.tutors?.length || 0;

  const renderStatCard = (title: string, value: string | number, icon: React.ReactNode, trend?: string) => (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <div className="flex items-end gap-3">
          <h3 className="text-2xl font-bold text-slate-800 leading-none">{value}</h3>
          {trend && <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>}
        </div>
      </div>
    </div>
  );

  const renderPricingTable = (category: 'paket' | 'satuan' | 'pte', title: string, subtitle: string) => (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-8">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 !py-1.5 !px-3 text-sm" onClick={() => addPriceItem(category)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah Kelas
          </Button>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hidden sm:flex">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th className="px-6 py-4 font-semibold">Nama Kelas / Paket</th>
              <th className="px-6 py-4 font-semibold w-56">Harga Asli (Rp)</th>
              <th className="px-6 py-4 font-semibold w-40">Diskon (%)</th>
              <th className="px-6 py-4 font-semibold text-right">Harga Final</th>
              <th className="px-6 py-4 font-semibold text-right w-20">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {Array.isArray(pricing[category]) && (pricing[category] as PriceItem[]).map((item: PriceItem) => {
              const finalPrice = item.basePrice - (item.basePrice * (item.discountPercentage / 100));
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => handlePriceChange(category, item.id, 'name', e.target.value)}
                      placeholder="Nama kelas"
                      className="w-full border-b border-transparent focus:border-indigo-500 font-semibold text-slate-700 bg-transparent py-1 focus:outline-none transition-colors"
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="relative group-hover:shadow-sm transition-shadow rounded-xl">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Rp</span>
                      <input 
                        type="text" 
                        value={item.basePrice} 
                        onChange={(e) => handlePriceChange(category, item.id, 'basePrice', e.target.value)}
                        className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="relative group-hover:shadow-sm transition-shadow rounded-xl">
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={item.discountPercentage} 
                        onChange={(e) => handlePriceChange(category, item.id, 'discountPercentage', e.target.value)}
                        className="w-full border border-slate-200 rounded-xl pl-4 pr-8 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                      {formatRupiah(finalPrice)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => removePriceItem(category, item.id)}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Hapus Kelas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                <span className="font-black text-xl tracking-wider">EP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">EnglishPro</h1>
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  <Activity className="w-3 h-3" />
                  <span>Admin Workspace</span>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="hidden sm:flex items-center gap-2 !px-4 !py-2.5 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-sm font-semibold shadow-sm"
                onClick={async () => {
                  const { supabase } = await import('../../lib/supabase');
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }} 
              >
                <LogOut className="w-4 h-4" />
                <span>Lihat Website</span>
              </Button>
              
              <div className="h-8 w-px bg-slate-200 hidden sm:block mx-2"></div>
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-800 leading-tight">Super Admin</p>
                  <p className="text-xs font-medium text-slate-500">System Owner</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-slate-100 ring-2 ring-white shadow-md overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Admin+EP&background=4F46E5&color=fff&bold=true" alt="Admin" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-white p-2 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'students', label: 'Data Siswa', icon: <Users className="w-4 h-4" /> },
            { id: 'classes', label: 'Manajemen Kelas', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'placement', label: 'Placement Test', icon: <CheckCircle2 className="w-4 h-4" /> },
            { id: 'tutors', label: 'Tutor', icon: <Star className="w-4 h-4" /> },
            { id: 'faqs', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'testimonials', label: 'Testimoni', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'settings', label: 'Pengaturan', icon: <AlertCircle className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content: Placement Test */}
        {activeTab === 'placement' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Soal Placement Test</h2>
                <p className="text-slate-500 mt-1 text-sm">Kelola pertanyaan, pilihan ganda, dan kunci jawaban untuk tes penempatan online.</p>
              </div>
              <Button onClick={() => addPlacementQuestion()} variant="primary" icon={<Plus className="w-4 h-4" />}>
                Tambah Soal
              </Button>
            </div>

            <div className="space-y-4">
              {pricing.placementQuestions?.map((q, qIndex) => (
                <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between gap-4 mb-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pertanyaan {qIndex + 1}</label>
                      <input 
                        type="text" 
                        value={q.question} 
                        onChange={(e) => updatePlacementQuestion(q.id, 'question', e.target.value)}
                        className="w-full text-lg font-bold text-slate-800 border-b border-transparent focus:border-indigo-500 py-1 focus:outline-none transition-colors bg-transparent"
                      />
                    </div>
                    <button 
                      onClick={() => removePlacementQuestion(q.id)}
                      className="text-slate-400 hover:text-red-500 p-2 h-fit rounded-lg hover:bg-red-50 transition-colors"
                      title="Hapus Soal"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${q.correctAnswer === optIndex ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-slate-300'}`}>
                        <input 
                          type="radio" 
                          name={`correct-${q.id}`} 
                          checked={q.correctAnswer === optIndex}
                          onChange={() => updatePlacementQuestion(q.id, 'correctAnswer', optIndex)}
                          className="w-4 h-4 text-green-500 focus:ring-green-400"
                        />
                        <div className="flex-1 flex items-center gap-2">
                          <span className="font-bold text-slate-400 text-sm">{String.fromCharCode(65 + optIndex)}.</span>
                          <input 
                            type="text" 
                            value={opt} 
                            onChange={(e) => {
                              const newOpts = [...q.options];
                              newOpts[optIndex] = e.target.value;
                              updatePlacementQuestion(q.id, 'options', newOpts);
                            }}
                            className="w-full text-sm text-slate-700 bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {(!pricing.placementQuestions || pricing.placementQuestions.length === 0) && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                  <p className="text-slate-500">Belum ada soal placement test.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
              <p className="text-slate-500 mt-1">Ringkasan performa dan metrik utama platform Anda.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderStatCard("Total Siswa Terdaftar", students.length, <Users className="w-7 h-7" />, "+12% Bulan ini")}
              {renderStatCard("Total Kelas Aktif", totalClasses, <BookOpen className="w-7 h-7" />)}
              {renderStatCard("Total Tutor", totalTutors, <Star className="w-7 h-7" />)}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <LayoutDashboard className="w-48 h-48" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-2xl font-bold mb-2">Selamat Datang di Workspace</h3>
                <p className="text-indigo-200 mb-8 leading-relaxed">
                  Semua perubahan pada harga, jadwal, dan tutor akan langsung diterapkan ke website utama setelah Anda menekan tombol simpan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" onClick={() => setActiveTab('classes')} className="bg-white text-indigo-900 hover:bg-indigo-50 border-none shadow-lg">
                    Kelola Harga Kelas
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('students')} className="border-indigo-400 text-indigo-100 hover:bg-indigo-800 hover:text-white">
                    Lihat Data Siswa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Students */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Data Siswa</h2>
                <p className="text-slate-500 mt-1">Daftar siswa yang telah melakukan pendaftaran.</p>
              </div>
              <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                Total: {students.length} Siswa
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                      <th className="px-6 py-4 font-semibold">Profil Siswa</th>
                      <th className="px-6 py-4 font-semibold">Kontak</th>
                      <th className="px-6 py-4 font-semibold">Program & Jadwal</th>
                      <th className="px-6 py-4 font-semibold">Status Pembayaran</th>
                      <th className="px-6 py-4 font-semibold">Tanggal Daftar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {students.length > 0 ? (
                      students.map((student) => {
                        const programName = [...(pricing.paket||[]), ...(pricing.satuan||[]), ...(pricing.pte||[])].find(p => p.id === student.program)?.name || student.program;
                        const scheduleName = pricing.schedules?.find(s => s.id === student.schedule)?.name || student.schedule;
                        
                        return (
                          <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-800">{student.name}</div>
                                  <div className="text-xs text-slate-500">{student.id.slice(0, 8)}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-sm font-medium text-slate-800">{student.whatsapp}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{student.email || 'Tidak ada email'}</div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold mb-1">
                                <BookOpen className="w-3 h-3" />
                                {programName}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock className="w-3 h-3" />
                                {scheduleName}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              {student.paymentStatus === 'paid' ? (
                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                                  <Clock className="w-3.5 h-3.5" /> Pending
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-5 text-sm font-medium text-slate-500">
                              {new Date(student.registeredAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <Users className="w-12 h-12 mb-3 opacity-20" />
                            <p>Belum ada data pendaftaran siswa.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Classes */}
        {activeTab === 'classes' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Manajemen Harga Kelas</h2>
              <p className="text-slate-500 mt-1">Atur harga dan diskon untuk setiap paket dan kelas satuan.</p>
            </div>

            {renderPricingTable('paket', 'Paket Kelas Lengkap', 'Program bundling dengan kurikulum komprehensif')}
            {renderPricingTable('satuan', 'Kelas Satuan', 'Kelas spesifik fokus pada satu materi')}
            {renderPricingTable('pte', 'PTE Preparation', 'Persiapan ujian Pearson Test of English')}
          </div>
        )}

        {/* Tab Content: Tutors */}
        {activeTab === 'tutors' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Manajemen Tutor</h2>
                <p className="text-slate-500 mt-1">Kelola profil pengajar yang akan tampil di website.</p>
              </div>
              <Button variant="primary" className="shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700" onClick={addTutor}>
                <Plus className="w-5 h-5 mr-2" />
                Tambah Tutor Baru
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pricing.tutors && pricing.tutors.length > 0 ? (
                pricing.tutors.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <button 
                      onClick={() => removeTutor(tutor.id)}
                      className="absolute top-6 right-6 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                      title="Hapus Tutor"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex gap-6 items-start mb-6 pr-12">
                      <div className="relative group/img flex-shrink-0">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-md">
                          <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
                        </div>
                        <label className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center cursor-pointer opacity-0 group-hover/img:opacity-100 transition-opacity rounded-2xl">
                          {uploadingTutorId === tutor.id ? (
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="w-5 h-5 text-white mb-1" />
                              <span className="text-[10px] text-white font-semibold">Ubah Foto</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleImageUpload(tutor.id, e.target.files ? e.target.files[0] : null)}
                            disabled={uploadingTutorId === tutor.id}
                          />
                        </label>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar</label>
                          <input 
                            type="text" 
                            value={tutor.name} 
                            onChange={(e) => updateTutor(tutor.id, 'name', e.target.value)}
                            placeholder="Contoh: Budi Santoso, M.Pd"
                            className="w-full border-b-2 border-slate-100 px-0 py-1.5 text-lg font-bold text-slate-800 focus:outline-none focus:border-indigo-500 bg-transparent transition-colors placeholder:text-slate-300"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Spesialisasi</label>
                          <input 
                            type="text" 
                            value={tutor.specialty} 
                            onChange={(e) => updateTutor(tutor.id, 'specialty', e.target.value)}
                            placeholder="Contoh: IELTS & TOEFL Expert"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5" /> Pengalaman Mengajar
                        </label>
                        <input 
                          type="text" 
                          value={tutor.experience} 
                          onChange={(e) => updateTutor(tutor.id, 'experience', e.target.value)}
                          placeholder="Contoh: 5+ Tahun Mengajar"
                          className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Star className="w-3.5 h-3.5" /> Pencapaian Tertinggi
                        </label>
                        <textarea 
                          value={tutor.achievements} 
                          onChange={(e) => updateTutor(tutor.id, 'achievements', e.target.value)}
                          placeholder="Deskripsikan pencapaian tutor..."
                          rows={2}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Star className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium text-slate-600 mb-2">Belum ada data tutor</p>
                    <p className="text-sm mb-6">Silakan tambah tutor baru untuk menampilkannya di website.</p>
                    <Button variant="primary" onClick={addTutor}>Tambah Tutor Pertama</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: FAQs */}
        {activeTab === 'faqs' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Manajemen FAQ</h2>
                <p className="text-slate-500 mt-1">Kelola pertanyaan yang sering diajukan di website.</p>
              </div>
              <Button variant="primary" className="shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700" onClick={addFAQ}>
                <Plus className="w-5 h-5 mr-2" />
                Tambah FAQ
              </Button>
            </div>
            
            <div className="space-y-4">
              {pricing.faqs && pricing.faqs.length > 0 ? (
                pricing.faqs.map(faq => (
                  <div key={faq.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-4 items-start relative group hover:shadow-md transition-all">
                    <div className="flex-1 space-y-4 pr-8">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Pertanyaan</label>
                        <input 
                          type="text" 
                          value={faq.q} 
                          onChange={(e) => updateFAQ(faq.id, 'q', e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Jawaban</label>
                        <textarea 
                          value={faq.a} 
                          onChange={(e) => updateFAQ(faq.id, 'a', e.target.value)}
                          rows={3}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFAQ(faq.id)}
                      className="absolute top-6 right-6 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                      title="Hapus FAQ"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-500">Belum ada FAQ. Silakan tambah baru.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Manajemen Testimoni</h2>
              <p className="text-slate-500 mt-1">Review dan setujui ulasan dari siswa agar tampil di website.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricing.testimonials && pricing.testimonials.length > 0 ? (
                pricing.testimonials.map(testi => (
                  <div key={testi.id} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col relative hover:shadow-md transition-shadow">
                    <button 
                      onClick={() => removeTestimonial(testi.id)}
                      className="absolute top-6 right-6 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <img src={testi.photo} alt={testi.name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-800">{testi.name}</h4>
                        <p className="text-xs text-slate-500">{testi.profession} • {testi.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-4">
                      {[...Array(testi.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 mb-4 text-sm border border-slate-100">
                      <p className="mb-1"><span className="font-semibold text-rose-500">Sebelum:</span> {testi.before}</p>
                      <p><span className="font-semibold text-emerald-500">Sesudah:</span> {testi.after}</p>
                    </div>

                    <p className="text-sm text-slate-600 italic flex-1 mb-6">"{testi.text}"</p>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Status Tampil:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={testi.isApproved} onChange={(e) => updateTestimonial(testi.id, 'isApproved', e.target.checked)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        <span className="ml-3 text-sm font-semibold text-slate-700">{testi.isApproved ? 'Disetujui' : 'Disembunyikan'}</span>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-500">Belum ada testimoni.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Pengaturan Umum & Jadwal</h2>
              <p className="text-slate-500 mt-1">Konfigurasi opsi jadwal dan tampilan video demo.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-indigo-500" />
                URL Video Demo (YouTube Embed)
              </h3>
              <div className="max-w-2xl">
                <input 
                  type="text" 
                  value={pricing.settings?.demoVideoUrl || ''} 
                  onChange={(e) => updateSettings('demoVideoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 focus:bg-white"
                />
                <p className="text-sm text-slate-500 mt-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  Pastikan menggunakan link "embed" YouTube, bukan link reguler. <br/>
                  Contoh: <code>https://www.youtube.com/embed/dQw4w9WgXcQ</code>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    Opsi Jadwal Kelas
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">Jadwal yang dapat dipilih siswa saat mendaftar.</p>
                </div>
                <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50" onClick={addSchedule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Jadwal
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricing.schedules && pricing.schedules.length > 0 ? (
                  pricing.schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center gap-3 border border-slate-200 rounded-2xl p-3 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-500 shadow-sm flex-shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        value={schedule.name} 
                        onChange={(e) => updateSchedule(schedule.id, e.target.value)}
                        placeholder="Contoh: Pagi (09.00 - 12.00)"
                        className="flex-1 bg-transparent border-none px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-lg transition-all"
                      />
                      <button 
                        onClick={() => removeSchedule(schedule.id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                        title="Hapus Jadwal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500">
                    Belum ada data jadwal. Silakan tambah opsi jadwal kelas.
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    Opsi Pusat Belajar
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">Daftar lokasi cabang pusat belajar yang tampil di Footer.</p>
                </div>
                <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50" onClick={addCenter}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Lokasi
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricing.centers && pricing.centers.length > 0 ? (
                  pricing.centers.map((center) => (
                    <div key={center.id} className="flex items-center gap-3 border border-slate-200 rounded-2xl p-3 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-500 shadow-sm flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        value={center.name} 
                        onChange={(e) => updateCenter(center.id, e.target.value)}
                        placeholder="Contoh: Jakarta Selatan (AIA Central)"
                        className="flex-1 bg-transparent border-none px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-lg transition-all"
                      />
                      <button 
                        onClick={() => removeCenter(center.id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                        title="Hapus Lokasi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500">
                    Belum ada data pusat belajar. Silakan tambah opsi lokasi.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Save Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto transform translate-y-0 transition-transform animate-in slide-in-from-bottom-10 duration-500">
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Simpan Perubahan</h4>
              <p className="text-xs text-slate-300 mt-0.5">Jangan lupa menyimpan setelah mengubah data.</p>
            </div>
          </div>
          <Button 
            variant="primary" 
            onClick={savePricing} 
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-none shadow-lg shadow-indigo-500/25 rounded-xl font-bold"
          >
            <Save className="w-5 h-5 mr-2" />
            Simpan Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};
