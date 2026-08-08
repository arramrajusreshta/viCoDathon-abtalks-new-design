import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeaderboard = async (currentPage) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?page=${currentPage}&limit=10`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.data || []);
        setTotalPages(data.pagination.totalPages || 1);
      }
    } catch (err) {
      console.error('Leaderboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(page);
  }, [page]);

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="text-lg">🥇</span>;
    if (rank === 2) return <span className="text-lg">🥈</span>;
    if (rank === 3) return <span className="text-lg">🥉</span>;
    return <span className="text-xs font-bold text-slate-500">#{rank}</span>;
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 w-full max-w-4xl text-white shadow-2xl">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Global Leaderboard
          </h2>
          <p className="text-xs text-slate-400 mt-1">Live rankings calculated by active streaks and verified proof.</p>
        </div>
        <div className="text-xs text-amber-400 font-semibold bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
          Updated Live
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 py-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-800/40 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Builder</th>
                  <th className="py-3 px-4">College</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4 text-right">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {students.map((student, idx) => {
                  const globalRank = (page - 1) * 10 + idx + 1;
                  return (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-bold">{getRankBadge(globalRank)}</td>
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                          {(student.full_name || 'A')[0].toUpperCase()}
                        </div>
                        {student.full_name || 'Anonymous Builder'}
                      </td>
                      <td className="py-4 px-4 text-slate-400">{student.college || 'N/A'}</td>
                      <td className="py-4 px-4">
                        <span className="bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-full border border-slate-700">
                          {student.track || 'Full-Stack'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-black text-amber-400 text-sm">
                        ⚡ {student.streak_count || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800 text-xs">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold disabled:opacity-30 transition-all"
            >
              ← Previous
            </button>
            <span className="text-slate-400">Page <strong className="text-white">{page}</strong> of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold disabled:opacity-30 transition-all"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}