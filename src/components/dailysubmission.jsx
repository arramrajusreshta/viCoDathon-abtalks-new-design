import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function DailySubmission({ user, currentDay = 1, onSubmissionSuccess }) {
  const [githubLink, setGithubLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Step 1: Verify proof live via backend endpoint
      const res = await fetch('/api/verify-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUrl: githubLink,
          linkedinUrl: linkedinLink,
          githubUsername: user?.user_metadata?.github_username || '',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.verified) {
        setErrorMsg(data.message || 'Verification failed.');
        setLoading(false);
        return;
      }

      // Step 2: Save directly into Supabase DB
      const { error } = await supabase.from('submissions').insert([
        {
          user_id: user?.id,
          day_number: currentDay,
          github_url: githubLink,
          linkedin_url: linkedinLink,
          verified: true,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      if (onSubmissionSuccess) onSubmissionSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 max-w-lg w-full text-white shadow-2xl shadow-amber-500/5">
      {/* Glow Effects */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Day {currentDay} / 60
          </span>
          <h3 className="text-2xl font-black mt-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Submit Daily Proof
          </h3>
        </div>
        <div className="h-10 w-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold shadow-inner">
          ⚡
        </div>
      </div>

      {success ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
            ✓
          </div>
          <h4 className="text-xl font-bold text-white">Proof Verified!</h4>
          <p className="text-xs text-slate-400">Your streak has been updated for Day {currentDay}. Keep building!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmission} className="space-y-5">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-start gap-3">
              <span className="text-sm">⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              GitHub Commit or PR URL
            </label>
            <div className="relative">
              <input
                type="url"
                required
                placeholder="https://github.com/user/repo/commit/3a8f..."
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              LinkedIn Post URL
            </label>
            <div className="relative">
              <input
                type="url"
                required
                placeholder="https://linkedin.com/posts/activity-..."
                value={linkedinLink}
                onChange={(e) => setLinkedinLink(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verifying Proof with GitHub...
              </span>
            ) : (
              'Verify & Submit Proof'
            )}
          </button>
        </form>
      )}
    </div>
  );
}