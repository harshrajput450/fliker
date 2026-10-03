import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShieldCheck, Lock, EyeOff, UserCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30 pb-12">
      <Navbar />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl space-y-8">
          <div className="border-b border-white/10 pb-6">
            <span className="text-xs uppercase tracking-widest text-[#D6A85C] font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4F8A70]" />
              Trust & Data Governance
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Privacy Policy & 18+ Safety Notice
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Effective Date: October 2026 • Version 1.0
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-white/80 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#C94B6A]" />
                1. Mandatory 18+ Age Eligibility Policy
              </h2>
              <p>
                CUPID is exclusively strictly an 18+ platform. Underage individuals (under 18 years of age) are prohibited from creating profiles, submitting payment, or participating in matchmaking. We enforce age validation algorithms and hard filters to ensure full regulatory compliance and community integrity.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-[#D6A85C]" />
                2. Private Social Information Protection
              </h2>
              <p>
                Your Instagram handle and sensitive contact parameters are never exposed publicly, nor are they accessible via public discovery APIs. Social media usernames are disclosed strictly to confirmed, mutually-consented compatibility matches after explicit authorization.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#4F8A70]" />
                3. Data Storage & Row Level Security (RLS)
              </h2>
              <p>
                All personal data, quiz responses, and payment records are encrypted at rest and stored in PostgreSQL with strict Row Level Security (RLS) policies. Users have complete control to request full account and data deletion at any time from their Account Dashboard.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};
