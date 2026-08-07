import React from 'react';

export default function Features() {
  const featureList = [
    { title: "Lightning Fast", desc: "Optimized for speed and high performance across all devices." },
    { title: "Modern UI/UX", desc: "Crafted meticulously following the latest design trends." },
    { title: "Fully Scalable", desc: "Built with modular architecture so you can expand effortlessly." },
  ];

  return (
    <section id="features" className="px-8 py-16 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <div key={index} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}