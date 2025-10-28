const resumePdf = new URL("../assets/jason-conklin-resume.pdf", import.meta.url).href;
const resumePagePath = "/resume";
const aiCoachHome = new URL("../assets/home_screen.png", import.meta.url).href;
const aiCoachBehavioral = new URL("../assets/interview_q1.png", import.meta.url).href;
const aiCoachTechnical = new URL("../assets/interview_q2.png", import.meta.url).href;
const aiCoachRecap = new URL("../assets/interview_recap.png", import.meta.url).href;
const aiCoachSummary = new URL("../assets/session_summary.png", import.meta.url).href;
const coveyTownLobby = new URL("../assets/covey_newtown.png", import.meta.url).href;
const coveyTownPoker = new URL("../assets/covey_poker.png", import.meta.url).href;
const satelliteTile = new URL("../assets/satellite.png", import.meta.url).href;
const satelliteMask = new URL("../assets/satellite_mask.png", import.meta.url).href;
const kanjiSignup = new URL("../assets/kanji_signup.png", import.meta.url).href;
const kanjiModeSelect = new URL("../assets/kanji_mode_select.png", import.meta.url).href;
const kanjiHome = new URL("../assets/kanji_home_screen.png", import.meta.url).href;
const kanjiPerSet = new URL("../assets/kanji_per_set.png", import.meta.url).href;
const kanjiPractice = new URL("../assets/kanji_practice.png", import.meta.url).href;
const kanjiResults = new URL("../assets/kanji_results.png", import.meta.url).href;

export const site = {
  baseUrl: "https://your-render-subdomain.onrender.com",
  title: "Jason Conklin — Software Developer",
  description:
    "Portfolio of Jason Conklin — AI-enabled apps & full-stack web projects.",
  keywords: [
    "Jason Conklin",
    "software developer",
    "AI apps",
    "full-stack engineer",
    "portfolio",
  ],
  author: "Jason Conklin",
  language: "en-US",
  links: {
    github: "https://github.com/jason-conklin",
    linkedin: "https://www.linkedin.com/in/jason-conklin-aaa138302/",
    email: "jasonconklin.dev@gmail.com",
    resume: resumePagePath,
  },
} as const;

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
] as const;

export const hero = {
  name: "Jason Conklin",
  tagline: "Software Developer — AI-enabled apps & full-stack web",
  location: "New Jersey, USA · Open to Remote (US)",
  cta: {
    primary: { label: "View Projects", href: "/projects" },
    secondary: { label: "Get in Touch", href: "/contact" },
  },
  featuredProjectTitles: ["AI Interview Coach", "CoveyTown Poker", "Road Segmentation — SAM"],
} as const;

export const about = {
  bio: "Recent B.S. in Computer Science (Spring 2025). I build practical, production-ready web apps and AI-enabled tools. Interested in software engineering, evaluation pipelines, and developer UX.",
  location: "New Jersey, USA · Open to Remote (US)",
  education: [
    {
      school: "New Jersey Institute of Technology",
      degree: "B.S. in Computer Science",
      graduation: "Spring 2025",
      url: "https://www.njit.edu",
      coursework: [
        "Probability and Statistics",
        "Programming Language Concepts",
        "Data Science",
        "Linux Programming",
        "Operating Systems",
        "Computer Networks",
        "Artificial Intelligence",
        "Computer Systems",
        "Advanced Database Systems",
      ],
    },
  ],
  resumeUrl: resumePdf,
  resumeViewPath: resumePagePath,
} as const;

export const skills = {
  Languages: ["Python", "TypeScript/JavaScript", "Java", "C", "C++", "SQL"],
  "Frameworks & Libraries": [
    "React",
    "Vite",
    "Tailwind",
    "shadcn/ui",
    "FastAPI",
    "Flask",
    "jQuery",
  ],
  "Data & Infra": [
    "SQLite",
    "PostgreSQL (basic)",
    "MySQL",
    "MongoDB",
    "AWS",
    "Google Cloud Platform",
    "Docker",
    "Render",
  ],
  "AI / LLM": [
    "Evaluation Pipelines",
    "OpenAI / LM Studio / Ollama APIs",
    "JSON-Mode Responses",
    "Segment Anything (SAM)",
    "FastAPI Endpoints",
  ],
  Tools: ["Git", "GitHub Actions", "VS Code"],
} as const;

export const projects = [
  {
    title: "AI Interview Coach",
    slug: "ai-interview-coach",
    summary: "Mock interviews with AI scoring and coaching feedback.",
    highlights: [
      "Structured rubric scoring tuned for behavioral and technical tracks",
      "LLM/heuristic switching keeps costs predictable",
      "Post-interview diagnostics with action items",
      "Deploy-ready on Render with CI/CD hooks",
    ],
    tech: ["React", "FastAPI", "Tailwind", "Render"],
    githubUrl: "https://github.com/jason-conklin/ai-interview-coach",
    liveUrl: "",
    featured: true,
    category: ["AI", "Tools", "Web"],
    statusNote: "Deploying to Render",
    teamSize: 1,
    gallery: [
      {
        title: "Personalized landing screen",
        description:
          "Select interview level, role, and focus areas before starting a new mock session.",
        image: aiCoachHome,
      },
      {
        title: "Behavioral question walkthrough",
        description:
          "Sample behavioral answer graded with rubric-aligned scoring and targeted feedback.",
        image: aiCoachBehavioral,
      },
      {
        title: "Technical prompt deep-dive",
        description:
          "Technical interview response with structured evaluation and coaching tips.",
        image: aiCoachTechnical,
      },
      {
        title: "Interview recap modal",
        description:
          "End-of-interview recap with aggregate scores and recommendations for next steps.",
        image: aiCoachRecap,
      },
      {
        title: "Session analytics dashboard",
        description:
          "Running summary of all mock interviews in the current session, highlighting trends.",
        image: aiCoachSummary,
      },
    ],
  },
  {
    title: "CoveyTown Poker",
    slug: "coveytown-poker",
    summary:
      "Led a 4-person team integrating a Texas Hold'em experience into the Covey.Town virtual meeting platform.",
    highlights: [
      "Extended Covey.Town with an event-driven poker subsystem supporting 3–6 simultaneous players",
      "Coordinated frontend PhaserJS tilemaps with Twilio video chat to deliver shared gameplay moments",
      "Introduced shared socket types for real-time poker state syncing between client and town service",
      "Mentored a four-person team across architecture, gameplay mechanics, and integration workflows",
    ],
    tech: ["TypeScript", "React", "Phaser", "Node", "WebSockets", "Twilio"],
    githubUrl: "https://github.com/jason-conklin/CoveyTown-Poker",
    liveUrl: "",
    featured: true,
    category: ["Web", "Tools"],
    statusNote: "Open-source contribution · Covey.Town community edition",
    teamSize: 4,
    gallery: [
      {
        title: "Town lobby with poker table",
        description:
          "Players assemble in Covey.Town, ready to join the Group 18 poker table and start dealing.",
        image: coveyTownLobby,
      },
      {
        title: "Active poker round",
        description:
          "In-game view showing player cards, bets, chip counts, and pot updates synchronized in real time.",
        image: coveyTownPoker,
      },
    ],
  },
  {
    title: "Road Segmentation — SAM",
    slug: "road-segmentation-sam",
    summary:
      "Segment roads from high-resolution satellite tiles using Meta's Segment Anything Model plus post-processing heuristics.",
    highlights: [
      "Wrapped SAM inference in a reproducible pipeline with CLI, notebook, and Shiny for Python demo entry points",
      "Orchestrated morphological filtering and elongation heuristics to stitch clean road ribbons from raw masks",
      "Config-driven architecture makes swapping checkpoints, tiles, or tuning thresholds straightforward",
      "Documented troubleshooting for large-model dependencies and GPU/CPU fallbacks to ease onboarding",
    ],
    tech: ["Python", "PyTorch", "SAM", "Shiny for Python", "CLI"],
    githubUrl: "https://github.com/jason-conklin/road-segmentation-sam",
    liveUrl: "",
    featured: true,
    category: ["AI", "Tools"],
    statusNote: "Research spike · reproducible demos bundled",
    teamSize: 1,
    gallery: [
      {
        title: "Source satellite tile",
        description:
          "High-resolution satellite imagery tile used as the starting point for segmentation.",
        image: satelliteTile,
      },
      {
        title: "Road mask output",
        description:
          "SAM-derived road mask after heuristic cleanup, with ribbons ready for overlay or export.",
        image: satelliteMask,
      },
    ],
  },
  {
    title: "Kanji Gator",
    slug: "kanji-gator",
    summary:
      "Collaborative Japanese learning platform built by a 11-person team, focusing on kanji drills across curated study sets.",
    highlights: [
      "Frontend lead for the practice experience, coordinating animations, responsive layout, and form flows",
      "Integrated React + Tailwind UI with Flask backend endpoints to orchestrate practice sessions and user data",
      "Shipped kanji browsing tools with JLPT/Jōyō categorization and custom study set management",
      "Coordinated with ML/backend squads to align handwriting evaluation APIs and practice heuristics",
    ],
    tech: ["React", "Tailwind", "Flask", "TypeScript", "Python"],
    githubUrl: "(Private repository — demo available upon request.)",
    liveUrl: "",
    featured: true,
    category: ["Web", "Tools"],
    statusNote: "Team delivery · frontend lead + cross-team collaboration",
    teamSize: 11,
    gallery: [
      {
        title: "Kanji Gator Sign up",
        description:
          "Account creation flow capturing name, email, and password with responsive validation.",
        image: kanjiSignup,
      },
      {
        title: "Practice mode selection",
        description:
          "Learners choose study tracks including JLPT levels, grade sets, and Jōyō kanji.",
        image: kanjiModeSelect,
      },
      {
        title: "Kanji Gator Home",
        description:
          "Central hub to review kanji sets, craft custom study decks, and jump into practice modes.",
        image: kanjiHome,
      },
      {
        title: "View Kanji per set",
        description:
          "Explorer showing every kanji in the selected set with supporting details.",
        image: kanjiPerSet,
      },
      {
        title: "Kanji practice session",
        description:
          "Drawing interface captures handwriting attempts for evaluation against target characters.",
        image: kanjiPractice,
      },
      {
        title: "Practice results",
        description:
          "Session summary modal highlights accuracy across attempted kanji.",
        image: kanjiResults,
      },
    ],
  },
  {
    title: "LyricSmith",
    slug: "lyricsmith",
    summary: "Generate lyrics from BPM, chords, topic, and title.",
    highlights: [
      "Constrained prompting keeps tone and structure grounded",
      "Song templates support verse, chorus, and bridge variations",
      "Optional rhyme scheme controls for creative direction",
    ],
    tech: ["TypeScript", "LLM", "Node"],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    category: ["AI", "Web"],
    statusNote: "Coming soon · Deploying to Render",
    teamSize: 2,
    gallery: [
      {
        title: "Prompt builder",
        description: "Interface mock coming soon.",
      },
      {
        title: "Lyric output view",
        description: "Song generation preview placeholder.",
      },
    ],
  },
  {
    title: "New Project",
    slug: "new-project",
    summary: "Coming soon.",
    highlights: ["Stay tuned"],
    tech: ["TBD"],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    category: ["Web"],
    statusNote: "Coming soon",
    gallery: [
      {
        title: "Concept preview",
        description: "Screenshot to be added soon.",
      },
      {
        title: "Workflow glimpse",
        description: "Second placeholder image area.",
      },
    ],
  },
] as const;

export const projectFilters = [
  { label: "All", value: "all" },
  { label: "AI", value: "AI" },
  { label: "Web", value: "Web" },
  { label: "Tools", value: "Tools" },
] as const;

export const contact = {
  email: "mailto:jasonconklin.dev@gmail.com",
  github: "https://github.com/jason-conklin",
  linkedin: "https://www.linkedin.com/in/jason-conklin-aaa138302/",
  responseTimeNote: "Typically replies within 1–2 days.",
} as const;

export const metaByRoute = {
  "/": {
    title: `${site.title}`,
    description:
      "Software developer building AI-enabled apps and full-stack web experiences. Explore projects, skills, and ways to collaborate with Jason Conklin.",
  },
  "/about": {
    title: "About — Jason Conklin",
    description:
      "Learn about Jason Conklin, a software developer focused on AI-enabled, production-ready web applications.",
  },
  "/projects": {
    title: "Projects — Jason Conklin",
    description:
      "Browse AI and full-stack projects from Jason Conklin, including upcoming deployments to Render.",
  },
  "/skills": {
    title: "Skills — Jason Conklin",
    description:
      "Technical skills across languages, frameworks, AI tooling, and developer operations demonstrated by Jason Conklin.",
  },
  "/contact": {
    title: "Contact — Jason Conklin",
    description:
      "Connect with Jason Conklin for software engineering collaborations, AI-enabled apps, and full-stack web projects.",
  },
  "/resume": {
    title: "Jason Conklin's Resume",
    description:
      "View or download Jason Conklin's resume highlighting experience, skills, and recent work.",
  },
  "/404": {
    title: "Page Not Found — Jason Conklin",
    description: "Sorry, that page could not be found. Navigate back to Jason's work.",
  },
} as const;

export const siteOptions = {
  enableBackgroundParticles: true, // Flip to false to disable the animated canvas background.
  particleDensity: 0.6, // Tune particle count (0.3 - sparse, 1.0 - denser network).
  lineDistance: 120, // Increase to link particles across wider gaps.
  motionSpeed: 0.2, // Higher values make the animation livelier; keep low for calm vibe.
} as const;

