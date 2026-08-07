import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

const studentData = {
  name: "Aarav Sharma",
  track: "Full-Stack Web Dev",
  currentStreak: 12,
  completedDays: 11,
  totalDays: 60,
};

const day12Task = {
  day: 12,
  title: "Build a Custom State Hook in React",
  description: "Create a reusable custom hook `useLocalStorage` that syncs state with browser localStorage automatically.",
  requirements: [
    "Accept a key and initial value",
    "Persist updates to localStorage",
    "Handle JSON parsing errors safely"
  ]
};

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col justify-between max-w-[390px] mx-auto border-x border-slate-800 font-sans">
      <header className="py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">ABTalks</h1>
        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-1 rounded">60-DAY SPRINT</span>
      </header>
      <main className="my-auto space-y-6">
        <div className="inline-block bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-indigo-300">
          🌙 Built for late-night college coders
        </div>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
          Build Consistency. Get Visible to Recruiters.
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed">
          Maintain a 60-day public learning streak by submitting 1 GitHub commit and 1 LinkedIn post daily.
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm transition text-center shadow-lg shadow-indigo-600/20"
        >
          Enter Student Dashboard →
        </button>
      </main>
      <footer className="text-center text-[10px] text-slate-600 py-2">
        Mobile Viewport (390px) • ABTalks Redesign
      </footer>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const [streakState, setStreakState] = useState('active');

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 max-w-[390px] mx-auto border-x border-slate-800 space-y-5 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold">{studentData.name}</h2>
          <p className="text-[11px] text-slate-400">{studentData.track}</p>
        </div>
        <Link to="/" className="text-xs text-slate-500 hover:text-slate-300">Logout</Link>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-[10px] space-y-1">
        <p className="text-slate-400 font-semibold px-1">Judge Simulator (Edge Cases):</p>
        <div className="grid grid-cols-3 gap-1">
          <button onClick={() => setStreakState('active')} className={`py-1 rounded font-medium ${streakState === 'active' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Active</button>
          <button onClick={() => setStreakState('missed')} className={`py-1 rounded font-medium ${streakState === 'missed' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Missed</button>
          <button onClick={() => setStreakState('zero')} className={`py-1 rounded font-medium ${streakState === 'zero' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Day 1</button>
        </div>
      </div>

      {streakState === 'active' && (
        <div className="bg-gradient-to-r from-orange-500/20 to-indigo-500/20 border border-orange-500/30 p-4 rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-orange-400">Current Streak</span>
            <h3 className="text-2xl font-black text-orange-500">{studentData.currentStreak} Days 🔥</h3>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            <p className="font-bold text-white">{studentData.completedDays}/60</p>
            <p className="text-[10px]">Days Done</p>
          </div>
        </div>
      )}
      {streakState === 'missed' && (
        <div className="bg-red-950/40 border border-red-500/40 p-4 rounded-2xl space-y-1">
          <h3 className="text-base font-bold text-red-400">Streak Missed Yesterday ⚠️</h3>
          <p className="text-xs text-slate-300">Submit today's task to repair your streak!</p>
        </div>
      )}
      {streakState === 'zero' && (
        <div className="bg-slate-900 border border-indigo-500/30 p-4 rounded-2xl space-y-1">
          <h3 className="text-base font-bold text-white">Day 1 of 60 🚀</h3>
          <p className="text-xs text-slate-400">Complete your first challenge to start.</p>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">TODAY'S TASK</span>
          <span className="text-xs text-slate-400">Day 12</span>
        </div>
        <h4 className="font-bold text-sm">{day12Task.title}</h4>
        <button 
          onClick={() => navigate('/day/12')}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition"
        >
          Open Day 12 Challenge →
        </button>
      </div>
    </div>
  );
}

function ChallengeDayPage() {
  const { dayId } = useParams();
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 max-w-[390px] mx-auto border-x border-slate-800 space-y-5 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <Link to="/dashboard" className="text-xs text-indigo-400 font-semibold">← Back</Link>
        <span className="text-[10px] font-bold bg-slate-800 px-2.5 py-1 rounded-full text-slate-300">Day {dayId || 12} of 60</span>
      </div>
      <h2 className="text-lg font-bold">{day12Task.title}</h2>
      <p className="text-xs text-slate-400">{day12Task.description}</p>
      
      <form onSubmit={(e) => { e.preventDefault(); if(github && linkedin) setSubmitted(true); }} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold uppercase">Submit Proof of Work</h3>
        <input 
          type="text" placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" required 
        />
        <input 
          type="text" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white" required 
        />
        <button type="submit" className={`w-full py-3 rounded-xl text-xs font-bold ${submitted ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
          {submitted ? '✓ Verified & Complete!' : 'Submit Proof of Work'}
        </button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/day/:dayId" element={<ChallengeDayPage />} />
      </Routes>
    </BrowserRouter>
  );
}