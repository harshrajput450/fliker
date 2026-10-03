import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30 pb-12">
      <Navbar />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl space-y-8">
          <div className="border-b border-white/10 pb-6">
            <span className="text-xs uppercase tracking-widest text-[#D6A85C] font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D6A85C]" />
              Terms of Service
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Terms of Use & Community Integrity
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Effective Date: October 2026 • CUPID Matchmaking Platform
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-white/80 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#C94B6A]" />
                1. 18+ Mandatory Membership Agreement
              </h2>
              <p>
                By accessing CUPID, you certify under penalty of law that you are at least 18 years of age. CUPID reserves the right to terminate accounts instantly if underage status or fraudulent age documentation is identified.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#4F8A70]" />
                2. Prototype Match Pass Payment & Order Terms
              </h2>
              <p>
                CUPID operates on a transparent Match Pass model (Female ₹1, Male ₹99). All payments are processed via Razorpay and verified on backend servers using HMAC SHA256 cryptographic signatures. A Match Pass grants access to up to 2 curated matches based on compatibility.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D6A85C]" />
                3. No Endless Swiping Guarantee
              </h2>
              <p>
                CUPID is intentionally NOT an infinite swipe platform. Users receive curated matches. If no compatible 18+ candidate meeting hard age-gap criteria is found, CUPID displays "Cupid is still looking..." rather than generating artificial recommendations.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};
