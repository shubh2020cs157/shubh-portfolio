import { renderTechIcon } from "@/lib/techIcons";

const techs = [
  "Python", "FastAPI", "Next.js", "React", "TypeScript",
  "LangChain", "LangGraph", "OpenAI", "AWS", "Kafka",
  "Redis", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
  "Spring Boot", "NestJS", "GraphQL", "Terraform", "Azure",
  "GitHub Actions", "NestJS", "TailwindCSS",
];

export function TechMarquee() {
  const doubled = [...techs, ...techs];

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      style={{
        borderTop: "1px solid color-mix(in oklab, var(--color-outline-variant) 20%, transparent)",
        borderBottom: "1px solid color-mix(in oklab, var(--color-outline-variant) 20%, transparent)",
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.12em] uppercase ghost-border-soft shrink-0"
            style={{
              color: "var(--color-on-surface-variant)",
              backgroundColor: "color-mix(in oklab, var(--color-surface-high) 50%, transparent)",
            }}
          >
            {renderTechIcon(tech, {
              size: 12,
              style: { flexShrink: 0, color: "var(--color-primary-container)" },
            })}
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
