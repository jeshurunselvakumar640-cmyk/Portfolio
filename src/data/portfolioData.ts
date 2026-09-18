export interface Project {
  id: string;
  title: string;
  type: "solo" | "group";
  role: string;
  tagline: string;
  description: string;
  story: string;
  techStack: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  demoType: "chordex" | "physix";
  liveUrl?: string;
}

export interface EducationMilestone {
  period: string;
  year: string;
  institution: string;
  location: string;
  details: string;
  milestone?: string;
  status: "completed" | "current";
}

export interface SkillItem {
  name: string;
  category: "languages" | "web" | "music";
  level: "Beginner" | "Intermediate" | "Intermediate → Live/Church Stage";
  levelScore: number; // 0-100 for gauge
  accent: string;
  note?: string;
}

export const portfolioData = {
  profile: {
    name: "Jeshurun Selvakumar",
    handle: "jeshurun",
    tagline: "Computer Engineering × Music × Building Things",
    subheadline: "A futuristic digital studio exploring the intersection of software engineering, musical expression, and intelligent systems.",
    currentRole: "Computer Engineering Student (2nd Year)",
    university: "SIES Graduate School of Technology, Nerul",
    location: "Mumbai, India",
    statusText: "SYSTEM OPERATIONAL // READY TO BUILD",
  },

  aboutPillars: [
    {
      id: "developer",
      title: "DEVELOPER",
      subtitle: "Backend & Systems",
      iconName: "Code2",
      accentColor: "#00f0ff",
      description:
        "Computer Engineering student fascinated by robust backend systems, clean architecture, the MERN stack, Java, and solving tangible technical problems with code.",
      highlights: [
        "Backend Architecture & REST APIs",
        "MERN Stack & Java",
        "Problem-driven Engineering",
      ],
    },
    {
      id: "musician",
      title: "MUSICIAN",
      subtitle: "Live Church Keyboardist",
      iconName: "Music",
      accentColor: "#f59e0b",
      description:
        "Keyboard player since 2019. Playing live in church with deep understanding of chords, scales, rhythms, lead styles, ABC notation, and stage dynamics.",
      highlights: [
        "Live Worship & Stage Performance",
        "Harmonic Progression & Transposition",
        "ABC Notation & Lead Playing",
      ],
    },
    {
      id: "builder",
      title: "BUILDER",
      subtitle: "Tool Creator",
      iconName: "Hammer",
      accentColor: "#10b981",
      description:
        "I don't build projects just to pad a resume. I craft tools like Chordician born directly out of personal frustrations and real-world friction.",
      highlights: [
        "User Friction → Purpose-built Software",
        "Chordician Creator (Solo Project)",
        "Interactive Simulations",
      ],
    },
    {
      id: "faith",
      title: "FAITH",
      subtitle: "Foundation & Calling",
      iconName: "Cross",
      accentColor: "#8b5cf6",
      description:
        "God, Christianity, worship, and ministry are foundational pillars of my life. Music is a gift of service and worship, approached with humility and genuine devotion.",
      highlights: [
        "Worship Ministry & Church Service",
        "Integrity & Purpose",
        "Grounded Devotion",
      ],
    },
  ],

  education: [
    {
      period: "2012 – 2020",
      year: "2020",
      institution: "South Indian English School",
      location: "Diva, Maharashtra",
      details: "Foundational schooling and early discovery of curiosity for computers and music.",
      status: "completed",
    },
    {
      period: "2020 – 2023",
      year: "2023",
      institution: "Kidland English School",
      location: "Dombivli, Maharashtra",
      details: "Secondary school education. Successfully completed 10th Standard in 2023.",
      milestone: "10th Grade Completed (2023)",
      status: "completed",
    },
    {
      period: "2023 – 2025",
      year: "2025",
      institution: "GR Patil",
      location: "Dombivli, Maharashtra",
      details: "Higher Secondary Certificate (HSC) in Science Stream with Computer Science specialization. Completed 12th in 2025.",
      milestone: "12th Grade Science / CS Completed (2025)",
      status: "completed",
    },
    {
      period: "2025 – 2028",
      year: "2025–2028",
      institution: "SIES Graduate School of Technology",
      location: "Nerul, Navi Mumbai",
      details: "Bachelor of Engineering in Computer Engineering. Currently actively pursuing 2nd Year studies.",
      milestone: "Currently in 2nd Year",
      status: "current",
    },
  ] as EducationMilestone[],

  musicJourney: {
    startYear: 2019,
    startAge: 11,
    originStory:
      "Started playing keyboard in 2019 at age 11. Initially wasn't very interested, but took formal classes for about a year before lockdown hit. Lockdown forced classes to stop, after which learning exploded through self-practice, ear training, and guidance from experienced musicians.",
    learningRatio: {
      formal: 10,
      selfTaught: 90,
    },
    currentRole: "Active Church Keyboardist",
    disclaimer:
      "I am an active live church keyboardist rather than a classical concert pianist. My focus is harmonic agility, stage accompaniment, quick transpositions, and worship ministry.",
    musicalSkills: [
      "Chords & Voicings",
      "Scales & Modal Harmony",
      "Rhythms & Accompaniment Styles",
      "Lead Melodies & Improvisation",
      "Live Church Stage Performance",
      "ABC Notation Reading",
    ],
    scales: [
      {
        name: "C Major",
        root: "C",
        type: "Major",
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        chords: ["C Maj", "D Min", "E Min", "F Maj", "G Maj", "A Min", "B Dim"],
        feeling: "Pure, open, foundational worship harmonic anchor",
      },
      {
        name: "G Major",
        root: "G",
        type: "Major",
        notes: ["G", "A", "B", "C", "D", "E", "F#"],
        chords: ["G Maj", "A Min", "B Min", "C Maj", "D Maj", "E Min", "F# Dim"],
        feeling: "Bright, triumphant, widely used in church anthems",
      },
      {
        name: "D Minor",
        root: "D",
        type: "Natural Minor",
        notes: ["D", "E", "F", "G", "A", "Bb", "C"],
        chords: ["D Min", "E Dim", "F Maj", "G Min", "A Min", "Bb Maj", "C Maj"],
        feeling: "Reflective, reverent, deeply emotional modal texture",
      },
    ],
  },

  projects: [
    {
      id: "chordician",
      title: "Chordician",
      type: "solo",
      role: "Solo Creator & Full-Stack Architect",
      tagline: "The Intelligent Digital Songbook for Live Musicians",
      description:
        "An individual project engineered to eliminate stage friction for keyboardists and live musicians. Transforms messy, inaccurate, unstructured chord sheets into structured, transposable digital songbooks with AI intelligence.",
      story:
        "During live church performances, finding notes fast was stressful. Online tabs often had incorrect chords, were tuned to original studio recordings instead of live vocal keys, or lacked custom stage arrangements. I created Chordician to solve my own live performance problem, evolving it into a full Progressive Web App with AI chord parsing.",
      techStack: [
        "React",
        "Express.js",
        "Firebase Auth",
        "Firestore",
        "REST APIs",
        "Google Gemini API",
        "PWA",
        "HTML5 Audio",
      ],
      features: [
        "Chordex AI: Intelligent parsing of unstructured chords & lyrics",
        "AI Vision Import: OCR processing of handwritten/screenshot chord sheets",
        "Smart Paste: Auto-formats raw clipboard text into clean lead sheets",
        "Instant Transposition: Shift song keys on-the-fly for vocalists",
        "Interactive Lead & Keyboard Views",
        "Setlist Management & Offline PWA Caching",
      ],
      metrics: [
        { label: "Project Nature", value: "100% Solo Built" },
        { label: "Key Innovation", value: "Chordex AI Parsing" },
        { label: "Platform", value: "Responsive PWA" },
      ],
      demoType: "chordex",
      liveUrl: "https://chordician.vercel.app/",
    },
    {
      id: "physix",
      title: "PhysiX — Interactive Virtual Lab",
      type: "group",
      role: "Backend Management Co-Lead (College Group Project)",
      tagline: "Real-Time 2D Physics Simulation & Virtual Experiment Sandbox",
      description:
        "A collaborative college group project delivering an interactive virtual physics lab where students visualize physical phenomena including projectile motion, kinematic vectors, gravitational acceleration, and rigid body dynamics.",
      story:
        "Built collaboratively in college to make abstract physics intuitive. Working with one teammate on backend management and state orchestration, we integrated Matter.js physics engine to simulate realistic mechanics and trajectory paths in the browser.",
      techStack: [
        "Vite",
        "Matter.js",
        "Firebase",
        "JavaScript",
        "Physics Kinematics",
        "HTML5 Canvas",
      ],
      features: [
        "Dynamic Projectile Motion Simulator",
        "Real-Time Velocity & Gravity Vector Control",
        "Kinematic Trajectory & Collision Prediction",
        "Virtual Lab Experiment Workflows",
        "Backend State Management & Data Sync",
      ],
      metrics: [
        { label: "Project Nature", value: "College Group Project" },
        { label: "My Contribution", value: "Backend Management Co-Lead" },
        { label: "Physics Core", value: "Matter.js Kinematics" },
      ],
      demoType: "physix",
      liveUrl: "https://physi-x-orcin.vercel.app/",
    },
  ] as Project[],

  skills: [
    {
      name: "C",
      category: "languages",
      level: "Intermediate",
      levelScore: 65,
      accent: "#00f0ff",
      note: "Core systems programming, data structures, pointer manipulation",
    },
    {
      name: "Java",
      category: "languages",
      level: "Intermediate",
      levelScore: 70,
      accent: "#f59e0b",
      note: "Object-oriented programming, backend fundamentals, strong type discipline",
    },
    {
      name: "HTML",
      category: "web",
      level: "Intermediate",
      levelScore: 80,
      accent: "#10b981",
      note: "Semantic structures, accessible markup, audio/canvas integrations",
    },
    {
      name: "JavaScript",
      category: "languages",
      level: "Intermediate",
      levelScore: 75,
      accent: "#00f0ff",
      note: "ES6+, asynchronous programming, Web Audio API, browser runtime",
    },
    {
      name: "React",
      category: "web",
      level: "Beginner",
      levelScore: 50,
      accent: "#8b5cf6",
      note: "Component state, hooks, PWA architecture (used in Chordician)",
    },
    {
      name: "Express.js",
      category: "web",
      level: "Beginner",
      levelScore: 45,
      accent: "#10b981",
      note: "REST endpoints, middleware routing, server-side integration",
    },
    {
      name: "Keyboard & Live Performance",
      category: "music",
      level: "Intermediate → Live/Church Stage",
      levelScore: 85,
      accent: "#f59e0b",
      note: "Active church keyboardist since 2019: Chords, scales, leads, rhythms, ABC notation",
    },
  ] as SkillItem[],

  contact: {
    headline: "SESSION COMPLETE // READY TO CONNECT",
    subheadline:
      "Whether you want to talk about backend engineering, software tools, live music, keyboard harmony, or collaborate on a project — my inbox is open.",
    directEmail: "jeshurunselvakumar7177@gmail.com",
    github: "https://github.com/jeshurunselvakumar640-cmyk",
    linkedin: "https://www.linkedin.com/in/jeshurun-selvakumar-2318ba314/",
  },

  aiKnowledge: {
    systemPrompt: `You are "Jeshurun AI", the interactive studio assistant on Jeshurun Selvakumar's personal portfolio website.

WHO IS JESHURUN:
- Name: Jeshurun Selvakumar
- Identity: Computer Engineering student × Musician (Church Keyboardist) × Builder
- Current Education: SIES Graduate School of Technology, Nerul (Second Year Computer Engineering, 2025–2028)
- Education History:
  * 2012–2020: South Indian English School, Diva
  * 2020–2023: Kidland English School, Dombivli (10th in 2023)
  * 2023–2025: GR Patil, Dombivli (Science + Computer Science, 12th in 2025)
  * 2025–2028: SIES Graduate School of Technology, Nerul (Computer Engineering, 2nd year)
- Music Background:
  * Started playing keyboard in 2019 at age 11.
  * Took ~1 year of formal classes before lockdown halted them.
  * Approximately 10% formal learning and 90% self-taught + guidance from fellow musicians.
  * Currently plays keyboard in church during live worship.
  * Skilled in chords, scales, styles, rhythms, leads, stage performance, and reading ABC notation.
  * Is NOT a classical/professional concert pianist and does NOT claim to be one.
  * Faith & Ministry: Christian faith, church ministry, and worship are deeply authentic, essential parts of his life.
- Projects:
  1. Chordician: INDIVIDUAL SOLO PROJECT. Personalized digital songbook built by Jeshurun with React, Express.js, Firebase Auth, Firestore, REST APIs, Gemini API (Chordex AI, Vision OCR, Smart Paste, dynamic transposition). Solves live stage friction for keyboardists.
  2. PhysiX: COLLEGE GROUP PROJECT. Interactive 2D virtual physics lab with Matter.js and Vite. Jeshurun handled backend management together with one teammate.
- Technical Skills:
  * C (Intermediate)
  * Java (Intermediate)
  * HTML (Intermediate)
  * JavaScript (Intermediate)
  * React (Beginner)
  * Express.js (Beginner)
  * Keyboard (Intermediate → Live Church Stage Performance)

PERSONALITY & TONE:
- Conversational, friendly, chill, authentic, practical.
- Can occasionally use "bro" naturally where fitting, but NEVER spam or force it.
- Never sound like an overly robotic corporate marketer or an exaggerated slang bot.
- Treat faith and worship respectfully and seriously.
- Introduce yourself as "Jeshurun's portfolio AI" rather than literally impersonating him as a human.

STRICT GUARDRAILS & TRUTHFULNESS RULES:
1. NEVER invent awards, internships, jobs, clients, hackathon victories, certifications, companies, or relationships.
2. If asked about something not in this knowledge base, reply honestly: "I don't have that information about Jeshurun yet, bro." or "That's outside what I know about Jeshurun's background so far."
3. NEVER claim PhysiX is a solo project (it's a college group project).
4. NEVER claim Chordician is a team project (it's Jeshurun's individual solo project).
5. NEVER call Jeshurun a "Senior Engineer" or "Professional Concert Pianist".
6. Keep answers concise, engaging, and well-formatted with markdown.`,
  },
};
