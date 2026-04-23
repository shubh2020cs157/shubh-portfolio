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
    id: "modelxai",
    role: "Freelance Software Engineer",
    company: "ModelX AI",
    type: "Freelance",
    location: "Remote (US-based startup)",
    startDate: "Sep 2024",
    endDate: "Nov 2024",
    isCurrent: false,
    highlights: [
      "Built core frontend features for an enterprise AI agent platform used by multi-tenant organisations to build, deploy, and monitor production AI agents — visual no-code flow builder (React Flow canvas), multi-provider AI gateway, knowledge base management, and real-time observability dashboard.",
      "Developed the CopilotKit-powered cloud infrastructure management dashboard — natural language IaC generation, versioned Terraform/YAML blueprint editor (Ace Editor), and multi-cloud service catalog across AWS, Azure, and GCP, enabling teams to provision infrastructure without deep DevOps expertise.",
      "Implemented multi-locale internationalisation (next-intl) across the full platform with RTL layout support and locale-aware routing — directly expanding the product's addressable market to non-English enterprise customers.",
      "Collaborated asynchronously with a US-based founding team, shipping reviewed PRs on tight sprint cycles and contributing to frontend component architecture decisions for a production SaaS product.",
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
  {
    id: "microsoft",
    role: "Software Engineer",
    company: "Microsoft",
    type: "Contract",
    location: "Bengaluru, India",
    startDate: "Oct 2025",
    endDate: "Present",
    isCurrent: true,
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
];

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
