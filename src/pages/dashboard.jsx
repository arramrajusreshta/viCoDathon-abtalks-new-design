import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { curriculumData } from "../curriculumData";
import ActivityHeatmap from "../components/ActivityHeatmap";

function MobileHeader() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/auth");
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 max-w-[390px] mx-auto">
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
            <span className="text-xs font-normal text-orange-400 ml-1">60D</span>
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="text-[10px] bg-rose-500/10 text-rose-400 px-3 py-1.5 rounded-full border border-rose-500/20"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
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

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missedToday, setMissedToday] = useState(false);
  const [freezeNotice, setFreezeNotice] = useState("");

  // --- Automatic Streak Freeze States ---
  const [freezeTokens, setFreezeTokens] = useState(() => {
    return Number(localStorage.getItem('abtalks_freeze_tokens') ?? 2);
  });
  const [frozenDays, setFrozenDays] = useState(() => {
    const saved = localStorage.getItem('abtalks_frozen_days');
    return saved ? JSON.parse(saved) : [];
  });

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

    // Calculate challenge day
    const challengeStart = new Date("2026-08-09T00:00:00+05:30");
    const today = new Date();
    const diffMs = today - challengeStart;
    const currentDay = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    const safeCurrentDay = Math.min(Math.max(currentDay, 1), 60);
    const previousDay = safeCurrentDay - 1;

    if (previousDay >= 1) {
      // Check if user submitted proof for the previous day
      const { data: submissionData } = await supabase
        .from("submissions")
        .select("id")
        .eq("user_id", user.id)
        .eq("day_number", previousDay)
        .maybeSingle();

      // If no submission found for previous day, check if it was already missed/frozen
      if (!submissionData) {
        const { data: missedData } = await supabase
          .from("missed_days")
          .select("day_number")
          .eq("user_id", user.id)
          .eq("day_number", previousDay)
          .maybeSingle();

        if (missedData) {
          setMissedToday(true);
          
          // --- AUTOMATIC STREAK FREEZE LOGIC ---
          const currentTokens = Number(localStorage.getItem('abtalks_freeze_tokens') ?? freezeTokens);
          const currentFrozenList = JSON.parse(localStorage.getItem('abtalks_frozen_days') || JSON.stringify(frozenDays));

          if (!currentFrozenList.includes(previousDay)) {
            if (currentTokens > 0) {
              // Automatically consume token
              const updatedTokens = currentTokens - 1;
              const updatedFrozen = [...currentFrozenList, previousDay];

              setFreezeTokens(updatedTokens);
              setFrozenDays(updatedFrozen);

              localStorage.setItem('abtalks_freeze_tokens', updatedTokens);
              localStorage.setItem('abtalks_frozen_days', JSON.stringify(updatedFrozen));

              setFreezeNotice(`❄️ Automatic Streak Freeze applied for Day ${previousDay}! Streak saved.`);
            } else {
              setFreezeNotice(`⚠️ You missed Day ${previousDay} and had 0 freeze tokens left.`);
            }
          }
        }
      }
    }

    // Fetch Leaderboard Rank
    const { data: leaderboardData, error: leaderboardError } =
      await supabase.rpc("get_leaderboard", {
        page_number: 1,
        page_size: 1000,
      });

    if (!leaderboardError) {
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
  const todayTask =
    curriculumData.find((item) => item.day === safeCurrentDay) ||
    curriculumData[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-xs text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-[390px] mx-auto pb-12">
      <MobileHeader />

      <div className="px-5 pt-5 space-y-4">
        {/* Automatic Freeze Notice Banner */}
        {freezeNotice && (
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl text-blue-300 text-[11px] font-medium flex items-center gap-2">
            <span>{freezeNotice}</span>
          </div>
        )}

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
              {frozenDays.length > 0 ? `Protected by ${frozenDays.length} freeze(s)` : "Keep it alive tonight!"}
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

        {/* Streak Freeze Automatic Status Box */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">❄️</span>
              <h4 className="text-xs font-bold text-white">Auto Streak Freeze Active</h4>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Available tokens: <span className="text-blue-400 font-semibold">{freezeTokens}</span> 
              {frozenDays.length > 0 && ` • Protected days: [${frozenDays.join(", ")}]`}
            </p>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-xl font-medium">
            Automated ✨
          </span>
        </div>

        {/* Today's Action Card */}
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Today • Day {safeCurrentDay}
            </span>
            <span className="text-[10px] text-slate-400">Due 11:59 PM</span>
          </div>

          <h3 className="text-sm font-bold text-white mb-1">{todayTask.title}</h3>
          <p className="text-[11px] text-slate-400 line-clamp-2 mb-4">{todayTask.description}</p>

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