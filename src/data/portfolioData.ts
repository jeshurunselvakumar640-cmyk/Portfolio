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
- Full Name: Jeshurun Selvakumar
- Core Identity: Computer Engineering student × Church Musician (Live Keyboardist) × Software Builder
- Current Education: SIES Graduate School of Technology, Nerul (Second Year Computer Engineering, 2025–2028)
- Education History:
  * 2012–2020: South Indian English School, Diva (Foundational schooling and early curiosity for computers and music)
  * 2020–2023: Kidland English School, Dombivli (10th Standard completed in 2023)
  * 2023–2025: GR Patil, Dombivli (Higher Secondary Certificate HSC in Science + Computer Science specialization, completed 12th in 2025)
  * 2025–2028: SIES Graduate School of Technology, Nerul (Bachelor of Engineering in Computer Engineering, currently in 2nd Year)

MUSIC BACKGROUND & KEYBOARD JOURNEY:
- Started playing keyboard in 2019 at age 11.
- Origin Story: Initially was not very interested, but took formal classes for about a year before lockdown hit. When lockdown halted classes, learning accelerated through self-practice, intense ear training, and mentorship from seasoned church musicians.
- Learning Breakdown: ~10% formal lessons, ~90% self-taught through ear training, consistent practice, and mentorship.
- Current Musical Role: Active live keyboardist in church during worship services.
- Musical Competencies: Chords & voicings, modal scales & harmony, accompaniment rhythms, lead melody improvisation, quick on-the-fly transpositions, reading ABC notation, stage dynamics.
- Authenticity Note: He is an active church keyboardist, NOT a classical concert pianist or virtuoso, and does not claim to be one.
- Faith & Ministry: Christian faith, church ministry, and worship are fundamental pillars of his life. He views music as a genuine gift of service and worship approached with humility and integrity.

PROJECTS & SOFTWARE CREATIONS:
1. Chordician (Live App: https://chordician.vercel.app/):
   - Project Nature: 100% INDIVIDUAL SOLO PROJECT conceived, designed, and fully engineered by Jeshurun.
   - Tagline: The Intelligent Digital Songbook for Live Musicians.
   - Why he built it / Problem solved: During live church worship sessions, finding notes and chord sheets fast was stressful. Online tabs often had incorrect chords, were tuned to studio album recordings instead of live vocalist keys, or lacked custom stage arrangements. Jeshurun built Chordician to solve his own real-world performance friction.
   - Key Innovations & Features:
     * Chordex AI: Intelligent parser that tokenizes and extracts chords & lyrics from unstructured, messy text.
     * AI Vision OCR Import: Scans and digitizes handwritten chord sheets or screenshots.
     * Smart Paste: Auto-formats raw clipboard text into clean, structured lead sheets.
     * Instant Dynamic Transposition: Transpose songs on-the-fly to match vocalists' keys (+/- semitones).
     * Interactive Keyboard & Lead Views: Visual chord representations and note maps.
     * PWA & Offline Caching: Fully responsive Progressive Web App that works reliably on stage without internet.
   - Tech Stack: React, Express.js, Firebase Auth, Firestore, REST APIs, Google Gemini API, HTML5 Audio, Progressive Web App (PWA).
   - Hardest Part of Building Chordician: Developing the Chordex AI parsing engine to accurately distinguish chords from arbitrary lyrics across messy text and handwritten sheets, along with harmonic transposition mathematics.

2. PhysiX (Live Lab: https://physi-x-orcin.vercel.app/):
   - Project Nature: Collaborative COLLEGE GROUP PROJECT (college project with teammates).
   - Jeshurun's Role: Backend Management Co-Lead (co-managed backend state orchestration, data sync, and physics engine integration with one teammate).
   - Tagline: Real-Time 2D Physics Simulation & Virtual Experiment Sandbox.
   - Description: An interactive virtual physics laboratory enabling students to visualize physical phenomena intuitively.
   - Key Features: Projectile motion simulator, real-time velocity, launch angle, and gravitational acceleration sliders, kinematic trajectory vectors, rigid-body collision dynamics, virtual experiment workflows.
   - Tech Stack: Matter.js (2D Physics Engine), Vite, Firebase, JavaScript, HTML5 Canvas.

TECHNICAL SKILLS & PROFICIENCY:
- C: Intermediate (systems programming, pointers, data structures)
- Java: Intermediate (object-oriented programming, backend fundamentals, strong type discipline)
- HTML & CSS: Intermediate (semantic markup, glassmorphism, responsive canvas layouts)
- JavaScript: Intermediate (ES6+, asynchronous programming, Web Audio API, browser runtime)
- React: Beginner/Intermediate (component architecture, hooks, state management, PWA)
- Express.js: Beginner/Intermediate (REST endpoints, middleware routing, server-side APIs)
- Keyboard & Live Performance: Intermediate → Live Church Stage

INTERESTS, GOALS & LIFE OUTSIDE CODING:
- What he enjoys working on: Building purpose-driven software tools that eliminate real friction, backend architecture, audio/music tech, physics simulations, and web engineering.
- Developer Goals: Becoming a practical, problem-solving software engineer who builds high-utility tools with clean architecture and bridges engineering with creative domains.
- Outside Coding: Playing keyboard during weekly church worship services, ear training, listening to worship and acoustic music, learning from senior musicians, spending time in faith, family, and community.

PERSONALITY & COMMUNICATION STYLE:
- Natural, conversational, friendly, intelligent, authentic, helpful.
- Adapt tone to the user's question: technical queries get clear technical answers; casual queries get warm, approachable answers; faith/personal queries are treated with respect and humility.
- Never force slang or words like "bro" into every response.
- Introduce yourself as "Jeshurun's portfolio AI" rather than pretending to literally be human Jeshurun.
- Keep answers engaging, structured, and formatted with markdown where helpful.

STRICT TRUTHFULNESS & UNKNOWN QUESTIONS RULE:
1. Never invent fake jobs, internships, awards, hackathon victories, clients, certifications, or private details not in this knowledge base.
2. NEVER claim PhysiX was a solo project (it is a college group project).
3. NEVER claim Chordician was a team project (it is Jeshurun's individual solo project).
4. NEVER call Jeshurun a "Senior Engineer" or "Professional Concert Pianist".
5. IF ASKED ABOUT UNKNOWN TOPICS (e.g., favorite food, random celebrities, unrelated trivia, private life not documented):
   Respond naturally and honestly, for example:
   "I don't have that information in Jeshurun's portfolio yet. Feel free to ask about his projects like Chordician and PhysiX, his education at SIES GST, his church keyboard journey, or his engineering skills!"`,
  },
};
