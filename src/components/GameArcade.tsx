import React from 'react';
import { FolderCheck, PenTool, LayoutGrid } from 'lucide-react';
import { SortingActivity } from './SortingActivity';
import { FillBlankActivity } from './FillBlankActivity';
import { audioEngine } from '../utils/audioEngine';

interface GameArcadeProps {
  score: number;
  streak: number;
  activeActivity: 'sorting' | 'fill-blank';
  onSelectActivity: (activity: 'sorting' | 'fill-blank') => void;
  onOpenGameModal: () => void;
  onUpdateScore: (delta: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onOpenStudyGuide: () => void;
}

export const GameArcade: React.FC<GameArcadeProps> = ({
  score,
  streak,
  activeActivity,
  onSelectActivity,
  onOpenGameModal,
  onUpdateScore,
  onIncrementStreak,
  onResetStreak,
  onOpenStudyGuide,
}) => {
  return (
    <div id="game-arena" className="space-y-6 scroll-mt-24">
      {/* Dynamic Activity Selector Hub */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold">
            Interactive Grammar Challenges
          </div>
          <div className="text-sm sm:text-base font-bold text-white font-display">
            Active Game: {activeActivity === 'sorting' ? 'Activity 1: Sorting & Categorizing' : 'Activity 2: Fill-in-the-Blank Quest'}
          </div>
        </div>

        {/* 2 Activity Tabs + Modal Launcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => {
              audioEngine.playClick();
              onSelectActivity('sorting');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeActivity === 'sorting'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FolderCheck className="w-4 h-4" />
            <span>Activity 1: Sorting (10)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onSelectActivity('fill-blank');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeActivity === 'fill-blank'
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Activity 2: Fill Blank (10)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenGameModal();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Open game selection options"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Game Options</span>
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
          onSwitchToFillBlank={() => onSelectActivity('fill-blank')}
          onOpenStudyGuide={onOpenStudyGuide}
        />
      ) : (
        <FillBlankActivity
          score={score}
          streak={streak}
          onUpdateScore={onUpdateScore}
          onIncrementStreak={onIncrementStreak}
          onResetStreak={onResetStreak}
          onSwitchToSorting={() => onSelectActivity('sorting')}
          onOpenStudyGuide={onOpenStudyGuide}
        />
      )}
    </div>
  );
};
