import React, { useState } from 'react';

export default function Dashboard() {
  // Added state for streak, freeze tokens, and squad members
  const [streakData, setStreakData] = useState({
    currentStreak: 12,
    freezeTokens: 2,
    status: 'active' // 'active' | 'frozen' | 'missed'
  });

  const [squadMembers] = useState([
    { name: 'Aditi R.', track: 'Full Stack', day: 'Day 12', activeNow: true },
    { name: 'Rahul M.', track: 'Full Stack', day: 'Day 11', activeNow: true },
    { name: 'Sneha K.', track: 'Full Stack', day: 'Day 12', activeNow: false },
    { name: 'Karan V.', track: 'Full Stack', day: 'Day 10', activeNow: true },
  ]);

  const handleUseFreeze = () => {
    if (streakData.freezeTokens > 0 && streakData.status !== 'frozen') {
      setStreakData(prev => ({
        ...prev,
        freezeTokens: prev.freezeTokens - 1,
        status: 'frozen'
      }));
    }
  };

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
        
        {/* Card 1: Streak / Freeze Token Status */}
        <div className="p-6 bg-slate-900/70 border border-slate-800/80 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Challenge Streak</p>
            <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full text-blue-400 text-xs font-semibold">
              <span>🧊</span>
              <span>{streakData.freezeTokens}/2 Freezes</span>
            </div>
          </div>
          
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-extrabold text-white tracking-tight">{streakData.currentStreak} Days</p>
            <span className="text-xs font-medium text-emerald-400">🔥 On Fire</span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Status: <strong className="text-slate-200 capitalize">{streakData.status}</strong>
            </span>
            {streakData.status !== 'frozen' && streakData.freezeTokens > 0 && (
              <button 
                onClick={handleUseFreeze}
                className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-lg transition"
              >
                Use Freeze Token 🧊
              </button>
            )}
          </div>

          <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full ${streakData.status === 'frozen' ? 'bg-blue-400 w-[100%]' : 'bg-indigo-500 w-[70%]'}`}></div>
          </div>
        </div>

        {/* Card 2: Squad / Track Cohort View (NEW FEATURE) */}
        <div className="p-6 bg-slate-900/70 border border-slate-800/80 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition">
          <div className="flex justify-between items-start mb-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Squad Cohort</p>
            <span className="text-xs text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full">Active Pod</span>
          </div>
          <p className="text-sm font-semibold text-white mb-3">Full Stack • Day 12 Peer Group</p>
          
          <div className="space-y-2.5">
            {squadMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${member.activeNow ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></div>
                  <span className="text-xs font-medium text-slate-200">{member.name}</span>
                </div>
                <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md">{member.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Conversion Rate */}
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