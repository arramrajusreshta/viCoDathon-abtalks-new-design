import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          ViCoDathon Hackathon Project
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight md:leading-tight">
          Transform Your Ideas Into <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            High-Impact Visual Stories
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Streamline content production, organize daily insights, and elevate engagement with a modern, data-driven platform built for creators.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#get-started"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
          >
            Get Started Free
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold transition-all active:scale-[0.98]"
          >
            Watch Demo
          </a>
        </div>

      </div>
    </section>
  );
}