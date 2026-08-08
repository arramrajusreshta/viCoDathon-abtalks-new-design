import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function DailySubmission({ user, currentDay, onSubmissionSuccess }) {
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Array of 60 daily tasks / prompts
  const dailyTasks = [
    "Day 1: Set up project repository and build the basic layout & routing.",
    "Day 2: Integrate Supabase authentication and database setup.",
    "Day 3: Build the daily submission workflow & link validation.",
    "Day 4: Implement streak counter logic and profile database schema.",
    "Day 5: Design and construct the live Leaderboard component.",
    "Day 6: Refactor UI using Tailwind CSS glassmorphism components.",
    "Day 7: Deploy build to Vercel and verify environment variables.",
  ];

  const currentTaskPrompt = dailyTasks[(currentDay - 1) % dailyTasks.length] || `Day ${currentDay}: Submit your proof of work for today!`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Record submission
      const { error: subError } = await supabase.from('submissions').insert([
        {
          user_id: user.id,
          day_number: currentDay,
          github_url: githubUrl,
          linkedin_url: linkedinUrl,
        },
      ]);

      if (subError) throw subError;

      // 2. Update streak in profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ streak_count: currentDay })
        .eq('id', user.id);

      if (profileError) throw profileError;

      setMessage({ type: 'success', text: 'Proof submitted successfully! Streak updated.' });
      setGithubUrl('');
      setLinkedinUrl('');

      if (onSubmissionSuccess) onSubmissionSuccess();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to submit proof.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
      {/* Header Tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-[11px] rounded-full uppercase tracking-wider">
          Day {currentDay} / 60
        </span>
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-sm">
          ⚡
        </div>
      </div>

      {/* Task Prompt Display Banner */}
      <div className="mb-6 p-4 bg-slate-950/80 border border-amber-500/30 rounded-2xl">
        <p className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider mb-1">
          Today's Task
        </p>
        <p className="text-sm font-semibold text-white leading-relaxed">
          {currentTaskPrompt}
        </p>
      </div>

      <h2 className="text-2xl font-black text-white mb-6">Submit Daily Proof</h2>

      {message.text && (
        <div
          className={`mb-6 p-3.5 text-xs font-medium rounded-xl border ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">
            GitHub Commit or PR URL
          </label>
          <input
            type="url"
            required
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/user/repo/commit/3a8f..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">
            LinkedIn Post URL
          </label>
          <input
            type="url"
            required
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/posts/activity-..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 mt-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Verify & Submit Proof'}
        </button>
      </form>
    </div>
  );
}