import React from 'react';

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center">
        <h3 className="text-lg font-bold text-white mb-2">Sign In / Register</h3>
        <p className="text-xs text-slate-400 mb-4">Authentication modal placeholder.</p>
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
}