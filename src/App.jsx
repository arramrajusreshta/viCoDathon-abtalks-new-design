import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { studentData, day12Task } from './mockData';

// 1. Landing Page (/)
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col justify-between max-w-[390px] mx-auto border-x border-slate-800">
      <header className="py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">ABTalks</h1>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">60-Day Challenge</span>
      </header>

      <main className="my-auto space-y-6">
        <h2 className="text-3xl font-extrabold leading-tight">
          Build Consistency. Get Visible to Recruiters.
        </h2>
        <p className="text-slate-400 text-sm">
          A 60-day daily coding sprint for Indian college students. Code every day, post proof of work, and land your dream tech job.
        </p>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h4 className="font-semibold text-sm">Daily Proof of Work</h4>
              <p className="text-xs text-slate-400">1 GitHub Commit + 1 LinkedIn Post daily</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold transition text-center block"
        >
          Start Challenge →
        </button>
      </main>

      <footer className="text-center text-xs text-slate-500 py-4">
        Mobile-first experience for late-night builders.
      </footer>
    </div>
  );
}

// 2. Dashboard Page (/dashboard)
function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 max-w-[390px] mx-auto border-x border-slate-800 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold">{studentData.name}</h2>
          <p className="text-xs text-slate-400">{studentData.track}</p>
        </div>
        <Link to="/" className="text-xs text-slate-500 hover:text-slate-300">Logout</Link>
      </div>

      {/* Streak Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 to-indigo-500/20 border border-orange-500/30 p-4 rounded-2xl flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-bold text-orange-400 tracking-wider">Current Streak</span>
          <h3 className="text-3xl font-extrabold text-orange-500">{studentData.currentStreak} Days 🔥</h3>
        </div>
        <div className="text-right text-xs text-slate-400">
          <p>{studentData.completedDays} / {studentData.totalDays} Done</p>
        </div>
      </div>

      {/* Today's Action */}
      <div className="bg-slate-900 border border-indigo-500/30 p-4 rounded-xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-indigo-400">TODAY'S TASK</span>
          <span className="text-xs text-slate-400">Day 12</span>
        </div>
        <h4 className="font-bold text-sm">{day12Task.title}</h4>
        <button 
          onClick={() => navigate('/day/12')}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Open Day 12 Challenge →
        </button>
      </div>
    </div>
  );
}

// 3. Challenge Day Page (/day/12)
function ChallengeDayPage() {
  const { dayId } = useParams();
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(github && linkedin) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 max-w-[390px] mx-auto border-x border-slate-800 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <Link to="/dashboard" className="text-xs text-indigo-400">← Back to Dashboard</Link>
        <span className="text-xs font-bold bg-slate-800 px-2.5 py-1 rounded-full">Day {dayId || 12}</span>
      </div>

      <div>
        <h2 className="text-xl font-bold">{day12Task.title}</h2>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{day12Task.description}</p>
      </div>

      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
        <h4 className="text-xs font-bold text-slate-300">Requirements:</h4>
        <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
          {day12Task.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-indigo-300">Submit Proof of Work</h3>
        
        <div>
          <label className="text-xs text-slate-400 block mb-1">GitHub Commit / Repo URL</label>
          <input 
            type="text" 
            placeholder="https://github.com/..." 
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-1">LinkedIn Post URL</label>
          <input 
            type="text" 
            placeholder="https://linkedin.com/posts/..." 
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <button 
          type="submit" 
          className={`w-full py-3 rounded-lg text-xs font-bold transition ${
            submitted ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {submitted ? '✓ Submitted Successfully!' : 'Complete Day 12'}
        </button>
      </form>
    </div>
  );
}

// App Router Configuration
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