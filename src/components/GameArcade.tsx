import React, { useState } from 'react';
import { FolderCheck, PenTool, BookOpen, Trophy } from 'lucide-react';
import { SortingActivity } from './SortingActivity';
import { FillBlankActivity } from './FillBlankActivity';
import { audioEngine } from '../utils/audioEngine';

interface GameArcadeProps {
  score: number;
  streak: number;
  onUpdateScore: (delta: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onOpenStudyGuide: () => void;
}

export const GameArcade: React.FC<GameArcadeProps> = ({
  score,
  streak,
  onUpdateScore,
  onIncrementStreak,
  onResetStreak,
  onOpenStudyGuide,
}) => {
  const [activeActivity, setActiveActivity] = useState<'sorting' | 'fill-blank'>('sorting');

  return (
    <div className="space-y-6">
      {/* Dynamic Activity Selector Hub */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold">
            Interactive Dynamic Activities
          </div>
          <div className="text-sm sm:text-base font-bold text-white font-display">
            Choose your grammar training challenge:
          </div>
        </div>

        {/* 2 Activity Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => {
              audioEngine.playClick();
              setActiveActivity('sorting');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeActivity === 'sorting'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FolderCheck className="w-4 h-4" />
            <span>Activity 1: Sorting (10 Sentences)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              setActiveActivity('fill-blank');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeActivity === 'fill-blank'
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Activity 2: Fill-in-the-Blank (10 Sentences)</span>
          </button>
        </div>
      </div>

      {/* Render Selected Activity */}
      {activeActivity === 'sorting' ? (
        <SortingActivity
          score={score}
          streak={streak}
          onUpdateScore={onUpdateScore}
          onIncrementStreak={onIncrementStreak}
          onResetStreak={onResetStreak}
          onSwitchToFillBlank={() => setActiveActivity('fill-blank')}
          onOpenStudyGuide={onOpenStudyGuide}
        />
      ) : (
        <FillBlankActivity
          score={score}
          streak={streak}
          onUpdateScore={onUpdateScore}
          onIncrementStreak={onIncrementStreak}
          onResetStreak={onResetStreak}
          onSwitchToSorting={() => setActiveActivity('sorting')}
          onOpenStudyGuide={onOpenStudyGuide}
        />
      )}
    </div>
  );
};
