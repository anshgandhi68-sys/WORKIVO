import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#5415A0] p-1 flex items-center justify-center shadow-xs shrink-0">
            <img 
              src="/workivo-balloon-icon.png" 
              alt="WORKIVO Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight text-sm">WORKIVO</span>
          <span className="text-slate-400">|</span>
          <span>© 2025 WORKIVO Cooperative Marketplace. Small Tasks, Big Relief.</span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7 font-medium text-slate-600">
          <a href="#about" onClick={(e) => { e.preventDefault(); alert("WORKIVO is a worker-owned cooperative service marketplace operating across Bangalore, India."); }} className="hover:text-[#5415A0] transition-colors">
            About Cooperative
          </a>
          <a href="#ownership" onClick={(e) => { e.preventDefault(); alert("100% of artisans hold equal voting equity in their local district chapter."); }} className="hover:text-[#5415A0] transition-colors">
            Worker Ownership
          </a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); alert("Fair pricing model: Audited living wages with zero platform surge fees."); }} className="hover:text-[#5415A0] transition-colors">
            Fair Pricing
          </a>
          <a href="#safety" onClick={(e) => { e.preventDefault(); alert("Co-op Protection Pool: 256-bit escrow deposit with 100% peer replacement guarantee."); }} className="hover:text-[#5415A0] transition-colors">
            Safety & Support
          </a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Your data is strictly encrypted and never sold to third-party ad networks."); }} className="hover:text-[#5415A0] transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Standard cooperative service agreement and peer escrow terms."); }} className="hover:text-[#5415A0] transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
