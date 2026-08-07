import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/hero';
import Features from './components/features';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Features />
            </main>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}