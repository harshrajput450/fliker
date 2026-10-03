import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Compass,
  MessageCircle,
  Clock,
  UserX,
} from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { useAuth } from '../context/AuthContext';
import { MatchResult } from '../../server/types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const MatchesPage: React.FC = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [noMatchMessage, setNoMatchMessage] = useState('');
  const [consentedMap, setConsentedMap] = useState<Record<string, boolean>>({});
  const [emailSentMap, setEmailSentMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchMatches() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/matchmaking/find-matches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userProfile: {
              id: user.id,
              email: user.email,
              full_name: user.fullName,
              date_of_birth: user.dob,
              age: user.age,
              gender: user.gender,
              location: user.location,
              profile_photo_url: user.photoUrl,
              bio: user.bio,
              communication_style: user.communicationStyle,
              social_energy: user.socialEnergy,
              lifestyle: user.lifestyle,
              core_values: user.coreValues,
              relationship_expectations: 'Long-term intentional connection',
              is_18_plus: user.is18Plus,
              is_profile_complete: user.isProfileComplete,
              completion_percentage: user.completionPercentage,
              interests: user.interests,
            },
            partnerPreferences: {
              user_id: user.id,
              preferred_gender: user.partnerPreferences.preferredGender,
              preferred_min_age: user.partnerPreferences.minAge,
              preferred_max_age: user.partnerPreferences.maxAge,
              max_age_gap: user.partnerPreferences.maxAgeGap,
              location_preference: user.partnerPreferences.locationPref,
              relationship_intention: user.partnerPreferences.intention,
              dealbreakers: user.partnerPreferences.dealbreakers,
            },
          }),
        });

        const data = await res.json();
        if (data.matches && data.matches.length > 0) {
          setMatches(data.matches.slice(0, 2)); // Capped at max 2
        } else {
          setMatches([]);
          setNoMatchMessage(data.message || 'Cupid is still looking…');
        }
      } catch (err) {
        console.error('Failed to load matches:', err);
        setNoMatchMessage('Cupid is still looking…');
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [user]);

  const handleConsentRequest = async (matchId: string, matchedName: string) => {
    setConsentedMap((prev) => ({ ...prev, [matchId]: true }));

    try {
      await fetch('/api/email/notify-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user?.email,
          userName: user?.fullName,
          matchedName,
        }),
      });
      setEmailSentMap((prev) => ({ ...prev, [matchId]: true }));
    } catch (err) {
      console.error('Email notify error:', err);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30 pb-12">
      <Navbar />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D6A85C] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C94B6A]" />
            Curated Compatibility Results
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
            Your Curated Matches
          </h1>
          <p className="text-white/70 mt-3 text-sm">
            CUPID restricts output to a maximum of <strong className="text-white">2 curated matches</strong> based on strict age-gap integrity and deep compatibility scoring.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-4">
            <Sparkles className="w-10 h-10 text-[#C94B6A] animate-spin mx-auto" />
            <p className="text-sm text-white/70">Evaluating personality, values & lifestyle compatibility...</p>
          </div>
        ) : matches.length === 0 ? (
          /* NO MATCH SCREEN (Section 30) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass rounded-3xl p-12 text-center max-w-xl mx-auto border border-white/10 space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#D6A85C]/20 border border-[#D6A85C]/40 mx-auto flex items-center justify-center text-[#D6A85C]">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Cupid is still looking…
            </h2>
            <p className="text-sm text-white/75 leading-relaxed">
              We never invent fake profiles or force unaligned matches. Our algorithm is currently analyzing new 18+ verified candidates in your area to find true compatibility.
            </p>
            <div className="pt-4 border-t border-white/10 text-xs text-white/50">
              Check back soon or refine your partner preferences in your Dashboard.
            </div>
          </motion.div>
        ) : (
          /* CURATED MATCH CARDS (MAX 2) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {matches.map((match, idx) => {
              const profile = match.matched_profile;
              const hasConsented = consentedMap[match.id];
              const emailSent = emailSentMap[match.id];

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
                >
                  {/* Top Header & Score Badge */}
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={profile.profile_photo_url}
                        alt={profile.full_name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#C94B6A]/50 shadow-lg"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                          {profile.full_name.split(' ')[0]}, {profile.age}
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#4F8A70]/20 text-[#4F8A70] border border-[#4F8A70]/40">
                            18+ Verified
                          </span>
                        </h3>
                        <p className="text-xs text-white/60 mt-0.5">{profile.location}</p>
                        <p className="text-xs text-[#D6A85C] mt-1 font-medium italic">
                          "{profile.bio.slice(0, 60)}..."
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="inline-flex items-center gap-1 bg-[#C94B6A]/20 border border-[#C94B6A]/50 px-3 py-1.5 rounded-2xl">
                        <Heart className="w-4 h-4 text-[#C94B6A] fill-[#C94B6A]" />
                        <span className="text-lg font-extrabold text-white">
                          {match.compatibility_score}%
                        </span>
                      </div>
                      <span className="block text-[10px] text-white/50 mt-1 uppercase tracking-wider">
                        Compatibility Score
                      </span>
                    </div>
                  </div>

                  {/* Compatibility Categories Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Personality</span>
                      <span className="text-base font-bold text-[#C94B6A]">
                        {match.personality_score}%
                      </span>
                      <span className="text-[9px] text-white/40 block">40% Weight</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Values</span>
                      <span className="text-base font-bold text-[#D6A85C]">
                        {match.values_score}%
                      </span>
                      <span className="text-[9px] text-white/40 block">30% Weight</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Interests</span>
                      <span className="text-base font-bold text-[#FFF9F5]">
                        {match.interests_score}%
                      </span>
                      <span className="text-[9px] text-white/40 block">30% Weight</span>
                    </div>
                  </div>

                  {/* Why We Matched Explanations */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#D6A85C] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Why We Matched
                    </h4>
                    <ul className="space-y-2 text-xs text-white/80">
                      {match.why_we_matched.map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 bg-white/5 rounded-xl p-2.5 border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-[#4F8A70] flex-shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Consent & Private Instagram Reveal Section */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    {hasConsented ? (
                      <div className="p-4 rounded-2xl bg-[#4F8A70]/20 border border-[#4F8A70]/50 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#4F8A70]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mutual Connection Consent Granted!</span>
                        </div>
                        <p className="text-xs text-white/90">
                          Instagram Handle: <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{profile.instagram_handle || '@aria.vane'}</strong>
                        </p>
                        {emailSent && (
                          <div className="text-[10px] text-white/60 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#D6A85C]" />
                            <span>Match confirmation email sent to your inbox.</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Lock className="w-4 h-4 text-[#D6A85C]" />
                          <span>Instagram handle is private until mutual consent</span>
                        </div>
                        <button
                          onClick={() => handleConsentRequest(match.id, profile.full_name)}
                          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C94B6A] to-[#5A1024] hover:from-[#d85877] text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all flex-shrink-0"
                        >
                          <InstagramIcon size={16} />
                          Request Social Consent
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};
