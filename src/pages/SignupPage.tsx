import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Mail, User, Calendar, ShieldAlert, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'non_binary'>('female');
  const [error, setError] = useState('');
  const [underageBlocked, setUnderageBlocked] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUnderageBlocked(false);

    if (!email || !fullName || !dob || !gender) {
      setError('Please fill in all required fields.');
      return;
    }

    // Verify 18+ calculation
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    if (calculatedAge < 18) {
      setUnderageBlocked(true);
      return;
    }

    try {
      await signup(email, fullName, dob, gender);
      navigate('/verify-otp', { state: { email, mode: 'signup' } });
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30">
      <Navbar />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          {underageBlocked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#B94A5C]/20 border border-[#B94A5C]/40 mx-auto flex items-center justify-center text-[#B94A5C]">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
              <p className="text-xs text-white/70 leading-relaxed max-w-xs mx-auto">
                CUPID is strictly an <strong className="text-white">18+ platform</strong>. Underage users are not permitted to register or participate in matchmaking.
              </p>
              <button
                onClick={() => setUnderageBlocked(false)}
                className="px-6 py-2.5 rounded-full bg-white/10 text-xs text-white hover:bg-white/20 transition-colors"
              >
                Back to Registration
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C94B6A] to-[#5A1024] mx-auto flex items-center justify-center shadow-lg shadow-[#C94B6A]/30 mb-3">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Create CUPID Account</h1>
                <p className="text-xs text-white/60 mt-1">
                  Join the 18+ intentional matchmaking community
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-[#B94A5C]/20 border border-[#B94A5C]/50 text-xs text-[#FFF9F5] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#B94A5C] flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C94B6A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C94B6A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Date of Birth (Must be 18+)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C94B6A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Gender Identity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'female', label: 'Female' },
                      { id: 'male', label: 'Male' },
                      { id: 'non_binary', label: 'Non-Binary' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGender(g.id as any)}
                        className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                          gender === g.id
                            ? 'bg-[#C94B6A] border-[#C94B6A] text-white shadow-md'
                            : 'bg-white/5 border-white/15 text-white/70 hover:text-white'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-white/60 leading-relaxed bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="text-[#D6A85C] font-semibold block mb-0.5">Prototype Match Pass Policy:</span>
                  Female Match Pass: ₹1 • Male Match Pass: ₹99. Paid only after complete profile review.
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C94B6A] to-[#5A1024] hover:from-[#d85877] text-white font-medium text-sm shadow-lg flex items-center justify-center gap-2 mt-4 transition-all"
                >
                  {isLoading ? 'Creating Account...' : 'Continue to Verification'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-white/60">
                Already have an account?{' '}
                <Link to="/login" className="text-[#C94B6A] font-semibold hover:underline">
                  Sign In
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div className="p-4 text-center text-[10px] text-white/40 uppercase tracking-widest z-10">
        CUPID — 18+ Mandatory Age Verification Platform
      </div>
    </main>
  );
};
