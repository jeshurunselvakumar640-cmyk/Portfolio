/**
 * Central portfolio data — Jeshurun Selvakumar
 * Second Year Computer Engineering Student
 */

export type Palette = { from: string; via: string; to: string; accent: string };

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const profile = {
  fullName: 'Jeshurun Selvakumar',
  displayName: 'Jeshurun Selvakumar',
  firstName: 'JESHURUN',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A JESHURUN ORIGINAL',
  role: 'Second Year Computer Engineering Student',
  tagline: ['Student', 'Computer Engineer', 'Keyboardist'],
  intro:
    'I let curiosity shape my questions, creativity fuel my vision, and engineering turn possibilities into reality. I imagine beyond what exists, challenge what seems possible, and build what I wish existed — somewhere between music, logic, and imagination, creating what comes next.',
  location: 'Navi Mumbai, Maharashtra',
  email: 'jeshurunselvakumar640@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/jeshurun-selvakumar-2318ba314/?isSelfProfile=true',
    github: 'https://github.com/jeshurunselvakumar640-cmyk',
  },
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Jeshurun Selvakumar',
  },
  interests: ['Machine Learning', 'Keyboardist since 2019', 'DSA'],
};

export const education = [
  {
    school: 'SIES Graduate School Of Technology',
    place: 'Nerul, Navi Mumbai',
    degree: 'Second Year Bachelor of Technology — Computer Engineering',
    period: '2025 – Present',
    score: 'Currently in Second Year B.Tech Computer Engineering',
  },
  {
    school: 'GR Patil Junior College',
    place: 'Dombivli',
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2023 – 2025',
    score: 'Completed HSC',
  },
  {
    school: 'Kidland English School',
    place: 'Dombivli',
    degree: 'Secondary School Certificate (SSC)',
    period: '2022 – 2023',
    score: 'Completed SSC',
  },
];

export const experience: { company: string; role: string; place: string; period: string; points: string[] }[] = [];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  deployed?: string;
  github?: string;
  palette: Palette;
  motif: 'physics' | 'chords' | 'pulse';
};

export const projects: Project[] = [
  {
    id: 'physix',
    title: 'PhysiX',
    year: '2026',
    genre: 'Matter.js | Express.js | Physics Engine',
    logline: 'An Interactive Gamified web simulator for physics especially tailored for beginners and the students who find physics boring',
    stack: ['Matter.js', 'Express.js', 'JavaScript', 'HTML', 'CSS'],
    build: [
      'I was the lead developer and built 5 experiments handled database, firebase, and gamification.',
      'Designed and engineered a dynamic 2D physics simulation environment using Matter.js for collision resolution, gravity, and rigid body dynamics.',
      'Constructed responsive canvas render loops and interactive mouse/touch controls for manipulating simulated physical bodies in real time.',
      'Built with Express.js, HTML, CSS, and modern JavaScript, securing 2nd position in the Inter-Departmental Project Competition Cognition.',
    ],
    features: [
      'Interactive Matter.js 2D physics engine',
      '5 gamified interactive physics experiments',
      'Rigid-body kinematics & collision dynamics',
      'Real-time simulation canvas with smooth 60fps rendering',
      'Express.js backend connectivity & Firebase database integration',
      'Secured 2nd position at Cognition Competition',
    ],
    metrics: [
      { value: '2nd', label: 'Place in Cognition Competition' },
      { value: 'Matter.js', label: 'Rigid-body physics' },
      { value: '2D', label: 'Interactive canvas' },
      { value: '2026', label: 'Main Project' },
    ],
    deployed: 'https://physi-x-orcin.vercel.app',
    github: 'https://github.com/jeshurunselvakumar640-cmyk/PhysiX',
    palette: { from: '#1a0628', via: '#5a1378', to: '#090510', accent: '#c455ff' },
    motif: 'physics',
  },
  {
    id: 'chordician',
    title: 'Chordician',
    year: '2026',
    genre: 'Music Tech • Harmonic Progression • React',
    logline: 'A modern music theory and chord progression explorer built with React, Express.js, HTML, and CSS, inspired by keyboardist harmonies.',
    stack: ['React', 'Express.js', 'HTML', 'CSS'],
    build: [
      'This is my personal project.',
      'Architected an interactive chord visualization and progression builder in React for musicians and keyboardists.',
      'Developed Express.js backend services to query and resolve chord scales, harmonic relationships, and voicing patterns.',
      'Crafted an audio-inspired aesthetic with dark mode themes, fluid transitions, and responsive music notation views.',
    ],
    features: [
      'Chord library & harmonic progression finder',
      'Visual scale & chord relationship mapping',
      'Modular React components with state synchronization',
      'Express.js data endpoints',
      'Designed for keyboardists & producers',
    ],
    metrics: [
      { value: 'React', label: 'Component architecture' },
      { value: '7+ yrs', label: 'Live usage on stage in keyboardist experience' },
      { value: 'Express', label: 'Backend API' },
      { value: '2026', label: 'Personal Project' },
    ],
    deployed: 'https://github.com/jeshurunselvakumar640-cmyk/Chordician',
    github: 'https://github.com/jeshurunselvakumar640-cmyk/Chordician',
    palette: { from: '#1f1303', via: '#7c4307', to: '#0a0805', accent: '#ffb547' },
    motif: 'chords',
  },
  {
    id: 'career-pulse',
    title: 'Career Pulse',
    year: '2026',
    genre: 'Automation • Python • REST APIs • SMTP & MIME',
    logline: 'An automated career communication and opportunity tracking system powered by Python, REST APIs, SMTP, MIME, and modern web interfaces.',
    stack: ['Python', 'REST APIs', 'SMTP', 'MIME', 'JavaScript', 'HTML', 'CSS'],
    build: [
      'This is my personal project.',
      'Built automated email distribution and notification pipelines in Python utilizing SMTP and MIME protocols for structured job and career communications.',
      'Integrated REST APIs for real-time tracking, automated verification, and opportunity feed digestion.',
      'Deployed frontend tracking interface to Vercel with responsive controls and automated status reporting.',
    ],
    features: [
      'Python automation engine',
      'Automated SMTP & MIME email communications',
      'REST API integration for career opportunities',
      'Interactive web dashboard deployed on Vercel',
      'Real-time status notifications',
    ],
    metrics: [
      { value: 'Python', label: 'Automation engine' },
      { value: 'SMTP', label: '& MIME protocols' },
      { value: 'REST', label: 'API integrations' },
      { value: '2026', label: 'Personal Project' },
    ],
    deployed: 'https://careerpulseai.vercel.app/',
    github: 'https://github.com/jeshurunselvakumar640-cmyk/CareerPulse',
    palette: { from: '#04161f', via: '#0c5270', to: '#05090e', accent: '#4cc9ff' },
    motif: 'pulse',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'cognition-physix',
    title: '2nd Position',
    org: 'Inter-Departmental Project Competition Cognition 2026',
    detail: 'Secured 2nd position in Inter-Departmental Project Competition Cognition with the Project PhysiX.',
    laurel: '2nd Position',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core programming languages',
    skills: [
      { name: 'Java', mono: 'Jv', note: 'Learning' },
      { name: 'Python', mono: 'Py', note: 'Learning' },
      { name: 'C', mono: 'C', note: 'Learning' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Web & user interfaces',
    skills: [
      { name: 'React', mono: 'Re', note: 'Learning' },
      { name: 'HTML', mono: 'Ht', note: 'Learning' },
      { name: 'CSS', mono: 'Cs', note: 'Learning' },
      { name: 'JavaScript', mono: 'Js', note: 'Learning' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Server & simulation engines',
    skills: [
      { name: 'Express.js', mono: 'Ex', note: 'Learning' },
      { name: 'Matter.js', mono: 'Mt', note: 'Learning' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'Services & version control',
    skills: [
      { name: 'Firebase', mono: 'Fb', note: 'Learning' },
      { name: 'Git & GitHub', mono: 'Gt', note: 'Learning' },
      { name: 'Supabase', mono: 'Sb', note: 'Learning' },
      { name: 'REST APIs', mono: 'Ap', note: 'Learning' },
    ],
  },
  {
    id: 'databases',
    title: 'Database',
    subtitle: 'Relational data management',
    skills: [
      { name: 'PostgreSQL', mono: 'Pg', note: 'Learning' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'CS Fundamentals',
    subtitle: 'Core computer science',
    skills: [
      { name: 'DSA', mono: 'Ds', note: 'Learning' },
    ],
  },
  {
    id: 'interests',
    title: 'Interests',
    subtitle: 'Areas of study & focus',
    skills: [
      { name: 'Machine Learning', mono: 'Ml', note: 'Learning' },
    ],
  },
  {
    id: 'musical',
    title: 'Musical',
    subtitle: 'Music & performance',
    skills: [
      { name: 'Keyboardist', mono: 'Kb', note: 'Since 2019' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  Java: ['Core Language · Learning Stage'],
  Python: ['Career Pulse Automation · Learning Stage'],
  C: ['Core Systems Language · Learning Stage'],
  React: ['Chordician · Learning Stage'],
  HTML: ['PhysiX', 'Chordician', 'Career Pulse'],
  CSS: ['PhysiX', 'Chordician', 'Career Pulse'],
  JavaScript: ['PhysiX', 'Career Pulse · Learning Stage'],
  'Express.js': ['PhysiX', 'Chordician · Learning Stage'],
  'Matter.js': ['PhysiX (Main Project) · Learning Stage'],
  Firebase: ['Tools & Services · Learning Stage'],
  'Git & GitHub': ['Version Control & Collaboration'],
  Supabase: ['Backend & Cloud · Learning Stage'],
  'REST APIs': ['Career Pulse Automation · Learning Stage'],
  PostgreSQL: ['Relational Database · Learning Stage'],
  DSA: ['CS Fundamentals · Learning Stage'],
  'Machine Learning': ['Core Interest & Exploration'],
  Keyboardist: ['Keyboardist since 2019 · Music & Harmony'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    number: 1,
    title: 'School Days',
    period: '2022 – 2023',
    synopsis: 'Secondary School Certificate (SSC) at Kidland English School, Dombivli.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Completed SSC',
        description: 'Kidland English School, Dombivli — completed SSC.',
        tags: ['SSC', 'Kidland English School', 'Dombivli'],
        runtime: '2022 – 2023',
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'Higher Secondary',
    period: '2023 – 2025',
    synopsis: 'Higher Secondary Certificate (HSC) at GR Patil Junior College, Dombivli.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'Completed HSC',
        description: 'GR Patil Junior College, Dombivli — completed HSC.',
        tags: ['HSC', 'GR Patil Junior College', 'Dombivli'],
        runtime: '2023 – 2025',
        palette: ocean,
      },
    ],
  },
  {
    number: 3,
    title: 'Engineering Arc',
    period: '2025 – Present',
    synopsis: 'Bachelor of Technology in Computer Engineering at SIES Graduate School Of Technology, Nerul, Navi Mumbai.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Second Year Computer Engineering',
        description: 'SIES Graduate School Of Technology, Nerul, Navi Mumbai — currently in second year Bachelor of Technology in Computer Engineering.',
        tags: ['B.Tech', 'Computer Engineering', 'SIES GST Nerul'],
        runtime: '2025 – Present',
        palette: violet,
      },
      {
        code: 'S03 E02',
        title: 'Cognition: 2nd Position',
        description: 'Secured 2nd position in Inter-Departmental Project Competition Cognition with the Project PhysiX.',
        tags: ['Cognition 2026', 'PhysiX', '2nd Position'],
        runtime: '2026',
        palette: crimson,
      },
    ],
  },
  {
    number: 4,
    title: 'Beyond the Code',
    period: '2019 – Present',
    synopsis: 'Musical journey as a keyboardist since 2019.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The Keyboardist',
        description: 'Keyboardist since 2019 — exploring harmony and chords which inspired music projects like Chordician.',
        tags: ['Keyboardist', 'Musician', 'Since 2019'],
        runtime: '2019 – Present',
        palette: jade,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Main Project', title: 'PhysiX', detail: 'Matter.js 2D rigid-body simulation engine', palette: violet },
  { label: 'Top Moment', title: '2nd Position', detail: 'Inter-Departmental Project Competition Cognition 2026', palette: crimson },
  { label: 'Musical Passion', title: 'Keyboardist', detail: 'Keyboardist since 2019', palette: amber },
  { label: 'Music Project', title: 'Chordician', detail: 'React & Express chord progression explorer', palette: ocean },
  { label: 'Automation', title: 'Career Pulse', detail: 'Python, REST APIs, SMTP & MIME engine', palette: jade },
  { label: 'Academic Path', title: 'Computer Engineer', detail: 'SIES Graduate School Of Technology, Nerul', palette: violet },
  { label: 'Core Languages', title: 'Java, Python, C', detail: 'Foundational programming languages', palette: amber },
  { label: 'Frontend Stack', title: 'React & JS', detail: 'HTML, CSS, JavaScript, React', palette: crimson },
  { label: 'Backend & Tools', title: 'Express & Matter', detail: 'Firebase, Supabase, Git, REST APIs', palette: ocean },
  { label: 'Next Focus', title: 'Machine Learning', detail: 'DSA & AI exploration', palette: jade },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Identity',
    title: 'Jeshurun Selvakumar',
    lines: ['Second Year Computer Engineering Student', 'SIES Graduate School Of Technology, Nerul, Navi Mumbai'],
    chips: ['Student', 'Computer Engineer'],
  },
  {
    kicker: 'Main Original',
    title: 'PhysiX',
    lines: ['Interactive 2D physics simulation sandbox with Matter.js', 'Secured 2nd position in Cognition Competition 2026'],
    chips: ['Matter.js', 'Express.js', '2nd Position'],
  },
  {
    kicker: 'Skills',
    title: 'Code & Build',
    lines: ['Java, Python, C · React, HTML, CSS, JavaScript', 'Express.js, Matter.js · PostgreSQL, Firebase, Supabase, REST APIs'],
    chips: ['Java', 'Python', 'React', 'Express.js', 'PostgreSQL'],
  },
  {
    kicker: 'Originals',
    title: 'Three Projects · 2026',
    lines: ['PhysiX — Matter.js physics engine', 'Chordician — Music chords & harmony in React', 'Career Pulse — Python SMTP/MIME automation & REST APIs'],
  },
  {
    kicker: 'Musical',
    title: 'Keyboardist since 2019',
    lines: ['Musical harmony and performance inspiring projects like Chordician'],
    chips: ['Keyboardist', 'Musician'],
  },
  {
    kicker: 'Achievement',
    title: 'Top Moments',
    lines: ['Secured 2nd position in Inter-Departmental Project Competition Cognition 2026 with PhysiX'],
  },
];

export type ProfileId = 'jeshurun' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'jeshurun',
    name: 'Jeshurun',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Projects, skills & education first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc, music & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'Second Year Computer Engineering Student', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • 2026`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Highlights from the portfolio', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories • Learning Stage`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: 'Cognition 2026 • PhysiX 2nd Position', palette: crimson },
  story: { nav: 'Profile', card: 'The Full Story', meta: 'Jeshurun Selvakumar • Student Profile', palette: violet },
};
