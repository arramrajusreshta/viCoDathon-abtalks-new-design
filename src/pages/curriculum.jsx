import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { curriculumData } from "../curriculumData";



export default function Curriculum() {
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState(null);
  const [verifiedDays, setVerifiedDays] = useState([]);
const [missedDays, setMissedDays] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  loadCurriculumProgress();
}, []);

async function loadCurriculumProgress() {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

  const { data: submissions, error: submissionsError } = await supabase
    .from("submissions")
    .select("day_number")
    .eq("user_id", user.id)
    .eq("github_verified", true)
    .eq("linkedin_verified", true);

  const { data: missed, error: missedError } = await supabase
    .from("missed_days")
    .select("day_number")
    .eq("user_id", user.id);

  if (submissionsError) {
    console.error("Curriculum submissions error:", submissionsError);
  }

  if (missedError) {
    console.error("Curriculum missed days error:", missedError);
  }

  setVerifiedDays(
    (submissions || []).map((item) => Number(item.day_number))
  );

  setMissedDays(
    (missed || []).map((item) => Number(item.day_number))
  );

  setLoading(false);
}
const verifiedSet = new Set(verifiedDays);
const missedSet = new Set(missedDays);

const challengeStart = new Date("2026-08-09T00:00:00+05:30");
const today = new Date();

const diffMs = today - challengeStart;
const currentDay =
  Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

const safeCurrentDay = Math.min(Math.max(currentDay, 1), 60);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-[390px] mx-auto pb-12">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs text-slate-400 hover:text-white"
        >
          ← Dashboard
        </button>

        <h1 className="text-sm font-bold text-white">
          Curriculum
        </h1>

        <span className="text-[10px] text-orange-400">
          60 Days
        </span>
      </header>

      <div className="px-5 pt-5 space-y-3">

        {/* Intro */}
        <div className="bg-gradient-to-r from-orange-950/40 to-slate-900 border border-orange-500/20 rounded-2xl p-4">
          <h2 className="text-base font-bold text-white">
            60-Day Curriculum
          </h2>

          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            Work through every challenge, explore the resources, and build
            your public proof of work.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                style={{
  width: `${(verifiedDays.length / 60) * 100}%`,
}}
              />
            </div>

            <span className="text-[10px] text-slate-400">
              {verifiedDays.length}/60
            </span>
          </div>
        </div>

        {/* Curriculum List */}
        <div className="space-y-2">
          {curriculumData.map((item) => {
  const expanded = expandedDay === item.day;

  const isCompleted = verifiedSet.has(item.day);
  const isMissed = missedSet.has(item.day);
  const isToday = item.day === safeCurrentDay;
  const isFuture = item.day > safeCurrentDay;

  return (
  <div
    key={item.day}
    className={`rounded-2xl border overflow-hidden transition-all ${
      isCompleted
        ? "bg-slate-900 border-emerald-500/20"
        : isMissed
        ? "bg-slate-900 border-rose-500/20"
        : isToday
        ? "bg-slate-900 border-orange-500/20"
        : "bg-slate-950 border-slate-800 opacity-60"
    }`}
  >

    {/* Day Header */}
    <button
      disabled={isFuture}
      onClick={() =>
        setExpandedDay(
          expanded ? null : item.day
        )
                  }
                  className="w-full p-4 text-left flex items-center gap-3"
                >

                  {/* Day Number */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${
  isCompleted
    ? "bg-emerald-500/10 text-emerald-400"
    : isMissed
    ? "bg-rose-500/10 text-rose-400"
    : isToday
    ? "bg-orange-500/10 text-orange-400"
    : "bg-slate-900 text-slate-600"
}`}
>
  {isCompleted
    ? "✓"
    : isMissed
    ? "✕"
    : isFuture
    ? "🔒"
    : `D${item.day}`}
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-500">
                        DAY {item.day}
                      </span>

                      <span className="text-[9px] text-orange-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white mt-1 truncate">
                      {item.title}
                    </h3>
                  </div>

                  {!isFuture && (
  <>
    {expanded ? "▲" : "▼"}
  </>
)}
                </button>

                {/* Expanded Content */}
                {/* Expanded Content */}
{expanded && !isFuture && (
  <div className="px-4 pb-4 border-t border-slate-800">

                    <div className="pt-4 space-y-4">

                      {/* Brief */}
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Task Brief
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Problem */}
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Problem Statement
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed mt-1">
                          {item.problem}
                        </p>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Reference Resources
                        </h4>

                        <div className="space-y-1.5">
                          {item.resources.map((resource) => (
                            <button
                              key={resource}
                              className="w-full text-left p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:border-orange-500/30"
                            >
                              📚 {resource}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Starter Template */}
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Starter Template
                        </h4>

                        <button className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-orange-400 hover:border-orange-500/30">
                          📦 Download Starter Template
                        </button>
                      </div>

                      {/* Open Challenge */}
                      <button
                        onClick={() =>
                          navigate(`/day/${item.day}`)
                        }
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs"
                      >
                        Open Day {item.day} Challenge →
                      </button>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}