import { ExternalLink, Check } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { TechChip } from "@/components/ui/TechChip";
import type { Project } from "@/lib/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group relative rounded-xl p-6 sm:p-8 ghost-border project-card-hover"
      style={{ backgroundColor: "var(--color-surface-container)" }}
    >
      {/* Top row: category label + links */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <p
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-primary-container)" }}
        >
          {project.categoryLabel}
        </p>

        {/* Links */}
        <div className="flex gap-3 shrink-0">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-primary-container"
              style={{ color: "var(--color-on-surface-variant)" }}
              aria-label={`${project.title} GitHub repository`}
            >
              <GithubIcon size={13} /> Source
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-primary-container"
              style={{ color: "var(--color-on-surface-variant)" }}
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-2xl sm:text-3xl font-bold mb-1 leading-tight"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
      >
        {project.title}
      </h3>

      {/* Tagline */}
      <p
        className="text-sm mb-4"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {project.tagline}
      </p>

      {/* Category badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.badges.map((badge) => (
          <span
            key={badge}
            className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded"
            style={{
              color: "var(--color-primary-container)",
              backgroundColor: "color-mix(in oklab, var(--color-primary-container) 8%, transparent)",
              border: "1px solid color-mix(in oklab, var(--color-primary-container) 20%, transparent)",
            }}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-5"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {project.description}
      </p>

      {/* Highlights / bullet points */}
      <ul className="space-y-2 mb-6">
        {project.highlights.map((hl, i) => (
          <li key={i} className="flex gap-3 items-start text-sm leading-relaxed">
            <Check
              size={13}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--color-primary-container)" }}
              aria-hidden="true"
            />
            <span style={{ color: "var(--color-on-surface-variant)" }}>{hl}</span>
          </li>
        ))}
      </ul>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
    </article>
  );
}
