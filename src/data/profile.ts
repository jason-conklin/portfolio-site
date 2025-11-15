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
const cirmDashboard = new URL("../assets/CIRM_dashboard.png", import.meta.url).href;
const cirmResource = new URL("../assets/CIRM_resource.png", import.meta.url).href;
const cirmForecast = new URL("../assets/CIRM_forecast.png", import.meta.url).href;
const cirmAlerts = new URL("../assets/CIRM_alerts.png", import.meta.url).href;
const cirmSettings = new URL("../assets/CIRM_settings.png", import.meta.url).href;
const flowguardDashboard = new URL("../assets/flowguard_dashboard.png", import.meta.url).href;
const flowguardExplore = new URL("../assets/flowguard_explore.png", import.meta.url).href;
const flowguardSettings = new URL("../assets/flowguard_settings.png", import.meta.url).href;
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
    linkedin: "https://www.linkedin.com/in/jasonconklin-dev",
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
  featuredProjectTitles: ["AI Interview Coach", "SentinelAuth", "FlowGuard", "AutoScale CIRM"],
} as const;

export const about = {
  bio: "I build practical, production-ready web apps and AI-driven tools, with a focus on software engineering, automated evaluation systems, and developer experience.",
  location: "New Jersey, USA · Open to Remote (US)",
  education: [
    {
      school: "New Jersey Institute of Technology",
      degree: "Bachelor of Science in Computer Science",
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
    title: "AI Interview Coach",
    slug: "ai-interview-coach",
    summary: "Mock interviews with AI scoring and coaching feedback.",
    highlights: [
      "Structured rubric scoring tuned for behavioral and technical tracks",
      "LLM/heuristic switching keeps costs predictable",
      "Post-interview diagnostics with action items",
      "Deploy-ready on Render with CI/CD hooks",
    ],
    tech: ["React", "FastAPI", "Tailwind", "Render", "OpenAI API"],
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
    title: "AutoScale CIRM",
    slug: "autoscale-cirm",
    summary:
      "Cloud infrastructure resource monitor with live dashboards, forecasts, and real-time alerting.",
    highlights: [
      "Forecasts CPU/Mem saturation within a configurable lookahead window",
      "Slack/SMTP alerts with de-dupe and persistent alert history",
      "Works with AWS/GCP or local simulator (no credentials required)",
      "APScheduler polling loop with fault-tolerant error handling",
    ],
    tech: [
      "React",
      "Vite",
      "Chart.js",
      "Axios",
      "Flask",
      "SQLAlchemy",
      "APScheduler",
      "scikit-learn",
    ],
    githubUrl: "https://github.com/jason-conklin/autoscale-cirm",
    liveUrl: "",
    featured: true,
    category: ["Tools", "Web"],
    statusNote: "Private beta — demo available upon request",
    teamSize: 1,
    gallery: [
      {
        title: "Dashboard overview",
        description: "Live KPIs, charts, and forecasts for active infrastructure.",
        image: cirmDashboard,
      },
      {
        title: "Resource selector",
        description: "Switch between providers, instances, and custom time ranges.",
        image: cirmResource,
      },
      {
        title: "Forecast card",
        description: "Predicts upcoming saturation thresholds with ETA and confidence bands.",
        image: cirmForecast,
      },
      {
        title: "Alerts table",
        description: "Review Slack and email alerts with delivery timestamps.",
        image: cirmAlerts,
      },
      {
        title: "Settings panel",
        description: "Configure providers, thresholds, and send test alerts from one place.",
        image: cirmSettings,
      },
    ],
  },
  {
    title: "FlowGuard – Intelligent Log & Metrics Aggregator",
    slug: "flowguard-monitor",
    summary:
      "Centralized log and metrics platform providing anomaly detection, alerting, and real-time dashboards for distributed systems.",
    highlights: [
      "Asynchronous ingestion pipeline with Celery and Redis for scalable processing",
      "Anomaly detection powered by IsolationForest and rolling KPI thresholds",
      "Automated Slack and SMTP alerts for spikes in error rate or latency",
      "Modular Flask API with SQLAlchemy models and clean REST endpoints",
      "Interactive React and Vite dashboard built with Chart.js and Axios",
      "Synthetic data generator for local development without external sources",
    ],
    tech: [
      "React",
      "Vite",
      "Chart.js",
      "Flask",
      "Celery",
      "Redis",
      "SQLAlchemy",
      "scikit-learn",
      "Docker Compose",
    ],
    githubUrl: "https://github.com/jason-conklin/flowguard-monitor",
    liveUrl: "",
    featured: true,
    category: ["Tools", "Web"],
    statusNote: "Live link coming soon",
    teamSize: 1,
    gallery: [
      {
        title: "Dashboard overview",
        description:
          "Unified KPIs and performance charts for error rate, latency, and throughput, with IsolationForest anomaly highlights.",
        image: flowguardDashboard,
      },
      {
        title: "Explorer screen",
        description:
          "Search and filter log streams by service, severity, or message content with virtualized tables for high-volume data.",
        image: flowguardExplore,
      },
      {
        title: "Settings panel",
        description:
          "Review configuration, thresholds, and alert channels while triggering Slack or email test notifications.",
        image: flowguardSettings,
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
    featured: false,
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
    featured: false,
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
  linkedin: "https://www.linkedin.com/in/jasonconklin-dev",
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