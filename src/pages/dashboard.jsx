import React, { useState, useEffect } from "react";
import ActivityHeatmap from "../components/ActivityHeatmap";

export default function Dashboard() {
  const [freezeTokens, setFreezeTokens] = useState(() => {
    return Number(localStorage.getItem('abtalks_freeze_tokens') ?? 2);
  });
  const [frozenDays, setFrozenDays] = useState(() => {
    const saved = localStorage.getItem('abtalks_frozen_days');
    return saved ? JSON.parse(saved) : [];
  });

  // --- MOCK SQUAD DATA ---
  const squadMembers = [
    { name: "Priya Sharma", track: "Full-Stack Web Dev", status: "submitted", time: "10 mins ago" },
    { name: "Rahul Verma", track: "Full-Stack Web Dev", status: "mid-task", time: "Active now" },
    { name: "Ananya Iyer", track: "Full-Stack Web Dev", status: "missed", time: "Offline" },
    { name: "Karan Patel", track: "Full-Stack Web Dev", status: "submitted", time: "1 hour ago" }
  ];

  // --- AUTOMATIC STREAK FREEZE CHECKER ---
  useEffect(() => {
    const challengeStart = new Date("2026-08-09T00:00:00+05:30");
    const today = new Date();
    const diffMs = today - challengeStart;
    const currentDay = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    
    const yesterday = currentDay - 1;
    if (yesterday > 0) {
      const completedDays = JSON.parse(localStorage.getItem('abtalks_completed_days') || "[]");
      
      if (!completedDays.includes(yesterday) && !frozenDays.includes(yesterday)) {
        if (freezeTokens > 0) {
          const updatedTokens = freezeTokens - 1;
          const updatedDays = [...frozenDays, yesterday];

          setFreezeTokens(updatedTokens);
          setFrozenDays(updatedDays);

          localStorage.setItem('abtalks_freeze_tokens', updatedTokens);
          localStorage.setItem('abtalks_frozen_days', JSON.stringify(updatedDays));

          alert(`⚡ Auto-Pilot: You missed Day ${yesterday}. A Streak Freeze Token was automatically applied to save your streak! ❄️`);
        }
      }
    }
  }, []);

  function handleUseFreeze(missedDayNumber) {
    if (freezeTokens <= 0) {
      alert("You are out of freeze tokens for this month!");
      return;
    }

    if (frozenDays.includes(missedDayNumber)) {
      alert(`Day ${missedDayNumber} is already frozen! ❄️`);
      return;
    }

    const updatedTokens = freezeTokens - 1;
    const updatedDays = [...frozenDays, missedDayNumber];

    setFreezeTokens(updatedTokens);
    setFrozenDays(updatedDays);

    localStorage.setItem('abtalks_freeze_tokens', updatedTokens);
    localStorage.setItem('abtalks_frozen_days', JSON.stringify(updatedDays));

    alert(`Day ${missedDayNumber} successfully protected with a Freeze Token! ❄️`);
  }

  return (
    <div className="p-5 max-w-[390px] mx-auto text-slate-100 space-y-5">
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Streak Freeze Local Widget */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">❄️</span>
            <h4 className="text-xs font-bold text-white">Streak Freeze Tokens</h4>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            You have <span className="text-blue-400 font-semibold">{freezeTokens} tokens</span> left. 
            {frozenDays.length > 0 && ` (${frozenDays.length} frozen)`}
          </p>
        </div>
        <button
          onClick={() => {
            const dayInput = prompt("Enter the past missed day number you want to freeze (1-60):");
            if (dayInput) handleUseFreeze(Number(dayInput));
          }}
          className="text-[10px] bg-blue-600/25 hover:bg-blue-600/40 text-blue-300 border border-blue-500/40 px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer"
        >
          Use Freeze 🧊
        </button>
      </div>

      {/* --- SQUAD / COHORT VIEW PANEL --- */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <span>👥</span> Your Track Squad Tonight
          </h3>
          <span className="text-[9px] text-slate-400">Visible Company</span>
        </div>
        
        <div className="space-y-2">
          {squadMembers.map((member, index) => {
            let statusBadge = null;
            if (member.status === "submitted") {
              statusBadge = <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">Submitted ✅</span>;
            } else if (member.status === "mid-task") {
              statusBadge = <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">Mid-task 💻</span>;
            } else {
              statusBadge = <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-medium">Missed 🌙</span>;
            }

            return (
              <div key={index} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div>
                  <p className="text-xs font-semibold text-slate-200">{member.name}</p>
                  <p className="text-[9px] text-slate-400">{member.time}</p>
                </div>
                <div>{statusBadge}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* --------------------------------- */}

      {/* 60-Day Activity Heatmap */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <ActivityHeatmap />
      </div>
    </div>
  );
}