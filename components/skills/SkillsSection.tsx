import { GraduationCap, Award } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInView } from "@/components/ui/FadeInView";
import { education, certifications } from "@/lib/content/education";
import { skillCategories } from "@/lib/content/skills";
import { renderTechIcon } from "@/lib/techIcons";

function SkillChip({ label }: { label: string }) {
  const icon = renderTechIcon(label, {
    size: 11,
    style: { color: "var(--color-primary-container)", flexShrink: 0 },
  });
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ghost-border-soft transition-colors duration-200 hover:ghost-border">
      {icon ?? (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: "var(--color-primary-container)" }}
        />
      )}
      <span style={{ color: "var(--color-on-surface-variant)" }}>{label}</span>
    </span>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden section-divider"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-125 h-125 rounded-full"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--color-primary-container) 5%, transparent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInView>
          <SectionHeader
            eyebrow="Skills"
            title="Technical toolkit"
            accentWord="toolkit"
            subtitle="Tools and technologies I've shipped in production across full-stack, GenAI, and cloud-native systems."
            className="mb-10"
          />
        </FadeInView>

        {/* Skill categories grid */}
        <FadeInView delay={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {skillCategories.map((category) => (
              <GlassPanel key={category.id} className="p-5">
                <h3
                  className="text-[10px] font-semibold tracking-widest uppercase mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-primary-container)",
                  }}
                >
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillChip key={skill} label={skill} />
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>
        </FadeInView>

        {/* Education + Certifications row */}
        <FadeInView delay={0.12}>
          <div className="grid sm:grid-cols-2 gap-5">
            <GlassPanel className="p-5 flex gap-4 items-start">
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "color-mix(in oklab, var(--color-primary-container) 10%, transparent)" }}
              >
                <GraduationCap size={18} style={{ color: "var(--color-primary-container)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "var(--color-primary-container)" }}
                >
                  Education
                </p>
                <p
                  className="text-sm font-semibold mb-0.5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
                >
                  {education.degree}
                </p>
                <p className="text-xs" style={{ color: "var(--color-primary)" }}>
                  {education.institution}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-outline)" }}>
                  {education.location} · {education.graduationMonth} {education.graduationYear}
                </p>
              </div>
            </GlassPanel>

            <GlassPanel className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "color-mix(in oklab, var(--color-primary-container) 10%, transparent)" }}
                >
                  <Award size={18} style={{ color: "var(--color-primary-container)" }} />
                </div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--color-primary-container)" }}
                >
                  Certifications
                </p>
              </div>
              <ul className="space-y-2.5">
                {certifications.map((cert) => (
                  <li key={cert.title} className="flex gap-2 items-start">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--color-primary-container)" }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs leading-tight" style={{ color: "var(--color-on-surface)" }}>
                        {cert.title}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--color-outline)" }}>
                        {cert.issuer}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
