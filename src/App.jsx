import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6 text-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AbTalks New Design</h1>
            <p className="mt-4 text-slate-400">Successfully integrated with Navbar. More components coming soon!</p>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}