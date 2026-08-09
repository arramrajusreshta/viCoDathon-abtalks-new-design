import React, { useState } from 'react';

export default function ChallengeDay() {
  const [taskTitle, setTaskTitle] = useState('Build a Rate Limiter Middleware');
  const [taskSummary, setTaskSummary] = useState('Implemented a token bucket algorithm to handle rate limiting efficiently.');
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateDraft = () => {
    const draft = Day 12/60 of the ABTalks 60-Day Challenge ?\n\nToday I built: \n\n\n\nRepo in comments. On to Day 13.\n\n#ABTalks60DayChallenge #buildinpublic #FullStackWeb;
    setGeneratedDraft(draft);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className='px-8 py-20 max-w-4xl mx-auto w-full text-white'>
      <div className='mb-8'>
        <span className='text-xs font-semibold text-emerald-400 uppercase tracking-wider'>Daily Submission</span>
        <h2 className='text-3xl font-extrabold tracking-tight mt-1'>Submit Your Proof</h2>
        <p className='text-sm text-slate-400 mt-1'>Complete your GitHub commit and generate your LinkedIn update in seconds.</p>
      </div>

      <div className='bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-6'>
        <div>
          <label className='block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2'>Task Title</label>
          <input 
            type='text' 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)}
            className='w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500'
          />
        </div>

        <div>
          <label className='block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2'>What did you build today?</label>
          <textarea 
            rows='3'
            value={taskSummary} 
            onChange={(e) => setTaskSummary(e.target.value)}
            className='w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500'
          />
        </div>

        <div className='pt-4 border-t border-slate-800'>
          <div className='flex items-center justify-between mb-3'>
            <div>
              <h3 className='text-sm font-semibold text-slate-200'>LinkedIn Post Assistant</h3>
              <p className='text-xs text-slate-400'>Generate a ready-to-post caption instantly to fight midnight friction.</p>
            </div>
            <button 
              onClick={handleGenerateDraft}
              className='px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/20'
            >
              <span>?</span> Generate Post Draft
            </button>
          </div>

          {generatedDraft && (
            <div className='mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 relative group'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-xs font-medium text-emerald-400'>Draft Ready</span>
                <button 
                  onClick={handleCopy}
                  className='text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg transition'
                >
                  {copied ? 'Copied! ?' : 'Copy Caption ??'}
                </button>
              </div>
              <pre className='text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed'>
                {generatedDraft}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
