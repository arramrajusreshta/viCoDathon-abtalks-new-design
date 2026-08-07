import React from 'react';

export default function Hero() {
  return (
    <section className="px-8 py-20 text-center max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
        Transform Your Workflow with <span className="text-indigo-500">AbTalks</span>
      </h1>
      <p className="mt-6 text-lg text-slate-400">
        A brand new design experience built for modern creators, developers, and innovators. Fast, responsive, and seamless.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-3 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-lg shadow-indigo-600/30">
          Explore Features
        </button>
        <button className="px-6 py-3 font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition">
          Learn More
        </button>
      </div>
    </section>
  );
}