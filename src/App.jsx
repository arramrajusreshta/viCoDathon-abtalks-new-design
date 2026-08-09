import { supabase } from "./lib/supabase";
import Leaderboard from "./pages/leaderboard";
import Auth from "./pages/auth";
import Curriculum from "./pages/curriculum";
import ActivityHeatmap from "./components/ActivityHeatmap";
import Profile from './pages/profile';
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { curriculumData } from "./curriculumData";

// --- MOCK DATA ---
const mockStudentData = {
  name: "Aarav Sharma",
  college: "IIT Bombay",
  track: "Full-Stack Web Dev",
  streak: 11,
  totalDays: 60,
  completedDays: 11,
  rank: 42,
  totalStudents: 1280,
  missedDays: [5],
  todayTask: {
    dayNumber: 12,
    title: "Build a Custom Hook for API Caching",
    category: "React / State Management",
    description: "Create a reusable `useFetch` hook in React that caches API responses in `localStorage` to avoid duplicate network calls.",
    requirements: [
      "Accept URL and cache expiration time as parameters",
      "Store fetched data in localStorage",
      "Return { data, loading, error, refetch }"
    ],
    githubSubmitted: false,
    linkedinSubmitted: false
  }
};

// --- SHARED MOBILE HEADER ---
function MobileHeader() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/auth");
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 max-w-[390px] mx-auto">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center font-black text-white text-sm">
            AB
          </div>

          <span className="text-base font-bold text-white">
            ABTalks
            <span className="text-xs font-normal text-orange-400 ml-1">
              60D
            </span>
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="text-[10px] bg-rose-500/10 text-rose-400 px-3 py-1.5 rounded-full border border-rose-500/20"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-[10px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="text-[10px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          Profile
        </button>

        <button
          onClick={() => navigate("/curriculum")}
          className="text-[10px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          Curriculum
        </button>

        <button
          onClick={() => navigate("/leaderboard")}
          className="text-[10px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          Leaderboard
        </button>
      </div>
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

const [profile, setProfile] = useState(null);
const [rank, setRank] = useState(null);
const [loading, setLoading] = useState(true);
const [missedToday, setMissedToday] = useState(false);

const data = mockStudentData;

useEffect(() => {
  loadDashboardData();
}, []);

async function loadDashboardData() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Dashboard profile error:", profileError);
  } else {
    setProfile(profileData);
  }
  const previousDay = safeCurrentDay - 1;

if (previousDay >= 1) {
  const { data: missedData, error: missedError } = await supabase
    .from("missed_days")
    .select("day_number")
    .eq("user_id", user.id)
    .eq("day_number", previousDay)
    .maybeSingle();

  if (missedError) {
    console.error("Missed day check error:", missedError);
  } else {
    setMissedToday(!!missedData);
  }
} else {
  setMissedToday(false);
}

  const { data: leaderboardData, error: leaderboardError } =
    await supabase.rpc("get_leaderboard", {
      page_number: 1,
      page_size: 1000,
    });

  if (leaderboardError) {
    console.error("Dashboard rank error:", leaderboardError);
  } else {
    const me = leaderboardData?.find((student) => student.id === user.id);
    setRank(me?.rank ?? null);
  }

  setLoading(false);
}
const challengeStart = new Date("2026-08-09T00:00:00+05:30");
const today = new Date();

const diffMs = today - challengeStart;
const currentDay = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

const safeCurrentDay = Math.min(Math.max(currentDay, 1), 60);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-[390px] mx-auto pb-12">
      <MobileHeader />

      <div className="px-5 pt-5 space-y-5">
        {/* Student Welcome & Profile */}
        <div className="flex items-center justify-between bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">
  {profile?.name || "Your Name"}
</h2>

<p className="text-[11px] text-slate-400">
  {profile?.college || "College not added"} •{" "}
  {profile?.track || "Track not added"}
</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              {rank ? `Rank #${rank}` : "Unranked"}
            </span>
          </div>
        </div>

        {/* Streak & Completion Essentials */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 rounded-2xl border border-amber-500/20 relative overflow-hidden">
            <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Current Streak</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-amber-400">🔥 {profile?.current_streak ?? 0}</span>
              <span className="text-xs text-amber-300/80">Days</span>
            </div>
            <p className="text-[10px] text-amber-200/60 mt-1">
  {missedToday
    ? "Yesterday was missed — start a new streak today."
    : (profile?.current_streak ?? 0) === 0
    ? "Start your streak today!"
    : "Keep it alive tonight!"}
</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Progress</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-white">{Math.round(((profile?.completed_days ?? 0) / 60) * 100)}%</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{profile?.completed_days ?? 0} of 60 Days Done</p>
          </div>
        </div>

        {/* Today's Action Card */}
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Today • Day {safeCurrentDay}
            </span>
            <span className="text-[10px] text-slate-400">Due 11:59 PM</span>
          </div>

          <h3 className="text-sm font-bold text-white mb-1">{data.todayTask.title}</h3>
          <p className="text-[11px] text-slate-400 line-clamp-2 mb-4">{data.todayTask.description}</p>

          <button 
            onClick={() => navigate(`/day/${safeCurrentDay}`)}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Start Day {safeCurrentDay} Task →
          </button>
        </div>

        {/* 60-Day Progress Grid */}
        <ActivityHeatmap />
      </div>
    </div>
  );
}

// --- SCREEN 3: CHALLENGE DAY ( /day/12 ) ---
function ChallengeDay() {
  const { dayId } = useParams();
const navigate = useNavigate();

const task = curriculumData.find(
  (item) => item.day === Number(dayId)
);
if (!task) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <p className="text-sm text-slate-400">
        Challenge not found.
      </p>
    </div>
  );
}

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  setSubmitting(true);
  setSubmitError("");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setSubmitError("You must be logged in to submit proof.");
    setSubmitting(false);
    return;
  }

  const dayNumber = Number(dayId || task.day);

  const { data: submission, error } = await supabase
  .from("submissions")
  .upsert(
    {
      user_id: user.id,
      day_number: dayNumber,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      github_verified: false,
      linkedin_verified: false,
      submitted_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,day_number",
    }
  )
  .select()
  .single();

  if (error) {
    console.error("Submission error:", error);
    setSubmitError(error.message);
    setSubmitting(false);
    return;
  }
  const { data: verificationData, error: verificationError } =
  await supabase.functions.invoke("verify-github", {
    body: {
      submissionId: submission.id,
      githubUrl: githubUrl,
    },
  });

if (verificationError) {
  console.error("GitHub verification error:", verificationError);
  setSubmitError(
    "Submission saved, but GitHub verification failed."
  );
  setSubmitting(false);
  return;
}

console.log("GitHub verification:", verificationData);
const { data: linkedinVerificationData, error: linkedinVerificationError } =
  await supabase.functions.invoke("verify-linkedin", {
    body: {
      submissionId: submission.id,
      linkedinUrl: linkedinUrl,
    },
  });

if (linkedinVerificationError) {
  console.error(
    "LinkedIn verification error:",
    linkedinVerificationError
  );

  setSubmitError(
    "Submission saved, but LinkedIn verification failed."
  );

  setSubmitting(false);
  return;
}

console.log(
  "LinkedIn verification:",
  linkedinVerificationData
);
  setSubmitted(true);
  setSubmitting(false);
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
              Day {dayId || task.day} of 60
            </span>
            <span className="text-[10px] text-slate-400">{task.category}</span>
          </div>
          <h1 className="text-lg font-extrabold text-white leading-snug">{task.title}</h1>
        </div>

        {/* Task Brief */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Instructions</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{task.description}</p>

          <div className="space-y-2 pt-1">
  <p className="text-[11px] font-semibold text-slate-400">
    Problem Statement:
  </p>

  <p className="text-xs text-slate-300">
    {task.problem}
  </p>

  <p className="text-[11px] font-semibold text-slate-400 mt-3">
    Resources:
  </p>

  {task.resources.map((resource, idx) => (
    <div
      key={idx}
      className="flex items-start gap-2 text-xs text-slate-300"
    >
      <span className="text-amber-400">✓</span>
      <span>{resource}</span>
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
              <p className="text-[10px] text-slate-300">
  Your proof was submitted and is awaiting verification.
</p>
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
{submitError && (
  <p className="text-[10px] text-rose-400">
    {submitError}
  </p>
)}
              <button
  type="submit"
  disabled={submitting}
  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50"
>
  {submitting
    ? "Submitting..."
    : `Submit Day ${dayId || task.day} Proof →`}
</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setChecking(false);

      if (!session) {
        navigate("/auth");
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        navigate("/auth");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-xs text-slate-400">Checking session...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return children;
}
// --- APP ROUTER ---
export default function App() {
  return (
    <Routes>
  {/* Public routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/auth" element={<Auth />} />

  {/* Protected routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />

  <Route
    path="/curriculum"
    element={
      <ProtectedRoute>
        <Curriculum />
      </ProtectedRoute>
    }
  />

  <Route
    path="/leaderboard"
    element={
      <ProtectedRoute>
        <Leaderboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/day/:dayId"
    element={
      <ProtectedRoute>
        <ChallengeDay />
      </ProtectedRoute>
    }
  />
</Routes>
  );
}