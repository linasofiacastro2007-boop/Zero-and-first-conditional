import React, { useState } from 'react';
import { Headphones, Volume2, Play, Square, Eye, EyeOff, Sparkles, Filter } from 'lucide-react';
import { ZERO_CONDITIONAL_SENTENCES, FIRST_CONDITIONAL_SENTENCES, SentenceItem } from '../data/sentencesData';
import { audioEngine } from '../utils/audioEngine';

export const AudioLabView: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'sorting' | 'fill-blank' | 'zero' | 'first' | 'future-teachers' | 'effective-students'>('all');
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [hiddenClauseId, setHiddenClauseId] = useState<Record<string, 'condition' | 'result' | null>>({});

  const allSentences = [...ZERO_CONDITIONAL_SENTENCES, ...FIRST_CONDITIONAL_SENTENCES];

  const filtered = allSentences.filter((s) => {
    if (filterType === 'all') return true;
    if (filterType === 'sorting') return s.activity === 'sorting';
    if (filterType === 'fill-blank') return s.activity === 'fill-blank';
    if (filterType === 'zero') return s.type === 'zero';
    if (filterType === 'first') return s.type === 'first';
    if (filterType === 'future-teachers') return s.theme === 'future-teachers';
    if (filterType === 'effective-students') return s.theme === 'effective-students';
    return true;
  });

  const handlePlayAudio = (item: SentenceItem) => {
    setActiveSentenceId(item.id);
    audioEngine.speak(item.fullSentence, () => {
      setActiveSentenceId(null);
    });
  };

  const toggleHide = (id: string, part: 'condition' | 'result') => {
    audioEngine.playClick();
    setHiddenClauseId((prev) => {
      const current = prev[id];
      if (current === part) {
        return { ...prev, [id]: null };
      }
      return { ...prev, [id]: part };
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Headphones className="w-4 h-4" />
            <span>Interactive Listening & Pronunciation Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            A2 EFL Pronunciation & Clause Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Listen to all 20 sentences covering <strong className="text-teal-300">Advice for Future Teachers</strong> & <strong className="text-amber-300">Habits of Effective EFL Students</strong>.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterType('all');
            }}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All (20)
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterType('sorting');
            }}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterType === 'sorting'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-teal-300'
            }`}
          >
            Sorting (10)
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterType('fill-blank');
            }}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterType === 'fill-blank'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            Fill Blank (10)
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterType('future-teachers');
            }}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterType === 'future-teachers'
                ? 'bg-teal-800 text-teal-200 font-semibold ring-1 ring-teal-400'
                : 'text-slate-400 hover:text-teal-300'
            }`}
          >
            🎓 Teachers
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterType('effective-students');
            }}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterType === 'effective-students'
                ? 'bg-amber-800 text-amber-200 font-semibold ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            💡 Students
          </button>
        </div>
      </div>

      {/* Legend & Instructions Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-800/40 flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-teal-400 shrink-0" />
          <span className="text-teal-200">
            <strong>Teal Box:</strong> Condition Clause (If / When)
          </span>
        </div>
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
          <span className="text-amber-200">
            <strong>Gold Box:</strong> Result Clause (Outcome)
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">
            <strong>Shadowing:</strong> Listen & repeat out loud 3 times.
          </span>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((item, index) => {
          const isPlaying = activeSentenceId === item.id;
          const isZero = item.type === 'zero';
          const hiddenPart = hiddenClauseId[item.id] || null;

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isZero
                        ? 'bg-teal-950 text-teal-300 border border-teal-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    #{index + 1} {isZero ? 'Zero' : 'First'}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold ${
                    item.theme === 'future-teachers'
                      ? 'bg-teal-950/80 text-teal-300 border border-teal-800'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                  }`}>
                    {item.theme === 'future-teachers' ? '🎓 Advice for Future Teachers' : '💡 Habits of Effective EFL Students'}
                  </span>
                  <span className="text-xs font-bold text-white font-display">
                    {item.title}
                  </span>
                </div>

                {/* Audio and Flashcard controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleHide(item.id, 'result')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors cursor-pointer"
                    title="Hide/reveal the result clause to test yourself"
                  >
                    {hiddenPart === 'result' ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-teal-400" />
                        <span>Reveal Result</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                        <span>Hide Result</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handlePlayAudio(item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-emerald-500 text-slate-950 animate-pulse shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 hover:bg-emerald-950/80 hover:text-emerald-300 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlaying ? 'Speaking...' : 'Listen'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Colored Clause Display */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-sm sm:text-base leading-relaxed">
                {/* Condition Clause */}
                <span className="inline-block px-2 py-1 rounded-md bg-teal-950/80 border border-teal-800/60 text-teal-300 font-medium mr-1.5">
                  {item.ifClause}
                </span>

                {/* Separator / Comma */}
                {item.fullSentence.includes(',') && <span className="text-slate-400 font-bold mr-1.5">,</span>}

                {/* Result Clause (can be hidden for active recall) */}
                {hiddenPart === 'result' ? (
                  <button
                    onClick={() => toggleHide(item.id, 'result')}
                    className="inline-block px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-amber-400/60 font-mono text-xs cursor-pointer hover:bg-slate-700 transition-colors"
                  >
                    [ Click to reveal result clause ]
                  </button>
                ) : (
                  <span className="inline-block px-2 py-1 rounded-md bg-amber-950/80 border border-amber-800/60 text-amber-300 font-medium">
                    {item.resultClause}
                  </span>
                )}
                {!item.fullSentence.endsWith('.') && <span className="text-slate-400 font-bold">.</span>}
              </div>

              {/* Verb Tense Note */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 text-[11px] text-slate-400">
                <div>
                  <span className="text-teal-400 font-mono">Condition Verb:</span> {item.ifVerb}
                  <span className="mx-2 text-slate-600">·</span>
                  <span className="text-amber-400 font-mono">Result Verb:</span> {item.resultVerb}
                </div>
                <div className="text-slate-500 italic">
                  {item.whyZeroOrFirst}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
