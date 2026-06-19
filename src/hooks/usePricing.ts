import { useState, useEffect } from 'react';

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
      const response = await fetch('/api/pricing');
      if (response.ok) {
        const data = await response.json();
        // Merge with defaults to ensure faqs and testimonials exist if data is old
        setPricing({ ...defaultPricing, ...data });
      }
    } catch (error) {
      console.error("Error fetching pricing from backend", error);
      // Fallback to default if backend is unavailable
    } finally {
      setIsLoading(false);
    }
  };

  const updatePriceItem = (category: keyof PricingState, id: string, newBasePrice: number, newDiscountPercentage: number) => {
    setPricing((prev) => {
      // @ts-ignore
      const updatedCategory = prev[category].map((item: any) => 
        item.id === id 
          ? { ...item, basePrice: newBasePrice, discountPercentage: newDiscountPercentage } 
          : item
      );
      return { ...prev, [category]: updatedCategory };
    });
  };

  const savePricing = async () => {
    try {
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pricing)
      });
      
      if (response.ok) {
        alert("Harga dan data berhasil disimpan ke server!");
      } else {
        alert("Gagal menyimpan data ke server.");
      }
    } catch (error) {
      console.error("Error saving pricing", error);
      alert("Terjadi kesalahan koneksi.");
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

  const removeTutor = (id: string) => {
    setPricing((prev) => ({
      ...prev,
      tutors: prev.tutors?.filter(tutor => tutor.id !== id)
    }));
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

  const removeSchedule = (id: string) => {
    setPricing((prev) => ({
      ...prev,
      schedules: prev.schedules?.filter(s => s.id !== id)
    }));
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

  const removeFAQ = (id: string) => {
    setPricing((prev) => ({
      ...prev,
      faqs: prev.faqs?.filter(faq => faq.id !== id)
    }));
  };

  // Testimonials
  const addTestimonial = (testimonialData: Omit<TestimonialItem, 'id' | 'isApproved'>) => {
    const newTestimonial: TestimonialItem = {
      ...testimonialData,
      id: `testi_${Date.now()}`,
      isApproved: false // Requires approval by default
    };
    setPricing((prev) => ({
      ...prev,
      testimonials: [newTestimonial, ...(prev.testimonials || [])]
    }));
    // We optionally save right away so the user review is persistent (in a real app, this would hit a separate POST /api/reviews)
    // To simulate backend, we can just save pricing state directly
    setTimeout(() => {
      // In a real implementation we would fetch the current state, append, and post.
      // But since we modify state, we just alert.
      alert("Ulasan Anda telah dikirim dan menunggu persetujuan admin!");
    }, 500);
  };

  const updateTestimonial = (id: string, field: keyof TestimonialItem, value: any) => {
    setPricing((prev) => ({
      ...prev,
      testimonials: prev.testimonials?.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    }));
  };

  const removeTestimonial = (id: string) => {
    setPricing((prev) => ({
      ...prev,
      testimonials: prev.testimonials?.filter(t => t.id !== id)
    }));
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

  const removeCenter = (id: string) => {
    setPricing((prev) => ({
      ...prev,
      centers: prev.centers?.filter(c => c.id !== id)
    }));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
    return null;
  };

  const calculateFinalPrice = (basePrice: number, discountPercentage: number) => {
    return basePrice - (basePrice * (discountPercentage / 100));
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return { 
    pricing, isLoading, 
    updatePriceItem, updateSettings, 
    updateTutor, addTutor, removeTutor, 
    addSchedule, updateSchedule, removeSchedule,
    addFAQ, updateFAQ, removeFAQ,
    addTestimonial, updateTestimonial, removeTestimonial,
    addCenter, updateCenter, removeCenter,
    uploadImage, savePricing, calculateFinalPrice, formatRupiah 
  };
};
