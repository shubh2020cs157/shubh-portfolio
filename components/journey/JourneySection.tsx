import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInView } from "@/components/ui/FadeInView";
import { TimelineEntry } from "@/components/journey/TimelineEntry";
import { experience } from "@/lib/content/experience";

export function JourneySection() {
  return (
    <section
      id="experience"
      className="relative py-24 overflow-hidden section-divider"
      style={{ backgroundColor: "var(--color-surface-container)" }}
    >
      {/* Ambient blob — top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-125 h-125 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-secondary-container) 8%, transparent) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <FadeInView>
          <SectionHeader
            eyebrow="Experience"
            title="Professional Journey"
            accentWord="Journey"
            subtitle="Building at the intersection of full-stack engineering and agentic AI — focused on measurable impact, observability, and end-to-end ownership."
            className="mb-16"
          />
        </FadeInView>

        {/* Single-column timeline */}
        {experience.map((entry, i) => (
          <FadeInView key={entry.id} delay={i * 0.1}>
            <TimelineEntry entry={entry} isLast={i === experience.length - 1} />
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
