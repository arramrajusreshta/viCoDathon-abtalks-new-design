import React, { useState } from 'react';

export default function LinkedInDraftGenerator() {
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateDraft = (taskTitle, taskSummary) => {
    const draft = `🚀 Just wrapped up today's challenge: "${taskTitle || 'Building in public'}"!

Key takeaway: ${taskSummary || 'Consistency compounds over time. Excited to keep building and shipping daily.'}

#BuildInPublic #Coding #DeveloperJourney #100DaysOfCode`;
    
    setGeneratedDraft(draft);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className='mt-6 bg-slate-900 border border-slate-800 p-5 rounded-xl max-w-xl mx-auto text-left'>
      <div className='flex items-center justify-between mb-3'>
        <div>
          <h3 className='text-sm font-semibold text-white'>⚡ Midnight Lifeline: LinkedIn Post Assistant</h3>
          <p className='text-xs text-slate-400'>Auto-generated from your day's work to cut down midnight friction.</p>
        </div>
        <button
          onClick={() => handleGenerateDraft("Day Challenge Completed", "Successfully built and shipped today's core feature requirement.")}
          className='text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-medium transition cursor-pointer'
        >
          Generate Draft 🪄
        </button>
      </div>

      {generatedDraft && (
        <div className='mt-4 bg-slate-950 border border-slate-800 p-4 rounded-lg'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs font-medium text-emerald-400'>Draft Ready</span>
            <button 
              onClick={handleCopy}
              className='text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg transition cursor-pointer'
            >
              {copied ? 'Copied! ✅' : 'Copy Caption 📋'}
            </button>
          </div>
          <pre className='text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed'>
            {generatedDraft}
          </pre>
        </div>
      )}
    </section>
  );
}