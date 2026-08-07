import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-800">
      <div className="text-xl font-bold tracking-wider text-white">AbTalks</div>
      <div className="hidden md:flex space-x-6 text-sm text-slate-300">
        <a href="#home" className="hover:text-white transition">Home</a>
        <a href="#features" className="hover:text-white transition">Features</a>
        <a href="#dashboard" className="hover:text-white transition">Dashboard</a>
      </div>
      <button className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition">
        Get Started
      </button>
    </nav>
  );
}