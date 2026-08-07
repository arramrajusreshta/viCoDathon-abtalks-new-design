import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="relative px-8 pt-28 pb-20 text-center max-w-5xl mx-auto overflow-hidden">
      {/* Ambient background blur glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-8 animate-bounce">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
        Announcing AbTalks AI Engine 3.0 — Read More
      </div>

      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1]">
        The Intelligence Layer for <br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Modern Digital Creators
        </span>
      </h1>
      
      <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
        Supercharge your development workflow, manage real-time intelligence metrics, and scale seamlessly with our cutting-edge infrastructure.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button 
          onClick={() => alert("Redirecting to interactive workspace builder...")}
          className="w-full sm:w-auto px-8 py-4 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 group"
        >
          Explore Features 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <button 
          onClick={() => alert("Loading documentation and video architecture guide...")}
          className="w-full sm:w-auto px-8 py-4 font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-2xl transition-all"
        >
          Watch Platform Demo
        </button>
      </div>

      {/* Floating UI Preview Mockup */}
      <div className="mt-16 p-3 bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-left overflow-hidden relative">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800/60 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-xs font-mono text-slate-500">abtalks-secure-node://active-session</span>
          </div>
          <div className="space-y-3 font-mono text-xs text-indigo-300">
            <p className="text-slate-500">// System successfully initialized at 60fps</p>
            <p><span className="text-purple-400">import</span> &#123; <span className="text-amber-300">NeuralEngine</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@abtalks/core'</span>;</p>
            <p className="text-white">NeuralEngine.runPipeline(&#123; mode: <span className="text-emerald-300">'hyper-speed'</span>, encryption: <span className="text-emerald-300">'AES-256'</span> &#125;); <span className="text-emerald-400">✔ Ready.</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}