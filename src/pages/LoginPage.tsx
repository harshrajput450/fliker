import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Mail, Lock, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [is18Confirmed, setIs18Confirmed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!is18Confirmed) {
      setError('You must confirm you are 18+ to log into CUPID.');
      return;
    }

    try {
      if (authMode === 'email') {
        if (!email) {
          setError('Please enter your email address.');
          return;
        }
        await login(email);
        navigate('/verify-otp', { state: { email, mode: 'login' } });
      } else {
        if (!phone) {
          setError('Please enter your phone number.');
          return;
        }
        await login(`${phone}@phone.cupid`);
        navigate('/verify-otp', { state: { phone, mode: 'login' } });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
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
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C94B6A] to-[#5A1024] mx-auto flex items-center justify-center shadow-lg shadow-[#C94B6A]/30 mb-3">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-xs text-white/60 mt-1">
              Sign in to your CUPID account
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-6 border border-white/10">
            <button
              type="button"
              onClick={() => setAuthMode('email')}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${
                authMode === 'email'
                  ? 'bg-[#C94B6A] text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Email Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('phone')}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${
                authMode === 'phone'
                  ? 'bg-[#C94B6A] text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Phone Login
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-[#B94A5C]/20 border border-[#B94A5C]/50 text-xs text-[#FFF9F5] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#B94A5C] flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'email' ? (
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
            ) : (
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C94B6A] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C94B6A] transition-colors"
                />
              </div>
            </div>

            {/* 18+ Mandatory Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/80">
                <input
                  type="checkbox"
                  checked={is18Confirmed}
                  onChange={(e) => setIs18Confirmed(e.target.checked)}
                  className="mt-0.5 rounded border-white/30 bg-white/10 text-[#C94B6A] focus:ring-[#C94B6A]"
                />
                <span>
                  I declare under penalty of perjury that I am <strong>18 years of age or older</strong> and agree to CUPID's 18+ policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C94B6A] to-[#5A1024] hover:from-[#d85877] text-white font-medium text-sm shadow-lg flex items-center justify-center gap-2 mt-4 transition-all"
            >
              {isLoading ? 'Processing...' : 'Continue to Verification'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-white/60">
            Don't have a CUPID account?{' '}
            <Link to="/signup" className="text-[#C94B6A] font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="p-4 text-center text-[10px] text-white/40 uppercase tracking-widest z-10">
        CUPID — 18+ Mandatory Age Verification Platform
      </div>
    </main>
  );
};
