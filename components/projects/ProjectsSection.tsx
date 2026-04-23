"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInView } from "@/components/ui/FadeInView";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, archiveStats } from "@/lib/content/projects";
import { profile } from "@/lib/content/profile";

type Tab = "ai" | "fullstack";

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("ai");

  const aiCount = projects.filter((p) => p.category === "ai").length;
  const fsCount = projects.filter((p) => p.category === "fullstack").length;

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "ai", label: "AI-Powered Products", count: aiCount },
    { id: "fullstack", label: "Enterprise & Full Stack", count: fsCount },
  ];

  const filtered = projects.filter((p) => p.category === activeTab);

  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden section-divider"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--color-primary-container) 6%, transparent) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--color-secondary-container) 5%, transparent) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        <FadeInView>
          <SectionHeader
            eyebrow="Projects"
            title="What I've been building"
            accentWord="building"
            subtitle="Production-grade systems at the intersection of full-stack engineering and agentic AI."
            className="mb-10"
          />
        </FadeInView>

        {/* Tab bar */}
        <FadeInView delay={0.05}>
          <div
            className="inline-flex flex-wrap gap-1 mb-4 p-1 rounded-xl"
            style={{ backgroundColor: "var(--color-surface-container)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    activeTab === tab.id ? "var(--color-surface-high)" : "transparent",
                  color:
                    activeTab === tab.id
                      ? "var(--color-primary-container)"
                      : "var(--color-on-surface-variant)",
                  boxShadow:
                    activeTab === tab.id
                      ? "0 0 12px color-mix(in oklab, var(--color-primary-container) 12%, transparent)"
                      : "none",
                }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className="ml-1.5 font-mono text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor:
                        activeTab === tab.id
                          ? "color-mix(in oklab, var(--color-primary-container) 15%, transparent)"
                          : "color-mix(in oklab, var(--color-outline-variant) 20%, transparent)",
                      color:
                        activeTab === tab.id
                          ? "var(--color-primary-container)"
                          : "var(--color-outline)",
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </FadeInView>

        {/* Tab description */}
        <FadeInView delay={0.07}>
          <p className="text-sm mb-8" style={{ color: "var(--color-outline)" }}>
            {activeTab === "ai" && "AI-powered products — multi-agent pipelines, agentic orchestration, LLM integrations."}
            {activeTab === "fullstack" && "Enterprise full-stack systems — auth gateways, analytics dashboards, and production APIs."}
          </p>
        </FadeInView>

        {/* Projects — one full-width row per project */}
        <div className="flex flex-col gap-5 mb-10">
          {filtered.map((project, i) => (
            <FadeInView key={project.id} delay={i * 0.07}>
              <ProjectCard project={project} />
            </FadeInView>
          ))}
        </div>

        {/* Archive banner */}
        <FadeInView delay={0.15}>
          <div
            className="rounded-xl p-6 sm:p-8 grid-bg ghost-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ backgroundColor: "var(--color-surface-container)" }}
          >
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: "var(--color-primary-container)" }}
              >
                Open Source &amp; More
              </p>
              <h3
                className="text-xl font-bold mb-1"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
              >
                More on GitHub
              </h3>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                Microservices, AI tools, and side projects across the full stack.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 shrink-0">
              {archiveStats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-2xl font-bold font-mono"
                    style={{ color: "var(--color-primary-container)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs uppercase tracking-wider mt-0.5"
                    style={{ color: "var(--color-outline)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary-container"
              style={{ color: "var(--color-primary)" }}
            >
              View GitHub <ArrowRight size={14} />
            </a>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
