import { Brain, Layers, Cloud, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInView } from "@/components/ui/FadeInView";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TechMarquee } from "@/components/hero/TechMarquee";
import { profile } from "@/lib/content/profile";

const capabilities = [
  {
    icon: Brain,
    title: "AI & Agents",
    desc: "LangChain, LangGraph, RAG pipelines, multi-agent orchestration with HITL checkpoints.",
  },
  {
    icon: Layers,
    title: "Full Stack",
    desc: "React, Next.js, FastAPI, NestJS, Spring Boot — end-to-end product delivery.",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    desc: "AWS, Azure, Docker, Kubernetes, Terraform — production-grade infra at scale.",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Kafka event-driven pipelines, Redis caching, and async job queues — built for throughput and low latency.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden section-divider"
      style={{ backgroundColor: "var(--color-surface-container)" }}
    >
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-125 h-125 rounded-full"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--color-primary-container) 5%, transparent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInView>
          <SectionHeader
            eyebrow="About"
            title="Engineering at the intersection of AI & Scale"
            accentWord="AI & Scale"
            subtitle={profile.about}
            className="mb-12"
          />
        </FadeInView>

        {/* Bio paragraphs */}
        <FadeInView delay={0.05}>
          <div className="max-w-3xl mb-12 space-y-4">
            {profile.aboutBio.map((para, i) => (
              <p
                key={i}
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {para}
              </p>
            ))}
          </div>
        </FadeInView>

        {/* 4-card capability grid */}
        <FadeInView delay={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <GlassPanel key={title} className="p-5 flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "color-mix(in oklab, var(--color-primary-container) 12%, transparent)" }}
                >
                  <Icon size={18} style={{ color: "var(--color-primary-container)" }} />
                </div>
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
                >
                  {title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {desc}
                </p>
              </GlassPanel>
            ))}
          </div>
        </FadeInView>

        {/* Tech marquee */}
        <FadeInView delay={0.12}>
          <TechMarquee />
        </FadeInView>
      </div>
    </section>
  );
}
