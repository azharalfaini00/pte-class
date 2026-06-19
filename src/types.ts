export interface ClassItem {
  id: string;
  title: string;
  category: 'general' | 'exam' | 'business' | 'kids';
  level: string; // e.g. Beginner (A1), Intermediate (B1), etc.
  duration: string; // e.g. 3 Bulan
  price: number; // in Rupiah
  originalPrice?: number; // for promo visual
  discountBadge?: string; // e.g. "Diskon 15%"
  isBestSeller?: boolean;
  features: string[];
  description: string;
  image: string; // Stock photo identifier or visual theme representation
  rating: number;
  totalReviews: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string; // e.g., "Karyawan Swasta", "Mahasiswa"
  score: number; // 1-5
  text: string;
  avatar: string; // Initials or beautiful colors
  classCategory: 'general' | 'exam' | 'business' | 'kids';
}

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  classId: string;
  level: string;
  sessionTime: 'pagi' | 'siang' | 'sore' | 'malam';
  notes?: string;
  createdAt: string;
  status: 'pending' | 'terkonfirmasi';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
