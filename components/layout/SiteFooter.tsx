import { Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { GradientButton } from "@/components/ui/GradientButton";
import { ViewsCounter } from "@/components/layout/ViewsCounter";
import { profile } from "@/lib/content/profile";

const badges = [
  "Full-Stack + GenAI Expert",
  "React · FastAPI · K8s",
  "Microsoft Contract SDE",
  "Production-proven systems",
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10">
      {/* ── Big CTA band ── */}
      <div
        className="relative overflow-hidden py-20 px-6 section-divider"
        style={{ backgroundColor: "var(--color-surface-container)" }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in oklab, var(--color-primary-container) 8%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span
              className="w-2 h-2 rounded-full animate-pulse-dot"
              style={{ backgroundColor: "var(--color-primary-container)" }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "var(--color-primary-container)" }}
            >
              Available for Opportunities
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-bold mb-4 text-glow"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.75rem)",
              color: "var(--color-on-surface)",
              lineHeight: 1.15,
            }}
          >
            Looking for a Full-Stack + GenAI engineer who ships?
          </h2>

          {/* Sub-copy */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            I build fast, ship clean, and own the outcome — from React frontends to agentic AI pipelines to cloud-native infra.
          </p>

          {/* Badge pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {badges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--color-primary-container) 8%, var(--color-surface-high))",
                  border: "1px solid color-mix(in oklab, var(--color-primary-container) 20%, transparent)",
                  color: "var(--color-primary)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA */}
          <GradientButton
            href={`mailto:${profile.email}`}
            size="lg"
          >
            Hire Me <ArrowRight size={16} />
          </GradientButton>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="py-5 px-6"
        style={{
          backgroundColor: "var(--color-surface-lowest)",
          borderTop: "1px solid color-mix(in oklab, var(--color-outline-variant) 20%, transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <p
            className="font-bold text-base"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
          >
            Shubh<span style={{ color: "var(--color-primary-container)" }}>.</span>
          </p>

          {/* Copyright + views */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4">
            <p className="text-sm" style={{ color: "var(--color-outline)" }}>
              © {year} Shubh Kamal Sharma · Bengaluru, India
            </p>
            <ViewsCounter />
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { href: profile.socials.github, Icon: GithubIcon, label: "GitHub" },
              { href: profile.socials.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="hover:text-primary-container transition-colors"
                style={{ color: "var(--color-outline)" }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
