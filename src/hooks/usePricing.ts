import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PriceItem {
  id: string;
  name: string;
  basePrice: number;
  discountPercentage: number;
}

export interface SettingsState {
  demoVideoUrl: string;
}

export interface TutorItem {
  id: string;
  name: string;
  photo: string;
  certifications: string[];
  experience: string;
  specialty: string;
  achievements: string;
}

export interface ScheduleItem {
  id: string;
  name: string;
}

export interface CenterItem {
  id: string;
  name: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface TestimonialItem {
  id: string;
  category: string;
  name: string;
  profession: string;
  photo: string;
  rating: number;
  before: string;
  after: string;
  text: string;
  isApproved: boolean;
}

export interface PricingState {
  paket: PriceItem[];
  satuan: PriceItem[];
  pte: PriceItem[];
  settings?: SettingsState;
  tutors?: TutorItem[];
  schedules?: ScheduleItem[];
  faqs?: FAQItem[];
  testimonials?: TestimonialItem[];
  centers?: CenterItem[];
}

const defaultPricing: PricingState = {
  paket: [
    { id: 'paket_2w', name: '2 Minggu', basePrice: 500000, discountPercentage: 10 },
    { id: 'paket_1m', name: '1 Bulan', basePrice: 950000, discountPercentage: 15 },
    { id: 'paket_3m', name: '3 Bulan', basePrice: 2500000, discountPercentage: 20 },
  ],
  satuan: [
    { id: 'satuan_speaking', name: 'Speaking', basePrice: 250000, discountPercentage: 5 },
    { id: 'satuan_grammar', name: 'Grammar', basePrice: 200000, discountPercentage: 0 },
    { id: 'satuan_vocab', name: 'Vocabulary', basePrice: 150000, discountPercentage: 0 },
    { id: 'satuan_pronun', name: 'Pronunciation', basePrice: 200000, discountPercentage: 0 },
  ],
  pte: [
    { id: 'pte_2w', name: '2 Minggu', basePrice: 750000, discountPercentage: 10 },
    { id: 'pte_1m', name: '1 Bulan', basePrice: 1400000, discountPercentage: 15 },
    { id: 'pte_15m', name: '1.5 Bulan', basePrice: 2000000, discountPercentage: 20 },
  ],
  settings: {
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  tutors: [],
  schedules: [
    { id: "morning", name: "Pagi (09.00 - 12.00)" },
    { id: "afternoon", name: "Siang / Sore (13.00 - 17.00)" },
    { id: "evening", name: "Malam (19.00 - 21.00) - Paling Diminati" },
    { id: "weekend", name: "Akhir Pekan (Sabtu & Minggu)" }
  ],
  faqs: [
    { id: 'faq_1', q: "Apakah kelas diadakan secara online atau offline?", a: "Saat ini seluruh kelas diadakan 100% online secara live interaktif menggunakan Zoom Premium. Anda bisa belajar dari mana saja tanpa harus datang ke tempat kursus." },
    { id: 'faq_2', q: "Apakah ada placement test sebelum kelas dimulai?", a: "Tentu. Setiap siswa diwajibkan mengikuti Placement Test Gratis terlebih dahulu agar kami dapat merekomendasikan kelas yang paling sesuai dengan level Anda." },
    { id: 'faq_3', q: "Apakah saya akan mendapatkan sertifikat?", a: "Ya, setiap siswa yang menyelesaikan program dan memenuhi standar kehadiran serta nilai akhir akan mendapatkan e-Certificate resmi dari EnglishPRO Linguits Academy." },
    { id: 'faq_4', q: "Berapa lama durasi satu program?", a: "Durasi bervariasi tergantung level. Program Beginner hingga Pre-Intermediate memakan waktu 8 minggu, sedangkan Intermediate hingga Advanced 12 minggu. Untuk PTE Intensive memakan waktu 8 minggu." },
    { id: 'faq_5', q: "Bagaimana sistem pembayarannya?", a: "Pembayaran dapat dilakukan melalui transfer bank, virtual account, e-wallet, maupun cicilan 0% hingga 3 bulan khusus untuk program bundle." },
    { id: 'faq_6', q: "Apakah saya bisa mengulang kelas jika belum paham?", a: "Ya, kami memberikan Garansi Mengulang Kelas secara gratis untuk program tertentu jika Anda merasa belum mencapai target pembelajaran (syarat kehadiran 90% terpenuhi)." },
    { id: 'faq_7', q: "Apakah tersedia kelas Private (1-on-1)?", a: "Ya, kami menyediakan kelas Private bagi Anda yang membutuhkan jadwal fleksibel dan kurikulum yang lebih disesuaikan dengan kebutuhan spesifik Anda." },
    { id: 'faq_8', q: "Apakah kelas ini cocok untuk pemula yang belum bisa bahasa Inggris sama sekali?", a: "Sangat cocok! Kami memiliki kelas Beginner Foundation yang didesain khusus untuk pemula. Tutor akan mengajarkan dari dasar (A1) dengan sabar dan menyenangkan." }
  ],
  centers: [
    { id: 'center_1', name: "Jakarta Selatan (AIA Central)" },
    { id: 'center_2', name: "Bandung (Dago Hub)" },
    { id: 'center_3', name: "Yogyakarta (Sleman Square)" },
    { id: 'center_4', name: "Surabaya (Gubeng Prime)" },
    { id: 'center_5', name: "Medan (Podomoro Center)" }
  ],
  testimonials: [
    { id: 'testi_1', category: 'PTE', name: 'Budi Santoso', profession: 'Mahasiswa S2', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', rating: 5, before: 'Skor PTE stuck di 52, kesulitan di Speaking section.', after: 'Skor naik menjadi 71 dalam 2 bulan. Lolos beasiswa LPDP!', text: 'Metode belajarnya sangat terstruktur. Tutor sangat detail dalam memberikan feedback untuk speaking dan writing. Mock test yang diberikan sangat mirip dengan aslinya.', isApproved: true },
    { id: 'testi_2', category: 'Speaking', name: 'Rina Amelia', profession: 'Marketing Executive', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', rating: 5, before: 'Gugup dan blank saat presentasi bahasa Inggris.', after: 'Percaya diri presentasi di depan klien internasional.', text: 'Kelas Speaking di EnglishPRO Linguits Academy benar-benar mengubah mindset saya. Atmosfer kelas yang supportive membuat saya tidak takut salah lagi saat berbicara.', isApproved: true },
    { id: 'testi_3', category: 'Business English', name: 'Andi Pratama', profession: 'Software Engineer', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', rating: 5, before: 'Sering salah paham saat email dan meeting dengan tim luar.', after: 'Berhasil lolos wawancara kerja di perusahaan Singapura.', text: 'Materi Business English sangat aplikatif. Saya diajarkan cara negosiasi, menulis email profesional, dan tips wawancara yang terbukti ampuh.', isApproved: true },
    { id: 'testi_4', category: 'Grammar', name: 'Siti Nurhaliza', profession: 'Fresh Graduate', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', rating: 4, before: 'Selalu bingung menggunakan tenses yang tepat.', after: 'Menulis esai dan cover letter tanpa grammatical error.', text: 'Ternyata grammar itu mudah kalau diajarkan dengan cara yang tepat. Tidak sekadar menghafal rumus, tapi praktik langsung.', isApproved: true }
  ]
};

export const usePricing = () => {
  const [pricing, setPricing] = useState<PricingState>(defaultPricing);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const [
        { data: pricingItems },
        { data: tutors },
        { data: schedules },
        { data: faqs },
        { data: testimonials },
        { data: centers },
        { data: settings }
      ] = await Promise.all([
        supabase.from('pricing_items').select('*'),
        supabase.from('tutors').select('*'),
        supabase.from('schedules').select('*'),
        supabase.from('faqs').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('centers').select('*'),
        supabase.from('settings').select('*').eq('id', 'global').single()
      ]);

      if (pricingItems) {
        const paket = pricingItems.filter(i => i.category === 'paket');
        const satuan = pricingItems.filter(i => i.category === 'satuan');
        const pte = pricingItems.filter(i => i.category === 'pte');
        
        const mapPriceItem = (item: any) => ({
          id: item.id,
          name: item.name,
          basePrice: item.base_price,
          discountPercentage: item.discount_percentage
        });

        setPricing({
          paket: paket.length > 0 ? paket.map(mapPriceItem) : defaultPricing.paket,
          satuan: satuan.length > 0 ? satuan.map(mapPriceItem) : defaultPricing.satuan,
          pte: pte.length > 0 ? pte.map(mapPriceItem) : defaultPricing.pte,
          tutors: tutors?.length ? tutors : defaultPricing.tutors,
          schedules: schedules?.length ? schedules : defaultPricing.schedules,
          faqs: faqs?.length ? faqs : defaultPricing.faqs,
          testimonials: testimonials?.length ? testimonials.map(t => ({...t, isApproved: t.is_approved})) : defaultPricing.testimonials,
          centers: centers?.length ? centers : defaultPricing.centers,
          settings: settings ? { demoVideoUrl: settings.demo_video_url } : defaultPricing.settings
        });
      }
    } catch (error) {
      console.error("Error fetching pricing from backend", error);
      // Fallback to default if backend is unavailable
      setPricing(defaultPricing);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePriceItem = (category: keyof PricingState, id: string, field: keyof PriceItem, value: any) => {
    setPricing((prev) => {
      // @ts-ignore
      const updatedCategory = prev[category].map((item: any) => 
        item.id === id 
          ? { ...item, [field]: value } 
          : item
      );
      return { ...prev, [category]: updatedCategory };
    });
  };

  const addPriceItem = (category: 'paket' | 'satuan' | 'pte') => {
    const newItem: PriceItem = {
      id: `${category}_${Date.now()}`,
      name: 'Kelas Baru',
      basePrice: 0,
      discountPercentage: 0
    };
    setPricing((prev) => ({
      ...prev,
      [category]: [...(prev[category] as PriceItem[]), newItem]
    }));
  };

  const removePriceItem = async (category: 'paket' | 'satuan' | 'pte', id: string) => {
    setPricing((prev) => ({
      ...prev,
      [category]: (prev[category] as PriceItem[]).filter(item => item.id !== id)
    }));
    await supabase.from('pricing_items').delete().eq('id', id);
  };

  const savePricing = async () => {
    try {
      const pricingItems = [
        ...pricing.paket.map(p => ({ id: p.id, category: 'paket', name: p.name, base_price: p.basePrice, discount_percentage: p.discountPercentage })),
        ...pricing.satuan.map(p => ({ id: p.id, category: 'satuan', name: p.name, base_price: p.basePrice, discount_percentage: p.discountPercentage })),
        ...pricing.pte.map(p => ({ id: p.id, category: 'pte', name: p.name, base_price: p.basePrice, discount_percentage: p.discountPercentage }))
      ];
      await supabase.from('pricing_items').upsert(pricingItems);
      
      if (pricing.tutors) await supabase.from('tutors').upsert(pricing.tutors);
      if (pricing.schedules) await supabase.from('schedules').upsert(pricing.schedules);
      if (pricing.faqs) await supabase.from('faqs').upsert(pricing.faqs);
      
      if (pricing.testimonials) {
        const mappedTestimonials = pricing.testimonials.map(t => ({
          id: t.id, category: t.category, name: t.name, profession: t.profession, photo: t.photo, rating: t.rating, before: t.before, after: t.after, text: t.text,
          is_approved: t.isApproved
        }));
        await supabase.from('testimonials').upsert(mappedTestimonials);
      }

      if (pricing.centers) await supabase.from('centers').upsert(pricing.centers);
      if (pricing.settings) await supabase.from('settings').upsert({ id: 'global', demo_video_url: pricing.settings.demoVideoUrl });

      alert("Harga dan data berhasil disimpan ke Supabase!");
    } catch (error) {
      console.error("Error saving pricing", error);
      alert("Terjadi kesalahan koneksi ke Supabase.");
    }
  };

  const updateSettings = (key: keyof SettingsState, value: string) => {
    setPricing((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      } as SettingsState
    }));
  };

  // Tutors
  const updateTutor = (id: string, field: keyof TutorItem, value: any) => {
    setPricing((prev) => ({
      ...prev,
      tutors: prev.tutors?.map(tutor => 
        tutor.id === id ? { ...tutor, [field]: value } : tutor
      )
    }));
  };

  const addTutor = () => {
    const newTutor: TutorItem = {
      id: `tutor_${Date.now()}`,
      name: "Tutor Baru",
      photo: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      certifications: ["Sertifikasi Baru"],
      experience: "0 Tahun",
      specialty: "General English",
      achievements: "Belum ada pencapaian."
    };
    setPricing((prev) => ({
      ...prev,
      tutors: [...(prev.tutors || []), newTutor]
    }));
  };

  const removeTutor = async (id: string) => {
    setPricing((prev) => ({
      ...prev,
      tutors: prev.tutors?.filter(tutor => tutor.id !== id)
    }));
    await supabase.from('tutors').delete().eq('id', id);
  };

  // Schedules
  const addSchedule = () => {
    const newSchedule: ScheduleItem = {
      id: `schedule_${Date.now()}`,
      name: "Jadwal Baru"
    };
    setPricing((prev) => ({
      ...prev,
      schedules: [...(prev.schedules || []), newSchedule]
    }));
  };

  const updateSchedule = (id: string, name: string) => {
    setPricing((prev) => ({
      ...prev,
      schedules: prev.schedules?.map(s => 
        s.id === id ? { ...s, name } : s
      )
    }));
  };

  const removeSchedule = async (id: string) => {
    setPricing((prev) => ({
      ...prev,
      schedules: prev.schedules?.filter(s => s.id !== id)
    }));
    await supabase.from('schedules').delete().eq('id', id);
  };

  // FAQs
  const addFAQ = () => {
    const newFAQ: FAQItem = {
      id: `faq_${Date.now()}`,
      q: "Pertanyaan Baru?",
      a: "Jawaban untuk pertanyaan baru..."
    };
    setPricing((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), newFAQ]
    }));
  };

  const updateFAQ = (id: string, field: keyof FAQItem, value: string) => {
    setPricing((prev) => ({
      ...prev,
      faqs: prev.faqs?.map(faq => 
        faq.id === id ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const removeFAQ = async (id: string) => {
    setPricing((prev) => ({
      ...prev,
      faqs: prev.faqs?.filter(faq => faq.id !== id)
    }));
    await supabase.from('faqs').delete().eq('id', id);
  };

  // Testimonials
  const addTestimonial = async (testimonialData: Omit<TestimonialItem, 'id' | 'isApproved'>) => {
    const newTestimonial: TestimonialItem = {
      ...testimonialData,
      id: `testi_${Date.now()}`,
      isApproved: false
    };
    setPricing((prev) => ({
      ...prev,
      testimonials: [newTestimonial, ...(prev.testimonials || [])]
    }));
    
    // Insert to supabase directly so we don't have to wait for owner's save
    const mapped = {
      id: newTestimonial.id, category: newTestimonial.category, name: newTestimonial.name, profession: newTestimonial.profession, photo: newTestimonial.photo, rating: newTestimonial.rating, before: newTestimonial.before, after: newTestimonial.after, text: newTestimonial.text,
      is_approved: false
    };
    await supabase.from('testimonials').insert([mapped]);
    
    alert("Ulasan Anda telah dikirim dan menunggu persetujuan admin!");
  };

  const updateTestimonial = (id: string, field: keyof TestimonialItem, value: any) => {
    setPricing((prev) => ({
      ...prev,
      testimonials: prev.testimonials?.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    }));
  };

  const removeTestimonial = async (id: string) => {
    setPricing((prev) => ({
      ...prev,
      testimonials: prev.testimonials?.filter(t => t.id !== id)
    }));
    await supabase.from('testimonials').delete().eq('id', id);
  };

  // Centers
  const addCenter = () => {
    const newCenter: CenterItem = {
      id: `center_${Date.now()}`,
      name: "Cabang Baru"
    };
    setPricing((prev) => ({
      ...prev,
      centers: [...(prev.centers || []), newCenter]
    }));
  };

  const updateCenter = (id: string, name: string) => {
    setPricing((prev) => ({
      ...prev,
      centers: prev.centers?.map(c => 
        c.id === id ? { ...c, name } : c
      )
    }));
  };

  const removeCenter = async (id: string) => {
    setPricing((prev) => ({
      ...prev,
      centers: prev.centers?.filter(c => c.id !== id)
    }));
    await supabase.from('centers').delete().eq('id', id);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading image", uploadError);
      return null;
    }

    const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const calculateFinalPrice = (basePrice: number, discountPercentage: number) => {
    return basePrice - (basePrice * (discountPercentage / 100));
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return { 
    pricing, isLoading, 
    updatePriceItem, addPriceItem, removePriceItem, updateSettings, 
    updateTutor, addTutor, removeTutor, 
    addSchedule, updateSchedule, removeSchedule,
    addFAQ, updateFAQ, removeFAQ,
    addTestimonial, updateTestimonial, removeTestimonial,
    addCenter, updateCenter, removeCenter,
    uploadImage, savePricing, calculateFinalPrice, formatRupiah 
  };
};
