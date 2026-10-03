import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, isLoading } = useAuth();

  const target = location.state?.email || location.state?.phone || 'your account';
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    const success = await verifyOtp(code);
    if (success) {
      navigate('/onboarding');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 5000);
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30">
      <Navbar />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-3xl p-8 border border-white/10 shadow-2xl text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#4F8A70]/20 border border-[#4F8A70]/40 mx-auto flex items-center justify-center text-[#4F8A70] mb-4">
            <KeyRound className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-white">Verification Code</h1>
          <p className="text-xs text-white/70 mt-1">
            We sent a 6-digit security code to <strong className="text-white">{target}</strong>
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-[#B94A5C]/20 border border-[#B94A5C]/50 text-xs text-[#FFF9F5]">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="mt-8 space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#C94B6A] focus:ring-1 focus:ring-[#C94B6A]"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C94B6A] to-[#5A1024] text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2 hover:from-[#d85877] transition-all"
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-white/60 pt-4 border-t border-white/10">
            <span>Didn't receive code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resent}
              className="text-[#C94B6A] font-semibold hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${resent ? 'animate-spin' : ''}`} />
              {resent ? 'Code Sent!' : 'Resend OTP'}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="p-4 text-center text-[10px] text-white/40 uppercase tracking-widest z-10">
        CUPID — 18+ Mandatory Security Layer
      </div>
    </main>
  );
};
