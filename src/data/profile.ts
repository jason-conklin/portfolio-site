const resumePdf = new URL("../assets/jason-conklin-resume.pdf", import.meta.url).href;
const resumePagePath = "/resume";

const sentinelLogin = new URL("../assets/sentinel_login.png", import.meta.url).href;
const sentinelAdminDash = new URL("../assets/sentinel_admin_dash.png", import.meta.url).href;
const sentinelUsers = new URL("../assets/sentinel_users.png", import.meta.url).href;
const sentinelSessions = new URL("../assets/sentinel_sessions.png", import.meta.url).href;
const sentinelAudit = new URL("../assets/sentinel_audit.png", import.meta.url).href;
const sentinelProfile = new URL("../assets/sentinel_profile.png", import.meta.url).href;
const sentinelMySessions = new URL("../assets/sentinel_my_sessions.png", import.meta.url).href;
const sentinelUserDash = new URL("../assets/sentinel_user_dash.png", import.meta.url).href;

export const site = {
  baseUrl: "https://your-render-subdomain.onrender.com",
  title: "Jason Conklin — Software Developer",
  description:
    "Portfolio of Jason Conklin — Full-stack and AI-driven web projects.",
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
  tagline: "Software Developer — Full-stack engineering & applied AI",
  location: "New Jersey, USA · Open to Remote (US)",
  cta: {
    primary: { label: "View Projects", href: "/projects" },
    secondary: { label: "Get in Touch", href: "/contact" },
  },
  featuredProjectTitles: ["AI Interview Coach", "AutoScale CIRM", "Road Segmentation - SAM"],
} as const;

export const about = {
  bio: "Recent B.S. in Computer Science (Spring 2025). I build practical, production-ready web apps and AI-driven tools. Interested in software engineering, evaluation pipelines, and developer UX.",
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
    title: "SentinelAuth – Role-Based Access & Security Platform",
    slug: "sentinelauth-access-control",
    summary:
      "Role-based authentication, authorization, and security telemetry service with RBAC enforcement, alerts, and admin dashboards.",
    highlights: [
      "Bcrypt-secured registration and JWT rotation with Redis-backed rate limiting",
      "Role-based access control enforced at the API layer with admin, moderator, and user tiers",
      "Structured audit trail plus Slack and email alerts for suspicious activity",
      "Pytest suite covering auth flows, RBAC, rate limits, and auditing",
      "Optional React admin console for viewing users, sessions, and audit streams in real time",
      "Docker Compose profiles for API, Redis, Postgres, and the optional web dashboard",
    ],
    tech: [
      "React",
      "Vite",
      "Chart.js",
      "Axios",
      "FastAPI",
      "Redis",
      "SQLAlchemy",
      "PostgreSQL",
      "scikit-learn",
      "Docker Compose",
      "Python",
      "Node.js",
    ],
    githubUrl: "https://github.com/jason-conklin/sentinelauth-access-control",
    liveUrl: "",
    featured: true,
    category: ["Web", "Tools"],
    statusNote: "Live link coming soon",
    teamSize: 1,
    gallery: [
      {
        title: "Login page",
        description: "Secure login screen with JWT rotation and rate-limited access.",
        image: sentinelLogin,
      },
      {
        title: "Admin dashboard",
        description: "Security overview with navigation to users, sessions, and audit tools.",
        image: sentinelAdminDash,
      },
      {
        title: "Users directory",
        description: "Admin view listing users, roles, and active status for RBAC management.",
        image: sentinelUsers,
      },
      {
        title: "Sessions overview",
        description: "Inspect active sessions with device fingerprinting and revocation controls.",
        image: sentinelSessions,
      },
      {
        title: "Audit trail",
        description: "Structured audit events with IDs, actors, IP addresses, and timestamps.",
        image: sentinelAudit,
      },
      {
        title: "Profile details",
        description: "User profile page with role membership, metadata, and password update actions.",
        image: sentinelProfile,
      },
      {
        title: "My sessions",
        description: "Personal session history with IP, device, and last-seen activity.",
        image: sentinelMySessions,
      },
      {
        title: "Limited dashboard",
        description: "User role dashboard showing restricted access indicators and trimmed navigation.",
        image: sentinelUserDash,
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
      "Software developer building AI-powered and full-stack web experiences. Explore projects, skills, and collaboration opportunities with Jason Conklin.",
  },
  "/about": {
    title: "About — Jason Conklin",
    description:
      "Learn about Jason Conklin, a software developer focused on AI-integrated, production-ready web applications.",
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
      "Connect with Jason Conklin for software engineering collaborations, AI-driven applications, and full-stack web projects.",
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