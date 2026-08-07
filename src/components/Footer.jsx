import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070A0F] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Banner */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/30 text-center mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base">
            Join the ViCoDathon initiative today and build stunning digital experiences faster than ever.
          </p>
          <a
            href="#get-started"
            className="inline-block px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25"
          >
            Get Started Now
          </a>
        </div>

        {/* Footer Bottom Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ViCoDathon ABTalks. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}