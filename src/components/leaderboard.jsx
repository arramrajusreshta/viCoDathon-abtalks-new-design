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
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(page);
  }, [page]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-4xl text-white">
      <h2 className="text-xl font-bold mb-1">Live Leaderboard</h2>
      <p className="text-xs text-slate-400 mb-4">Rankings based on active daily streaks.</p>

      {loading ? (
        <p className="text-xs text-slate-400 text-center py-8">Loading rankings...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">College</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4 text-right">Streak ⚡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {students.map((student, idx) => (
                  <tr key={student.id} className="hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-bold">
                      {(page - 1) * 10 + idx + 1}
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{student.full_name || 'Anonymous'}</td>
                    <td className="py-3 px-4">{student.college || 'N/A'}</td>
                    <td className="py-3 px-4">{student.track || 'N/A'}</td>
                    <td className="py-3 px-4 text-right font-bold text-amber-400">
                      {student.streak_count || 0} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 text-xs">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-slate-800 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-slate-800 rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}