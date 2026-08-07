function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col justify-between max-w-2xl mx-auto border-x border-slate-800 font-sans shadow-2xl my-4 rounded-2xl">
      <header className="py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">ABTalks</h1>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-3 py-1 rounded-full">60-DAY SPRINT</span>
      </header>
      <main className="my-auto space-y-6 py-12 text-center md:text-left">
        <div className="inline-block bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-indigo-300">
          🌙 Built for late-night college coders
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Build Consistency. Get Visible to Recruiters.
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg">
          Maintain a 60-day public learning streak by submitting 1 GitHub commit and 1 LinkedIn post daily.
        </p>
        <div className="pt-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-sm transition shadow-lg shadow-indigo-600/30"
          >
            Enter Student Dashboard →
          </button>
        </div>
      </main>
      <footer className="text-center text-xs text-slate-600 py-4 border-t border-slate-900">
        Responsive Layout • ABTalks Redesign
      </footer>
    </div>
  );
}