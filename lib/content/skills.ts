export interface SkillCategory {
  id: string;
  label: string;
  title: string;
  skills: string[];
  size: "wide" | "narrow";
  icon?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "genai",
    label: "GENAI & AGENTS",
    title: "AI & GenAI",
    skills: [
      "LangChain",
      "LangGraph",
      "CrewAI",
      "LangSmith",
      "OpenAI (GPT-4)",
      "Anthropic Claude",
      "AWS Bedrock",
      "RAG Systems",
      "Vector Databases",
      "Embeddings",
      "Prompt Engineering",
      "Agentic Workflows",
      "Fine-Tuning",
    ],
    size: "wide",
    icon: "Brain",
  },
  {
    id: "languages",
    label: "LANGUAGES",
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#", "SQL"],
    size: "narrow",
    icon: "Code2",
  },
  {
    id: "frontend",
    label: "FRONTEND",
    title: "Frontend",
    skills: ["React", "Next.js", "Angular", "React Native", "TailwindCSS", "React Flow"],
    size: "narrow",
    icon: "Monitor",
  },
  {
    id: "backend",
    label: "BACKEND & APIS",
    title: "Backend & APIs",
    skills: ["FastAPI", "Express.js", "NestJS", "Spring Boot", ".NET", "REST", "GraphQL", "WebSocket"],
    size: "narrow",
    icon: "Server",
  },
  {
    id: "cloud",
    label: "CLOUD & INFRA",
    title: "Cloud & Infra",
    skills: [
      "AWS Lambda",
      "ECS Fargate",
      "DynamoDB",
      "RDS / Aurora",
      "S3 + CloudFront",
      "API Gateway",
      "Cognito",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS CDK",
      "GitHub Actions",
      "Jenkins",
    ],
    size: "wide",
    icon: "Cloud",
  },
  {
    id: "data",
    label: "DATA & MESSAGING",
    title: "Data & Messaging",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "SQS", "OpenSearch", "Celery", "InfluxDB"],
    size: "narrow",
    icon: "Database",
  },
];
