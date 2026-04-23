"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { GradientButton } from "@/components/ui/GradientButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

function ProfileAvatar() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background:
            "color-mix(in oklab, var(--color-primary-container) 15%, var(--color-surface-high))",
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--color-primary-container)",
        }}
      >
        SK
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/profile.jpg"
      alt="Shubh Kamal Sharma"
      className="w-full h-full object-cover"
      onError={() => setImgError(true)}
    />
  );
}

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg-lg"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 right-0 w-125 h-125 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-primary-container) 8%, transparent) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -bottom-48 -left-24 w-125 h-125 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-secondary-container) 8%, transparent) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Centered content */}
      <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto px-6">
        {/* Profile photo */}
        <div
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-full mb-8 overflow-hidden cyan-glow animate-fade-up"
          style={{
            border: "3px solid var(--color-primary-container)",
            animationDelay: "0ms",
          }}
        >
          <ProfileAvatar />
        </div>

        {/* Role mono label */}
        <p
          className="font-mono text-xs tracking-[0.3em] uppercase mb-5 animate-fade-up"
          style={{
            color: "var(--color-primary-container)",
            animationDelay: "60ms",
          }}
        >
          Full-Stack SDE &amp; GenAI Engineer
        </p>

        {/* Main heading */}
        <h1
          className="font-bold leading-tight mb-5 animate-fade-up sm:whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 5vw, 4rem)",
            color: "var(--color-on-surface)",
            animationDelay: "120ms",
          }}
        >
          Hi, I&apos;m{" "}
          <span style={{ color: "var(--color-primary-container)" }}>
            {profile.name}
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg leading-relaxed mb-5 animate-fade-up"
          style={{
            color: "var(--color-on-surface-variant)",
            animationDelay: "180ms",
          }}
        >
          {profile.heroSubtitle}
        </p>

        {/* Company line */}
        <p
          className="text-sm font-medium mb-8 animate-fade-up"
          style={{
            color: "var(--color-on-surface-variant)",
            animationDelay: "220ms",
          }}
        >
          Currently at{" "}
          <span
            style={{ color: "var(--color-primary-container)", fontWeight: 600 }}
          >
            Microsoft
          </span>{" "}
          | Previously at{" "}
          <span style={{ color: "var(--color-on-surface)", fontWeight: 500 }}>
            Prodevans
          </span>
          {" "}&amp;{" "}
          <span style={{ color: "var(--color-on-surface)", fontWeight: 500 }}>
            ModelX AI
          </span>
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center mb-8 animate-fade-up"
          style={{ animationDelay: "280ms" }}
        >
          <GradientButton onClick={scrollToProjects} size="lg">
            View Projects
          </GradientButton>
          <GhostButton onClick={scrollToContact} size="lg">
            Get in Touch
          </GhostButton>
        </div>

        {/* Social icons */}
        <div
          className="flex gap-4 justify-center animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          {[
            { href: profile.socials.github, Icon: GithubIcon, label: "GitHub" },
            {
              href: profile.socials.linkedin,
              Icon: LinkedinIcon,
              label: "LinkedIn",
            },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center ghost-border transition-all duration-200 hover:border-[color-mix(in_oklab,var(--color-primary-container)_40%,transparent)] hover:text-primary-container"
              style={{
                color: "var(--color-on-surface-variant)",
                backgroundColor:
                  "color-mix(in oklab, var(--color-surface-high) 60%, transparent)",
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Scroll indicator — arrow only */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <ArrowDown
            size={18}
            className="animate-bounce"
            style={{ color: "var(--color-outline)" }}
          />
        </div>
      </div>
    </section>
  );
}
