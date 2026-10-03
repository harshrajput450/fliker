import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sliders,
  Scale,
} from 'lucide-react';
import { HeartParticlesCanvas } from '../components/3d/HeartParticlesCanvas';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="relative w-full min-h-[115vh] overflow-x-hidden flex flex-col items-center font-sans selection:bg-white/20 selection:text-white pb-12">
      {/* Subtle Peripheral Stardust Canvas Layer z-[2] (Center 50% Viewport Kept 100% Clear) */}
      <HeartParticlesCanvas variant="hero" />

      {/* Top Navbar Layer z-10 */}
      <div className="w-full relative z-10">
        <Navbar />
      </div>

      {/* --- TOP HERO SECTION (Shifted High Up Near Top Header) --- */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 flex flex-col items-center text-center">
        {/* Centered Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass border border-white/20 text-xs font-semibold text-[#D4D4D8] mb-4 shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#4F8A70] animate-pulse" />
          <span className="text-white font-medium">Strictly 18+ Verified Platform</span>
          <span className="text-white/30">•</span>
          <span className="text-[#D6A85C] font-semibold">100% Free Access</span>
        </motion.div>

        {/* Hero Title: High-Contrast Pure White Sans-Serif Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-5xl"
        >
          Stop Swiping. Start Connecting.
        </motion.h1>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base md:text-lg text-[#D4D4D8] max-w-2xl leading-relaxed font-light"
        >
          CUPID finds meaningful compatibility through personality, core values, lifestyle, and shared interests. Curating a maximum of <strong className="text-white font-medium">2 matches</strong>.
        </motion.p>

        {/* Compact CTA Row Placed Directly Beneath Top Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/onboarding')}
            className="px-7 py-3 rounded-full bg-white text-black hover:bg-white/90 font-extrabold text-xs sm:text-sm tracking-wide shadow-2xl flex items-center gap-2 transition-all hover:scale-105"
          >
            Find My Match (Free)
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <a
            href="#how-it-works"
            className="px-6 py-3 rounded-full liquid-glass text-white font-medium text-xs sm:text-sm hover:bg-white/10 transition-all border border-white/20"
          >
            How CUPID Works
          </a>
        </motion.div>
      </section>

      {/* --- MIDDLE 50% VERTICAL VIEWPORT (COMPLETELY EMPTY & 100% CLEAR FOR COSMIC VIDEO BACKGROUND) --- */}
      <div className="w-full h-[45vh] sm:h-[50vh] pointer-events-none relative z-10" />

      {/* --- BOTTOM FROSTED GLASS DOCK PANEL & FEATURES --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Trust Metrics Dock Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto liquid-glass rounded-3xl p-6 border border-white/20 shadow-2xl bg-[#0F111A]/40 backdrop-blur-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            <div className="pt-3 md:pt-0 md:px-4 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#D6A85C] mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm sm:text-base">Maximum 2 Curated Matches</span>
              <span className="text-xs text-[#A1A1AA] mt-0.5">No endless swiping or public feeds</span>
            </div>

            <div className="pt-3 md:pt-0 md:px-4 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#4F8A70] mb-2">
                <Lock className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm sm:text-base">Instagram Private by Default</span>
              <span className="text-xs text-[#A1A1AA] mt-0.5">Revealed only on mutual consent</span>
            </div>

            <div className="pt-3 md:pt-0 md:px-4 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm sm:text-base">Available at No Cost</span>
              <span className="text-xs text-[#A1A1AA] mt-0.5">100% Free 18+ verification platform</span>
            </div>
          </div>
        </motion.div>

        {/* --- HOW CUPID WORKS --- */}
        <section
          id="how-it-works"
          className="scroll-mt-24 pt-12"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D6A85C] font-semibold">
              Intuitive Matchmaking Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
              How CUPID Works
            </h2>
            <p className="text-[#A1A1AA] mt-4 text-sm sm:text-base">
              Four deliberate steps designed to eliminate dating fatigue and connect you with compatible partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Create Your Profile',
                desc: 'Provide your basic details, location, bio, and verify your 18+ age status for a safe community environment.',
                icon: Users,
              },
              {
                num: '02',
                title: 'Tell CUPID What Matters',
                desc: 'Complete our short personality quiz covering communication styles, core values, lifestyle, and dealbreakers.',
                icon: Sliders,
              },
              {
                num: '03',
                title: 'CUPID Finds Compatibility',
                desc: 'Our engine applies hard age-gap filters and weighs 40% Personality, 30% Values, and 30% Shared Interests.',
                icon: Sparkles,
              },
              {
                num: '04',
                title: 'Meet Your Curated Matches',
                desc: 'Receive maximum 2 curated compatibility matches with detailed match breakdown and why you connected.',
                icon: Sparkles,
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="liquid-glass rounded-3xl p-8 flex flex-col justify-between border border-white/15 hover:border-white/40 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-extrabold text-[#D6A85C] font-mono">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#07070A] transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* --- WHY CUPID --- */}
        <section id="why-cupid" className="scroll-mt-24 pt-12">
          <div className="liquid-glass rounded-3xl p-8 md:p-14 border border-white/15 bg-[#0F111A]/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D6A85C] font-semibold">
                  The CUPID Difference
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 leading-tight">
                  Built for Intentional Relationships, Not Endless Swiping.
                </h2>
                <p className="text-[#A1A1AA] mt-4 text-sm sm:text-base leading-relaxed">
                  Traditional dating apps keep you hooked on endless feeds, promoting superficial judgment over genuine chemistry. CUPID takes a different path.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    'Personality-first matching algorithm',
                    'Core values & lifestyle alignment',
                    'Shared activities and interests breakdown',
                    'Curated maximum 2 matches at a time',
                    'No public profile browsing or swipe feeds',
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-white/90">
                      <CheckCircle2 className="w-5 h-5 text-[#4F8A70] flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Glass Card Display */}
              <div className="relative flex justify-center">
                <div className="w-full max-w-md liquid-glass rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                      alt="Sample Match"
                      className="w-16 h-16 rounded-2xl object-cover border border-white/30"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-white flex items-center gap-2">
                        Aria Vane, 25
                        <span className="text-xs bg-[#4F8A70]/20 text-[#4F8A70] px-2 py-0.5 rounded-full border border-[#4F8A70]/30 font-medium">
                          96.5% Match
                        </span>
                      </h4>
                      <p className="text-xs text-[#A1A1AA]">Architect • Mumbai, MH</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-[#A1A1AA]">Personality Vibe</span>
                      <span className="text-white font-semibold">95.0%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#D6A85C] h-full w-[95%]" />
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-[#A1A1AA]">Core Values</span>
                      <span className="text-[#D6A85C] font-semibold">96.0%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#D6A85C] h-full w-[96%]" />
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-xs text-white/80">
                    <span className="text-[#D6A85C] font-medium block mb-1">Why You Matched:</span>
                    "Shared foundational values in Personal Growth & Radical Honesty with matching deep-listener communication style."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- AI COMPATIBILITY SECTION --- */}
        <section
          id="compatibility"
          className="scroll-mt-24 pt-12"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D6A85C] font-semibold">
              Transparent Matching Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
              Public Compatibility Model
            </h2>
            <p className="text-[#A1A1AA] mt-4 text-sm sm:text-base">
              We believe matchmaking should be transparent. Here is how CUPID evaluates chemistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personality / Vibe',
                weight: '40%',
                desc: 'Communication style, social energy (extrovert/introvert/ambivert), emotional dynamics, and conversational rhythm.',
              },
              {
                title: 'Core Values & Lifestyle',
                weight: '30%',
                desc: 'Radical honesty, personal growth, family commitment, healthy autonomy, early bird vs night owl daily routines.',
              },
              {
                title: 'Shared Interests',
                weight: '30%',
                desc: 'Specialty coffee, literature, hiking, indie music, cinema analysis, culinary arts, and active weekend adventures.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="liquid-glass rounded-3xl p-8 border border-white/15 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <span className="text-2xl font-extrabold text-[#D6A85C]">
                      {item.weight}
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-[#D6A85C] mb-6" />
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Age-Gap Hard Filter Notice */}
          <div className="mt-8 liquid-glass rounded-2xl p-6 border border-white/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#D6A85C] flex-shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">
                Hard Age-Gap Integrity Filter
              </h4>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Age-gap eligibility is an absolute hard filter, not merely a percentage weight. CUPID enforces strict 18+ verification and limits age differences to approximately 2–3 years based on partner preferences to guarantee authentic life-stage compatibility.
              </p>
            </div>
          </div>
        </section>

        {/* --- PRICING / FREE ACCESS SECTION --- */}
        <section
          id="pricing"
          className="scroll-mt-24 pt-12"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D6A85C] font-semibold">
              Available at No Cost
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
              Free Match Pass Access
            </h2>
            <p className="text-[#A1A1AA] mt-4 text-sm sm:text-base">
              CUPID provides full access to curated matchmaking for all 18+ verified profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Female Match Pass */}
            <div className="liquid-glass rounded-3xl p-8 border border-white/15 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-white text-[#07070A] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
                100% Free
              </div>
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-[#D6A85C]">
                  Female Member
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">₹0</span>
                  <span className="text-xs text-[#A1A1AA]">/ Free Access</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-3">
                  Nominal verification pass included for community safety and authentic profile matching.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                    2 Curated Compatibility Matches
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                    Full Personality & Values Breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                    Private Consent-First Social Reveal
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/onboarding')}
                className="mt-8 w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 font-extrabold text-sm transition-all shadow-lg"
              >
                Get Free Match Pass
              </button>
            </div>

            {/* Male Match Pass */}
            <div className="liquid-glass rounded-3xl p-8 border border-white/15 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-white text-[#07070A] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
                100% Free
              </div>
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-[#D6A85C]">
                  Male Member
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">₹0</span>
                  <span className="text-xs text-[#A1A1AA]">/ Free Access</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-3">
                  Access curated high-compatibility matches with strict age-gap and intent integrity.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                    2 Curated Compatibility Matches
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                    Full Personality & Values Breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4F8A70]" />
                    Backend Verified Razorpay Signature
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/onboarding')}
                className="mt-8 w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 font-extrabold text-sm transition-all shadow-lg"
              >
                Get Free Match Pass
              </button>
            </div>
          </div>
        </section>

        {/* --- PRIVACY & TRUST SECTION --- */}
        <section className="pt-12">
          <div className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-[#D6A85C] flex-shrink-0">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Strict Privacy & Consent First
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-xl">
                  Social handles (Instagram IDs) remain completely private by default. They are never exposed publicly or returned through search APIs. Contact details are only shared after mutual consent.
                </p>
              </div>
            </div>

            <Link
              to="/privacy"
              className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-semibold hover:bg-white/10 transition-colors flex-shrink-0"
            >
              Read Safety Policy
            </Link>
          </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="pt-12 text-center">
          <div className="liquid-glass rounded-3xl p-10 md:p-16 border border-white/15 bg-[#0F111A]/60">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Ready to find genuine compatibility?
            </h2>
            <p className="text-[#A1A1AA] mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Join CUPID today. Complete your profile and discover your 2 curated matches.
            </p>
            <button
              onClick={() => navigate('/onboarding')}
              className="mt-8 px-10 py-4 rounded-full bg-white text-black font-extrabold text-base shadow-2xl hover:scale-105 transition-transform"
            >
              Find My Match Now (Free)
            </button>
          </div>
        </section>
      </div>

      {/* --- LIQUID GLASS FOOTER --- */}
      <Footer />
    </main>
  );
};
