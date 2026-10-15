import React from 'react';
import { X, FolderCheck, PenTool, BookOpen, Key, AlertTriangle, ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface StudentInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudyGuide: () => void;
  onStartQuest: () => void;
}

export const StudentInstructionsModal: React.FC<StudentInstructionsModalProps> = ({
  isOpen,
  onClose,
  onOpenStudyGuide,
  onStartQuest,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 md:p-8 text-slate-200">
        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">
            Student Independent Study Guide
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display">
            How to Use the 2 Game Activities
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Designed for adult English learners (A2 level). You will practice 20 real educational sentences divided into two core activities:
          </p>
        </div>

        {/* 2 Dynamic Game Activities Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Activity 1 Card */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-teal-950/40 to-slate-950 border border-teal-500/40">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm mb-2">
              <FolderCheck className="w-5 h-5 text-teal-400" />
              <span>Activity 1: Sorting & Categorizing</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                <strong>Goal:</strong> Classify <strong>10 educational sentences</strong> into the correct category box:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-teal-300">Zero Conditional Box:</strong> Permanent rules, library rules, habits, and automatic facts.</li>
                <li><strong className="text-amber-300">First Conditional Box:</strong> Specific real future predictions, exams tomorrow, or promises.</li>
              </ul>
              <p className="text-[11px] text-teal-200/80 pt-1">
                Tip: Click either box to sort the current card. Receive instant explanations!
              </p>
            </div>
          </div>

          {/* Activity 2 Card */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-amber-950/40 to-slate-950 border border-amber-500/40">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-2">
              <PenTool className="w-5 h-5 text-amber-400" />
              <span>Activity 2: Fill-in-the-Blank</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                <strong>Goal:</strong> Complete <strong>10 educational conditional sentences</strong> by selecting the correct verb tenses:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Check the condition verb (Present Simple).</li>
                <li>Check the result verb (Present Simple for Zero vs "will + base verb" for First).</li>
              </ul>
              <p className="text-[11px] text-amber-200/80 pt-1">
                Tip: Watch out for the A2 "Will-Trap" — never use "will" after "if"!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Grammar Cheat Sheet */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            The 2 Golden Formulas
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-800/40">
              <div className="font-bold text-teal-300 mb-1">Zero Conditional (Universal Facts & Rules)</div>
              <div className="font-mono text-teal-200 text-[11px] mb-1">If / When + Present Simple, ... Present Simple</div>
              <p className="text-slate-300 text-[11px]">
                Happens 100% of the time. (e.g., If students arrive late, the professor marks them absent.)
              </p>
            </div>
            <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/40">
              <div className="font-bold text-amber-300 mb-1">First Conditional (Real Future Predictions)</div>
              <div className="font-mono text-amber-200 text-[11px] mb-1">If + Present Simple, ... WILL + Base Verb</div>
              <p className="text-slate-300 text-[11px]">
                Specific future prediction for tomorrow or Friday. (e.g., If you study tonight, you will pass.)
              </p>
            </div>
          </div>
        </div>

        {/* The Golden Rule to Avoid Mistakes */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200 mb-6">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-300">The #1 Mistake for A2 Learners:</strong> Never use <em>will</em> directly after <em>If</em>!
            <div className="mt-1 font-mono text-[11px] text-slate-300">
              ❌ <span className="line-through text-rose-400">If it will rain tomorrow, we will stay inside.</span><br />
              ✅ <span className="text-emerald-400">If it rains tomorrow, we will stay inside.</span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
              onOpenStudyGuide();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Open Full Grammar Handbook</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
              onStartQuest();
            }}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-teal-500/20 cursor-pointer"
          >
            <span>Start Activity 1 (Sorting) Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
