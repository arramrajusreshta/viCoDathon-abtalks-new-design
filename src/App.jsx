import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Features from './components/features';
import Dashboard from './components/dashboard';
import Footer from './components/footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
          <Dashboard />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}