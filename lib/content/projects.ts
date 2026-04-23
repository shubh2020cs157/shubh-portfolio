export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "ai" | "fullstack";
  categoryLabel: string;
  badges: string[];
  description: string;
  highlights: string[];
  techStack: string[];
  links: {
    github?: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    id: "finsight",
    title: "FinSight AI",
    tagline: "Multi-Agent Financial Document Analyzer",
    category: "ai",
    categoryLabel: "Financial Analysis",
    badges: ["AGENTIC AI", "CREWAI", "REST API"],
    description:
      "Full-stack app to upload financial PDFs and generate structured outputs — executive summaries, KPIs, and risk flags — via a secure FastAPI REST API with JWT + RBAC. A CrewAI multi-agent pipeline (financial analyst, risk assessor, and report generator agents) handles analysis, while Celery workers backed by Redis handle async processing.",
    highlights: [
      "Multi-agent analysis pipeline built with CrewAI (gpt-4o-mini via LangChain) — financial analyst, risk assessor, and report generator agents collaborate per document.",
      "Async job queue: 6 Celery task types process uploads, analysis, and exports independently with live progress tracking via status endpoint.",
      "Two-tier Redis cache (hot-path summaries + session data) reduces redundant LLM calls on repeat documents.",
      "Secured with JWT authentication and role-based access control (RBAC); supports PDF uploads up to 50 MB.",
    ],
    techStack: ["Python", "FastAPI", "React", "TypeScript", "MongoDB", "Redis", "Celery", "CrewAI", "LangChain", "OpenAI"],
    links: {
      github: "https://github.com/shubh2020cs157/FinSight-AI-Financial-Document-Analyzer",
    },
  },
  {
    id: "agenticflow",
    title: "AgenticFlow",
    tagline: "Agentic AI Orchestration Platform",
    category: "ai",
    categoryLabel: "AI Orchestration",
    badges: ["AGENTIC AI", "KAFKA", "REAL-TIME"],
    description:
      "Production-ready orchestration platform with a visual drag-and-drop workflow builder (React Flow) for composing deterministic DAGs alongside LLM-powered agentic nodes. Event-driven backend with Kafka (workflow.events, node.events, agent.events topics), PostgreSQL state snapshots, and real-time WebSocket monitoring.",
    highlights: [
      "Event-driven backend powered by Kafka (workflow.events, node.events, agent.events) — async node execution with Redis distributed locking and retry logic.",
      "Visual drag-and-drop DAG builder using React Flow for composing agentic workflows with deterministic and LLM-powered nodes.",
      "Multi-turn Human-in-the-Loop (HITL) checkpoints with state snapshots and workflow replay built in.",
      "Supports GPT-4 and Claude 3 as interchangeable LLM backends via LangChain.",
      "Kubernetes-orchestrated deployment with real-time WebSocket streaming for live execution monitoring.",
    ],
    techStack: ["Python", "FastAPI", "Next.js", "React Flow", "TypeScript", "PostgreSQL", "Redis", "Kafka", "Kubernetes"],
    links: {
      github: "https://github.com/shubh2020cs157/AgenticFlow",
    },
  },
  {
    id: "lead-enrichment",
    title: "LinkedInsight",
    tagline: "LinkedIn Company Intelligence Tool",
    category: "fullstack",
    categoryLabel: "Sales & Prospecting",
    badges: ["FULL STACK", "REST API", "LINKEDIN"],
    description:
      "Full-stack tool for fetching and displaying structured LinkedIn company intelligence. A Flask backend proxies requests to the RapidAPI LinkedIn scraper and returns normalised company data — industry, size, founded year, and description — to a React + TypeScript frontend built with Vite.",
    highlights: [
      "Flask backend acts as a secure proxy to the RapidAPI LinkedIn data API, keeping the API key server-side.",
      "React + Vite + TypeScript frontend with a clean search-and-display UI for browsing company profiles.",
      "Returns structured company intelligence: industry, employee count, founded year, HQ location, and description.",
      "Lightweight architecture — single-file Flask server with CORS configured for the Vite dev and production origin.",
    ],
    techStack: ["Python", "Flask", "React", "TypeScript", "Vite", "RapidAPI"],
    links: {
      github: "https://github.com/shubh2020cs157/lead-enrichment-app",
    },
  },
  {
    id: "trading-dashboard",
    title: "Journalyst",
    tagline: "Trading Analytics Dashboard",
    category: "fullstack",
    categoryLabel: "Trading & Finance",
    badges: ["FULL STACK", "CHARTS", "TYPESCRIPT"],
    description:
      "Modern responsive trading analytics dashboard with a React + TypeScript frontend backed by an Express.js API. Features simulated market data visualisations, portfolio tracking, performance metrics, and a clean dark-theme UI optimised for data-dense financial displays.",
    highlights: [
      "Simulated market data visualisations with dynamic chart updates using Recharts.",
      "Portfolio tracking and performance metrics across multiple assets with a mock data layer.",
      "Optimised dark-theme UI for data-dense financial displays, built with React and Tailwind CSS.",
      "Express.js REST API backend with TypeScript throughout — typed request/response models end-to-end.",
    ],
    techStack: ["TypeScript", "React", "Express.js", "Node.js", "Recharts", "Tailwind CSS"],
    links: {
      github: "https://github.com/shubh2020cs157/trading-analytics-dashboard",
    },
  },
  {
    id: "spring-oauth2",
    title: "Spring OAuth2 Multi-Provider",
    tagline: "Enterprise Social Auth Gateway",
    category: "fullstack",
    categoryLabel: "Auth & Security",
    badges: ["OAUTH2", "SPRING BOOT", "MULTI-PROVIDER"],
    description:
      "Spring Boot application demonstrating OAuth2 social login with four providers — Google, GitHub, LinkedIn, and Microsoft. Implements Spring Security session-based auth, a unified user profile model that normalises identities across all providers, and role-based access control.",
    highlights: [
      "OAuth2 social login with Google, GitHub, LinkedIn, and Microsoft providers via Spring Security.",
      "Session-based authentication managed by Spring Security — no stateless JWT required.",
      "Unified user profile model that normalises identity data (name, email, avatar) across all four OAuth providers.",
      "Role-based access control (RBAC) integrated with Spring Security for protected endpoints.",
      "Thymeleaf UI with provider-specific login flow and a unified post-auth profile page.",
    ],
    techStack: ["Java", "Spring Boot", "Spring Security", "OAuth2", "Thymeleaf", "Maven"],
    links: {
      github: "https://github.com/shubh2020cs157/spring-oauth2-demo",
    },
  },
  {
    id: "cloudops-hub",
    title: "CloudOps Hub",
    tagline: "AI-Powered Cloud Infrastructure Platform",
    category: "ai",
    categoryLabel: "Cloud Governance",
    badges: ["AI AGENT", "MULTI-CLOUD", "ENTERPRISE"],
    description:
      "Enterprise cloud infrastructure management platform with a CopilotKit AI agent (AG-UI protocol) for natural language infrastructure queries. Provides a multi-cloud service catalog across AWS, Azure, and GCP with versioned IaC blueprints (Terraform/HCL, YAML, Python, Go, JSON), an interactive code editor, and full multi-tenant org management including business units, departments, teams, and RBAC policies.",
    highlights: [
      "AI agent built on CopilotKit + AG-UI HttpAgent protocol — routes natural language queries to a backend agent service over authenticated streaming connections.",
      "Versioned infrastructure blueprints: each product version stores IaC code, JSON schema, and resource mapping; supports Terraform, YAML, Python, Go, and JSON via an Ace Editor.",
      "Multi-tenant org management: business units, departments, teams, cloud account configurations, and policy assignments — all persisted in a multi-schema PostgreSQL database via Drizzle ORM.",
      "Multi-cloud service catalog with categorised AWS, Azure, and GCP services, including overview, features, security, and resources tabs per service.",
      "AI Hub with threaded discussions and multi-locale (i18n) internationalisation across all protected and public routes.",
    ],
    techStack: ["Next.js", "TypeScript", "React", "TailwindCSS", "PostgreSQL", "Docker"],
    links: {},
  },
  {
    id: "jobsight-ai",
    title: "JobSight AI",
    tagline: "Multi-Agent AI Job Search Platform",
    category: "ai",
    categoryLabel: "AI Recruiting",
    badges: ["MULTI-AGENT", "AWS CDK", "MOBILE"],
    description:
      "AI job search platform with a 4-agent pipeline (Coordinator → QueryParser, Fetcher, CurationAgent) that parses natural language queries, aggregates listings from 6+ job APIs, deduplicates via similarity clustering, and ranks results using a 7-factor weighted scoring model. Deployed on AWS via CDK-managed infrastructure and packaged as a native Android app via Capacitor.",
    highlights: [
      "4-agent pipeline: CoordinatorAgent orchestrates QueryParserAgent (query expansion + synonyms), FetcherAgent (multi-source parallel fetching), and CurationAgent (deduplication + ranking).",
      "Aggregates listings from 6+ sources — Adzuna, JSearch, CoreSignal, Jooble, RemoteOK, Arbeitnow — with similarity-based deduplication across all results.",
      "7-factor relevance scoring: title match (25%), skills match (30%), experience, location, company reputation, job freshness, and description relevance.",
      "Resume upload with PDF parsing for personalised job matching based on extracted skills and experience.",
      "Full AWS CDK deployment: VPC, RDS (PostgreSQL), S3, Cognito auth, ALB, and ECS Fargate — environment-specific stacks for dev and prod.",
    ],
    techStack: ["Python", "FastAPI", "Next.js", "TypeScript", "OpenAI", "AWS CDK", "ECS Fargate", "Cognito", "RDS / Aurora"],
    links: {},
  },
  {
    id: "mediaforge",
    title: "MediaForge",
    tagline: "Async Video Processing API",
    category: "fullstack",
    categoryLabel: "Media Engineering",
    badges: ["ASYNC JOBS", "FFMPEG", "REST API"],
    description:
      "Production-grade FastAPI backend for video processing: upload, trim, add text/image overlays and watermarks, and transcode to multiple output qualities (1080p → 360p) via FFmpeg. All operations are offloaded to Celery workers backed by Redis, returning a job_id immediately for a non-blocking UX with real-time progress tracking.",
    highlights: [
      "Async job queue: Celery workers (process_video_upload, trim_video_task, add_overlay_task, add_watermark_task, convert_quality_task) process all operations independently with 0–100% progress reported via status endpoint.",
      "Multi-quality transcoding generates 1080p, 720p, 480p, and 360p versions of each video, all stored and queryable via individual download endpoints.",
      "Text, image, and video overlays with configurable position and timing; watermark support including Indian language text rendering.",
      "Upload validation (MIME type, configurable size limit), UUID-keyed file storage, and per-video metadata extraction (duration, resolution, codec, bitrate, FPS) via FFmpeg.",
      "Dockerised with PostgreSQL metadata store (Video, ProcessedVideo, ProcessingJob models via SQLAlchemy) and structured logging.",
    ],
    techStack: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "Docker", "FFmpeg"],
    links: {},
  },
];

export const archiveStats = [
  { value: "13+", label: "GitHub repositories" },
  { value: "4", label: "AI agent systems" },
  { value: "3", label: "Cloud platforms built" },
];
