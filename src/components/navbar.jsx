import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => goTo('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-black text-sm">A</span>
          </div>
          <span className="text-lg font-bold text-white">AbTalks</span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="text-slate-300 p-1 text-xl focus:outline-none"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-3 pt-4 pb-2 px-2 max-w-md mx-auto text-sm border-t border-slate-800/60 mt-3">
          <button onClick={() => goTo('/')} className="text-left text-slate-300 py-1">Overview</button>
          <button onClick={() => goTo('/dashboard')} className="text-left text-slate-300 py-1">Dashboard</button>
          <button onClick={() => goTo('/pricing')} className="text-left text-slate-300 py-1">Pricing</button>
          <button onClick={() => goTo('/signin')} className="text-left text-slate-300 py-1">Sign In</button>
          <button 
            onClick={() => goTo('/dashboard')} 
            className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold text-center text-xs uppercase"
          >
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
}