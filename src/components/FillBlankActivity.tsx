import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PenTool, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Volume2, Award, Sparkles, HelpCircle, ArrowLeft
} from 'lucide-react';
import { FILL_BLANK_SENTENCES, SentenceItem } from '../data/sentencesData';
import { audioEngine } from '../utils/audioEngine';

interface FillBlankActivityProps {
  score: number;
  streak: number;
  onUpdateScore: (delta: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onSwitchToSorting: () => void;
  onOpenStudyGuide: () => void;
}

export const FillBlankActivity: React.FC<FillBlankActivityProps> = ({
  score,
  streak,
  onUpdateScore,
  onIncrementStreak,
  onResetStreak,
  onSwitchToSorting,
  onOpenStudyGuide,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultsHistory, setResultsHistory] = useState<{
    sentence: SentenceItem;
    isCorrect: boolean;
  }[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentSentence = FILL_BLANK_SENTENCES[currentIndex];

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    audioEngine.speak(text, () => setIsSpeaking(false));
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentSentence) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentSentence.blankChallenge.options[idx].isCorrect;

    if (isCorrect) {
      audioEngine.playCorrect();
      const points = 150 + streak * 30;
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

    setResultsHistory((prev) => [...prev, { sentence: currentSentence, isCorrect }]);
  };

  const handleNext = () => {
    audioEngine.playClick();
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIndex + 1 >= FILL_BLANK_SENTENCES.length) {
      setIsCompleted(true);
      audioEngine.playVictory();
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.5 } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    audioEngine.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
    setResultsHistory([]);
  };

  const correctCount = resultsHistory.filter((r) => r.isCorrect).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <PenTool className="w-4 h-4 text-amber-400" />
            <span>Activity 2 of 2: Fill-in-the-Blank</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
            Complete 10 Conditional Sentences
          </h2>
        </div>

        {/* Counter & Score */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            Question <span className="text-amber-300 font-bold">{Math.min(currentIndex + 1, FILL_BLANK_SENTENCES.length)}</span> / 10
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-300 font-bold">
            Score: {score} pts
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSentence.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl space-y-6"
            >
              {/* Context Tag */}
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
                  <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                    currentSentence.type === 'zero'
                      ? 'bg-teal-950 text-teal-300 border border-teal-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {currentSentence.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak(currentSentence.fullSentence)}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                  }`}
                  title="Listen to complete sentence audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* The Blank Sentence Prompt */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">
                  Select the correct verb forms to complete the sentence:
                </div>
                <div className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-relaxed">
                  "{currentSentence.blankChallenge.prompt}"
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentSentence.blankChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!isAnswered ? { scale: 1.01 } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`cursor-pointer p-4 rounded-xl border text-left transition-all ${
                        isAnswered
                          ? opt.isCorrect
                            ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20'
                            : isSelected
                            ? 'bg-rose-950/90 border-rose-500 text-rose-200'
                            : 'bg-slate-950 border-slate-800 text-slate-600 opacity-50'
                          : 'bg-slate-950 hover:bg-amber-950/30 border-slate-800 hover:border-amber-500/50 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm sm:text-base font-bold text-white">
                          {opt.text}
                        </span>
                        {isAnswered && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isAnswered && isSelected && !opt.isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </div>
                      {isAnswered && (isSelected || opt.isCorrect) && (
                        <div className="text-xs mt-2 pt-2 border-t border-slate-800 text-slate-300 leading-normal">
                          {opt.feedback}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next Button */}
              {isAnswered && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-400/20"
                  >
                    <span>Next Sentence</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Completion Summary Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-slate-900 border border-amber-500/50 shadow-2xl text-center space-y-6"
        >
          <Award className="w-16 h-16 text-amber-400 mx-auto drop-shadow-md" />

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Activity 2 Complete!
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              You Completed All 10 Fill-in-the-Blank Sentences!
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Accuracy: <strong className="text-emerald-400">{correctCount} / 10 correct ({Math.round((correctCount / 10) * 100)}%)</strong>
            </p>
          </div>

          {/* Quick Review List */}
          <div className="max-h-60 overflow-y-auto space-y-2 text-left p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            {resultsHistory.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-slate-200 font-medium">
                    "{item.sentence.fullSentence}"
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Structure: <span className="font-mono text-teal-300">{item.sentence.ruleExplanation}</span>
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

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleRestart}
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Fill-in-the-Blank</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playClick();
                onSwitchToSorting();
              }}
              className="cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-teal-400/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Activity 1: Sorting (10 Sentences)</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Helper Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Remember: Never put "will" inside the If-clause!</span>
        </div>
        <button
          onClick={() => {
            audioEngine.playClick();
            onOpenStudyGuide();
          }}
          className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
        >
          Open Grammar Rules Handbook ➔
        </button>
      </div>
    </div>
  );
};
