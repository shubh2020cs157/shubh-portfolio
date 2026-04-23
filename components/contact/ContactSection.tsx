import { Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInView } from "@/components/ui/FadeInView";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/lib/content/profile";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "var(--color-primary-container)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone}`,
    color: "var(--color-tertiary)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: undefined,
    color: "var(--color-secondary)",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/shubh23",
    href: profile.socials.linkedin,
    color: "var(--color-primary)",
  },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden section-divider"
      style={{ backgroundColor: "var(--color-surface-container)" }}
    >
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <FadeInView>
          <SectionHeader
            eyebrow="Contact"
            title="Let's connect"
            accentWord="connect"
            subtitle="Have a project in mind, want to collaborate, or just want to say hi? I'd love to hear from you."
            align="center"
            className="mb-12"
          />
        </FadeInView>

        {/* 2x2 Contact Cards Grid */}
        <FadeInView delay={0.07}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {contactCards.map(({ icon: Icon, label, value, href, color }) => {
              const inner = (
                <GlassPanel className="ghost-border flex flex-col items-center gap-3 p-5 text-center transition-all duration-200 hover:scale-[1.03] hover:shadow-lg h-full">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `color-mix(in oklab, ${color} 15%, transparent)` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </span>
                  <p
                    className="text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: "var(--color-outline)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-semibold leading-snug break-all"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {value}
                  </p>
                </GlassPanel>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </div>
        </FadeInView>

        {/* Social Icons Row */}
        <FadeInView delay={0.12}>
          <div className="flex justify-center gap-4 mb-10">
            {[
              { href: profile.socials.github, Icon: GithubIcon, label: "GitHub" },
              { href: profile.socials.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl flex items-center justify-center ghost-border glass transition-all duration-200 hover:scale-110 hover:border-[color-mix(in_oklab,var(--color-primary-container)_30%,transparent)]"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </FadeInView>

        {/* Contact Form Card */}
        <FadeInView delay={0.16}>
          <div
            className="rounded-2xl p-8 mb-8"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid color-mix(in oklab, var(--color-outline-variant) 20%, transparent)",
            }}
          >
            <h3
              className="text-lg font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
            >
              Send a Message
            </h3>
            <ContactForm />
          </div>
        </FadeInView>

        {/* Availability Badge */}
        <FadeInView delay={0.2}>
          <div className="flex justify-center">
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
              style={{
                backgroundColor: "color-mix(in oklab, var(--color-surface) 80%, transparent)",
                border: "1px solid color-mix(in oklab, var(--color-outline-variant) 20%, transparent)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                style={{ backgroundColor: "#4ade80" }}
                aria-hidden="true"
              />
              <p className="text-sm font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                Currently open to new opportunities
              </p>
            </div>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
