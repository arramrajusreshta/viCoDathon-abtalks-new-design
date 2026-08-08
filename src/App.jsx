import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Hero from './components/hero';

// Example Page Views
function Home() {
  return (
    <main>
      <section id="home"><Hero /></section>
    </main>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard Analytics</h1>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <p className="text-sm text-slate-400">Live Telemetry Active</p>
        <p className="text-3xl font-bold text-indigo-400 mt-2">12,480 Views</p>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Select Plan</h1>
      <div className="p-6 rounded-xl bg-slate-900 border border-indigo-500/30">
        <h2 className="text-xl font-bold">Pro Creator</h2>
        <p className="text-3xl font-extrabold my-2">$29/mo</p>
        <button className="w-full py-2 mt-4 bg-indigo-600 rounded-lg text-sm font-semibold">Subscribe</button>
      </div>
    </div>
  );
}

function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-md mx-auto flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In to AbTalks</h1>
      <input type="email" placeholder="Email" className="mb-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm" />
      <input type="password" placeholder="Password" className="mb-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm" />
      <button className="py-3 bg-indigo-600 rounded-lg font-semibold text-sm">Continue</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
      <Footer />
    </div>
  );
}