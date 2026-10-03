import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { LuminaFooter } from '../components/LuminaFooter';

export const LuminaPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <main className="relative w-full min-h-[115vh] overflow-x-hidden flex flex-col items-center font-sans selection:bg-white/20 selection:text-white">
      {/* Fixed CloudFront Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[0] pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4"
      />

      {/* Dark Translucent Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[1] pointer-events-none" />

      {/* Main Content & Hero Section */}
      <div className="relative z-10 w-full max-w-7xl px-6 pt-16 pb-12 flex flex-col items-center flex-grow min-h-screen justify-between">
        {/* Top Header Badge & Navigation */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-medium text-white text-base tracking-wider">LUMINA</span>
          </div>

          <div className="text-xs tracking-widest text-white/70 uppercase">
            Curated Cosmic Insight
          </div>
        </div>

        {/* Center Hero Section */}
        <div className="flex flex-col items-center text-center my-auto py-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-medium text-white/80 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D6A85C]" />
            <span>Cosmic Clarity Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight"
          >
            Pure Insight. Zero Noise.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-white/75 max-w-xl font-light leading-relaxed"
          >
            Discover high-fidelity intelligence on planetary dynamics, cosmic events, and global shifts — delivered with absolute transparency.
          </motion.p>

          {/* Interactive Pill Email Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 w-full max-w-md"
          >
            {submitted ? (
              <div className="liquid-glass rounded-full p-4 flex items-center justify-center gap-2 text-sm text-[#4F8A70] font-semibold border border-[#4F8A70]/40">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are subscribed to Lumina Cosmic Insights.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="liquid-glass rounded-full p-1.5 flex items-center justify-between border border-white/20 shadow-2xl"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your favorite email?"
                  required
                  className="bg-transparent pl-5 pr-3 py-2 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs tracking-wider uppercase hover:bg-white/90 transition-all flex-shrink-0 flex items-center gap-1"
                >
                  STAY NOTIFIED
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Animated Liquid Glass Footer */}
        <LuminaFooter />
      </div>
    </main>
  );
};
