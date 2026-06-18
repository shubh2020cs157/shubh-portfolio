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
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "MongoDB",
      "Redis",
      "Celery",
      "CrewAI",
      "LangChain",
      "OpenAI",
    ],
    links: {
      github:
        "https://github.com/shubh2020cs157/FinSight-AI-Financial-Document-Analyzer",
    },
  },
  {
    id: "agenticflow",
    title: "AgenticFlow",
    tagline: "Visual Multi-Agent Workflow Orchestrator",
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
    techStack: [
      "Python",
      "FastAPI",
      "Next.js",
      "React Flow",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Kubernetes",
    ],
    links: {
      github: "https://github.com/shubh2020cs157/AgenticFlow",
    },
  },
  {
    id: "agentforge",
    title: "Enterprise AI Agent Builder",
    tagline: "Visual Platform to Compose, Deploy & Monitor Production AI Agents",
    category: "ai",
    categoryLabel: "AI SaaS Platform",
    badges: ["REACT FLOW", "MULTI-TENANT", "REAL-TIME"],
    description:
      "UI engineering on an enterprise SaaS platform for composing, deploying, and monitoring production AI agents across multi-tenant organisations. Owned delivery of the visual agent flow builder (React Flow canvas), in-browser agent playground with real-time SSE streaming, knowledge base management UI, and a live observability dashboard — each wired to REST APIs with Zustand-managed client state.",
    highlights: [
      "Visual agent flow builder on a React Flow canvas — engineered drag-and-drop composition of LLM nodes, tool-call components, and conditional branches with custom node renderers and canvas state synced bidirectionally with the backend API.",
      "In-browser agent playground with real-time SSE streaming — prompt iteration, live step-by-step execution inspection, and error surfacing before agents are promoted to production.",
      "Knowledge base management UI — document upload, listing, search, and per-agent attachment flows with optimistic UI updates and full API integration.",
      "Live observability dashboard — usage metrics, latency charts, and execution history with high-frequency state updates and layout-stable rendering.",
      "Multi-tenant org and RBAC management — team, department, role assignment, prompt gallery, and leaderboard; reusable MUI component system with Zustand across all admin flows.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "React Flow",
      "MUI",
      "Monaco Editor",
      "Zustand",
      "next-auth",
      "next-intl",
      "Docker",
    ],
    links: {},
  },
  {
    id: "jobsight-ai",
    title: "AI Job Search & Matching Platform",
    tagline: "Multi-Agent Engine Aggregating 6+ Job Sources with Smart Ranking",
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
    techStack: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "OpenAI",
      "AWS CDK",
      "ECS Fargate",
      "Cognito",
      "RDS / Aurora",
    ],
    links: {},
  },
  {
    id: "cloudops-hub",
    title: "AI Cloud Infrastructure Platform",
    tagline: "Multi-Cloud Catalog & IaC Console with Conversational AI",
    category: "ai",
    categoryLabel: "Cloud Governance",
    badges: ["AI AGENT", "MULTI-CLOUD", "ENTERPRISE"],
    description:
      "End-to-end UI engineering on an enterprise cloud infrastructure management platform — delivered the multi-cloud service catalog, versioned IaC blueprint viewer with an embedded code editor, AI chat panel with streamed responses, and data-heavy org and RBAC management flows, making complex infrastructure tooling accessible to non-DevOps teams.",
    highlights: [
      "Multi-cloud service catalog — engineered categorised AWS, Azure, and GCP service views with tabbed detail layouts (overview, features, security, resources), locale-aware routing, and API-driven content loading.",
      "Versioned IaC blueprint viewer — interactive code editor integration (Monaco) for browsing Terraform, YAML, Python, Go, and JSON blueprints with version switching and diff-ready layout.",
      "AI chat panel with streamed response rendering — conversational UI for natural language infrastructure queries, integrated with a backend agent service via streaming API calls and incremental UI updates.",
      "Multi-tenant org and RBAC management — business units, departments, teams, cloud account configs, and policy assignment flows; complex form handling, optimistic updates, and role-gated route access.",
      "Multi-locale internationalisation (next-intl) across all protected and public routes with RTL layout support and locale-aware navigation — shipped as a cross-cutting concern across the entire product.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "PostgreSQL",
      "Docker",
    ],
    links: {},
  },
  {
    id: "livestreamiq",
    title: "Real-Time Kafka Monitoring Dashboard",
    tagline: "Live Pipeline Metrics & PII-Safe Log Inspection",
    category: "fullstack",
    categoryLabel: "Prodevans Technologies",
    badges: ["KAFKA", "REAL-TIME", "DATA VIZ"],
    description:
      "Contributed frontend features to an enterprise Kafka monitoring platform at Prodevans — delivered a real-time logs dashboard with Chart.js visualisations and implemented data masking for PII-sensitive log views to meet compliance requirements.",
    highlights: [
      "Real-time logs dashboard with Chart.js visualisations tracking Kafka topic metrics — latency, message rate, and throughput — giving ops teams instant pipeline visibility.",
      "Data masking in log views: PII fields are obfuscated at the presentation layer, ensuring sensitive information is never exposed during log inspection.",
      "Integrated REST APIs for live data feeds into the dashboard, with Redux managing subscription state across multiple Kafka topic views.",
    ],
    techStack: [
      "React",
      "Redux",
      "TypeScript",
      "Chart.js",
      "REST APIs",
      "Styled Components",
    ],
    links: {},
  },
  {
    id: "nhub-core",
    title: "Enterprise Self-Service Data Portal",
    tagline: "RBAC-Governed Reporting & Audit Exports",
    category: "fullstack",
    categoryLabel: "Prodevans Technologies → Indigo",
    badges: ["RBAC", "JASPERREPORTS", "FIGMA"],
    description:
      "Frontend and reporting work on an enterprise self-service portal for agricultural data at Prodevans — built RBAC-based data masking across UI and reports, JasperReports templates for Excel audit exports, and responsive React components from Figma with full REST API integration.",
    highlights: [
      "RBAC-based data masking across UI and reports — crop and sales data is obfuscated based on the user's role, enforcing least-privilege access at the presentation layer.",
      "JasperReports templates for Excel-based audit logs — operational teams can export filtered data for compliance and reporting with a full audit trail.",
      "Responsive React components built pixel-perfect from Figma designs with REST API integration for real-time data filtering and categorisation.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "JasperReports",
      "REST APIs",
      "RBAC",
      "Figma",
    ],
    links: {},
  },
  {
    id: "spring-oauth2",
    title: "Multi-Provider OAuth2 Auth Gateway",
    tagline: "Unified Social Login Across 4 Identity Providers",
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
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "OAuth2",
      "Thymeleaf",
      "Maven",
    ],
    links: {
      github: "https://github.com/shubh2020cs157/spring-oauth2-demo",
    },
  },
  {
    id: "mediaforge",
    title: "Async Video Processing Engine",
    tagline: "High-Throughput Transcoding with Non-Blocking Job Queues",
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
    techStack: [
      "Python",
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Docker",
      "FFmpeg",
    ],
    links: {
      github: "https://github.com/shubh2020cs157/async-video-processing-engine",
    },
  },
  {
    id: "tradepulse",
    title: "Trading Analytics Dashboard",
    tagline: "Data-Dense Financial UI with Real-Time Portfolio Charts",
    category: "fullstack",
    categoryLabel: "Trading & Finance",
    badges: ["FULL STACK", "CHARTS", "TYPESCRIPT"],
    description:
      "Full-stack trading analytics dashboard with a React + TypeScript frontend and an Express.js API backend. Built to demonstrate data-dense financial UI patterns — simulated market data visualisations, multi-asset portfolio tracking, and performance metrics in a responsive dark-theme layout.",
    highlights: [
      "Recharts-powered market data visualisations with dynamic chart updates — candlestick-style price charts, volume bars, and trend indicators across multiple simulated assets.",
      "Multi-asset portfolio tracking with performance metrics — P&L, allocation breakdown, and return calculations rendered from a typed mock data layer.",
      "Dark-theme UI optimised for data-dense financial displays — layout designed for readability under high information density with accessible contrast ratios.",
      "Express.js REST API with TypeScript throughout — typed request/response models, structured route handlers, and a clean separation between data and presentation layers.",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Express.js",
      "Node.js",
      "Recharts",
      "Tailwind CSS",
    ],
    links: {
      github: "https://github.com/shubh2020cs157/trading-analytics-dashboard",
    },
  },
  {
    id: "leadlens",
    title: "LinkedIn Company Intelligence Tool",
    tagline: "Lead Enrichment via Secure Server-Side Aggregation",
    category: "fullstack",
    categoryLabel: "Sales & Prospecting",
    badges: ["FULL STACK", "REST API", "LEAD ENRICHMENT"],
    description:
      "Full-stack lead enrichment tool for fetching and displaying structured LinkedIn company intelligence. A Flask backend proxies requests to the RapidAPI LinkedIn scraper — keeping the API key server-side — and returns normalised company data to a React + TypeScript frontend built with Vite.",
    highlights: [
      "Flask backend as a secure server-side proxy to the RapidAPI LinkedIn data API — API key never exposed to the browser, all requests routed through the backend.",
      "Returns structured company intelligence per search: industry, employee count, founded year, HQ location, and company description — normalised from the raw scraper response.",
      "React + Vite + TypeScript frontend with a search-and-display UI — company lookup, structured result rendering, and clean empty/error states.",
      "Lightweight architecture — single-file Flask server with CORS configured for both Vite dev origin and the production domain.",
    ],
    techStack: ["Python", "Flask", "React", "TypeScript", "Vite", "RapidAPI"],
    links: {
      github: "https://github.com/shubh2020cs157/lead-enrichment-app",
    },
  },
];

export const archiveStats = [
  { value: "13+", label: "GitHub repositories" },
  { value: "4", label: "AI agent systems" },
  { value: "3", label: "Cloud platforms built" },
];
