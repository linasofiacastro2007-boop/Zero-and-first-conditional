import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderCheck, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Volume2, ShieldCheck, ArrowLeft, Award, HelpCircle
} from 'lucide-react';
import { SORTING_SENTENCES, SentenceItem } from '../data/sentencesData';
import { audioEngine } from '../utils/audioEngine';

interface SortingActivityProps {
  score: number;
  streak: number;
  onUpdateScore: (delta: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onSwitchToFillBlank: () => void;
  onOpenStudyGuide: () => void;
}

export const SortingActivity: React.FC<SortingActivityProps> = ({
  score,
  streak,
  onUpdateScore,
  onIncrementStreak,
  onResetStreak,
  onSwitchToFillBlank,
  onOpenStudyGuide,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastSortDecision, setLastSortDecision] = useState<{
    guessed: 'zero' | 'first';
    isCorrect: boolean;
    sentence: SentenceItem;
  } | null>(null);

  const [sortedItems, setSortedItems] = useState<{
    sentence: SentenceItem;
    assignedBucket: 'zero' | 'first';
    isCorrect: boolean;
  }[]>([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentSentence = SORTING_SENTENCES[currentIndex];

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    audioEngine.speak(text, () => setIsSpeaking(false));
  };

  const handleSort = (bucket: 'zero' | 'first') => {
    if (!currentSentence || isCompleted) return;

    const isCorrect = currentSentence.type === bucket;

    if (isCorrect) {
      audioEngine.playCorrect();
      const points = 120 + streak * 25;
      onUpdateScore(points);
      onIncrementStreak();
      if ((streak + 1) % 3 === 0) {
        audioEngine.playStreak();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      audioEngine.playIncorrect();
      onResetStreak();
    }

    const decision = {
      guessed: bucket,
      isCorrect,
      sentence: currentSentence,
    };

    setLastSortDecision(decision);
    setSortedItems((prev) => [...prev, { sentence: currentSentence, assignedBucket: bucket, isCorrect }]);

    // Move to next card or complete
    if (currentIndex + 1 >= SORTING_SENTENCES.length) {
      setIsCompleted(true);
      audioEngine.playVictory();
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    audioEngine.playClick();
    setCurrentIndex(0);
    setLastSortDecision(null);
    setSortedItems([]);
    setIsCompleted(false);
  };

  const zeroBucketCount = sortedItems.filter((i) => i.assignedBucket === 'zero').length;
  const firstBucketCount = sortedItems.filter((i) => i.assignedBucket === 'first').length;
  const correctCount = sortedItems.filter((i) => i.isCorrect).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Activity Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-teal-500/30 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
            <FolderCheck className="w-4 h-4 text-teal-400" />
            <span>Activity 1 of 2: Sorting & Categorizing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
            Classify 10 Educational Sentences
          </h2>
        </div>

        {/* Card Counter & Score */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            Card <span className="text-teal-300 font-bold">{Math.min(currentIndex + 1, SORTING_SENTENCES.length)}</span> / 10
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-teal-950/80 border border-teal-800/80 text-teal-300 font-bold">
            Score: {score} pts
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {!isCompleted ? (
        <div className="space-y-6">
          {/* Active Sentence Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSentence.id}
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl space-y-4"
            >
              {/* Context Tag and Speaker */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-mono font-semibold text-[11px] ${
                    currentSentence.theme === 'future-teachers'
                      ? 'bg-teal-950 text-teal-300 border border-teal-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {currentSentence.theme === 'future-teachers' ? '🎓 Advice for Future Teachers' : '💡 Habits of Effective EFL Students'}
                  </span>
                  <span className="font-semibold text-white">{currentSentence.title}</span>
                </div>

                <button
                  onClick={() => handleSpeak(currentSentence.fullSentence)}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-teal-500 text-slate-950 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700'
                  }`}
                  title="Listen to sentence audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* The Sentence Text */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 text-center">
                <div className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-relaxed">
                  "{currentSentence.fullSentence}"
                </div>
              </div>

              <div className="text-center text-xs text-slate-400">
                Click a category bucket below to classify this sentence:
              </div>

              {/* Two Sorting Buckets / Drop Zones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Bucket 1: Zero Conditional */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSort('zero')}
                  className="cursor-pointer group relative p-5 rounded-2xl bg-gradient-to-b from-teal-950/60 to-slate-950 border-2 border-teal-500/40 hover:border-teal-400 text-left transition-all shadow-lg hover:shadow-teal-500/15"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      BOX A: TYPE 0
                    </span>
                    <span className="text-xs font-mono text-teal-400/80">
                      {zeroBucketCount} sorted
                    </span>
                  </div>
                  <div className="text-lg font-extrabold text-white group-hover:text-teal-200 transition-colors">
                    Zero Conditional
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Permanent classroom rule, automatic policy, routine procedure, or factual habit. Both verbs in Present Simple.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-teal-400">
                    <span>Sort to Zero Conditional</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                {/* Bucket 2: First Conditional */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSort('first')}
                  className="cursor-pointer group relative p-5 rounded-2xl bg-gradient-to-b from-amber-950/60 to-slate-950 border-2 border-amber-500/40 hover:border-amber-400 text-left transition-all shadow-lg hover:shadow-amber-500/15"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      BOX B: TYPE 1
                    </span>
                    <span className="text-xs font-mono text-amber-400/80">
                      {firstBucketCount} sorted
                    </span>
                  </div>
                  <div className="text-lg font-extrabold text-white group-hover:text-amber-200 transition-colors">
                    First Conditional
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Specific real future situation (tomorrow, Friday, next term), promise, or warning. Uses "will + base verb".
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                    <span>Sort to First Conditional</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Previous Card Feedback Callout */}
          {lastSortDecision && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                lastSortDecision.isCorrect
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {lastSortDecision.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Correctly sorted as {lastSortDecision.sentence.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}! (+120 pts)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>
                      Not quite. This is actually a {lastSortDecision.sentence.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}.
                    </span>
                  </>
                )}
              </div>
              <p className="text-slate-300">
                <strong>Why: </strong>{lastSortDecision.sentence.whyZeroOrFirst}
              </p>
              <div className="font-mono text-[11px] text-slate-400 mt-1">
                Structure: {lastSortDecision.sentence.ruleExplanation}
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* Round Completed Summary */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-slate-900 border border-teal-500/50 shadow-2xl text-center space-y-6"
        >
          <Award className="w-16 h-16 text-amber-400 mx-auto drop-shadow-md" />

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
              Activity 1 Complete!
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              You Sorted All 10 Sentences!
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Accuracy: <strong className="text-emerald-400">{correctCount} / 10 correct ({Math.round((correctCount / 10) * 100)}%)</strong>
            </p>
          </div>

          {/* Quick Review List */}
          <div className="max-h-60 overflow-y-auto space-y-2 text-left p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            {sortedItems.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-slate-200 font-medium line-clamp-1">
                    "{item.sentence.fullSentence}"
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Category: <span className="font-semibold text-teal-300 uppercase">{item.sentence.type} Conditional</span>
                  </div>
                </div>
                {item.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleRestart}
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Sorting Challenge</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playClick();
                onSwitchToFillBlank();
              }}
              className="cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-400/20"
            >
              <span>Play Activity 2: Fill-in-the-Blank (10 Sentences)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Independent Study Helper Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-400" />
          <span>Need a refresher on Zero vs First formulas?</span>
        </div>
        <button
          onClick={() => {
            audioEngine.playClick();
            onOpenStudyGuide();
          }}
          className="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4 cursor-pointer"
        >
          Open Grammar Rules Handbook ➔
        </button>
      </div>
    </div>
  );
};
