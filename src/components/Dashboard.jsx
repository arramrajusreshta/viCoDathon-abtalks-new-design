import React, { useState } from 'react';

export default function Dashboard() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Episode 12 Highlights', status: 'Published', date: 'Aug 7, 2026' },
    { id: 2, title: 'ViCoDathon Pitch Deck', status: 'In Review', date: 'Aug 6, 2026' },
  ]);
  const [newTitle, setNewTitle] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setNotes([
      { id: Date.now(), title: newTitle, status: 'Draft', date: 'Just now' },
      ...notes
    ]);
    setNewTitle('');
  };

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Project Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back! Manage your content and track performance.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Total Views</p>
          <p className="text-3xl font-bold text-white mt-2">128.4K</p>
          <span className="text-xs text-emerald-400 font-semibold">↑ +12% this week</span>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Active Days</p>
          <p className="text-3xl font-bold text-indigo-400 mt-2">12 Days</p>
          <span className="text-xs text-indigo-300 font-semibold">ViCoDathon Progress</span>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Engagement Rate</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">94.8%</p>
          <span className="text-xs text-purple-300 font-semibold">High interaction</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Add Form */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Add Content</h3>
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Content Title</label>
              <input
                type="text"
                placeholder="e.g., Day 13 Strategy..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/20"
            >
              + Add Item
            </button>
          </form>
        </div>

        {/* Live List */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {notes.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Published' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : item.status === 'In Review' 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}