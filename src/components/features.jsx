import React from 'react';

export default function Features() {
  return (
    <section id="features" className="px-8 py-24 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Next-Gen Architecture</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Engineered for absolute scale</h3>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">Everything you need to build, monitor, and scale apps faster than ever before.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 */}
          <div className="md:col-span-2 p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all pointer-events-none"></div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 font-bold text-xl">⚡</div>
            <h4 className="text-2xl font-bold text-white mb-2">Lightning Fast Execution</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Optimized down to the metal with edge-accelerated routing. Experience sub-millisecond response rates across all geographic regions.
            </p>
          </div>

          {/* Bento Card 2 */}
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 font-bold text-xl">💎</div>
            <h4 className="text-xl font-bold text-white mb-2">Modern UI/UX</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafted meticulously following elite design specifications and high accessibility standards.
            </p>
          </div>

          {/* Bento Card 3 */}
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl relative overflow-hidden group hover:border-pink-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6 font-bold text-xl">🛡️</div>
            <h4 className="text-xl font-bold text-white mb-2">Enterprise Security</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              End-to-end multi-layered protection safeguarding your data infrastructure around the clock.
            </p>
          </div>

          {/* Bento Card 4 */}
          <div className="md:col-span-2 p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 font-bold text-xl">📈</div>
            <h4 className="text-2xl font-bold text-white mb-2">Fully Scalable Infrastructure</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Modular architecture that auto-scales dynamically as your user base expands from hundreds to millions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}