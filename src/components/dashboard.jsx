import React from 'react';

export default function Dashboard() {
  return (
    <section id="dashboard" className="px-8 py-16 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-sm text-slate-400">Monitor your project stats and real-time updates here.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400">Total Views</p>
          <p className="text-3xl font-bold text-white mt-2">12,480</p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400">Active Sessions</p>
          <p className="text-3xl font-bold text-white mt-2">342</p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400">Conversion Rate</p>
          <p className="text-3xl font-bold text-white mt-2">8.4%</p>
        </div>
      </div>
    </section>
  );
}