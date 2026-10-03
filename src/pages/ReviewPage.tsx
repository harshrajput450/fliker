import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Sparkles, Heart, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isFemale = user?.gender === 'female';
  const amountINR = isFemale ? 1 : 99;

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30">
      <Navbar />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-3xl p-8 border border-white/10 shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D6A85C] to-[#5A1024] mx-auto flex items-center justify-center shadow-lg shadow-[#D6A85C]/30 mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Profile Verified & Approved</h1>
            <p className="text-xs text-white/70 mt-1">
              Your profile is 100% complete and meets CUPID's 18+ compatibility standards.
            </p>
          </div>

          {/* Validation Checklist */}
          <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10 text-xs">
            <div className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                18+ Mandatory Verification
              </span>
              <span className="text-[#4F8A70] font-semibold">Passed</span>
            </div>
            <div className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                Personality & Values Assessment
              </span>
              <span className="text-[#4F8A70] font-semibold">Complete</span>
            </div>
            <div className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                Age-Gap Integrity Check (2-3 Yrs Limit)
              </span>
              <span className="text-[#4F8A70] font-semibold">Enforced</span>
            </div>
          </div>

          {/* Match Pass Summary Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#5A1024]/60 via-[#2B0813] to-[#2B0813] border border-[#C94B6A]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#D6A85C]">
                CUPID Prototype Match Pass
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-1">
                ₹{amountINR} <span className="text-xs text-white/60 font-normal">One-Time Pass</span>
              </h3>
              <p className="text-xs text-white/70 mt-2 max-w-sm">
                Unlocks up to 2 curated high-compatibility matches with personality breakdowns & match explanations.
              </p>
            </div>

            <button
              onClick={() => navigate('/payment')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C94B6A] to-[#D6A85C] hover:scale-105 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 flex-shrink-0 transition-transform"
            >
              Unlock Match Pass (₹{amountINR})
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/50 justify-center">
            <Lock className="w-3.5 h-3.5" />
            <span>Secured via Razorpay cryptographic server signature verification</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
