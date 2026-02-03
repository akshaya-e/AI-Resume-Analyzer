// Strong Action Verbs categorized by skill type
const actionVerbs = {
  leadership: ['spearheaded', 'orchestrated', 'championed', 'directed', 'pioneered', 'mobilized', 'galvanized', 'steered'],
  achievement: ['achieved', 'surpassed', 'exceeded', 'outperformed', 'delivered', 'accomplished', 'attained', 'secured'],
  technical: ['engineered', 'architected', 'developed', 'implemented', 'optimized', 'automated', 'built', 'designed'],
  collaboration: ['collaborated', 'partnered', 'coordinated', 'facilitated', 'unified', 'aligned', 'engaged', 'liaised'],
  analysis: ['analyzed', 'evaluated', 'assessed', 'investigated', 'researched', 'examined', 'scrutinized', 'diagnosed'],
  improvement: ['enhanced', 'streamlined', 'refined', 'improved', 'transformed', 'revitalized', 'upgraded', 'modernized'],
  impact: ['generated', 'increased', 'boosted', 'maximized', 'accelerated', 'expanded', 'elevated', 'amplified']
};

// Weak phrases to avoid
const weakPhrases = [
  { phrase: 'responsible for', replacement: 'managed', reason: 'Too passive - use action verbs' },
  { phrase: 'helped with', replacement: 'contributed to', reason: 'Vague contribution - be specific' },
  { phrase: 'worked on', replacement: 'developed', reason: 'Generic - specify your actual role' },
  { phrase: 'was part of', replacement: 'collaborated on', reason: 'Too passive - show active involvement' },
  { phrase: 'duties included', replacement: 'achieved', reason: 'Focus on achievements, not tasks' },
  { phrase: 'assisted in', replacement: 'supported', reason: 'Show clearer involvement' },
  { phrase: 'handled', replacement: 'managed', reason: 'More professional verb choice' },
  { phrase: 'tried to', replacement: 'initiated', reason: 'Show action, not just attempt' },
  { phrase: 'in charge of', replacement: 'led', reason: 'More concise and impactful' },
  { phrase: 'made sure', replacement: 'ensured', reason: 'More professional tone' }
];

// Generic/filler words
const fillerWords = ['very', 'really', 'just', 'actually', 'basically', 'literally', 'various', 'several'];

// Impact markers (numbers, percentages, timeframes)
const impactPatterns = [
  /\d+%/g,  // percentages
  /\$\d+/g,  // dollar amounts
  /\d+\s*(users|customers|clients|projects|hours|days|weeks)/gi,  // quantified impacts
  /(increased|decreased|reduced|improved|grew)\s+by\s+\d+/gi  // change metrics
];

module.exports = {
  actionVerbs,
  weakPhrases,
  fillerWords,
  impactPatterns
};
