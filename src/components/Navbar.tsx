import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const userNameDisplay = user?.fullName ? user.fullName.split(' ')[0] : 'Ananya';
  const userPhoto = user?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300';

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <nav className="liquid-glass rounded-full px-6 py-3 sm:px-8 sm:py-3.5 flex items-center justify-between transition-all duration-300 border border-white/15 shadow-2xl">
        {/* Brand Logo without Heart Icon */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-white font-sans flex items-center gap-2">
            CUPID
            <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#D6A85C] border border-white/20 tracking-normal font-semibold">
              18+ Verified
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium tracking-wide">
          <a
            href="#how-it-works"
            className="text-[#A1A1AA] hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#why-cupid"
            className="text-[#A1A1AA] hover:text-white transition-colors"
          >
            Why CUPID
          </a>
          <a
            href="#compatibility"
            className="text-[#A1A1AA] hover:text-white transition-colors"
          >
            AI Compatibility
          </a>
          <a
            href="#pricing"
            className="text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F8A70]" />
            Free Access
          </a>
          <Link
            to="/privacy"
            className="text-[#A1A1AA] hover:text-white transition-colors"
          >
            18+ & Privacy
          </Link>
          <Link
            to="/matches"
            className={`transition-colors hover:text-white ${
              isActive('/matches') ? 'text-[#D6A85C] font-semibold' : 'text-[#A1A1AA]'
            }`}
          >
            Curated Matches
          </Link>
        </div>

        {/* Right Section: User Profile Pill */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="liquid-glass rounded-full px-3.5 py-1.5 border border-white/20 flex items-center gap-2.5 hover:border-white/40 transition-all group"
              >
                <img
                  src={userPhoto}
                  alt={userNameDisplay}
                  className="w-7 h-7 rounded-full object-cover border border-white/30"
                />
                <span className="text-xs font-semibold text-white tracking-wide group-hover:text-[#D6A85C] transition-colors">
                  {userNameDisplay}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4F8A70]" />
              </Link>
              <button
                onClick={logout}
                className="text-[#A1A1AA] hover:text-white p-2 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs font-medium text-[#A1A1AA] hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <button
                onClick={() => navigate('/onboarding')}
                className="rounded-full px-5 py-2 bg-white text-black hover:bg-white/90 transition-all font-bold text-xs tracking-wide shadow-lg"
              >
                Find My Match (Free)
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#A1A1AA] hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 liquid-glass rounded-3xl p-6 flex flex-col gap-4 text-xs font-medium animate-in slide-in-from-top-4 duration-300 border border-white/15">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            How It Works
          </a>
          <a
            href="#why-cupid"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            Why CUPID
          </a>
          <a
            href="#compatibility"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            AI Compatibility
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            Free Access
          </a>
          <Link
            to="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            18+ & Privacy
          </Link>
          <Link
            to="/matches"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#D6A85C] hover:text-white py-1 font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#D6A85C]" />
            Curated Matches
          </Link>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-white font-semibold"
              >
                <img src={userPhoto} alt={userNameDisplay} className="w-6 h-6 rounded-full object-cover" />
                <span>{userNameDisplay}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-[#B94A5C] hover:text-white text-xs font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <Link
                to="/onboarding"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-white text-black font-bold"
              >
                Find My Match (Free)
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
