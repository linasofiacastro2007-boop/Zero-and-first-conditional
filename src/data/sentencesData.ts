/**
 * 20 Educational Conditional Sentences for A2 Adult EFL Students
 * Specifically themed on:
 * 1. "Advice for Future Teachers" (Classroom management, student engagement, lesson planning)
 * 2. "Habits of Effective EFL Students" (Language acquisition habits, study routines, error analysis)
 *
 * 10 Sentences for Activity 1: Sorting & Categorizing (5 Zero + 5 First)
 * 10 Sentences for Activity 2: Fill-in-the-Blank (5 Zero + 5 First)
 * Total: 10 Zero Conditional (habits/rules) + 10 First Conditional (real future advice)
 */

export interface SentenceItem {
  id: string;
  type: 'zero' | 'first';
  activity: 'sorting' | 'fill-blank';
  theme: 'future-teachers' | 'effective-students';
  title: string;
  fullSentence: string;
  ifClause: string;
  resultClause: string;
  ifVerb: string;
  resultVerb: string;
  context: string;
  ruleExplanation: string;
  whyZeroOrFirst: string;
  blankChallenge: {
    prompt: string;
    options: {
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
  audioText: string;
}

// -------------------------------------------------------------
// ACTIVITY 1: 10 SENTENCES FOR SORTING & CATEGORIZING
// Themes: Advice for Future Teachers & Habits of Effective EFL Students
// -------------------------------------------------------------
export const SORTING_SENTENCES: SentenceItem[] = [
  {
    id: 'sort-1',
    type: 'zero',
    activity: 'sorting',
    theme: 'effective-students',
    title: 'Vocabulary Notebook Habit',
    fullSentence: 'When effective EFL students encounter unfamiliar words, they write them in a vocabulary notebook.',
    ifClause: 'When effective EFL students encounter unfamiliar words',
    resultClause: 'they write them in a vocabulary notebook',
    ifVerb: 'encounter (Present Simple)',
    resultVerb: 'write (Present Simple)',
    context: 'Habit of Effective EFL Students: Active lexical recording',
    ruleExplanation: 'Structure: When + Present Simple (encounter), ... Present Simple (write).',
    whyZeroOrFirst: 'Zero Conditional describes a permanent habit and standard routine practiced by successful language learners.',
    blankChallenge: {
      prompt: 'When effective EFL students _______ (encounter) unfamiliar words, they _______ (write) them in a vocabulary notebook.',
      options: [
        { text: 'encounter / write', isCorrect: true, feedback: 'Correct! Both verbs use Present Simple because this is a general study habit.' },
        { text: 'will encounter / will write', isCorrect: false, feedback: 'Incorrect. We never use "will" after "when", and permanent habits do not use "will".' },
        { text: 'encounters / writes', isCorrect: false, feedback: 'Incorrect. "Students" and "they" are plural subjects (use encounter / write).' },
        { text: 'encountered / wrote', isCorrect: false, feedback: 'Past simple describes a single past event; regular habits require Present Simple.' }
      ]
    },
    audioText: 'When effective EFL students encounter unfamiliar words, they write them in a vocabulary notebook.'
  },
  {
    id: 'sort-2',
    type: 'first',
    activity: 'sorting',
    theme: 'future-teachers',
    title: 'Visual Aids for Tomorrow\'s Class',
    fullSentence: 'If you prepare clear visual aids before tomorrow\'s lesson, your students will understand the grammar faster.',
    ifClause: 'If you prepare clear visual aids before tomorrow\'s lesson',
    resultClause: 'your students will understand the grammar faster',
    ifVerb: 'prepare (Present Simple)',
    resultVerb: 'will understand (will + base verb)',
    context: 'Advice for Future Teachers: Lesson preparation for upcoming practicum',
    ruleExplanation: 'Structure: If + Present Simple (prepare), ... will + base verb (will understand).',
    whyZeroOrFirst: 'First Conditional is used for actionable advice regarding a specific upcoming class tomorrow.',
    blankChallenge: {
      prompt: 'If you _______ (prepare) clear visual aids before tomorrow\'s lesson, your students _______ (understand) the grammar faster.',
      options: [
        { text: 'prepare / will understand', isCorrect: true, feedback: 'Excellent! "prepare" in the if-clause (present simple) and "will understand" for the future result.' },
        { text: 'will prepare / understand', isCorrect: false, feedback: 'Never put "will" inside the if-clause!' },
        { text: 'prepares / will understand', isCorrect: false, feedback: '"You" takes base form "prepare", not "prepares".' },
        { text: 'prepare / understand', isCorrect: false, feedback: 'Since this is a prediction for tomorrow\'s lesson, the result needs "will understand".' }
      ]
    },
    audioText: 'If you prepare clear visual aids before tomorrow\'s lesson, your students will understand the grammar faster.'
  },
  {
    id: 'sort-3',
    type: 'zero',
    activity: 'sorting',
    theme: 'future-teachers',
    title: 'Teacher Speaking Pace Rule',
    fullSentence: 'If a teacher speaks too quickly in an A2 classroom, the adult learners lose focus.',
    ifClause: 'If a teacher speaks too quickly in an A2 classroom',
    resultClause: 'the adult learners lose focus',
    ifVerb: 'speaks (Present Simple)',
    resultVerb: 'lose (Present Simple)',
    context: 'Advice for Future Teachers: Universal pedagogical reality of teacher talk time and pace',
    ruleExplanation: 'Structure: If + Present Simple (speaks), ... Present Simple (lose).',
    whyZeroOrFirst: 'Zero Conditional states a universal pedagogical cause-and-effect that happens every time a teacher speaks too quickly.',
    blankChallenge: {
      prompt: 'If a teacher _______ (speak) too quickly in an A2 classroom, the adult learners _______ (lose) focus.',
      options: [
        { text: 'speaks / lose', isCorrect: true, feedback: 'Great job! Singular "teacher speaks", plural "learners lose" in Present Simple.' },
        { text: 'speak / loses', isCorrect: false, feedback: 'Check subject agreement: "teacher" needs -s, "learners" is plural.' },
        { text: 'will speak / will lose', isCorrect: false, feedback: 'Universal teaching facts use Present Simple in both clauses.' },
        { text: 'spoke / lost', isCorrect: false, feedback: 'Do not use past tense for general classroom facts.' }
      ]
    },
    audioText: 'If a teacher speaks too quickly in an A2 classroom, the adult learners lose focus.'
  },
  {
    id: 'sort-4',
    type: 'first',
    activity: 'sorting',
    theme: 'effective-students',
    title: 'Evening Podcast Listening Plan',
    fullSentence: 'If you listen to an English podcast for twenty minutes tonight, you will recognize more spoken idioms tomorrow.',
    ifClause: 'If you listen to an English podcast for twenty minutes tonight',
    resultClause: 'you will recognize more spoken idioms tomorrow',
    ifVerb: 'listen (Present Simple)',
    resultVerb: 'will recognize (will + base verb)',
    context: 'Habit of Effective EFL Students: Daily audio exposure leading to tomorrow\'s success',
    ruleExplanation: 'Structure: If + Present Simple (listen), ... will + base verb (will recognize).',
    whyZeroOrFirst: 'First Conditional is used because tonight and tomorrow are specific future timeframes.',
    blankChallenge: {
      prompt: 'If you _______ (listen) to an English podcast for twenty minutes tonight, you _______ (recognize) more spoken idioms tomorrow.',
      options: [
        { text: 'listen / will recognize', isCorrect: true, feedback: 'Spot on! Present Simple condition with future consequence "will recognize".' },
        { text: 'will listen / recognize', isCorrect: false, feedback: 'Never put "will" inside the if-clause!' },
        { text: 'listens / will recognize', isCorrect: false, feedback: '"You" takes "listen", not "listens".' },
        { text: 'listen / recognize', isCorrect: false, feedback: 'This specific tomorrow prediction requires "will recognize".' }
      ]
    },
    audioText: 'If you listen to an English podcast for twenty minutes tonight, you will recognize more spoken idioms tomorrow.'
  },
  {
    id: 'sort-5',
    type: 'zero',
    activity: 'sorting',
    theme: 'effective-students',
    title: 'Mindset Toward Speaking Mistakes',
    fullSentence: 'If a motivated learner makes a speaking mistake, they review the error calmly rather than feeling embarrassed.',
    ifClause: 'If a motivated learner makes a speaking mistake',
    resultClause: 'they review the error calmly rather than feeling embarrassed',
    ifVerb: 'makes (Present Simple)',
    resultVerb: 'review (Present Simple)',
    context: 'Habit of Effective EFL Students: Constructive growth mindset toward errors',
    ruleExplanation: 'Structure: If + Present Simple (makes), ... Present Simple (review).',
    whyZeroOrFirst: 'Zero Conditional describes the standard psychological attitude and habitual reaction of successful students.',
    blankChallenge: {
      prompt: 'If a motivated learner _______ (make) a speaking mistake, they _______ (review) the error calmly.',
      options: [
        { text: 'makes / review', isCorrect: true, feedback: 'Awesome! Singular "learner makes", singular they "review" in Present Simple.' },
        { text: 'make / reviews', isCorrect: false, feedback: '"A motivated learner" requires "makes".' },
        { text: 'will make / review', isCorrect: false, feedback: 'No "will" in the if-clause.' },
        { text: 'made / reviewed', isCorrect: false, feedback: 'Habits and mental attitudes use Present Simple.' }
      ]
    },
    audioText: 'If a motivated learner makes a speaking mistake, they review the error calmly rather than feeling embarrassed.'
  },
  {
    id: 'sort-6',
    type: 'first',
    activity: 'sorting',
    theme: 'future-teachers',
    title: 'Praising Reluctant Participants',
    fullSentence: 'If you praise quiet students during group work, they will participate more actively in future seminars.',
    ifClause: 'If you praise quiet students during group work',
    resultClause: 'they will participate more actively in future seminars',
    ifVerb: 'praise (Present Simple)',
    resultVerb: 'will participate (will + base verb)',
    context: 'Advice for Future Teachers: Encouraging introverted language learners',
    ruleExplanation: 'Structure: If + Present Simple (praise), ... will + base verb (will participate).',
    whyZeroOrFirst: 'First Conditional expresses a teacher\'s strategic prediction for future student growth.',
    blankChallenge: {
      prompt: 'If you _______ (praise) quiet students during group work, they _______ (participate) more actively in future seminars.',
      options: [
        { text: 'praise / will participate', isCorrect: true, feedback: 'Perfect! Present simple condition with future result "will participate".' },
        { text: 'will praise / participate', isCorrect: false, feedback: 'Do not put "will" in the if-clause.' },
        { text: 'praises / will participate', isCorrect: false, feedback: '"You" takes "praise", not "praises".' },
        { text: 'praise / participate', isCorrect: false, feedback: 'Since this predicts future growth, use "will participate".' }
      ]
    },
    audioText: 'If you praise quiet students during group work, they will participate more actively in future seminars.'
  },
  {
    id: 'sort-7',
    type: 'zero',
    activity: 'sorting',
    theme: 'future-teachers',
    title: 'Constructive Written Feedback Impact',
    fullSentence: 'When educators provide positive feedback on student essays, the learners feel more encouraged to write.',
    ifClause: 'When educators provide positive feedback on student essays',
    resultClause: 'the learners feel more encouraged to write',
    ifVerb: 'provide (Present Simple)',
    resultVerb: 'feel (Present Simple)',
    context: 'Advice for Future Teachers: Pedagogical principle of positive reinforcement',
    ruleExplanation: 'Structure: When + Present Simple (provide), ... Present Simple (feel).',
    whyZeroOrFirst: 'Zero Conditional states a universal truth of student motivation and educational psychology.',
    blankChallenge: {
      prompt: 'When educators _______ (provide) positive feedback on student essays, the learners _______ (feel) more encouraged to write.',
      options: [
        { text: 'provide / feel', isCorrect: true, feedback: 'Spot on! Both plural subjects (educators, learners) use base Present Simple verbs.' },
        { text: 'provides / feels', isCorrect: false, feedback: 'Both subjects are plural, so do not add -s.' },
        { text: 'will provide / feel', isCorrect: false, feedback: 'Never use "will" after "when".' },
        { text: 'provided / felt', isCorrect: false, feedback: 'This psychological principle is always true; use Present Simple.' }
      ]
    },
    audioText: 'When educators provide positive feedback on student essays, the learners feel more encouraged to write.'
  },
  {
    id: 'sort-8',
    type: 'first',
    activity: 'sorting',
    theme: 'effective-students',
    title: 'Speaking Dialogue Rehearsal',
    fullSentence: 'If you practice the speaking dialogue with your partner this afternoon, you will feel much more confident in tomorrow\'s test.',
    ifClause: 'If you practice the speaking dialogue with your partner this afternoon',
    resultClause: 'you will feel much more confident in tomorrow\'s test',
    ifVerb: 'practice (Present Simple)',
    resultVerb: 'will feel (will + base verb)',
    context: 'Habit of Effective EFL Students: Active peer rehearsal for upcoming evaluation',
    ruleExplanation: 'Structure: If + Present Simple (practice), ... will + base verb (will feel).',
    whyZeroOrFirst: 'First Conditional is used for a targeted prediction concerning this afternoon and tomorrow\'s test.',
    blankChallenge: {
      prompt: 'If you _______ (practice) the speaking dialogue with your partner this afternoon, you _______ (feel) much more confident in tomorrow\'s test.',
      options: [
        { text: 'practice / will feel', isCorrect: true, feedback: 'Excellent! "practice" condition leading to "will feel" for tomorrow\'s test.' },
        { text: 'will practice / feel', isCorrect: false, feedback: 'Never put "will" after "if".' },
        { text: 'practices / will feel', isCorrect: false, feedback: '"You" takes "practice".' },
        { text: 'practiced / would feel', isCorrect: false, feedback: 'Second Conditional is for unreal events; this is a real future possibility.' }
      ]
    },
    audioText: 'If you practice the speaking dialogue with your partner this afternoon, you will feel much more confident in tomorrow\'s test.'
  },
  {
    id: 'sort-9',
    type: 'zero',
    activity: 'sorting',
    theme: 'effective-students',
    title: 'Weekly Study Goal Setting',
    fullSentence: 'When adult students set specific weekly study goals, their language progress accelerates noticeably.',
    ifClause: 'When adult students set specific weekly study goals',
    resultClause: 'their language progress accelerates noticeably',
    ifVerb: 'set (Present Simple)',
    resultVerb: 'accelerates (Present Simple)',
    context: 'Habit of Effective EFL Students: Self-regulated autonomous learning',
    ruleExplanation: 'Structure: When + Present Simple (set), ... Present Simple (accelerates).',
    whyZeroOrFirst: 'Zero Conditional states an established educational reality: clear goals always accelerate learning.',
    blankChallenge: {
      prompt: 'When adult students _______ (set) specific weekly study goals, their language progress _______ (accelerate) noticeably.',
      options: [
        { text: 'set / accelerates', isCorrect: true, feedback: 'Spot on! Plural "students set", singular "progress accelerates".' },
        { text: 'sets / accelerate', isCorrect: false, feedback: '"Students" is plural (set), "progress" is uncountable (accelerates).' },
        { text: 'will set / accelerates', isCorrect: false, feedback: 'Never put "will" after "when".' },
        { text: 'set / will accelerate', isCorrect: false, feedback: 'This general study reality uses Present Simple in both clauses.' }
      ]
    },
    audioText: 'When adult students set specific weekly study goals, their language progress accelerates noticeably.'
  },
  {
    id: 'sort-10',
    type: 'first',
    activity: 'sorting',
    theme: 'future-teachers',
    title: 'Time Limits on Classroom Tasks',
    fullSentence: 'If you give clear time limits for speaking activities, your future classroom will stay organized and energetic.',
    ifClause: 'If you give clear time limits for speaking activities',
    resultClause: 'your future classroom will stay organized and energetic',
    ifVerb: 'give (Present Simple)',
    resultVerb: 'will stay (will + base verb)',
    context: 'Advice for Future Teachers: Classroom management and pacing strategy',
    ruleExplanation: 'Structure: If + Present Simple (give), ... will + base verb (will stay).',
    whyZeroOrFirst: 'First Conditional offers actionable management advice for the novice teacher\'s upcoming lessons.',
    blankChallenge: {
      prompt: 'If you _______ (give) clear time limits for speaking activities, your future classroom _______ (stay) organized and energetic.',
      options: [
        { text: 'give / will stay', isCorrect: true, feedback: 'Spot on! "give" in present simple condition, "will stay" in future result.' },
        { text: 'will give / stays', isCorrect: false, feedback: 'Do not put "will" in the if-clause.' },
        { text: 'gives / will stay', isCorrect: false, feedback: '"You" takes "give", not "gives".' },
        { text: 'gave / would stay', isCorrect: false, feedback: 'This is real practical teacher training advice, so use First Conditional.' }
      ]
    },
    audioText: 'If you give clear time limits for speaking activities, your future classroom will stay organized and energetic.'
  }
];

// -------------------------------------------------------------
// ACTIVITY 2: 10 SENTENCES FOR FILL-IN-THE-BLANK
// Themes: Advice for Future Teachers & Habits of Effective EFL Students
// -------------------------------------------------------------
export const FILL_BLANK_SENTENCES: SentenceItem[] = [
  {
    id: 'blank-1',
    type: 'zero',
    activity: 'fill-blank',
    theme: 'effective-students',
    title: 'Graded Reader Extensive Reading',
    fullSentence: 'When dedicated students read graded readers regularly, their vocabulary grows without memorization.',
    ifClause: 'When dedicated students read graded readers regularly',
    resultClause: 'their vocabulary grows without memorization',
    ifVerb: 'read (Present Simple)',
    resultVerb: 'grows (Present Simple)',
    context: 'Habit of Effective EFL Students: Incidental vocabulary acquisition through extensive reading',
    ruleExplanation: 'Structure: When + Present Simple (read), ... Present Simple (grows).',
    whyZeroOrFirst: 'Zero Conditional states an established scientific truth about extensive reading and language acquisition.',
    blankChallenge: {
      prompt: 'When dedicated students _______ (read) graded readers regularly, their vocabulary _______ (grow) without memorization.',
      options: [
        { text: 'read / grows', isCorrect: true, feedback: 'Correct! Plural "students read", singular uncountable "vocabulary grows" in Present Simple.' },
        { text: 'reads / grow', isCorrect: false, feedback: '"Students" is plural (read) and "vocabulary" is singular (grows).' },
        { text: 'will read / will grow', isCorrect: false, feedback: 'General educational facts use Present Simple in both clauses.' },
        { text: 'read / will grow', isCorrect: false, feedback: 'Zero Conditional uses Present Simple for habitual learning outcomes.' }
      ]
    },
    audioText: 'When dedicated students read graded readers regularly, their vocabulary grows without memorization.'
  },
  {
    id: 'blank-2',
    type: 'first',
    activity: 'fill-blank',
    theme: 'future-teachers',
    title: 'Concept Checking Questions (CCQs)',
    fullSentence: 'If you check students\' comprehension with concept questions tomorrow, you will identify their doubts immediately.',
    ifClause: 'If you check students\' comprehension with concept questions tomorrow',
    resultClause: 'you will identify their doubts immediately',
    ifVerb: 'check (Present Simple)',
    resultVerb: 'will identify (will + base verb)',
    context: 'Advice for Future Teachers: Checking understanding in tomorrow\'s lesson',
    ruleExplanation: 'Structure: If + Present Simple (check), ... will + base verb (will identify).',
    whyZeroOrFirst: 'First Conditional provides direct tactical guidance for the student teacher\'s class tomorrow.',
    blankChallenge: {
      prompt: 'If you _______ (check) students\' comprehension with concept questions tomorrow, you _______ (identify) their doubts immediately.',
      options: [
        { text: 'check / will identify', isCorrect: true, feedback: 'Excellent! "check" (present simple condition) and "will identify" (future consequence).' },
        { text: 'will check / identify', isCorrect: false, feedback: 'Never put "will" inside the if-clause!' },
        { text: 'checks / will identify', isCorrect: false, feedback: '"You" takes "check", not "checks".' },
        { text: 'check / identify', isCorrect: false, feedback: 'This specific plan for tomorrow needs "will identify".' }
      ]
    },
    audioText: 'If you check students\' comprehension with concept questions tomorrow, you will identify their doubts immediately.'
  },
  {
    id: 'blank-3',
    type: 'zero',
    activity: 'fill-blank',
    theme: 'future-teachers',
    title: 'Clear Whiteboard Instructions',
    fullSentence: 'If an instructor writes instructions clearly on the whiteboard, learners work with greater independence.',
    ifClause: 'If an instructor writes instructions clearly on the whiteboard',
    resultClause: 'learners work with greater independence',
    ifVerb: 'writes (Present Simple)',
    resultVerb: 'work (Present Simple)',
    context: 'Advice for Future Teachers: Visual modeling for student autonomy',
    ruleExplanation: 'Structure: If + Present Simple (writes), ... Present Simple (work).',
    whyZeroOrFirst: 'Zero Conditional states a universal instructional principle of learner independence.',
    blankChallenge: {
      prompt: 'If an instructor _______ (write) instructions clearly on the whiteboard, learners _______ (work) with greater independence.',
      options: [
        { text: 'writes / work', isCorrect: true, feedback: 'Spot on! Singular "instructor writes", plural "learners work" in Present Simple.' },
        { text: 'write / works', isCorrect: false, feedback: 'Watch subject-verb agreement: instructor (singular) writes, learners (plural) work.' },
        { text: 'will write / work', isCorrect: false, feedback: 'Never use "will" in the if-clause.' },
        { text: 'writes / will working', isCorrect: false, feedback: '"will working" is grammatically incorrect.' }
      ]
    },
    audioText: 'If an instructor writes instructions clearly on the whiteboard, learners work with greater independence.'
  },
  {
    id: 'blank-4',
    type: 'first',
    activity: 'fill-blank',
    theme: 'effective-students',
    title: 'Immediate Post-Class Review',
    fullSentence: 'If you review the lesson notes right after class today, you will remember eighty percent of the key concepts.',
    ifClause: 'If you review the lesson notes right after class today',
    resultClause: 'you will remember eighty percent of the key concepts',
    ifVerb: 'review (Present Simple)',
    resultVerb: 'will remember (will + base verb)',
    context: 'Habit of Effective EFL Students: Combating the forgetting curve today',
    ruleExplanation: 'Structure: If + Present Simple (review), ... will + base verb (will remember).',
    whyZeroOrFirst: 'First Conditional is used for a motivating prediction about today\'s specific study session.',
    blankChallenge: {
      prompt: 'If you _______ (review) the lesson notes right after class today, you _______ (remember) eighty percent of the key concepts.',
      options: [
        { text: 'review / will remember', isCorrect: true, feedback: 'Well done! Present Simple in the if-clause, "will remember" in the result.' },
        { text: 'will review / remember', isCorrect: false, feedback: 'Do not put "will" in the condition clause!' },
        { text: 'reviews / will remember', isCorrect: false, feedback: '"You" takes "review".' },
        { text: 'reviewed / will remembered', isCorrect: false, feedback: 'Do not use past forms after modal "will".' }
      ]
    },
    audioText: 'If you review the lesson notes right after class today, you will remember eighty percent of the key concepts.'
  },
  {
    id: 'blank-5',
    type: 'zero',
    activity: 'fill-blank',
    theme: 'effective-students',
    title: 'Authentic English Use Outside Class',
    fullSentence: 'When language learners speak English outside the classroom, their conversational confidence increases quickly.',
    ifClause: 'When language learners speak English outside the classroom',
    resultClause: 'their conversational confidence increases quickly',
    ifVerb: 'speak (Present Simple)',
    resultVerb: 'increases (Present Simple)',
    context: 'Habit of Effective EFL Students: Real-world communicative practice',
    ruleExplanation: 'Structure: When + Present Simple (speak), ... Present Simple (increases).',
    whyZeroOrFirst: 'Zero Conditional states an undeniable fact of language acquisition and fluency building.',
    blankChallenge: {
      prompt: 'When language learners _______ (speak) English outside the classroom, their conversational confidence _______ (increase) quickly.',
      options: [
        { text: 'speak / increases', isCorrect: true, feedback: 'Exact! Plural "learners speak", uncountable/singular "confidence increases".' },
        { text: 'speaks / increase', isCorrect: false, feedback: '"Learners" is plural, "confidence" is singular.' },
        { text: 'will speak / will increase', isCorrect: false, feedback: 'Zero Conditional uses Present Simple for habitual outcomes.' },
        { text: 'spoke / increases', isCorrect: false, feedback: 'Maintain consistent present tense.' }
      ]
    },
    audioText: 'When language learners speak English outside the classroom, their conversational confidence increases quickly.'
  },
  {
    id: 'blank-6',
    type: 'first',
    activity: 'fill-blank',
    theme: 'future-teachers',
    title: 'Micro-Teaching Video Reflection',
    fullSentence: 'If you record your micro-teaching session next week, you will notice areas for personal improvement.',
    ifClause: 'If you record your micro-teaching session next week',
    resultClause: 'you will notice areas for personal improvement',
    ifVerb: 'record (Present Simple)',
    resultVerb: 'will notice (will + base verb)',
    context: 'Advice for Future Teachers: Video self-reflection for professional teacher development',
    ruleExplanation: 'Structure: If + Present Simple (record), ... will + base verb (will notice).',
    whyZeroOrFirst: 'First Conditional is used for a practical recommendation aimed at next week\'s practicum session.',
    blankChallenge: {
      prompt: 'If you _______ (record) your micro-teaching session next week, you _______ (notice) areas for personal improvement.',
      options: [
        { text: 'record / will notice', isCorrect: true, feedback: 'Spot on! "record" in present simple condition, "will notice" for next week.' },
        { text: 'will record / notice', isCorrect: false, feedback: 'Never put "will" inside the if-clause!' },
        { text: 'records / will notice', isCorrect: false, feedback: '"You" takes "record".' },
        { text: 'recorded / would notice', isCorrect: false, feedback: 'This is a real scheduled plan for next week, not a hypothetical dream.' }
      ]
    },
    audioText: 'If you record your micro-teaching session next week, you will notice areas for personal improvement.'
  },
  {
    id: 'blank-7',
    type: 'zero',
    activity: 'fill-blank',
    theme: 'future-teachers',
    title: 'Teacher Wait-Time Technique',
    fullSentence: 'When a teacher gives students sufficient thinking time, the quality of their answers improves.',
    ifClause: 'When a teacher gives students sufficient thinking time',
    resultClause: 'the quality of their answers improves',
    ifVerb: 'gives (Present Simple)',
    resultVerb: 'improves (Present Simple)',
    context: 'Advice for Future Teachers: Wait-time pedagogy and processing depth',
    ruleExplanation: 'Structure: When + Present Simple (gives), ... Present Simple (improves).',
    whyZeroOrFirst: 'Zero Conditional states an established educational psychology rule: wait time always yields higher quality output.',
    blankChallenge: {
      prompt: 'When a teacher _______ (give) students sufficient thinking time, the quality of their answers _______ (improve).',
      options: [
        { text: 'gives / improves', isCorrect: true, feedback: 'Brilliant! Singular "teacher gives", singular subject "quality improves".' },
        { text: 'give / improve', isCorrect: false, feedback: 'Both subjects are third-person singular and need -s.' },
        { text: 'will give / improves', isCorrect: false, feedback: 'Never use "will" after "when".' },
        { text: 'gives / will improve', isCorrect: false, feedback: 'This universal teaching law uses Present Simple in both clauses.' }
      ]
    },
    audioText: 'When a teacher gives students sufficient thinking time, the quality of their answers improves.'
  },
  {
    id: 'blank-8',
    type: 'first',
    activity: 'fill-blank',
    theme: 'effective-students',
    title: 'Clarification During Office Hours',
    fullSentence: 'If you ask the tutor for clarification during office hours, you will avoid common mistakes on Friday\'s quiz.',
    ifClause: 'If you ask the tutor for clarification during office hours',
    resultClause: 'you will avoid common mistakes on Friday\'s quiz',
    ifVerb: 'ask (Present Simple)',
    resultVerb: 'will avoid (will + base verb)',
    context: 'Habit of Effective EFL Students: Seeking academic consultation before testing',
    ruleExplanation: 'Structure: If + Present Simple (ask), ... will + base verb (will avoid).',
    whyZeroOrFirst: 'First Conditional is used for a targeted recommendation leading up to Friday\'s specific quiz.',
    blankChallenge: {
      prompt: 'If you _______ (ask) the tutor for clarification during office hours, you _______ (avoid) common mistakes on Friday\'s quiz.',
      options: [
        { text: 'ask / will avoid', isCorrect: true, feedback: 'Awesome! "ask" in present simple condition, "will avoid" for Friday\'s quiz.' },
        { text: 'will ask / avoid', isCorrect: false, feedback: 'Remember: Never put "will" after "if"!' },
        { text: 'asks / will avoid', isCorrect: false, feedback: '"You" takes "ask", not "asks".' },
        { text: 'ask / avoid', isCorrect: false, feedback: 'For Friday\'s upcoming quiz, First Conditional is the natural choice.' }
      ]
    },
    audioText: 'If you ask the tutor for clarification during office hours, you will avoid common mistakes on Friday\'s quiz.'
  },
  {
    id: 'blank-9',
    type: 'zero',
    activity: 'fill-blank',
    theme: 'effective-students',
    title: 'Phone Interface Immersion Habit',
    fullSentence: 'If an adult student changes their phone\'s operating language to English, they acquire practical daily vocabulary.',
    ifClause: 'If an adult student changes their phone\'s operating language to English',
    resultClause: 'they acquire practical daily vocabulary',
    ifVerb: 'changes (Present Simple)',
    resultVerb: 'acquire (Present Simple)',
    context: 'Habit of Effective EFL Students: Micro-immersion through technology',
    ruleExplanation: 'Structure: If + Present Simple (changes), ... Present Simple (acquire).',
    whyZeroOrFirst: 'Zero Conditional states a habitual immersion reality that naturally builds digital literacy in English.',
    blankChallenge: {
      prompt: 'If an adult student _______ (change) their phone\'s operating language to English, they _______ (acquire) practical daily vocabulary.',
      options: [
        { text: 'changes / acquire', isCorrect: true, feedback: 'Correct! "An adult student" changes, and they acquire.' },
        { text: 'change / acquires', isCorrect: false, feedback: '"A student" is singular and takes "changes".' },
        { text: 'will change / acquire', isCorrect: false, feedback: 'No "will" in the if-clause.' },
        { text: 'changed / acquired', isCorrect: false, feedback: 'Use Present Simple for habitual learning practices.' }
      ]
    },
    audioText: 'If an adult student changes their phone\'s operating language to English, they acquire practical daily vocabulary.'
  },
  {
    id: 'blank-10',
    type: 'first',
    activity: 'fill-blank',
    theme: 'future-teachers',
    title: 'Student-Centered Pair Work Design',
    fullSentence: 'If you design communicative pair tasks for your students, they will talk much more than the teacher.',
    ifClause: 'If you design communicative pair tasks for your students',
    resultClause: 'they will talk much more than the teacher',
    ifVerb: 'design (Present Simple)',
    resultVerb: 'will talk (will + base verb)',
    context: 'Advice for Future Teachers: Minimizing Teacher Talking Time (TTT) and maximizing Student Talking Time (STT)',
    ruleExplanation: 'Structure: If + Present Simple (design), ... will + base verb (will talk).',
    whyZeroOrFirst: 'First Conditional offers future-focused encouragement for the trainee teacher\'s lesson plan.',
    blankChallenge: {
      prompt: 'If you _______ (design) communicative pair tasks for your students, they _______ (talk) much more than the teacher.',
      options: [
        { text: 'design / will talk', isCorrect: true, feedback: 'Spot on! "design" (present simple condition) and "will talk" (future classroom result).' },
        { text: 'will design / talk', isCorrect: false, feedback: 'Never put "will" in the if-clause.' },
        { text: 'designs / will talk', isCorrect: false, feedback: '"You" takes "design", not "designs".' },
        { text: 'designed / would talk', isCorrect: false, feedback: 'This is real actionable teaching advice, so use First Conditional.' }
      ]
    },
    audioText: 'If you design communicative pair tasks for your students, they will talk much more than the teacher.'
  }
];

// Unified exports for components
export const ZERO_CONDITIONAL_SENTENCES = [
  ...SORTING_SENTENCES.filter((s) => s.type === 'zero'),
  ...FILL_BLANK_SENTENCES.filter((s) => s.type === 'zero')
];

export const FIRST_CONDITIONAL_SENTENCES = [
  ...SORTING_SENTENCES.filter((s) => s.type === 'first'),
  ...FILL_BLANK_SENTENCES.filter((s) => s.type === 'first')
];

export const ALL_SENTENCES: SentenceItem[] = [
  ...SORTING_SENTENCES,
  ...FILL_BLANK_SENTENCES
];
