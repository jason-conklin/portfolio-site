const aiCoachHome = new URL("../assets/home_screen.png", import.meta.url).href;
const aiCoachBehavioral = new URL("../assets/interview_q1.png", import.meta.url).href;
const aiCoachTechnical = new URL("../assets/interview_q2.png", import.meta.url).href;
const aiCoachRecap = new URL("../assets/interview_recap.png", import.meta.url).href;
const aiCoachSummary = new URL("../assets/session_summary.png", import.meta.url).href;

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
  featuredProjectTitles: ["AI Interview Coach", "LyricSmith"],
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
  resumeUrl: "#",
} as const;

export const skills = {
  Languages: ["Python", "TypeScript/JavaScript", "SQL"],
  "Frameworks & Libraries": [
    "React",
    "Vite",
    "Tailwind",
    "shadcn/ui",
    "FastAPI",
  ],
  "Data & Infra": ["SQLite", "PostgreSQL (basic)", "Render"],
  "AI / LLM": [
    "Prompting",
    "Evaluation pipelines",
    "OpenAI-compatible APIs (LM Studio/Ollama)",
    "JSON-mode fallbacks",
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
    featured: true,
    category: ["AI", "Web"],
    statusNote: "Coming soon · Deploying to Render",
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
