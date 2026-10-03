import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  User,
  Sparkles,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Compass,
  BookOpen,
  Activity,
  Smile,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

const STEPS = [
  '01 Basic Info',
  '02 About You',
  '03 Personality',
  '04 Lifestyle',
  '05 Values',
  '06 Interests',
  '07 Social',
  '08 Preferences',
  '09 Review',
];

const AVAILABLE_INTERESTS = [
  'Specialty Coffee',
  'Literature & Books',
  'Hiking & Nature',
  'Culinary Arts',
  'Modern Art & Galleries',
  'Indie & Live Music',
  'Cultural Travel',
  'Wellness & Fitness',
  'Cinema & Film Analysis',
  'Tech & Future Trends',
];

const AVAILABLE_VALUES = [
  'Radical Honesty',
  'Personal Growth',
  'Family & Community',
  'Ambition & Drive',
  'Empathy & Kindness',
  'Healthy Autonomy',
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile, updatePartnerPreferences } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);

  // Form State initialized from Auth Context user
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    dob: user?.dob || '1999-05-20',
    age: user?.age || 25,
    gender: user?.gender || 'female',
    location: user?.location || 'Mumbai, MH',
    photoUrl: user?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    bio: user?.bio || 'Passionate about architectural design, indie films, specialty coffee, and long conversations.',
    communicationStyle: user?.communicationStyle || 'deep_listener',
    socialEnergy: user?.socialEnergy || 'ambivert',
    lifestyle: user?.lifestyle || 'early_bird',
    coreValues: user?.coreValues || ['Personal Growth', 'Radical Honesty'],
    interests: user?.interests || ['Specialty Coffee', 'Literature & Books', 'Indie & Live Music'],
    instagramHandle: user?.instagramHandle || '@aria_vane',
    preferredGender: user?.partnerPreferences?.preferredGender || 'male',
    minAge: user?.partnerPreferences?.minAge || 22,
    maxAge: user?.partnerPreferences?.maxAge || 28,
    maxAgeGap: user?.partnerPreferences?.maxAgeGap || 3,
    locationPref: user?.partnerPreferences?.locationPref || 'no_preference',
    intention: user?.partnerPreferences?.intention || 'long_term',
    dealbreakers: user?.partnerPreferences?.dealbreakers || ['smoking'],
  });

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: 'coreValues' | 'interests' | 'dealbreakers', item: string) => {
    setFormData((prev) => {
      const arr = prev[key] as string[];
      const exists = arr.includes(item);
      const newArr = exists ? arr.filter((i) => i !== item) : [...arr, item];
      return { ...prev, [key]: newArr };
    });
  };

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let score = 0;
    if (formData.fullName) score += 10;
    if (formData.dob && formData.age >= 18) score += 10;
    if (formData.photoUrl) score += 15;
    if (formData.bio && formData.bio.length > 15) score += 15;
    if (formData.communicationStyle && formData.socialEnergy) score += 15;
    if (formData.coreValues.length >= 2) score += 15;
    if (formData.interests.length >= 3) score += 20;
    return Math.min(score, 100);
  };

  const completionPct = calculateCompletion();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Save all information and move to Review & Payment Pass
      updateProfile({
        fullName: formData.fullName,
        dob: formData.dob,
        age: formData.age,
        gender: formData.gender as any,
        location: formData.location,
        photoUrl: formData.photoUrl,
        bio: formData.bio,
        communicationStyle: formData.communicationStyle,
        socialEnergy: formData.socialEnergy,
        lifestyle: formData.lifestyle,
        coreValues: formData.coreValues,
        interests: formData.interests,
        instagramHandle: formData.instagramHandle,
        is18Plus: true,
        isProfileComplete: completionPct >= 90,
        completionPercentage: completionPct,
      });

      updatePartnerPreferences({
        preferredGender: formData.preferredGender,
        minAge: formData.minAge,
        maxAge: formData.maxAge,
        maxAgeGap: formData.maxAgeGap,
        locationPref: formData.locationPref,
        intention: formData.intention,
        dealbreakers: formData.dealbreakers,
      });

      navigate('/review');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30">
      <Navbar />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar Container */}
        <div className="liquid-glass rounded-2xl p-4 sm:p-6 mb-8 border border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
            <span className="font-bold text-[#D6A85C] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C94B6A]" />
              {STEPS[currentStep]}
            </span>
            <span className="text-white/80 font-mono font-medium">
              Completion: <strong className="text-[#C94B6A]">{completionPct}%</strong>
            </span>
          </div>

          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#C94B6A] via-[#D6A85C] to-[#FFF9F5] h-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Steps Indicator Badges */}
          <div className="hidden md:flex justify-between items-center mt-4 pt-3 border-t border-white/10 text-[10px]">
            {STEPS.map((step, idx) => (
              <span
                key={idx}
                className={`cursor-pointer transition-colors ${
                  idx === currentStep
                    ? 'text-[#C94B6A] font-bold'
                    : idx < currentStep
                    ? 'text-[#4F8A70]'
                    : 'text-white/40'
                }`}
                onClick={() => setCurrentStep(idx)}
              >
                {idx + 1}. {step.split(' ')[1]}
              </span>
            ))}
          </div>
        </div>

        {/* Step Container Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl min-h-[420px] flex flex-col justify-between"
        >
          {/* STEP 01: BASIC INFO */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">01 — Basic Information</h2>
                <p className="text-xs text-white/60 mt-1">
                  Tell CUPID about your basic identity and location.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g. Mumbai, MH"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Date of Birth (18+ Verified)
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => {
                      updateField('dob', e.target.value);
                      const bDate = new Date(e.target.value);
                      const yrs = new Date().getFullYear() - bDate.getFullYear();
                      updateField('age', yrs);
                    }}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    value={formData.photoUrl}
                    onChange={(e) => updateField('photoUrl', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A]"
                  />
                </div>
              </div>

              {formData.photoUrl && (
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-[#C94B6A]/40"
                  />
                  <div className="text-xs text-white/70">
                    <span className="font-semibold text-white block">Photo Preview</span>
                    Visible on curated match cards.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 02: ABOUT YOU */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">02 — About You</h2>
                <p className="text-xs text-white/60 mt-1">
                  Express your bio and personal vibe in your own words.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Bio / Introduction
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  placeholder="Share a short story about your passions, weekend rituals, or what makes you smile..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C94B6A]"
                />
                <span className="text-[10px] text-white/50 mt-1 block">
                  Write at least 20 words for higher compatibility scoring precision.
                </span>
              </div>
            </div>
          )}

          {/* STEP 03: PERSONALITY QUIZ */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">03 — Personality & Communication</h2>
                <p className="text-xs text-white/60 mt-1">
                  CUPID weighs personality & vibe as 40% of overall compatibility.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">
                    What is your natural Communication Style?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'deep_listener', label: 'Deep Listener', desc: 'Attentive, thoughtful, seeks emotional nuance' },
                      { id: 'expressive', label: 'Expressive & Open', desc: 'Vibrant, talkative, shares stories freely' },
                      { id: 'direct', label: 'Direct & Clear', desc: 'Honest, straight to the point, grounded' },
                      { id: 'playful', label: 'Playful Witty', desc: 'Humorous, banter-driven, lighthearted' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateField('communicationStyle', opt.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.communicationStyle === opt.id
                            ? 'bg-[#C94B6A]/20 border-[#C94B6A] text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <span className="font-bold text-sm block text-white">{opt.label}</span>
                        <span className="text-xs opacity-75">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">
                    How do you describe your Social Energy?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'introvert', label: 'Introvert' },
                      { id: 'ambivert', label: 'Ambivert' },
                      { id: 'extrovert', label: 'Extrovert' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateField('socialEnergy', opt.id)}
                        className={`py-3 text-xs font-medium rounded-xl border text-center transition-all ${
                          formData.socialEnergy === opt.id
                            ? 'bg-[#D6A85C] border-[#D6A85C] text-[#2B0813] font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 04: LIFESTYLE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">04 — Lifestyle Rhythms</h2>
                <p className="text-xs text-white/60 mt-1">
                  Daily habits and energy patterns help ensure harmony.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-2">
                  What is your primary daily rhythm?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'early_bird', label: 'Early Bird', desc: 'Sunrise coffee, morning productivity, early nights' },
                    { id: 'night_owl', label: 'Night Owl', desc: 'Late night creative bursts, evening stargazing' },
                    { id: 'active', label: 'Active & Outdoorsy', desc: 'Weekend hikes, fitness, active movement' },
                    { id: 'relaxed', label: 'Relaxed & Balanced', desc: 'Slow weekends, cozy home environment' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateField('lifestyle', opt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formData.lifestyle === opt.id
                          ? 'bg-[#C94B6A]/20 border-[#C94B6A] text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-bold text-sm block text-white">{opt.label}</span>
                      <span className="text-xs opacity-75">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 05: VALUES */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">05 — Core Values (30% Weight)</h2>
                <p className="text-xs text-white/60 mt-1">
                  Select at least 2 non-negotiable core values that guide your life choices.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_VALUES.map((val) => {
                  const selected = formData.coreValues.includes(val);
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => toggleArrayItem('coreValues', val)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selected
                          ? 'bg-[#D6A85C]/20 border-[#D6A85C] text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-medium text-sm">{val}</span>
                      {selected && <Check className="w-5 h-5 text-[#D6A85C]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 06: INTERESTS */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">06 — Shared Interests (30% Weight)</h2>
                <p className="text-xs text-white/60 mt-1">
                  Select 3 or more activities and passions you love sharing.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AVAILABLE_INTERESTS.map((interest) => {
                  const selected = formData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleArrayItem('interests', interest)}
                      className={`p-3 rounded-2xl border text-xs font-medium flex items-center justify-between transition-all ${
                        selected
                          ? 'bg-[#C94B6A] border-[#C94B6A] text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      <span>{interest}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 07: SOCIAL */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">07 — Social Information</h2>
                <p className="text-xs text-white/60 mt-1">
                  Your Instagram handle is strictly private and hidden by default.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Instagram Handle (Private)
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-white/40">
                    <InstagramIcon size={16} />
                  </div>
                  <input
                    type="text"
                    value={formData.instagramHandle}
                    onChange={(e) => updateField('instagramHandle', e.target.value)}
                    placeholder="@username"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#4F8A70] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-white/80 leading-relaxed">
                  <strong className="text-white block mb-0.5">Privacy Lock Guarantee</strong>
                  CUPID will never expose your Instagram handle on public screens or search endpoints. It is revealed exclusively to mutual matches after explicit consent.
                </div>
              </div>
            </div>
          )}

          {/* STEP 08: PARTNER PREFERENCES */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">08 — Partner Preferences</h2>
                <p className="text-xs text-white/60 mt-1">
                  Specify your preferred match criteria. Hard age gap policy (approx 2–3 yrs max) applies.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Preferred Gender
                  </label>
                  <select
                    value={formData.preferredGender}
                    onChange={(e) => updateField('preferredGender', e.target.value)}
                    className="w-full bg-[#2B0813] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A]"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="no_preference">No Preference</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Maximum Age Gap (Strict Filter)
                  </label>
                  <select
                    value={formData.maxAgeGap}
                    onChange={(e) => updateField('maxAgeGap', Number(e.target.value))}
                    className="w-full bg-[#2B0813] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A]"
                  >
                    <option value={2}>2 Years Max Gap</option>
                    <option value={3}>3 Years Max Gap (Recommended)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-2">
                  Dealbreakers
                </label>
                <div className="flex flex-wrap gap-2">
                  {['smoking', 'casual_only', 'dishonesty', 'lack_of_ambition'].map((db) => {
                    const selected = formData.dealbreakers.includes(db);
                    return (
                      <button
                        key={db}
                        type="button"
                        onClick={() => toggleArrayItem('dealbreakers', db)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selected
                            ? 'bg-[#B94A5C] border-[#B94A5C] text-white'
                            : 'bg-white/5 border-white/15 text-white/60 hover:text-white'
                        }`}
                      >
                        {db.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 09: REVIEW */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">09 — Review Profile</h2>
                <p className="text-xs text-white/60 mt-1">
                  Review your information before continuing to Match Pass verification.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-4 border border-white/10 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">Full Name</span>
                  <span className="font-semibold text-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">Age & 18+ Status</span>
                  <span className="font-semibold text-[#4F8A70] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {formData.age} yrs (Verified 18+)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">Communication Style</span>
                  <span className="font-semibold text-white capitalize">{formData.communicationStyle.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">Core Values</span>
                  <span className="font-semibold text-[#D6A85C]">{formData.coreValues.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/60">Interests</span>
                  <span className="font-semibold text-[#C94B6A]">{formData.interests.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step Action Controls */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-colors ${
                currentStep === 0
                  ? 'opacity-30 cursor-not-allowed text-white/40'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#C94B6A] to-[#5A1024] text-white text-xs font-bold shadow-lg hover:from-[#d85877] flex items-center gap-2 transition-all"
            >
              {currentStep === STEPS.length - 1 ? 'Review & Unlock Match Pass' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
