import React from "react";

export default function PublicResume() {
  // Mock data representing 60 days of progress for a student handle
  const student = {
    name: "Sreshth",
    handle: "sreshth",
    track: "Full-Stack Web Dev",
    startDate: "August 9, 2026",
    totalCompleted: 42,
    streak: 12
  };

  // Sample timeline entries spanning back from Day 3 down to Day 1
  const timelineEntries = [
    {
      day: 3,
      date: "August 11, 2026",
      status: "completed",
      title: "Built User Authentication & JWT Flow",
      description: "Implemented secure login and register endpoints with password hashing and session cookies.",
      proofUrl: "https://github.com",
      linkedinSnippet: "Day 3 of my 60-day build challenge: Successfully set up JWT authentication and secure routes! 🚀 #buildinpublic"
    },
    {
      day: 2,
      date: "August 10, 2026",
      status: "frozen",
      title: "Streak Freeze Applied ❄️",
      description: "Day missed and protected via automated streak freeze token.",
      proofUrl: null,
      linkedinSnippet: null
    },
    {
      day: 1,
      date: "August 9, 2026",
      status: "completed",
      title: "Project Scaffolding & Tailwind Setup",
      description: "Initialized Vite React project, configured Tailwind CSS, and set up base routing architecture.",
      proofUrl: "https://github.com",
      linkedinSnippet: "Kicked off my 60-day coding sprint today! Set up the core design system and layout. Let's go! 💻"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-5 max-w-[480px] mx-auto space-y-6">
      
      {/* Header Profile Info */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">{student.name}</h1>
            <p className="text-xs text-blue-400">@{student.handle} • {student.track}</p>
          </div>
          <span className="text-[10px] bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full font-medium">
            Recruiter View 👁️
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Built</span>
            <span className="font-semibold text-white">{student.totalCompleted} Days Completed</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Current Streak</span>
            <span className="font-semibold text-emerald-400">{student.streak} Days Active 🔥</span>
          </div>
        </div>
      </div>

      {/* Timeline Heading */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Chronological Proof Timeline</h2>
        <span className="text-[10px] text-slate-500">60-Day Sprint</span>
      </div>

      {/* Timeline Entries */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-800">
        {timelineEntries.map((entry) => {
          let badge = <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">Completed ✅</span>;
          if (entry.status === "frozen") {
            badge = <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-medium">Frozen ❄️</span>;
          } else if (entry.status === "missed") {
            badge = <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">Missed ❌</span>;
          }

          return (
            <div key={entry.day} className="relative pl-8 space-y-2">
              {/* Timeline Node Dot */}
              <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border-2 border-blue-500"></div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Day {entry.day} • <span className="text-slate-400 font-normal">{entry.date}</span></span>
                  {badge}
                </div>

                <h3 className="text-xs font-semibold text-white">{entry.title}</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">{entry.description}</p>

                {entry.linkedinSnippet && (
                  <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl text-[10px] text-slate-400 italic">
                    "{entry.linkedinSnippet}"
                  </div>
                )}

                {entry.proofUrl && (
                  <div className="pt-1">
                    <a 
                      href={entry.proofUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 font-medium transition"
                    >
                      <span>🔗 View Proof-of-Work</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}