import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Leaderboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const pageSize = 20;

  useEffect(() => {
    loadLeaderboard();
  }, [page]);

  async function loadLeaderboard() {
    setLoading(true);

    const { data, error } = await supabase.rpc("get_leaderboard", {
      page_number: page,
      page_size: pageSize,
    });

    if (error) {
      console.error("Leaderboard error:", error);
    } else {
      setStudents(data || []);
    }

    setLoading(false);
  }

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
          Leaderboard
        </h1>

        <div className="w-16" />
      </header>

      <div className="px-5 pt-5">

        {/* Intro */}
        <div className="bg-gradient-to-r from-orange-950/40 to-slate-900 border border-orange-500/20 rounded-2xl p-4 mb-5">
          <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
            ABTalks 60D
          </p>

          <h2 className="text-lg font-bold text-white mt-1">
            Live Rankings
          </h2>

          <p className="text-[10px] text-slate-400 mt-1">
            Ranked by active streak and completed challenges.
          </p>
        </div>

        {/* Leaderboard */}
        {loading ? (
          <p className="text-center text-xs text-slate-400">
            Loading leaderboard...
          </p>
        ) : students.length === 0 ? (
          <p className="text-center text-xs text-slate-400">
            No students found.
          </p>
        ) : (
          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3"
              >
                {/* Rank */}
                <div className="w-8 text-center">
                  <span
                    className={`text-sm font-black ${
                      student.rank === 1
                        ? "text-amber-400"
                        : student.rank === 2
                        ? "text-slate-300"
                        : student.rank === 3
                        ? "text-orange-400"
                        : "text-slate-500"
                    }`}
                  >
                    #{student.rank}
                  </span>
                </div>

                {/* Student */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {student.name || "Anonymous Student"}
                  </p>

                  <p className="text-[10px] text-slate-500 truncate">
                    {student.college || "College not added"}
                  </p>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <p className="text-xs font-bold text-amber-400">
                    🔥 {student.current_streak}
                  </p>

                  <p className="text-[9px] text-slate-500">
                    {student.completed_days} completed
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-5">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs disabled:opacity-30"
          >
            ← Previous
          </button>

          <span className="text-[10px] text-slate-500">
            Page {page}
          </span>

          <button
            disabled={students.length < pageSize}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs disabled:opacity-30"
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}