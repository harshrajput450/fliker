import React from 'react';
import { motion } from 'motion/react';
import { Music2Icon, FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from './SocialIcons';

export const LuminaFooter: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70 mt-32 md:mt-64 relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
        {/* First Column (md:col-span-5) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="text-xl font-medium text-white flex items-center gap-3">
            {/* Custom 4-star SVG Logo */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
                fill="currentColor"
              />
              <path
                d="M18 16L18.9 19.1L22 20L18.9 20.9L18 24L17.1 20.9L14 20L17.1 19.1L18 16Z"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
            <span className="tracking-wide">LUMINA</span>
          </div>

          <p className="text-xs text-white/60 leading-relaxed max-w-sm">
            Lumina provides premium clarity on global events and cosmic wonders - shared with all for free.
          </p>
        </div>

        {/* Links Column (md:col-span-7 Grid of 3) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* DISCOVER */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Discover
            </h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <a href="#labs" className="hover:text-white transition-colors">
                  Labs & Workshops
                </a>
              </li>
              <li>
                <a href="#deep-dive" className="hover:text-white transition-colors">
                  Deep Dive Series
                </a>
              </li>
              <li>
                <a href="#circle" className="hover:text-white transition-colors">
                  Global Circle
                </a>
              </li>
              <li>
                <a href="#vault" className="hover:text-white transition-colors">
                  Resource Vault
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-white transition-colors">
                  Future Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* THE MISSION */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              The Mission
            </h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <a href="#origin" className="hover:text-white transition-colors">
                  Origin Story
                </a>
              </li>
              <li>
                <a href="#collective" className="hover:text-white transition-colors">
                  The Collective
                </a>
              </li>
              <li>
                <a href="#newsroom" className="hover:text-white transition-colors">
                  Newsroom Hub
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Join the Team
                </a>
              </li>
            </ul>
          </div>

          {/* CONCIERGE */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Concierge
            </h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <a href="mailto:concierge@lumina.app" className="hover:text-white transition-colors">
                  Get in Touch
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Legal Privacy
                </a>
              </li>
              <li>
                <a href="#agreement" className="hover:text-white transition-colors">
                  User Agreement
                </a>
              </li>
              <li>
                <a href="mailto:concern@lumina.app" className="hover:text-white transition-colors">
                  Report Concern
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[10px] uppercase tracking-widest opacity-50">
          Curated by @GotInGeorgiG
        </p>

        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest opacity-50">
            Join the Journey:
          </span>
          <div className="flex items-center gap-3">
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
