import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { HeartParticlesCanvas } from '../components/3d/HeartParticlesCanvas';
import { Navbar } from '../components/Navbar';

const ANIMATION_STEPS = [
  'CUPID is getting to know your vibe…',
  'Looking for meaningful compatibility…',
  'Finding your connection…',
  "IT'S A MATCH ♥",
];

export const MatchingAnimationPage: React.FC = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 1600);
    const timer2 = setTimeout(() => setStepIndex(2), 3200);
    const timer3 = setTimeout(() => {
      setStepIndex(3);
      // Trigger romantic champagne & rose pink confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C94B6A', '#D6A85C', '#FFF9F5', '#5A1024'],
      });
    }, 4800);

    const timer4 = setTimeout(() => {
      navigate('/matches');
    }, 6800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30 overflow-hidden">
      <HeartParticlesCanvas variant="reveal" />
      <Navbar />

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        {/* Animated Glowing Heart */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#C94B6A] via-[#D6A85C] to-[#5A1024] flex items-center justify-center shadow-2xl shadow-[#C94B6A]/50 mb-10"
        >
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-white" />
          <div className="absolute -inset-2 rounded-full bg-[#C94B6A]/30 blur-lg -z-10 animate-pulse" />
        </motion.div>

        {/* Dynamic Text Messages */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-3xl p-8 border border-white/20 shadow-2xl w-full"
          >
            {stepIndex === 3 ? (
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFF9F5] text-glow tracking-wider">
                  IT'S A MATCH ♥
                </h1>
                <p className="text-sm text-[#D6A85C] font-medium flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Your curated compatibility matches are ready!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {ANIMATION_STEPS[stepIndex]}
                </h2>
                <div className="w-48 mx-auto bg-white/10 h-1.5 rounded-full overflow-hidden mt-4">
                  <div
                    className="bg-gradient-to-r from-[#C94B6A] to-[#D6A85C] h-full transition-all duration-1000"
                    style={{ width: `${((stepIndex + 1) / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4 text-center text-[10px] text-white/40 uppercase tracking-widest z-10">
        CUPID — AI Compatibility Engine
      </div>
    </main>
  );
};
