import React from 'react';

const features = [
  {
    icon: "🚀",
    title: "Instant Content Delivery",
    description: "Publish daily updates and visual insights seamlessly to keep your audience constantly engaged."
  },
  {
    icon: "📊",
    title: "Smart Analytics Dashboard",
    description: "Track performance metrics, viewer retention, and engagement growth with real-time charts."
  },
  {
    icon: "⚡",
    title: "Automated Workflows",
    description: "Save hours every week by automating repetitive publishing tasks and content formatting."
  },
  {
    icon: "🎨",
    title: "Custom Themes & Layouts",
    description: "Match your personal brand identity effortlessly with deep color customizers and dark themes."
  }
];

export default function Features() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Everything You Need to <span className="text-indigo-400">Scale Faster</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg">
            Powerful tools designed specifically to streamline your content operations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group"
            >
              <div className="text-4xl mb-4 p-3 inline-block rounded-xl bg-slate-800/80 group-hover:bg-indigo-600/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}