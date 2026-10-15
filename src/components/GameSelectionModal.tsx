import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, FolderCheck, PenTool, Headphones, ArrowRight, Sparkles, 
  GraduationCap, Lightbulb, Trophy, Play 
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface GameSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (game: 'sorting' | 'fill-blank' | 'audio-lab') => void;
}

export const GameSelectionModal: React.FC<GameSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectGame,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 md:p-8 text-slate-100"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close game selection modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pr-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Select Your Grammar Challenge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Choose a Game Mode to Start
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              All games feature 20 real educational sentences themed on <strong className="text-teal-300">Advice for Future Teachers</strong> and <strong className="text-amber-300">Habits of Effective EFL Students</strong>.
            </p>
          </div>

          {/* Game Selection Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Game Option 1: Sorting Challenge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                audioEngine.playClick();
                onSelectGame('sorting');
              }}
              className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-b from-teal-950/60 to-slate-950 border-2 border-teal-500/40 hover:border-teal-400 transition-all shadow-xl hover:shadow-teal-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/40">
                    <FolderCheck className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                    10 Sentences
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-teal-200 transition-colors">
                  1. Sorting & Categorizing
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Classify sentences into the <strong>Zero Conditional Box</strong> (permanent rules, software facts) or the <strong>First Conditional Box</strong> (real future plans & predictions).
                </p>

                {/* Theme indicators */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-teal-300">
                    🎓 Future Teachers
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                    💡 Effective Students
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:text-teal-300">
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
                  <span>Start Sorting Game</span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Game Option 2: Fill-in-the-Blank Challenge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                audioEngine.playClick();
                onSelectGame('fill-blank');
              }}
              className="cursor-pointer group p-5 rounded-2xl bg-gradient-to-b from-amber-950/60 to-slate-950 border-2 border-amber-500/40 hover:border-amber-400 transition-all shadow-xl hover:shadow-amber-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                    10 Sentences
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                  2. Fill-in-the-Blank Quest
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Complete the missing verb forms in educational situations. Choose the correct present simple or future will-clauses while avoiding the "will-trap"!
                </p>

                {/* Theme indicators */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-teal-300">
                    🎓 Future Teachers
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                    💡 Effective Students
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Start Fill-in-the-Blank</span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>

          {/* Secondary Option: Audio Lab */}
          <div
            onClick={() => {
              audioEngine.playClick();
              onSelectGame('audio-lab');
            }}
            className="cursor-pointer group p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Audio Pronunciation Lab (All 20 Sentences)
                </div>
                <div className="text-[11px] text-slate-400">
                  Listen with native speech synthesis, practice shadowing, and hide clauses to test your memory.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 shrink-0">
              <span className="hidden sm:inline">Open Lab</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
