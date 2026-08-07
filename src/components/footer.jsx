import React from 'react';

export default function Footer() {
  return (
    <footer className="px-8 py-12 bg-slate-950 border-t border-slate-900 text-sm text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">A</div>
          <span className="font-bold text-slate-300">AbTalks</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
          <a href="#home" className="hover:text-white transition">Privacy Policy</a>
          <a href="#features" className="hover:text-white transition">Terms of Service</a>
          <a href="#dashboard" className="hover:text-white transition">Security</a>
          <a href="#contact" className="hover:text-white transition">Contact Support</a>
        </div>
        <p className="text-xs">&copy; 2026 AbTalks Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}