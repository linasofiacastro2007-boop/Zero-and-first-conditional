import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AnimatedHeader } from './components/AnimatedHeader';
import { GameArcade } from './components/GameArcade';
import { GrammarRulesHandbook } from './components/GrammarRulesHandbook';
import { AudioLabView } from './components/AudioLabView';
import { AnswerKeyView } from './components/AnswerKeyView';
import { StudentInstructionsModal } from './components/StudentInstructionsModal';
import { audioEngine } from './utils/audioEngine';
import { Music, Volume2, VolumeX, Sparkles, BookOpen, Key, Trophy, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'play' | 'study' | 'audio-lab' | 'answer-key'>('play');
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicTrack, setMusicTrack] = useState<'arcade' | 'lofi'>('arcade');
  const [musicVolume, setMusicVolume] = useState(0.25);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMusic = () => {
    const newState = audioEngine.toggleMusic();
    setIsMusicPlaying(newState);
  };

  const handleTrackChange = (track: 'arcade' | 'lofi') => {
    audioEngine.playClick();
    setMusicTrack(track);
    audioEngine.setTrack(track);
    if (!isMusicPlaying) {
      audioEngine.startMusic(track);
      setIsMusicPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setMusicVolume(val);
    audioEngine.setMusicVolume(val);
  };

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleUpdateScore = (delta: number) => {
    setScore((prev) => prev + delta);
  };

  const handleIncrementStreak = () => {
    setStreak((prev) => prev + 1);
  };

  const handleResetStreak = () => {
    setStreak(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Strict 3-Zone Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        score={score}
        streak={streak}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Container - Desktop baseline 1440px friendly */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Animated Moving Header with Graphic Banner */}
        <AnimatedHeader
          onStartQuest={() => {
            audioEngine.playClick();
            setCurrentTab('play');
          }}
          onOpenStudyGuide={() => {
            audioEngine.playClick();
            setCurrentTab('study');
          }}
          onToggleMusic={handleToggleMusic}
          isMusicPlaying={isMusicPlaying}
          score={score}
        />

        {/* Tab Views */}
        {currentTab === 'play' && (
          <GameArcade
            score={score}
            streak={streak}
            onUpdateScore={handleUpdateScore}
            onIncrementStreak={handleIncrementStreak}
            onResetStreak={handleResetStreak}
            onOpenStudyGuide={() => {
              audioEngine.playClick();
              setCurrentTab('study');
            }}
          />
        )}

        {currentTab === 'study' && (
          <GrammarRulesHandbook
            onStartQuest={() => {
              audioEngine.playClick();
              setCurrentTab('play');
            }}
          />
        )}

        {currentTab === 'audio-lab' && <AudioLabView />}

        {currentTab === 'answer-key' && <AnswerKeyView />}
      </main>

      {/* Floating Retro Sound & Music Control Bar (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <button
          onClick={handleToggleMusic}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            isMusicPlaying
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
          title={isMusicPlaying ? 'Pause Game Music' : 'Start Game Music'}
        >
          <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-spin' : ''}`} />
        </button>

        {isMusicPlaying && (
          <div className="flex items-center gap-2 text-xs pr-1">
            <button
              onClick={() => handleTrackChange('arcade')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                musicTrack === 'arcade'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              8-Bit Arcade
            </button>
            <button
              onClick={() => handleTrackChange('lofi')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                musicTrack === 'lofi'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lo-Fi Lounge
            </button>

            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={musicVolume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
              title="Music Volume"
            />
          </div>
        )}

        <button
          onClick={handleToggleMute}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Student Independent Study Instructions Modal */}
      <StudentInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        onOpenStudyGuide={() => {
          setIsInstructionsOpen(false);
          setCurrentTab('study');
        }}
        onStartQuest={() => {
          setIsInstructionsOpen(false);
          setCurrentTab('play');
        }}
      />

      {/* Quiet, Clean Editorial Footer (Anti-Slop compliant: no fake telemetry or pulsing dots) */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 font-display">ConditionQuest</span>
            <span aria-hidden="true">·</span>
            <span>A2 Adult EFL Grammar Curriculum</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => {
                audioEngine.playClick();
                setIsInstructionsOpen(true);
              }}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              How to Use
            </button>
            <button
              onClick={() => {
                audioEngine.playClick();
                setCurrentTab('study');
              }}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Grammar Handbook
            </button>
            <button
              onClick={() => {
                audioEngine.playClick();
                setCurrentTab('answer-key');
              }}
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Teacher Answer Key
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
