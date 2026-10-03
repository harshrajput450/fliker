import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  User,
  Heart,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Lock,
  Sliders,
  LogOut,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, deleteAccount } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) {
    return (
      <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30">
        <Navbar />
        <div className="relative z-10 text-center py-20">
          <p className="text-sm text-white/70">Please log in to view your CUPID dashboard.</p>
          <Link to="/login" className="mt-4 inline-block px-6 py-2 rounded-full bg-[#C94B6A] text-white text-xs font-semibold">
            Sign In
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const isFemale = user.gender === 'female';
  const passAmount = isFemale ? 1 : 99;

  const handleDelete = () => {
    deleteAccount();
    navigate('/');
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between selection:bg-[#C94B6A]/30 pb-12">
      <Navbar />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 space-y-8">
        {/* User Header Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-5">
            <img
              src={user.photoUrl}
              alt={user.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#C94B6A]/50 shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {user.fullName}
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#4F8A70]/20 text-[#4F8A70] border border-[#4F8A70]/40">
                  18+ Verified
                </span>
              </h1>
              <p className="text-xs text-white/60 mt-1">{user.email} • {user.location}</p>
              <p className="text-xs text-[#D6A85C] mt-1 font-mono">
                Instagram (Private): {user.instagramHandle || 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/matches"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C94B6A] to-[#5A1024] text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:from-[#d85877] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#D6A85C]" />
              View Curated Matches
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Profile Completion & Info */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#C94B6A]" />
              Profile Status
            </h3>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/70">Completion Percentage</span>
                <span className="font-bold text-[#C94B6A]">{user.completionPercentage}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#C94B6A] to-[#D6A85C] h-full"
                  style={{ width: `${user.completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between border-b border-white/10 py-1.5">
                <span className="text-white/60">Communication</span>
                <span className="text-white capitalize">{user.communicationStyle.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 py-1.5">
                <span className="text-white/60">Social Energy</span>
                <span className="text-white capitalize">{user.socialEnergy}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 py-1.5">
                <span className="text-white/60">Daily Rhythm</span>
                <span className="text-white capitalize">{user.lifestyle.replace('_', ' ')}</span>
              </div>
            </div>

            <Link
              to="/onboarding"
              className="block w-full text-center py-2.5 rounded-xl border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors"
            >
              Edit Profile & Quiz
            </Link>
          </div>

          {/* Column 2: Partner Preferences */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#D6A85C]" />
              Partner Preferences
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/10 py-1.5">
                <span className="text-white/60">Preferred Gender</span>
                <span className="text-white capitalize">{user.partnerPreferences?.preferredGender}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 py-1.5">
                <span className="text-white/60">Age Gap Policy</span>
                <span className="text-[#4F8A70] font-semibold">
                  Max {user.partnerPreferences?.maxAgeGap} Yrs Gap
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 py-1.5">
                <span className="text-white/60">Intention</span>
                <span className="text-white capitalize">{user.partnerPreferences?.intention.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/60">Dealbreakers</span>
                <span className="text-[#B94A5C] capitalize">
                  {user.partnerPreferences?.dealbreakers?.join(', ') || 'None'}
                </span>
              </div>
            </div>

            <Link
              to="/onboarding"
              className="block w-full text-center py-2.5 rounded-xl border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors"
            >
              Update Preferences
            </Link>
          </div>

          {/* Column 3: Payment & Security */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#4F8A70]" />
              Match Pass Payment
            </h3>

            {user.paymentVerified ? (
              <div className="p-4 rounded-2xl bg-[#4F8A70]/20 border border-[#4F8A70]/50 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#4F8A70]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pass Verified (Paid ₹{passAmount})</span>
                </div>
                <p className="text-white/80">Order ID: {user.paymentOrder?.orderId || 'ord_verified_101'}</p>
                <p className="text-white/50 text-[10px]">Verified via Razorpay HMAC signature</p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#D6A85C]/20 border border-[#D6A85C]/50 space-y-3 text-xs">
                <div className="font-bold text-[#D6A85C]">
                  Prototype Match Pass Pending (₹{passAmount})
                </div>
                <p className="text-white/80">Unlock your 2 curated compatibility matches.</p>
                <Link
                  to="/payment"
                  className="block w-full text-center py-2 rounded-xl bg-[#D6A85C] text-[#2B0813] font-bold"
                >
                  Pay ₹{passAmount} Now
                </Link>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/privacy"
                className="text-xs text-white/70 hover:text-white flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                Privacy & Data Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Account Deletion & Logout Actions */}
        <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={logout}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

          {showDeleteConfirm ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#B94A5C]">Confirm account deletion?</span>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-full bg-[#B94A5C] text-white text-xs font-bold"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-2 text-xs text-white/60 hover:text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs text-[#B94A5C] hover:text-[#C94B6A] flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Account
            </button>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};
