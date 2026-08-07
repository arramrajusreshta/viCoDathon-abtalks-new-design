import React from 'react';

export default function Dashboard() {
  return (
    <section id="dashboard" className="px-8 py-20 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Telemetry Active
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-slate-400 mt-1">Real-time telemetry and resource usage statistics.</p>
        </div>
        <button 
          onClick={() => alert("Exporting report data as CSV...")}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition"
        >
          Download Report ↓
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900/70 border border-slate-800/80 rounded-2xl relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Views</p>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">+14.2%</span>
          </div>
          <p className="text-4xl font-extrabold text-white tracking-tight">12,480</p>
          <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[70%]"></div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/70 border border-slate-800/80 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Active Sessions</p>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">+5.8%</span>
          </div>
          <p className="text-4xl font-extrabold text-white tracking-tight">342</p>
          <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full w-[45%]"></div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/70 border border-slate-800/80 rounded-2xl relative overflow-hidden group hover:border-pink-500/40 transition">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Conversion Rate</p>
            <span className="text-xs text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full">-1.2%</span>
          </div>
          <p className="text-4xl font-extrabold text-white tracking-tight">8.4%</p>
          <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-full w-[85%]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}