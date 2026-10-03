import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, CreditCard, AlertCircle, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setPaymentSuccess } = useAuth();

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingText, setLoadingText] = useState('');

  const isFemale = user?.gender === 'female';
  const amountINR = isFemale ? 1 : 99;

  const handleInitiatePayment = async () => {
    setPaymentStatus('pending');
    setErrorMessage('');
    setLoadingText('Creating Razorpay order on backend...');

    try {
      // 1. Backend Order Creation
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'demo_user',
          gender: user?.gender || 'female',
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create payment order');

      // 2. Open Razorpay Modal or Mock Handler
      if (window.Razorpay && !orderData.isMock) {
        setLoadingText('Opening secure Razorpay modal...');
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'CUPID Match Pass',
          description: `Prototype Match Pass (${isFemale ? 'Female' : 'Male'})`,
          image: 'https://db.onlinewebfonts.com/t/a64ff11d2c24584c767f6257e880dc65.svg',
          order_id: orderData.orderId,
          handler: async (response: any) => {
            await verifyOnBackend(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: user?.fullName,
            email: user?.email,
          },
          theme: {
            color: '#C94B6A',
          },
          modal: {
            ondismiss: () => {
              setPaymentStatus('failed');
              setErrorMessage("Payment wasn't completed. Try again.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback / Development Mode Verification Simulation
        setLoadingText('Verifying order signature on backend server...');
        setTimeout(async () => {
          await verifyOnBackend(
            orderData.orderId,
            `pay_mock_${Date.now()}`,
            'mock_valid_signature'
          );
        }, 1200);
      }
    } catch (err: any) {
      setPaymentStatus('failed');
      setErrorMessage(err.message || "Payment wasn't completed. Try again.");
    }
  };

  const verifyOnBackend = async (orderId: string, paymentId: string, signature: string) => {
    setLoadingText('Performing backend cryptographic verification...');
    try {
      const verifyRes = await fetch('/api/payment/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, paymentId, signature }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.verified) {
        setPaymentStatus('success');
        setPaymentSuccess(orderId, amountINR);
        setTimeout(() => {
          navigate('/matching');
        }, 1000);
      } else {
        setPaymentStatus('failed');
        setErrorMessage(verifyData.message || "Payment wasn't completed. Try again.");
      }
    } catch (err: any) {
      setPaymentStatus('failed');
      setErrorMessage("Payment wasn't completed. Try again.");
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30">
      <Navbar />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C94B6A] to-[#5A1024] mx-auto flex items-center justify-center shadow-lg shadow-[#C94B6A]/30 mb-3">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Razorpay Match Pass</h1>
            <p className="text-xs text-white/60 mt-1">
              Secure payment verification required before matchmaking
            </p>
          </div>

          {/* Payment Card Details */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-white/60">Pass Type</span>
              <span className="font-semibold text-white uppercase">
                {isFemale ? 'Female Match Pass' : 'Male Match Pass'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-white/60">Amount</span>
              <span className="font-bold text-lg text-[#D6A85C]">₹{amountINR}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-white/60">Matches Included</span>
              <span className="font-semibold text-[#4F8A70]">Max 2 Curated Matches</span>
            </div>
          </div>

          {/* Payment Failed Message Banner */}
          {paymentStatus === 'failed' && (
            <div className="p-4 rounded-2xl bg-[#B94A5C]/20 border border-[#B94A5C]/50 text-xs text-[#FFF9F5] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#B94A5C]">
                <AlertCircle className="w-4 h-4" />
                <span>Payment Wasn't Completed</span>
              </div>
              <p className="text-white/80">{errorMessage}</p>
            </div>
          )}

          {/* Status Actions */}
          {paymentStatus === 'pending' ? (
            <div className="py-6 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#C94B6A] animate-spin mx-auto" />
              <p className="text-xs text-white/80 font-medium">{loadingText}</p>
            </div>
          ) : paymentStatus === 'success' ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#4F8A70] mx-auto animate-bounce" />
              <p className="text-sm font-bold text-white">Payment Verified by Server!</p>
              <p className="text-xs text-white/70">Initiating CUPID matchmaking engine...</p>
            </div>
          ) : (
            <button
              onClick={handleInitiatePayment}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C94B6A] to-[#D6A85C] hover:from-[#d85877] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              {paymentStatus === 'failed' ? 'Retry Payment (₹' + amountINR + ')' : 'Pay ₹' + amountINR + ' via Razorpay'}
            </button>
          )}

          <div className="pt-3 border-t border-white/10 text-center">
            <span className="text-[10px] text-white/40 uppercase tracking-widest flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Server-Side HMAC SHA256 Signature Verification Enforced
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
