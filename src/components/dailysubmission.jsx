import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function DailySubmission({ user, currentDay, onSubmissionSuccess }) {
  const [githubLink, setGithubLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Send URLs to backend verifier
      const res = await fetch('/api/verify-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUrl: githubLink,
          linkedinUrl: linkedinLink,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.verified) {
        setErrorMsg(data.message || 'Verification failed.');
        setLoading(false);
        return;
      }

      // 2. If verified, save submission into Supabase DB
      const { error } = await supabase.from('submissions').insert([
        {
          user_id: user.id,
          day_number: currentDay,
          github_url: githubLink,
          linkedin_url: linkedinLink,
          verified: true,
        },
      ]);

      if (error) throw error;

      alert('✅ Day completed and verified!');
      if (onSubmissionSuccess) onSubmissionSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-md w-full text-white">
      <h3 className="text-lg font-bold mb-1">Submit Proof — Day {currentDay}</h3>
      <p className="text-xs text-slate-400 mb-4">Paste your GitHub proof and LinkedIn post link below.</p>

      {errorMsg && (
        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs mb-3">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmission} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Commit / PR / Repo URL</label>
          <input
            type="url"
            required
            placeholder="https://github.com/user/repo/commit/..."
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs focus:outline-none focus:border-amber-500 text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Post URL</label>
          <input
            type="url"
            required
            placeholder="https://linkedin.com/posts/..."
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs focus:outline-none focus:border-amber-500 text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? 'Verifying Proof...' : 'Verify & Submit'}
        </button>
      </form>
    </div>
  );
}