import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ActivityHeatmap() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
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
      .select("day_number, github_verified, linkedin_verified")
      .eq("user_id", user.id);

    const { data: missedDays, error: missedError } = await supabase
      .from("missed_days")
      .select("day_number")
      .eq("user_id", user.id);

    if (submissionsError) {
      console.error("Submission activity error:", submissionsError);
    }

    if (missedError) {
      console.error("Missed days error:", missedError);
    }

    const completedSet = new Set(
      (submissions || [])
        .filter(
          (item) =>
            item.github_verified === true &&
            item.linkedin_verified === true
        )
        .map((item) => item.day_number)
    );

    const missedSet = new Set(
      (missedDays || []).map((item) => item.day_number)
    );

    // Challenge starts Aug 9, 2026
    const startDate = new Date("2026-08-09T00:00:00+05:30");
    const now = new Date();

    const diffMs = now - startDate;
    const currentDay =
      Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

    const days = Array.from({ length: 60 }, (_, index) => {
      const day = index + 1;

      if (completedSet.has(day)) {
        return {
          day,
          status: "completed",
        };
      }

      if (missedSet.has(day)) {
        return {
          day,
          status: "missed",
        };
      }

      if (day === currentDay && currentDay >= 1 && currentDay <= 60) {
        return {
          day,
          status: "today",
        };
      }

      return {
        day,
        status: "future",
      };
    });

    setActivity(days);
    setLoading(false);
  }

  const getCellStyle = (item) => {
    if (item.status === "completed") {
      return "bg-emerald-500 border-emerald-400";
    }

    if (item.status === "missed") {
      return "bg-rose-500/30 border-rose-500/50";
    }

    if (item.status === "today") {
      return "bg-orange-500 border-orange-400 ring-2 ring-orange-500/30";
    }

    return "bg-slate-950 border-slate-800";
  };

  if (loading) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <p className="text-xs text-slate-400">
          Loading activity...
        </p>
      </div>
    );
  }

  const completedCount = activity.filter(
    (item) => item.status === "completed"
  ).length;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold text-white">
            60-Day Activity
          </h3>

          <p className="text-[10px] text-slate-500 mt-1">
            Your verified proof-of-work journey
          </p>
        </div>

        <span className="text-[10px] text-emerald-400">
          {completedCount} completed
        </span>
      </div>

      <div className="grid grid-cols-10 gap-1.5">
        {activity.map((item) => (
          <button
            key={item.day}
            onClick={() => setSelectedDay(item)}
            className={`aspect-square rounded-md border transition-all duration-200 hover:scale-110 ${getCellStyle(
              item
            )}`}
          >
            <span className="sr-only">
              Day {item.day}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 text-[9px] text-slate-500">
        <span>Future</span>
        <span className="text-emerald-400">Completed</span>
        <span className="text-rose-400">Missed</span>
        <span className="text-orange-400">Today</span>
      </div>

      {selectedDay && (
        <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold text-white">
                Day {selectedDay.day}
              </p>

              <p className="text-[10px] text-slate-400 mt-1 capitalize">
                {selectedDay.status}
              </p>
            </div>

            <button
              onClick={() => setSelectedDay(null)}
              className="text-slate-500 hover:text-white"
            >
              ✕
            </button>

          </div>
        </div>
      )}
    </div>
  );
}