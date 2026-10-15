import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Key, Headphones, Trophy, HelpCircle } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface NavbarProps {
  currentTab: 'play' | 'study' | 'audio-lab' | 'answer-key';
  onSelectTab: (tab: 'play' | 'study' | 'audio-lab' | 'answer-key') => void;
  onOpenInstructions: () => void;
  score: number;
  streak: number;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenInstructions,
  score,
  streak,
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no pills/descriptors) */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onSelectTab('play');
          }}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl md:text-2xl font-extrabold tracking-tight font-display bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity whitespace-nowrap shrink-0">
            ConditionQuest
          </span>
        </button>

        {/* Zone 2: Navigation Links (Single line, text with subtle underlines / active state) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => {
              audioEngine.playClick();
              onSelectTab('play');
            }}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'play'
                ? 'text-teal-300 bg-teal-950/60 border border-teal-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Play Quest</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onSelectTab('study');
            }}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'study'
                ? 'text-teal-300 bg-teal-950/60 border border-teal-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Grammar Rules</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onSelectTab('audio-lab');
            }}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'audio-lab'
                ? 'text-teal-300 bg-teal-950/60 border border-teal-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>Audio Lab (20 Sentences)</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onSelectTab('answer-key');
            }}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'answer-key'
                ? 'text-teal-300 bg-teal-950/60 border border-teal-500/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>Answer Key</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenInstructions();
            }}
            className="flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="How to play & study guide instructions"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>How to Use</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Game Audio / Score Hub */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Active Score readout */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono tabular-nums">
            <span className="text-amber-400 font-bold">{score} pts</span>
            {streak > 1 && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {streak}x
              </span>
            )}
          </div>

          {/* Music Button */}
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400/50 whitespace-nowrap shrink-0 cursor-pointer ${
              isMusicPlaying
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-bold hover:brightness-110 shadow-teal-500/20'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title={isMusicPlaying ? 'Pause Game Soundtrack' : 'Start 8-Bit Game Music'}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-slate-950 animate-bounce" />
                <span>Music: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Game Music</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden items-center justify-between gap-1 mt-2.5 pt-2 border-t border-slate-800/60 overflow-x-auto text-xs">
        <button
          onClick={() => onSelectTab('play')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${currentTab === 'play' ? 'text-teal-300 bg-teal-950/80 font-semibold' : 'text-slate-400'}`}
        >
          Quest
        </button>
        <button
          onClick={() => onSelectTab('study')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${currentTab === 'study' ? 'text-teal-300 bg-teal-950/80 font-semibold' : 'text-slate-400'}`}
        >
          Rules
        </button>
        <button
          onClick={() => onSelectTab('audio-lab')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${currentTab === 'audio-lab' ? 'text-teal-300 bg-teal-950/80 font-semibold' : 'text-slate-400'}`}
        >
          Audio Lab
        </button>
        <button
          onClick={() => onSelectTab('answer-key')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${currentTab === 'answer-key' ? 'text-teal-300 bg-teal-950/80 font-semibold' : 'text-slate-400'}`}
        >
          Answer Key
        </button>
        <button
          onClick={onOpenInstructions}
          className="px-2 py-1.5 text-cyan-400 font-medium whitespace-nowrap"
        >
          Guide
        </button>
      </div>
    </header>
  );
};
