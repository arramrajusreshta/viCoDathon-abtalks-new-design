import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AuthModal from './components/AuthModal';
import DailySubmission from './components/dailysubmission';
import Leaderboard from './components/leaderboard';

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('submission'); // 'submission' or 'leaderboard'

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserProfile(session.user.id);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Radial Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-lg shadow-amber-500/20">
              60
            </div>
            <div>
              <h1 className="font-black text-sm tracking-wide text-white uppercase">60-Day Challenge</h1>
              <p className="text-[10px] text-slate-400">Proof of Work Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white">{profile?.full_name || session.user.email}</p>
                  <p className="text-[10px] text-amber-400 font-medium">⚡ {profile?.streak_count || 0} Day Streak</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold rounded-xl transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
              >
                Sign In / Join
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center">
        {/* Navigation Tabs */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 mb-8 max-w-xs w-full">
          <button
            onClick={() => setActiveTab('submission')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'submission'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily Proof
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leaderboard
          </button>
        </div>

        {/* Dynamic Tab Render */}
        {activeTab === 'submission' ? (
          session ? (
            <DailySubmission
              user={session.user}
              currentDay={profile?.streak_count ? profile.streak_count + 1 : 1}
              onSubmissionSuccess={() => fetchUserProfile(session.user.id)}
            />
          ) : (
            <div className="text-center py-16 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8 max-w-md w-full">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 text-xl">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Sign In Required</h3>
              <p className="text-xs text-slate-400 mb-6">You must be logged in to submit proof and build your streak.</p>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 transition-all"
              >
                Log In or Register
              </button>
            </div>
          )
        ) : (
          <Leaderboard />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={() => {
          setIsAuthOpen(false);
          if (session) fetchUserProfile(session.user.id);
        }}
      />
    </div>
  );
}