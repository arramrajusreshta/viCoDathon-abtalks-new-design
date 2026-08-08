import BadgeCard from "../components/BadgeCard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const badges = [
    {
      title: "7-Day Streak",
      description: "Completed 7 days in a row",
      icon: "🔥",
      unlocked: true,
    },
    {
      title: "Weekend Warrior",
      description: "Completed tasks on 4 weekends",
      icon: "⚡",
      unlocked: true,
    },
    {
      title: "React Specialist",
      description: "Completed 10 React challenges",
      icon: "⚛️",
      unlocked: false,
    },
  ];

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
          Profile
        </h1>

        <div className="w-16" />
      </header>

      <div className="px-5 pt-6 space-y-5">

        {/* Profile Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-orange-500/20">
            AS
          </div>

          <h2 className="text-xl font-bold text-white mt-3">
            Aarav Sharma
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            IIT Bombay • Full-Stack Web Dev
          </p>

          <button
            onClick={() => setShowEditModal(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-amber-400">11</p>
            <p className="text-[10px] text-slate-400">Day Streak</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-emerald-400">11</p>
            <p className="text-[10px] text-slate-400">Completed</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-orange-400">#42</p>
            <p className="text-[10px] text-slate-400">Rank</p>
          </div>
        </div>

        {/* Public Proof */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Public Proof
          </h3>

          <div className="space-y-2">
            <a
              href="#"
              className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700"
            >
              <p className="text-xs font-semibold text-white">GitHub</p>
              <p className="text-[10px] text-slate-400">
                github.com/aaravsharma
              </p>
            </a>

            <a
              href="#"
              className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700"
            >
              <p className="text-xs font-semibold text-white">LinkedIn</p>
              <p className="text-[10px] text-slate-400">
                linkedin.com/in/aaravsharma
              </p>
            </a>

            <a
              href="#"
              className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700"
            >
              <p className="text-xs font-semibold text-white">Portfolio</p>
              <p className="text-[10px] text-slate-400">
                aaravsharma.dev
              </p>
            </a>
          </div>
        </section>

        {/* Connected Accounts */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Connected Accounts
          </h3>

          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <p className="text-xs font-semibold text-white">GitHub</p>
              <p className="text-[10px] text-emerald-400">
                Connected
              </p>
            </div>

            <span className="text-emerald-400 text-sm">✓</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 mt-2">
            <div>
              <p className="text-xs font-semibold text-white">LinkedIn</p>
              <p className="text-[10px] text-emerald-400">
                Connected
              </p>
            </div>

            <span className="text-emerald-400 text-sm">✓</span>
          </div>
        </section>

        {/* Badges */}
        {/* Badges */}
<section>
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
      Badges & Achievements
    </h3>

    <span className="text-[10px] text-slate-500">
      2 / 3 Unlocked
    </span>
  </div>

  <div className="grid grid-cols-2 gap-3">
    {badges.map((badge) => (
      <BadgeCard
        key={badge.title}
        title={badge.title}
        description={badge.description}
        icon={badge.icon}
        unlocked={badge.unlocked}
      />
    ))}
  </div>
</section>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-5">
          <div className="w-full max-w-[360px] bg-slate-900 border border-slate-700 rounded-2xl p-5">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">
                Edit Profile
              </h2>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                defaultValue="Aarav Sharma"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="College"
                defaultValue="IIT Bombay"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="GitHub URL"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="LinkedIn URL"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
              />

              <button
                onClick={() => setShowEditModal(false)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}