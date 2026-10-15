import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, BookOpen, Volume2, GraduationCap, Flame, Zap, Lightbulb } from 'lucide-react';
import heroBannerImg from '../assets/images/academy_hero_banner_1792079415513.jpg';
import trophyImg from '../assets/images/grammar_quest_trophy_1792079428466.jpg';

interface AnimatedHeaderProps {
  onStartQuest: () => void;
  onOpenStudyGuide: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
  score: number;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  onStartQuest,
  onOpenStudyGuide,
  onToggleMusic,
  isMusicPlaying,
  score,
}) => {
  const [turboMotion, setTurboMotion] = useState(true);

  // Split words for lively staggered wave animation
  const titleWords = ['Zero', '&', 'First', 'Conditional'];
  const questWords = ['Teacher', '&', 'Student', 'Academy'];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/90 shadow-2xl mb-8">
      {/* Background Graphic with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt="Modern educational campus with adult EFL learners"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter blur-[1px] transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-teal-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Floating Animated Kinetic Badges with High Motion */}
      <motion.div
        animate={
          turboMotion
            ? {
                y: [-22, 22, -22],
                x: [-14, 14, -14],
                rotate: [-6, 6, -6],
              }
            : {
                y: [-10, 10, -10],
                x: [-6, 6, -6],
                rotate: [-2, 2, -2],
              }
        }
        transition={{
          duration: turboMotion ? 3.2 : 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden lg:block absolute top-6 right-20 z-10 pointer-events-none"
      >
        <div className="px-3.5 py-2 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-300 font-mono text-xs backdrop-blur-md shadow-xl shadow-teal-500/10 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-teal-400 animate-bounce" />
          <span>Advice for Future Teachers ➔ If + Present Simple</span>
        </div>
      </motion.div>

      <motion.div
        animate={
          turboMotion
            ? {
                y: [24, -20, 24],
                x: [12, -12, 12],
                rotate: [5, -5, 5],
              }
            : {
                y: [10, -10, 10],
                x: [6, -6, 6],
                rotate: [2, -2, 2],
              }
        }
        transition={{
          duration: turboMotion ? 3.6 : 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="hidden lg:block absolute bottom-10 right-48 z-10 pointer-events-none"
      >
        <div className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-xs backdrop-blur-md shadow-xl shadow-amber-500/10 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Habits of Effective Students ➔ Will + Base Form</span>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 px-6 sm:px-10 py-10 md:py-14 max-w-5xl">
        {/* Category kicker and Theme announcement */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-950/80 border border-teal-800 text-teal-300">
            <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
            <span>Theme 1: Advice for Future Teachers</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-800 text-amber-300">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Theme 2: Habits of Effective EFL Students</span>
          </div>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-slate-400">20 Real Sentences</span>
        </div>

        {/* HIGH-MOTION ANIMATED DYNAMIC MAIN TITLE */}
        <div className="mb-6">
          {/* Animated line 1: Zero & First Conditional */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                animate={
                  turboMotion
                    ? {
                        y: [0, -18, 4, -10, 0],
                        rotate: [0, -3.5, 3.5, -1.5, 0],
                        scale: [1, 1.06, 0.97, 1.02, 1],
                      }
                    : {
                        y: [0, -8, 2, -4, 0],
                        rotate: [0, -1.5, 1.5, 0],
                        scale: [1, 1.02, 1],
                      }
                }
                transition={{
                  duration: turboMotion ? 2.8 : 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.18,
                }}
                className="inline-block text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white select-none drop-shadow-lg"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Animated line 2: Glowing Animated Gradient Subtitle */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            {questWords.map((word, idx) => (
              <motion.span
                key={idx}
                animate={
                  turboMotion
                    ? {
                        y: [0, 16, -6, 10, 0],
                        rotate: [0, 3, -3, 1, 0],
                        scale: [1, 1.04, 0.98, 1.02, 1],
                      }
                    : {
                        y: [0, 8, -3, 4, 0],
                        rotate: [0, 1.5, -1.5, 0],
                        scale: [1, 1.02, 1],
                      }
                }
                transition={{
                  duration: turboMotion ? 3.0 : 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (idx + 4) * 0.16,
                }}
                className="inline-block text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent select-none drop-shadow-md"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Animated Subtext with gentle wave */}
          <motion.p
            animate={{
              x: [-4, 4, -4],
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-base sm:text-lg text-slate-200 max-w-3xl mt-4 font-normal leading-relaxed text-balance"
          >
            Explore real pedagogy rules and high-impact study routines with 20 educational sentences.
            Test yourself with the <strong className="text-teal-300">Sorting Challenge</strong> and <strong className="text-amber-300">Fill-in-the-Blank Challenge</strong>, complete with 8-bit game audio and teacher answers.
          </motion.p>
        </div>

        {/* Quick Features Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 mb-8 font-medium">
          <div className="flex items-center gap-1.5 text-teal-300">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Activity 1: Sorting & Categorizing (10 Sentences)</span>
          </div>
          <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Activity 2: Fill-in-the-Blank (10 Sentences)</span>
          </div>
          <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>8-Bit Chiptune & Speech Narration</span>
          </div>
        </div>

        {/* CTA Button Actions + Turbo Motion Toggle */}
        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartQuest}
            className="cursor-pointer flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all"
          >
            <Play className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>Start Game (Choose Options)</span>
          </motion.button>

          <button
            onClick={onOpenStudyGuide}
            className="cursor-pointer flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-200 font-semibold text-sm sm:text-base transition-colors"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Rules & Formulas</span>
          </button>

          <button
            onClick={onToggleMusic}
            className={`cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              isMusicPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isMusicPlaying ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{isMusicPlaying ? 'Arcade Music: Playing ♪' : 'Play Background Music'}</span>
          </button>

          {/* Title Kinetic Motion Boost Toggle */}
          <button
            onClick={() => setTurboMotion((prev) => !prev)}
            className={`cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all border ${
              turboMotion
                ? 'bg-teal-950/80 text-teal-300 border-teal-500/40 shadow-sm'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle extra kinetic motion on the title"
          >
            <Flame className={`w-3.5 h-3.5 ${turboMotion ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} />
            <span>{turboMotion ? 'Extra Title Motion: ON' : 'Extra Title Motion: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Decorative Golden Graduation Trophy Asset in Corner */}
      <div className="hidden xl:block absolute right-8 bottom-6 w-36 h-36 z-10 pointer-events-none drop-shadow-2xl">
        <img
          src={trophyImg}
          alt="Grammar Academy Golden Trophy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(45,212,191,0.2)] animate-float-slow"
        />
      </div>
    </div>
  );
};
