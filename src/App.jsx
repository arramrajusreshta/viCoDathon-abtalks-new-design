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
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 flex flex-col justify-between max-w-3xl mx-auto border-x border-slate-800 font-sans shadow-2xl my-4 rounded-2xl">
      <header className="py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">ABTalks</h1>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-3 py-1 rounded-full">60-DAY SPRINT</span>
      </header>
      <main className="my-auto space-y-6 py-12">
        <div className="inline-block bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-indigo-300">
          🌙 Built for late-night college coders
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Build Consistency. Get Visible to Recruiters.
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
          Maintain a 60-day public learning streak by submitting 1 GitHub commit and 1 LinkedIn post daily.
        </p>
        <div className="pt-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-sm transition shadow-lg shadow-indigo-600/30 text-center"
          >
            Enter Student Dashboard →
          </button>
        </div>
      </main>
      <footer className="text-center text-xs text-slate-600 py-4 border-t border-slate-900">
        ABTalks Redesign • Responsive View
      </footer>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const [streakState, setStreakState] = useState('active');

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 max-w-3xl mx-auto border-x border-slate-800 space-y-6 font-sans shadow-2xl my-4 rounded-2xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold">{studentData.name}</h2>
          <p className="text-xs text-slate-400">{studentData.track}</p>
        </div>
        <Link to="/" className="text-xs text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">Logout</Link>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-xs space-y-2">
        <p className="text-slate-400 font-semibold">Judge Simulator (Edge Cases):</p>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => setStreakState('active')} className={`py-2 rounded-lg font-semibold transition ${streakState === 'active' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Active</button>
          <button onClick={() => setStreakState('missed')} className={`py-2 rounded-lg font-semibold transition ${streakState === 'missed' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Missed</button>
          <button onClick={() => setStreakState('zero')} className={`py-2 rounded-lg font-semibold transition ${streakState === 'zero' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Day 1</button>
        </div>
      </div>

      {streakState === 'active' && (
        <div className="bg-gradient-to-r from-orange-500/20 to-indigo-500/20 border border-orange-500/30 p-6 rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-xs uppercase font-bold text-orange-400 tracking-wider">Current Streak</span>
            <h3 className="text-3xl font-black text-orange-500 mt-1">{studentData.currentStreak} Days 🔥</h3>
          </div>
          <div className="text-right text-xs text-slate-300">
            <p className="font-bold text-white text-lg">{studentData.completedDays}/60</p>
            <p className="text-slate-400">Days Done</p>
          </div>
        </div>
      )}
      {streakState === 'missed' && (
        <div className="bg-red-950/40 border border-red-500/40 p-6 rounded-2xl space-y-1">
          <h3 className="text-lg font-bold text-red-400">Streak Missed Yesterday ⚠️</h3>
          <p className="text-sm text-slate-300">Submit today's task to repair your streak before midnight!</p>
        </div>
      )}
      {streakState === 'zero' && (
        <div className="bg-slate-900 border border-indigo-500/30 p-6 rounded-2xl space-y-1">
          <h3 className="text-lg font-bold text-white">Day 1 of 60 🚀</h3>
          <p className="text-sm text-slate-400">Complete your first daily challenge to kick off your public streak.</p>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">TODAY'S TASK</span>
          <span className="text-xs text-slate-400 font-medium">Day 12</span>
        </div>
        <h4 className="font-bold text-base md:text-lg">{day12Task.title}</h4>
        <p className="text-xs md:text-sm text-slate-400">{day12Task.description}</p>
        <button 
          onClick={() => navigate('/day/12')}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl text-xs md:text-sm font-bold transition shadow-lg shadow-indigo-600/20"
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
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 max-w-3xl mx-auto border-x border-slate-800 space-y-6 font-sans shadow-2xl my-4 rounded-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <Link to="/dashboard" className="text-xs text-indigo-400 font-semibold hover:underline">← Back to Dashboard</Link>
        <span className="text-xs font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-300">Day {dayId || 12} of 60</span>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{day12Task.title}</h2>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{day12Task.description}</p>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Requirements:</p>
        <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
          {day12Task.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if(github && linkedin) setSubmitted(true); }} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Submit Proof of Work</h3>
        <div className="space-y-3">
          <input 
            type="text" placeholder="GitHub Repository URL" value={github} onChange={(e) => setGithub(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500" required 
          />
          <input 
            type="text" placeholder="LinkedIn Post URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500" required 
          />
        </div>
        <button type="submit" className={`w-full py-4 rounded-xl text-xs font-bold transition shadow-lg ${submitted ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'}`}>
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