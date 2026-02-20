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
const giftperchDashboard = new URL("../assets/giftperch_dashboard.png", import.meta.url).href;
const giftperchRecipients = new URL("../assets/giftperch_rec_profs.png", import.meta.url).href;
const giftperchProfile = new URL("../assets/giftperch_edit_rec_profs.png", import.meta.url).href;
const giftperchChat = new URL("../assets/giftperch_perchpal_chat.png", import.meta.url).href;
const giftperchCalendar = new URL("../assets/giftperch_occasions.png", import.meta.url).href;
const giftperchHistory = new URL("../assets/giftperch_gift_ideas.png", import.meta.url).href;
const giftperchAbout = new URL("../assets/giftperch_about.png", import.meta.url).href;
const giftperchBlog = new URL("../assets/giftperch_blog.png", import.meta.url).href;
const giftperchIcon = new URL("../assets/giftperch_icon.png", import.meta.url).href;
const applictusLogo = new URL("../assets/applictus_logo.png", import.meta.url).href;
const applictusAuth = new URL("../assets/applictus_01_auth.png", import.meta.url).href;
const applictusBlankDashboard = new URL(
  "../assets/applictus_02_blank_dashboard.png",
  import.meta.url,
).href;
const applictusDashboardTable = new URL(
  "../assets/applictus_03_dashboard_table.png",
  import.meta.url,
).href;
const applictusApplicationDetail = new URL(
  "../assets/applictus_04_application_detail.png",
  import.meta.url,
).href;
const statestatsLogo = new URL("../assets/statestats_logo.png", import.meta.url).href;
const statestatsMap = new URL("../assets/statestats-map-view.png", import.meta.url).href;
const statestatsTable = new URL("../assets/statestats-data-table.png", import.meta.url).href;
const statestatsGraphHome = new URL("../assets/statestats-graph-home.png", import.meta.url).href;
const statestatsGraphInc = new URL("../assets/statestats-graph-inc.png", import.meta.url).href;

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
  featuredProjectTitles: ["GiftPerch — giftperch.com"],
} as const;

export const liveProjects = [
  {
    name: "GiftPerch",
    description: "AI-powered gifting workspace with recipient profiles, PerchPal chat, and live occasion tracking.",
    liveUrl: "https://giftperch.com",
    slug: "giftperch-recipient-profiles",
    icon: giftperchIcon,
  },
  {
    name: "Applictus",
    description:
      "Production job application tracker that connects to Gmail and automatically organizes confirmations, rejections, and status updates into a clean dashboard.",
    liveUrl: "https://applictus.com",
    slug: "applictus",
    icon: applictusLogo,
  },
  {
    name: "StateStats",
    description:
      "U.S. state-level data explorer with interactive maps, metric comparisons, and transparent public-data insights.",
    liveUrl: "https://statestats.us",
    slug: "statestats-data-explorer",
    icon: statestatsLogo,
  },
] as const;

export const about = {
  bio: "I build practical, production-ready web apps and AI-driven tools, with a focus on software engineering, automated evaluation systems, and developer experience.",
  location: "New Jersey, USA · Open to Remote (US)",
  education: [
    {
      school: "New Jersey Institute of Technology",
      degree: "B.S. Computer Science",
      graduation: "Spring 2025",
      url: "https://www.njit.edu",
      focusAreas: [
        {
          title: "Full-Stack Web Architecture",
          description: "React/TypeScript, API design, static deploy hygiene",
        },
        {
          title: "Applied AI & Evaluation",
          description: "Prompt systems, evaluation loops, measurable outputs",
        },
        {
          title: "Secure Auth & RBAC",
          description: "Sessions/JWT, policy design, least privilege",
        },
        {
          title: "Data Systems & Analytics",
          description: "Schema design, ingestion, query performance",
        },
        {
          title: "Systems Foundations",
          description: "OS/networking fundamentals, performance awareness",
        },
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
    title: "GiftPerch – AI-Powered Recipient Profiles & Gift Suggestions",
    slug: "giftperch-recipient-profiles",
    summary:
      "AI-powered gifting workspace with reusable recipient profiles, an occasion calendar, and PerchPal chat for gift ideas.",
    highlights: [
      "Recipient profiles capture interests, budgets, anti-gifts, and relationship context to avoid repeat or misfit ideas",
      "PerchPal AI chat suggests budget-aware gifts with rationales and batching for a single prompt",
      "AI gift ideas workspace generates multi-item lists on demand with copyable links",
      "Occasion calendar tracks birthdays and events with future-proof navigation and reminders",
      "Gift history logs past gifts and reactions so suggestions stay fresh and non-repetitive",
      "Amazon Associates-ready links (giftperch-20) with disclosure-friendly CTAs baked into UI",
      "Marketing site plus blog with SEO content and custom hero imagery",
      "Responsive layouts tuned for desktop, mobile, and fullscreen PerchPal chat",
    ],
    tech: [
      "Next.js 16 (App Router)",
      "React",
      "TypeScript",
      "Tailwind",
      "Supabase (Postgres/Auth/Storage/RLS)",
      "OpenAI API",
      "Vercel",
    ],
    githubUrl: "https://github.com/jason-conklin/giftperch",
    liveUrl: "https://giftperch.com",
    featured: true,
    category: ["AI", "Web", "Tools"],
    statusNote: "Live on Vercel",
    teamSize: 1,
    gallery: [
      {
        title: "PerchPal HQ dashboard",
        description:
          "GiftPerch dashboard showing upcoming occasions, quick links, and the PerchPal workspace.",
        image: giftperchDashboard,
      },
      {
        title: "Recipient profiles grid",
        description:
          "Grid of recipient profile cards with relationships, interests, and quick occasion stats.",
        image: giftperchRecipients,
      },
      {
        title: "Recipient profile details",
        description:
          "Single recipient view highlighting interests, budgets, anti-gifts, and notes.",
        image: giftperchProfile,
      },
      {
        title: "AI gift ideas chat",
        description:
          "PerchPal conversation generating tailored gift ideas tuned to vibe and budget.",
        image: giftperchChat,
      },
      {
        title: "Generate AI Gift Suggestions",
        description: "AI Gift Suggestions tailored to each individual recipient profile.",
        image: giftperchHistory,
      },
      {
        title: "Occasions calendar",
        description: "Monthly gifting calendar with birthdays, anniversaries, and navigation controls.",
        image: giftperchCalendar,
      },
      {
        title: "About GiftPerch page",
        description: "Marketing page describing the platform’s purpose, features, and AI assistant.",
        image: giftperchAbout,
      },
      {
        title: "GiftPerch Journal blog post",
        description:
          "Blog article layout with hero image and long-form gifting guidance from the Journal.",
        image: giftperchBlog,
      },
    ],
  },
  {
    title: "Applictus – Gmail-Powered Job Application Tracker",
    slug: "applictus",
    cardSummary:
      "Production job application tracker that connects to Gmail and automatically organizes confirmations, rejections, and status updates into a clean dashboard.",
    summary:
      "Production web application that connects to Gmail via OAuth, detects job-related updates, deduplicates events, and keeps application status pipelines current with explainable inference.",
    highlights: [
      "Gmail OAuth ingestion pipeline classifies confirmations/rejections/interview signals and deduplicates by provider message IDs",
      "Status inference with confidence scoring + \"why this was inferred\" explanations and event timelines",
      "Privacy-first storage: persists only metadata/signals needed for tracking (sender/domain, subject, snippet, timestamps, identifiers)",
      "Production-ready auth/session handling with secure token storage and account management flows",
      "Responsive dashboard with sync summaries, pipeline breakdowns, and fast drill-in application detail views",
    ],
    tech: [
      "Node.js",
      "Express",
      "PostgreSQL (Supabase)",
      "Supabase Auth",
      "Google OAuth / Gmail API",
      "Vercel",
    ],
    githubUrl: "https://github.com/jason-conklin/applictus",
    liveUrl: "https://applictus.com",
    featured: true,
    category: ["AI", "Web", "Tools"],
    statusNote: "Live on Vercel",
    teamSize: 1,
    gallery: [
      {
        title: "Login / Sign-up (Google + Email)",
        description:
          "Auth page supporting Google OAuth and email/password account flows for secure sign-in and onboarding.",
        image: applictusAuth,
        alt: "Applictus authentication page with Google sign-in and email sign-up options",
      },
      {
        title: "Connected Gmail · Initial sync in progress",
        description:
          "Dashboard state after Gmail is connected, showing a clean starting workspace while the first sync runs (progress bar mid-sync) before any applications are detected and populated.",
        image: applictusBlankDashboard,
        alt: "Applictus blank dashboard for a new account",
      },
      {
        title: "Populated dashboard (applications table)",
        description:
          "Main dashboard with a full applications table showing synced job records and status groupings.",
        image: applictusDashboardTable,
        alt: "Applictus populated applications dashboard with a large synced jobs table",
      },
      {
        title: "Application detail side panel (timeline + inference)",
        description:
          "Expanded application side panel showing inferred status, confidence score, explanation, and event timeline from synced Gmail updates.",
        image: applictusApplicationDetail,
        alt: "Applictus application side panel showing inferred status confidence explanation and event timeline",
      },
    ],
  },
  {
    title: "StateStats – U.S. State-Level Data Explorer",
    slug: "statestats-data-explorer",
    summary:
      "Interactive state-level data explorer with choropleth maps, metric comparisons, and responsive time-series charts.",
    highlights: [
      "Interactive U.S. map with dynamic metric selection and adjustable year slider",
      "Fast, scalable backend powered by Supabase and PostgreSQL",
      "Time-series comparison charts with multi-state selection",
      "Custom legend, state-pinning, and accessibility-focused UI",
      "Fully responsive layout with mobile-optimized controls",
      "Modular Next.js server components and Prisma data layer",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "Supabase",
      "PostgreSQL",
      "D3.js",
      "Tailwind",
    ],
    githubUrl: "https://github.com/jason-conklin/state-stats",
    liveUrl: "https://statestats.us",
    featured: true,
    category: ["Web", "Tools"],
    statusNote: "Live on statestats.us",
    teamSize: 1,
    gallery: [
      {
        title: "Map view",
        description:
          "Full-page map view showing the Unemployment Rate (2024) metric with the selector, year slider, and legend visible.",
        image: statestatsMap,
      },
      {
        title: "Data table",
        description:
          "Map page with the data table open, showing state rankings for Total Population and the metric selector expanded.",
        image: statestatsTable,
      },
      {
        title: "Compare (graph home)",
        description:
          "Compare view showing Median Home Value (2000–2024) for CA, TX, NY, and FL with the metric selector dropdown visible.",
        image: statestatsGraphHome,
      },
      {
        title: "Compare (income detail)",
        description:
          "Compare view showing Median Household Income (2000–2024) with hover details for 2011 values for each state.",
        image: statestatsGraphInc,
      },
    ],
  },
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
