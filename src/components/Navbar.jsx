import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3 rounded-2xl glass-panel border border-slate-800 bg-slate-900/80 backdrop-blur-md">
        
        {/* Logo */}
        <button 
          onClick={() => setActiveTab('overview')} 
          className="flex items-center gap-2 font-bold text-lg text-white hover:opacity-80 transition-opacity"
        >
          <span className="text-xl text-indigo-400">✨</span> ABTalks
        </button>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Launch App →
        </button>

      </div>
    </nav>
  );
}