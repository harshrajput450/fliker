import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShieldAlert } from 'lucide-react';
import { Music2Icon, FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className="liquid-glass w-full max-w-7xl mx-auto rounded-3xl p-6 md:p-10 text-[#A1A1AA] mt-32 md:mt-64 relative z-10 border border-white/15 bg-[#0A0B12]/80"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
        {/* Brand Column (md:col-span-5) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D6A85C] to-[#121422] flex items-center justify-center border border-[#D6A85C]/40 shadow-lg shadow-[#D6A85C]/20">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-wider text-white flex items-center gap-2">
                CUPID
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-[#D6A85C]/15 text-[#D6A85C] border border-[#D6A85C]/30">
                  18+ Verified
                </span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-[#D6A85C]">
                Stop Swiping. Start Connecting.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm mt-2">
            CUPID helps people discover meaningful connections through personality, core values, lifestyle compatibility and shared interests. Curated matches only — no infinite swiping.
          </p>

          <div className="flex items-center gap-2 text-[11px] text-[#4F8A70] bg-[#4F8A70]/10 border border-[#4F8A70]/30 rounded-lg px-3 py-1.5 w-fit mt-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Strict 18+ Verification & Age-Gap Integrity Policy</span>
          </div>
        </div>

        {/* Link Column 1: Discover */}
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
            Discover
          </h4>
          <ul className="text-xs space-y-2.5">
            <li>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How CUPID Works
              </a>
            </li>
            <li>
              <a href="#compatibility" className="hover:text-white transition-colors">
                Compatibility
              </a>
            </li>
            <li>
              <Link to="/onboarding" className="hover:text-white transition-colors">
                Find Your Match
              </Link>
            </li>
            <li>
              <a href="#community" className="hover:text-white transition-colors">
                Community
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Link Column 2: The Mission */}
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
            The Mission
          </h4>
          <ul className="text-xs space-y-2.5">
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About CUPID
              </a>
            </li>
            <li>
              <a href="#approach" className="hover:text-white transition-colors">
                Our Approach
              </a>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Safety & Trust
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition-colors">
                18+ Policy
              </Link>
            </li>
            <li>
              <a href="mailto:support@cupidmatch.app" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Link Column 3: Concierge */}
        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
            Concierge
          </h4>
          <ul className="text-xs space-y-2.5">
            <li>
              <a href="mailto:concierge@cupidmatch.app" className="hover:text-white transition-colors">
                Get in Touch
              </a>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <a href="mailto:safety@cupidmatch.app" className="hover:text-white transition-colors text-[#B94A5C] hover:text-white">
                Report Concern
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[10px] uppercase tracking-widest opacity-60 text-[#A1A1AA]">
          CUPID — Stop Swiping. Start Connecting.
        </p>

        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest opacity-60 text-[#A1A1AA]">
            Join the Journey:
          </span>
          <div className="flex items-center gap-3 text-[#A1A1AA]">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              aria-label="TikTok"
            >
              <Music2Icon size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              aria-label="Twitter"
            >
              <TwitterIcon size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              aria-label="Youtube"
            >
              <YoutubeIcon size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
