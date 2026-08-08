import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { mockStudentData } from './mockData';

// --- SHARED MOBILE HEADER ---
function MobileHeader() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between max-w-[390px] mx-auto">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-orange-500/20">
          AB
        </div>
        <span className="text-base font-bold text-white tracking-tight">ABTalks <span className="text-xs font-normal text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded-full border border-orange-500/20">60D</span></span>
      </div>
      <Link to="/dashboard" className="text-xs bg-slate-800 text-slate-200 hover:text-white px-3 py-1.5 rounded-full border border-slate-700 font-medium">
        Dashboard
      </Link>
    </header>
  );
}

// --- SCREEN 1: LANDING PAGE ( / ) ---
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between max-w-[390px] mx-auto pb-10">
      <div>
        <MobileHeader />
        
        {/* Hero Section */}
        <div className="px-5 pt-8 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            <span>🔥</span> Next Cohort Starts Tomorrow
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-3">
            Build Every Day. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Get Hired First.</span>
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            A 60-day public proof-of-work challenge for Indian college students. Submit daily code & LinkedIn posts to build consistency recruiters trust.
          </p>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-transform"
          >
            Accept 60-Day Challenge →
          </button>
        </div>

        {/* Proof of Work Concept */}
        <div className="px-5 my-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Daily Proof Required</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-lg">💻</span>
                <div>
                  <p className="text-xs font-semibold text-slate-200">1. GitHub Commit</p>
                  <p className="text-[10px] text-slate-400">Push working code daily</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-xs font-semibold text-slate-200">2. LinkedIn Reflection</p>
                  <p className="text-[10px] text-slate-400">Publicly document your progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Trust */}
        <div className="px-5 grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
            <p className="text-xl font-extrabold text-amber-400">1,280+</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Students Building</p>
          </div>
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
            <p className="text-xl font-extrabold text-emerald-400">60 Days</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Public Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SCREEN 2: STUDENT DASHBOARD ( /dashboard ) ---
function StudentDashboard() {
  const navigate = useNavigate();
  const data = mockStudentData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-[390px] mx-auto pb-12">
      <MobileHeader />

      <div className="px-5 pt-5 space-y-5">
        {/* Student Welcome & Profile */}
        <div className="flex items-center justify-between bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">{data.name}</h2>
            <p className="text-[11px] text-slate-400">{data.college} • {data.track}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Rank #{data.rank}
            </span>
          </div>
        </div>

        {/* Streak & Completion Essentials */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 rounded-2xl border border-amber-500/20 relative overflow-hidden">
            <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Current Streak</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-amber-400">🔥 {data.streak}</span>
              <span className="text-xs text-amber-300/80">Days</span>
            </div>
            <p className="text-[10px] text-amber-200/60 mt-1">Keep it alive tonight!</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Progress</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-white">{Math.round((data.completedDays / data.totalDays) * 100)}%</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{data.completedDays} of {data.totalDays} Days Done</p>
          </div>
        </div>

        {/* Today's Action Card */}
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Today • Day {data.todayTask.dayNumber}
            </span>
            <span className="text-[10px] text-slate-400">Due 11:59 PM</span>
          </div>

          <h3 className="text-sm font-bold text-white mb-1">{data.todayTask.title}</h3>
          <p className="text-[11px] text-slate-400 line-clamp-2 mb-4">{data.todayTask.description}</p>

          <button 
            onClick={() => navigate(`/day/${data.todayTask.dayNumber}`)}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Start Day {data.todayTask.dayNumber} Task →
          </button>
        </div>

        {/* 60-Day Progress Grid (Handles Streak & Missed Day Edge Cases) */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-300">60-Day Route Map</h4>
            <span className="text-[10px] text-slate-400">Green = Complete</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 18 }, (_, i) => {
              const dayNum = i + 1;
              const isCompleted = dayNum <= data.completedDays && !data.missedDays.includes(dayNum);
              const isMissed = data.missedDays.includes(dayNum);
              const isToday = dayNum === data.todayTask.dayNumber;

              return (
                <button
                  key={dayNum}
                  onClick={() => navigate(`/day/${dayNum}`)}
                  className={`h-9 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold border transition-all ${
                    isToday
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400 ring-2 ring-orange-500/30'
                      : isCompleted
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : isMissed
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}
                >
                  <span>D{dayNum}</span>
                  {isMissed && <span className="text-[8px] -mt-1">✖</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SCREEN 3: CHALLENGE DAY ( /day/12 ) ---
function ChallengeDay() {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const task = mockStudentData.todayTask;

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (githubUrl && linkedinUrl) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-[390px] mx-auto pb-12">
      <MobileHeader />

      <div className="px-5 pt-4 space-y-4">
        {/* Back Link & Title */}
        <div>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2"
          >
            ← Back to Dashboard
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
              Day {dayId || task.dayNumber} of 60
            </span>
            <span className="text-[10px] text-slate-400">{task.category}</span>
          </div>
          <h1 className="text-lg font-extrabold text-white leading-snug">{task.title}</h1>
        </div>

        {/* Task Brief */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Instructions</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{task.description}</p>

          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-semibold text-slate-400">Acceptance Criteria:</p>
            {task.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-amber-400">✓</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proof of Work Submission Form */}
        <div className="bg-slate-900/90 border border-orange-500/30 p-4 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <span>🚀</span> Submit Proof of Work
          </h3>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <span className="text-2xl">🎉</span>
              <h4 className="text-xs font-bold text-emerald-400">Day {dayId} Proof Submitted!</h4>
              <p className="text-[10px] text-slate-300">Your streak has been extended to 12 Days.</p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="mt-2 w-full py-2 bg-slate-800 text-xs font-semibold rounded-lg text-white"
              >
                Return to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  1. GitHub Repository or Commit URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/repo/commit/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  2. LinkedIn Post URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://linkedin.com/posts/..."
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg active:scale-[0.98] transition-transform"
              >
                Submit Day {dayId || task.dayNumber} Proof →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// --- APP ROUTER ---
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/day/:dayId" element={<ChallengeDay />} />
    </Routes>
  );
}