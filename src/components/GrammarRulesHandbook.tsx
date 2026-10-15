import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertCircle, ArrowRight, Lightbulb, Play, Volume2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface GrammarRulesHandbookProps {
  onStartQuest: () => void;
}

export const GrammarRulesHandbook: React.FC<GrammarRulesHandbookProps> = ({ onStartQuest }) => {
  const [activeTab, setActiveTab] = useState<'both' | 'zero' | 'first'>('both');
  const [speakingSentence, setSpeakingSentence] = useState<string | null>(null);

  const handleSpeak = (text: string) => {
    setSpeakingSentence(text);
    audioEngine.speak(text, () => setSpeakingSentence(null));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Section */}
      <div className="text-center md:text-left">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">
          A2 Independent Study Handbook
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Mastering Zero & First Conditionals
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
          Conditionals talk about causes and results in English. Understand when an event is a permanent classroom rule (Zero) versus a real future event (First).
        </p>

        {/* View Filter segmented buttons */}
        <div className="inline-flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl mt-6">
          <button
            onClick={() => {
              audioEngine.playClick();
              setActiveTab('both');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'both'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side Comparison
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setActiveTab('zero');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'zero'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Zero Conditional Focus
          </button>
          <button
            onClick={() => {
              audioEngine.playClick();
              setActiveTab('first');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'first'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            First Conditional Focus
          </button>
        </div>
      </div>

      {/* Side-by-side or Specific Breakdown */}
      {(activeTab === 'both' || activeTab === 'zero') && (
        <section className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-teal-500/30 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Type 0</span>
              <h3 className="text-2xl font-bold text-white font-display">Zero Conditional: General Rules & Automatic Facts</h3>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
              100% True Every Time
            </div>
          </div>

          {/* Formula Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">The Formula</div>
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono font-bold text-teal-300">
              <span className="text-emerald-400">If / When</span>
              <span className="text-slate-400">+</span>
              <span className="bg-teal-950 px-2.5 py-1 rounded-md border border-teal-800 text-teal-200">
                Present Simple
              </span>
              <span className="text-slate-400">,</span>
              <span className="bg-teal-950 px-2.5 py-1 rounded-md border border-teal-800 text-teal-200">
                Present Simple
              </span>
            </div>
          </div>

          {/* When to Use */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <strong className="text-teal-300 block mb-1 text-sm">1. Classroom Rules</strong>
              Institutional guidelines that always apply to all students (e.g. attendance, library ID).
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <strong className="text-teal-300 block mb-1 text-sm">2. Software & Equipment</strong>
              Automatic technical actions (e.g. portal locks after midnight, projector turns off).
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <strong className="text-teal-300 block mb-1 text-sm">3. Habits & Learning Facts</strong>
              Universal pedagogical truths (e.g. practicing daily improves English fluency).
            </div>
          </div>

          {/* Real Classroom Examples with Audio */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Real Themed Examples (Habits & Teacher Advice)
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-teal-400 mb-1">
                    [Theme: Habits of Effective EFL Students]
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    <span className="text-teal-400 font-semibold">When effective EFL students encounter unfamiliar words</span>, they <span className="text-emerald-300 font-semibold">write</span> them in a vocabulary notebook.
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Rule explanation: Permanent learning habit practiced by successful language learners.
                  </div>
                </div>
                <button
                  onClick={() => handleSpeak('When effective EFL students encounter unfamiliar words, they write them in a vocabulary notebook.')}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 transition-colors cursor-pointer"
                  title="Listen to sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-teal-400 mb-1">
                    [Theme: Advice for Future Teachers]
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    <span className="text-teal-400 font-semibold">If a teacher speaks too quickly</span> in an A2 classroom, the adult learners <span className="text-emerald-300 font-semibold">lose</span> focus.
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Rule explanation: Universal pedagogical reality of pacing and student attention.
                  </div>
                </div>
                <button
                  onClick={() => handleSpeak('If a teacher speaks too quickly in an A2 classroom, the adult learners lose focus.')}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 transition-colors cursor-pointer"
                  title="Listen to sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* First Conditional Section */}
      {(activeTab === 'both' || activeTab === 'first') && (
        <section className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Type 1</span>
              <h3 className="text-2xl font-bold text-white font-display">First Conditional: Real Future Possibilities & Promises</h3>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              Specific Future Event
            </div>
          </div>

          {/* Formula Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">The Formula</div>
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono font-bold text-amber-300">
              <span className="text-emerald-400">If</span>
              <span className="text-slate-400">+</span>
              <span className="bg-amber-950 px-2.5 py-1 rounded-md border border-amber-800 text-amber-200">
                Present Simple
              </span>
              <span className="text-slate-400">,</span>
              <span className="bg-amber-950 px-2.5 py-1 rounded-md border border-amber-800 text-amber-200">
                WILL / WON'T + Base Verb
              </span>
            </div>
          </div>

          {/* When to Use */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <strong className="text-amber-300 block mb-1 text-sm">1. Future Teaching Classes</strong>
              Specific lesson advice for upcoming practicum (e.g. preparing visual aids for tomorrow).
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <strong className="text-amber-300 block mb-1 text-sm">2. Student Study Plans</strong>
              Actionable habits for tonight that produce results tomorrow (e.g. listening to a podcast).
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <strong className="text-amber-300 block mb-1 text-sm">3. Practical Consequences</strong>
              Real future classroom results (e.g. checking understanding with questions).
            </div>
          </div>

          {/* Real Classroom Examples with Audio */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Real Themed Examples (Teacher Advice & Study Habits)
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-400 mb-1">
                    [Theme: Advice for Future Teachers]
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    <span className="text-amber-400 font-semibold">If you prepare clear visual aids before tomorrow's lesson</span>, your students <span className="text-emerald-300 font-semibold">will understand</span> the grammar faster.
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Notice: Refers to a specific lesson tomorrow. Use "will understand" in the result.
                  </div>
                </div>
                <button
                  onClick={() => handleSpeak("If you prepare clear visual aids before tomorrow's lesson, your students will understand the grammar faster.")}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors cursor-pointer"
                  title="Listen to sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-400 mb-1">
                    [Theme: Habits of Effective EFL Students]
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    <span className="text-amber-400 font-semibold">If you listen to an English podcast for twenty minutes tonight</span>, you <span className="text-emerald-300 font-semibold">will recognize</span> more spoken idioms tomorrow.
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Notice: Specific action tonight predicting positive outcomes in tomorrow's class.
                  </div>
                </div>
                <button
                  onClick={() => handleSpeak('If you listen to an English podcast for twenty minutes tonight, you will recognize more spoken idioms tomorrow.')}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors cursor-pointer"
                  title="Listen to sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Critical Comparison Matrix */}
      <section className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <h3 className="text-xl font-bold text-white font-display mb-4">
          Quick Comparison: How to Spot the Difference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Feature</th>
                <th className="py-3 px-4 font-semibold text-teal-400">Zero Conditional (0)</th>
                <th className="py-3 px-4 font-semibold text-amber-400">First Conditional (1st)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Meaning</td>
                <td className="py-3.5 px-4">Permanent rules, habits, general facts</td>
                <td className="py-3.5 px-4">Specific future situation, prediction, warning</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Timeframe</td>
                <td className="py-3.5 px-4">Always / Anytime / Every class</td>
                <td className="py-3.5 px-4">A specific future time (e.g. tomorrow, Friday)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Condition Clause</td>
                <td className="py-3.5 px-4 font-mono text-teal-300">If / When + Present Simple</td>
                <td className="py-3.5 px-4 font-mono text-amber-300">If + Present Simple</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Result Clause</td>
                <td className="py-3.5 px-4 font-mono text-teal-300">Present Simple</td>
                <td className="py-3.5 px-4 font-mono text-amber-300">WILL + Base Verb</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Can replace "If" with "When"?</td>
                <td className="py-3.5 px-4 text-emerald-400 font-semibold">Yes! Usually means the same.</td>
                <td className="py-3.5 px-4 text-rose-400 font-semibold">No! "If" = possible, "When" = certain.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* The 2 Essential Rules Every Student Needs to Know */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Comma Rule */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm mb-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>The Golden Comma Rule</span>
          </div>
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p>
              • If the sentence begins with <strong>IF</strong>, use a comma in the middle:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-teal-300">
              <span className="font-bold underline">If students arrive late,</span> the professor marks them absent.
            </div>
            <p className="pt-2">
              • If the sentence begins with the <strong>result</strong>, do NOT use a comma:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-amber-300">
              The professor marks students absent <span className="font-bold">if they arrive late.</span>
            </div>
          </div>
        </div>

        {/* Will Trap Rule */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Avoid the "Will-Trap" in the If-Clause</span>
          </div>
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p>
              Even when talking about tomorrow, native English speakers <strong>never</strong> put <em>will</em> inside the <em>If</em> clause!
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-rose-300">
              ❌ <span className="line-through">If you will ask questions, the teacher will explain.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-emerald-300">
              ✅ If you <span className="font-bold underline">ask</span> questions, the teacher will explain.
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Test CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 to-slate-900 border border-teal-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold text-white font-display">Ready to test what you learned?</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Test your skills across all 20 real classroom sentences in our interactive game.
          </p>
        </div>
        <button
          onClick={() => {
            audioEngine.playClick();
            onStartQuest();
          }}
          className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition-all shadow-md shadow-teal-500/20 whitespace-nowrap"
        >
          <span>Play Interactive Quest</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
