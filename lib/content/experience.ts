export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlights: string[];
  techStack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "microsoft",
    role: "Software Engineer",
    company: "Microsoft",
    type: "Contract",
    location: "Bengaluru, India",
    startDate: "Oct 2025",
    endDate: "Jun 2026",
    isCurrent: false,
    highlights: [
      "Develop and integrate backend microservices using Azure API Gateway, Azure Functions, and enterprise REST APIs within an agile engineering team.",
      "Build and ship automation scripts and CI/CD pipelines (GitHub Actions, Docker) following production best practices: structured logging, zero-downtime deployment.",
      "Drive observability efforts by analysing distributed telemetry and logs, authoring runbooks, and contributing to incident post-mortems — reducing MTTR on recurring issues.",
      "Collaborate cross-functionally on system integration projects; deliver reviewed PRs and technical documentation that accelerated onboarding for new engineers.",
    ],
    techStack: [
      "Azure API Gateway",
      "Azure Functions",
      "GitHub Actions",
      "Docker",
      "REST APIs",
      "Observability",
    ],
  },
  {
    id: "prodevans",
    role: "Associate Software Engineer",
    company: "Prodevans Technologies Pvt Ltd",
    type: "Full-time",
    location: "Bhubaneswar, India",
    startDate: "Dec 2024",
    endDate: "Aug 2025",
    isCurrent: false,
    highlights: [
      "Engineered full-stack features across React/Next.js (TypeScript) frontends and Spring Boot/NestJS backends; designed REST and GraphQL APIs for multi-tenant workflows with RBAC.",
      "Architected stateless, event-driven data pipelines using Kafka and InfluxDB, processing 100k+ events/day; reduced end-to-end latency by ~30% via Redis caching and intelligent batching.",
      "Automated CI/CD workflows with Jenkins and GitHub Actions; containerised services with Docker and orchestrated deployments via Kubernetes — cutting release time by ~40%.",
      "Delivered end-to-end user-facing features with a focus on UX quality and system observability; integrated monitoring dashboards tracking key service health metrics across production.",
    ],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "NestJS",
      "GraphQL",
      "Kafka",
      "InfluxDB",
      "Redis",
      "Kubernetes",
      "Jenkins",
    ],
  },
  {
    id: "modelxai",
    role: "Freelance Software Engineer",
    company: "ModelX AI",
    type: "Freelance",
    location: "Remote (US-based startup)",
    startDate: "Apr 2024",
    endDate: "Nov 2024",
    isCurrent: false,
    highlights: [
      "Engineered core UI features across a multi-tenant enterprise AI agent platform — delivered the visual agent flow builder (React Flow canvas with drag-and-drop LLM nodes, tool calls, and conditional branches), real-time observability dashboard, and knowledge base management, integrating each with REST APIs and Zustand-managed client state.",
      "Owned end-to-end UI delivery for a cloud infrastructure management product — implemented the multi-cloud service catalog (AWS, Azure, GCP), versioned blueprint viewer with an embedded code editor, AI chat panel with streamed responses, and data-heavy org and RBAC management flows.",
      "Architected multi-locale internationalisation (next-intl) across all routes — locale-aware routing, RTL layout support, and dynamic namespace loading — directly expanding the platform's addressable market to non-English enterprise customers.",
      "Collaborated asynchronously with a US-based founding team across sprint cycles; drove frontend architecture decisions, maintained component standards, and shipped production-quality PRs with thorough code review.",
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
  },
]

export const approachPrinciples = [
  {
    icon: "Target",
    title: "Product-First",
    description: "Ship features users actually need, not just elegant abstractions.",
  },
  {
    icon: "BarChart3",
    title: "Measurable Impact",
    description: "Every change is backed by metrics — latency, cache hit rates, deploy cadence.",
  },
  {
    icon: "Eye",
    title: "Observability",
    description: "Runbooks, telemetry, and structured logging before they become incidents.",
  },
  {
    icon: "Shield",
    title: "Ownership",
    description: "From design doc to post-mortem — full lifecycle accountability.",
  },
];

export const skillPillars = [
  {
    id: "ai",
    label: "AI INTEGRATION",
    title: "Agentic AI",
    description:
      "LangChain, LangGraph, CrewAI, RAG systems, vector databases, multi-turn agent workflows with human-in-the-loop.",
    icon: "Brain",
  },
  {
    id: "fullstack",
    label: "FULL-STACK",
    title: "Full-Stack Engineering",
    description:
      "React, Next.js, FastAPI, NestJS, Spring Boot — REST, GraphQL, WebSocket across the whole stack.",
    icon: "Layers",
  },
  {
    id: "cloud",
    label: "CLOUD INFRA",
    title: "Cloud Infrastructure",
    description:
      "AWS (Lambda, ECS, DynamoDB, S3, Cognito), Azure, Docker, Kubernetes, Terraform, AWS CDK.",
    icon: "Cloud",
  },
];
