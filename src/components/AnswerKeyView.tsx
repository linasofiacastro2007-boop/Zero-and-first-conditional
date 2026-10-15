import React, { useState } from 'react';
import { Key, Copy, Check, Volume2, Search, Filter, FolderCheck, PenTool, Printer } from 'lucide-react';
import { SORTING_SENTENCES, FILL_BLANK_SENTENCES, SentenceItem } from '../data/sentencesData';
import { audioEngine } from '../utils/audioEngine';

export const AnswerKeyView: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'sorting' | 'fill-blank' | 'zero' | 'first' | 'future-teachers' | 'effective-students'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const allSentences = [...SORTING_SENTENCES, ...FILL_BLANK_SENTENCES];

  const filteredSentences = allSentences.filter((item) => {
    if (filterMode === 'sorting' && item.activity !== 'sorting') return false;
    if (filterMode === 'fill-blank' && item.activity !== 'fill-blank') return false;
    if (filterMode === 'zero' && item.type !== 'zero') return false;
    if (filterMode === 'first' && item.type !== 'first') return false;
    if (filterMode === 'future-teachers' && item.theme !== 'future-teachers') return false;
    if (filterMode === 'effective-students' && item.theme !== 'effective-students') return false;

    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      item.fullSentence.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.context.toLowerCase().includes(q) ||
      item.whyZeroOrFirst.toLowerCase().includes(q)
    );
  });

  const handleSpeak = (item: SentenceItem) => {
    setActiveSpeechId(item.id);
    audioEngine.speak(item.fullSentence, () => setActiveSpeechId(null));
  };

  const handleCopyAll = () => {
    audioEngine.playClick();
    const content = [
      '=================================================================',
      'CONDITIONQUEST: OFFICIAL 20-SENTENCE EDUCATIONAL ANSWER KEY',
      'Themes: Advice for Future Teachers & Habits of Effective EFL Students',
      'Curriculum: A2 EFL Adult Learners in Classroom & Teaching Situations',
      '=================================================================\n',
      '--- PART 1: 10 SENTENCES FOR ACTIVITY 1 (SORTING & CATEGORIZING) ---',
      ...SORTING_SENTENCES.map(
        (s, idx) =>
          `[Item ${idx + 1}] Title: ${s.title}\n` +
          `   Theme: ${s.theme === 'future-teachers' ? 'Advice for Future Teachers' : 'Habits of Effective EFL Students'}\n` +
          `   Target Classification: ${s.type === 'zero' ? 'ZERO CONDITIONAL' : 'FIRST CONDITIONAL'}\n` +
          `   Full Sentence: "${s.fullSentence}"\n` +
          `   Condition Clause: "${s.ifClause}" [${s.ifVerb}]\n` +
          `   Result Clause: "${s.resultClause}" [${s.resultVerb}]\n` +
          `   Pedagogical Reason: ${s.whyZeroOrFirst}\n`
      ),
      '\n--- PART 2: 10 SENTENCES FOR ACTIVITY 2 (FILL-IN-THE-BLANK CHALLENGE) ---',
      ...FILL_BLANK_SENTENCES.map(
        (s, idx) =>
          `[Item ${idx + 1}] Title: ${s.title}\n` +
          `   Theme: ${s.theme === 'future-teachers' ? 'Advice for Future Teachers' : 'Habits of Effective EFL Students'}\n` +
          `   Type: ${s.type === 'zero' ? 'Zero Conditional (Rule)' : 'First Conditional (Future)'}\n` +
          `   Prompt: "${s.blankChallenge.prompt}"\n` +
          `   Correct Verbs: ${s.blankChallenge.options.find((o) => o.isCorrect)?.text}\n` +
          `   Full Sentence: "${s.fullSentence}"\n` +
          `   Grammar Rule: ${s.ruleExplanation}\n` +
          `   Pedagogical Reason: ${s.whyZeroOrFirst}\n`
      ),
      '\n=================================================================',
      'Grammar Cheat Sheet:',
      '• Zero: If / When + Present Simple, ... Present Simple (100% true rule)',
      '• First: If + Present Simple, ... will / won\'t + base verb (real future)',
      '• Comma Rule: Use comma only if sentence starts with "If".',
      '================================================================='
    ].join('\n');

    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    audioEngine.playClick();
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 print:p-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Key className="w-4 h-4" />
            <span>Complete Teacher & Student Answer Key</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Official Answer Key (20 Educational Sentences)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Themed around <strong className="text-teal-300">Advice for Future Teachers</strong> and <strong className="text-amber-300">Habits of Effective EFL Students</strong>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 print:hidden">
          <button
            onClick={handleCopyAll}
            className="cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            title="Copy full answer key to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Full Key</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-medium transition-colors"
            title="Print answer key"
          >
            <Printer className="w-4 h-4" />
            <span>Print Key</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 print:hidden">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sentence, verb, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterMode('all');
            }}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-slate-700 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All (20)
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterMode('sorting');
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'sorting'
                ? 'bg-teal-600 text-white font-semibold'
                : 'text-slate-400 hover:text-teal-300'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            <span>Sorting (10)</span>
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterMode('fill-blank');
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'fill-blank'
                ? 'bg-amber-600 text-white font-semibold'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Fill Blank (10)</span>
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterMode('future-teachers');
            }}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'future-teachers'
                ? 'bg-teal-800 text-teal-200 font-semibold ring-1 ring-teal-400'
                : 'text-slate-400 hover:text-teal-300'
            }`}
          >
            🎓 Teachers (10)
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setFilterMode('effective-students');
            }}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'effective-students'
                ? 'bg-amber-800 text-amber-200 font-semibold ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            💡 Students (10)
          </button>
        </div>
      </div>

      {/* Sentences List */}
      <div className="space-y-4">
        {filteredSentences.map((item, index) => {
          const isZero = item.type === 'zero';
          const isSorting = item.activity === 'sorting';
          const isSpeaking = activeSpeechId === item.id;
          const correctOption = item.blankChallenge.options.find((o) => o.isCorrect);

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isZero
                  ? 'bg-slate-900/90 border-teal-900/50 hover:border-teal-600/60'
                  : 'bg-slate-900/90 border-amber-900/50 hover:border-amber-600/60'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isZero
                        ? 'bg-teal-950 text-teal-300 border border-teal-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    #{index + 1} {isZero ? 'Zero Conditional' : 'First Conditional'}
                  </span>

                  <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold ${
                    item.theme === 'future-teachers'
                      ? 'bg-teal-950/80 text-teal-300 border border-teal-800'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                  }`}>
                    {item.theme === 'future-teachers' ? '🎓 Advice for Future Teachers' : '💡 Habits of Effective EFL Students'}
                  </span>

                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {isSorting ? 'Activity 1: Sorting' : 'Activity 2: Fill-in-the-Blank'}
                  </span>

                  <span className="text-xs font-medium text-slate-300">
                    · {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 italic hidden sm:inline">
                    {item.context}
                  </span>
                  <button
                    onClick={() => handleSpeak(item)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isSpeaking
                        ? 'bg-teal-500 text-slate-950 animate-pulse'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                    title="Play sentence audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Full Sentence Display */}
              <div className="text-base sm:text-lg font-semibold text-white my-2 tracking-tight">
                "{item.fullSentence}"
              </div>

              {/* Activity specific prompt preview if fill-blank */}
              {!isSorting && (
                <div className="p-2.5 rounded-xl bg-slate-950/90 border border-amber-800/40 text-xs mb-3">
                  <span className="text-slate-400">Prompt: </span>
                  <span className="text-amber-200 font-medium">"{item.blankChallenge.prompt}"</span>
                  <div className="mt-1 text-emerald-300 font-mono font-bold">
                    ➔ Answer: {correctOption?.text}
                  </div>
                </div>
              )}

              {/* Clause Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Condition (If / When Clause)
                  </div>
                  <div className="font-medium text-teal-300 font-mono">
                    {item.ifClause}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Verb Form: <span className="text-teal-200 font-semibold">{item.ifVerb}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Result (Main Clause)
                  </div>
                  <div className="font-medium text-amber-300 font-mono">
                    {item.resultClause}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Verb Form: <span className="text-amber-200 font-semibold">{item.resultVerb}</span>
                  </div>
                </div>
              </div>

              {/* Pedagogical Explanation */}
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300">
                <strong className="text-slate-200">Teacher's Pedagogical Reason: </strong>
                <span>{item.whyZeroOrFirst}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
