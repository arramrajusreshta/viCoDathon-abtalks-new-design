import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-8 py-4 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white font-black text-lg">A</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">AbTalks <span className="text-indigo-400 font-normal text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 ml-1">v2.0</span></span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
        <a href="#home" className="hover:text-white transition-colors">Overview</a>
        <a href="#features" className="hover:text-white transition-colors">Bento Matrix</a>
        <a href="#dashboard" className="hover:text-white transition-colors">Analytics</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => alert("Welcome to AbTalks Pro! Authentication flow initialized.")} className="text-sm font-medium text-slate-300 hover:text-white transition">
          Sign In
        </button>
        <button onClick={() => alert("Launching workspace onboarding...")} className="relative group overflow-hidden rounded-xl p-px font-semibold text-xs uppercase tracking-wider">
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></span>
          <span className="relative block px-5 py-2.5 rounded-[11px] bg-slate-950 text-white transition-all group-hover:bg-opacity-0">
            Get Started Free
          </span>
        </button>
      </div>
    </nav>
  );
}