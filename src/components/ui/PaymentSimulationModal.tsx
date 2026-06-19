import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Wallet, Building2, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface PaymentSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  studentId: string;
  amount: number;
  itemName: string;
}

export const PaymentSimulationModal: React.FC<PaymentSimulationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  studentId,
  amount,
  itemName
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessLocal, setIsSuccessLocal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('qris');

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const res = await fetch('/api/payment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId })
      });

      if (res.ok) {
        setIsSuccessLocal(true);
        setTimeout(() => {
          onSuccess();
          setIsSuccessLocal(false);
        }, 2000);
      } else {
        alert("Simulasi pembayaran gagal.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  PTE
                </div>
                <span className="font-bold text-slate-800">Secure Payment</span>
              </div>
              {!isProcessing && !isSuccessLocal && (
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccessLocal ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Pembayaran Berhasil!</h3>
                  <p className="text-slate-500">Terima kasih, pendaftaran kelas Anda telah aktif.</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <p className="text-sm text-slate-500 mb-1">Total Tagihan</p>
                    <h2 className="text-3xl font-bold text-slate-800">{formatRupiah(amount)}</h2>
                    <p className="text-sm font-medium text-blue-600 bg-blue-50 py-1 px-3 rounded-full inline-block mt-2">
                      {itemName}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <p className="text-sm font-bold text-slate-700">Pilih Metode Pembayaran</p>
                    
                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedMethod === 'qris' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-200'}`}>
                      <input type="radio" name="paymentMethod" checked={selectedMethod === 'qris'} onChange={() => setSelectedMethod('qris')} className="hidden" />
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm">QRIS / E-Wallet</p>
                        <p className="text-xs text-slate-500">Gopay, OVO, Dana, ShopeePay</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'qris' ? 'border-blue-500' : 'border-slate-300'}`}>
                        {selectedMethod === 'qris' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedMethod === 'va' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-200'}`}>
                      <input type="radio" name="paymentMethod" checked={selectedMethod === 'va'} onChange={() => setSelectedMethod('va')} className="hidden" />
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm">Virtual Account</p>
                        <p className="text-xs text-slate-500">BCA, Mandiri, BNI, BRI</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'va' ? 'border-blue-500' : 'border-slate-300'}`}>
                        {selectedMethod === 'va' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedMethod === 'cc' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-200'}`}>
                      <input type="radio" name="paymentMethod" checked={selectedMethod === 'cc'} onChange={() => setSelectedMethod('cc')} className="hidden" />
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm">Kartu Kredit / Debit</p>
                        <p className="text-xs text-slate-500">Visa, Mastercard, JCB</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'cc' ? 'border-blue-500' : 'border-slate-300'}`}>
                        {selectedMethod === 'cc' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                      </div>
                    </label>
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full py-3 shadow-lg" 
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Memproses...
                      </span>
                    ) : (
                      `Bayar Sekarang`
                    )}
                  </Button>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <CreditCard className="w-4 h-4" />
                    <span>Pembayaran dijamin aman dan terenkripsi.</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
