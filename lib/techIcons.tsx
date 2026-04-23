/**
 * Central map of technology name → icon component.
 * Uses react-icons/si for brand icons, lucide-react for generics.
 * Falls back to null — callers show a dot or nothing.
 */
import {
  SiPython, SiTypescript, SiJavascript, SiOpenjdk,
  SiReact, SiNextdotjs, SiAngular, SiTailwindcss,
  SiFastapi, SiExpress, SiNestjs, SiSpringboot, SiGraphql,
  SiDocker, SiKubernetes, SiTerraform, SiGithubactions, SiJenkins,
  SiPostgresql, SiMongodb, SiRedis, SiApachekafka,
  SiOpenai, SiLangchain, SiCelery, SiInfluxdb, SiGit,
  SiDotnet,
} from "react-icons/si";
import {
  Cloud, Database, Server, Brain, Layers,
  Cpu, Workflow, GitBranch,
} from "lucide-react";
import {
  createElement,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from "react";

// react-icons components accept className/style but type differs slightly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = ComponentType<any>;

export const techIconMap: Record<string, IconComponent> = {
  // ── Languages ──────────────────────────────────────────────
  "Python":             SiPython,
  "TypeScript":         SiTypescript,
  "JavaScript":         SiJavascript,
  "Java":               SiOpenjdk,
  "C#":                 SiDotnet,
  ".NET":               SiDotnet,
  "SQL":                Database,

  // ── Frontend ───────────────────────────────────────────────
  "React":              SiReact,
  "Next.js":            SiNextdotjs,
  "Angular":            SiAngular,
  "TailwindCSS":        SiTailwindcss,
  "Tailwind":           SiTailwindcss,
  "React Flow":         SiReact,
  "React Native":       SiReact,

  // ── Backend & APIs ─────────────────────────────────────────
  "FastAPI":            SiFastapi,
  "Express":            SiExpress,
  "Express.js":         SiExpress,
  "NestJS":             SiNestjs,
  "Spring Boot":        SiSpringboot,
  "GraphQL":            SiGraphql,
  "REST":               Server,
  "WebSocket":          Workflow,

  // ── Cloud & Infra ──────────────────────────────────────────
  "AWS":                Cloud,
  "AWS Lambda":         Cloud,
  "ECS Fargate":        Cloud,
  "DynamoDB":           Database,
  "RDS / Aurora":       Database,
  "S3 + CloudFront":    Cloud,
  "API Gateway":        Cloud,
  "Cognito":            Cloud,
  "AWS CDK":            Cloud,
  "Azure":              Cloud,
  "Docker":             SiDocker,
  "Kubernetes":         SiKubernetes,
  "Terraform":          SiTerraform,
  "GitHub Actions":     SiGithubactions,
  "Jenkins":            SiJenkins,
  "Git":                SiGit,

  // ── Data & Messaging ───────────────────────────────────────
  "PostgreSQL":         SiPostgresql,
  "MongoDB":            SiMongodb,
  "Redis":              SiRedis,
  "Kafka":              SiApachekafka,
  "Apache Kafka":       SiApachekafka,
  "SQS":                Cloud,
  "OpenSearch":         Database,
  "Celery":             SiCelery,
  "InfluxDB":           SiInfluxdb,
  "Vector DBs":         Database,
  "Vector Databases":   Database,

  // ── AI & GenAI ─────────────────────────────────────────────
  "OpenAI":             SiOpenai,
  "OpenAI (GPT-4)":     SiOpenai,
  "LangChain":          SiLangchain,
  "LangGraph":          SiLangchain,
  "LangSmith":          SiLangchain,
  "CrewAI":             Brain,
  "Anthropic":          Brain,
  "Anthropic Claude":   Brain,
  "AWS Bedrock":        Cloud,
  "RAG":                Layers,
  "RAG Systems":        Layers,
  "Embeddings":         Cpu,
  "Prompt Engineering": Brain,
  "Agentic Workflows":  Workflow,
  "Agentic AI":         Brain,
  "Fine-Tuning":        Cpu,

  // ── Misc ───────────────────────────────────────────────────
  "Observability":      GitBranch,
  "REST APIs":          Server,
};

/** Returns the icon component for a tech label, or null if none found */
export function getTechIcon(label: string): IconComponent | null {
  return techIconMap[label] ?? null;
}

interface TechIconRenderProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders the icon for a tech label as a ReactNode. Uses createElement to
 * avoid the "component created during render" lint rule triggered when a
 * capitalized const holds a dynamically-resolved component.
 */
export function renderTechIcon(
  label: string,
  props: TechIconRenderProps = {}
): ReactNode {
  const icon = techIconMap[label];
  if (!icon) return null;
  return createElement(icon, {
    size: props.size ?? 12,
    className: props.className,
    style: props.style,
    "aria-hidden": true,
  });
}
