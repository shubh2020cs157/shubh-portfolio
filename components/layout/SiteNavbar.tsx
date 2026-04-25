"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, FileText, Sun, Moon } from "lucide-react";
import { ViewsCounter } from "@/components/layout/ViewsCounter";
import { cn } from "@/lib/utils/cn";
import { GradientButton } from "@/components/ui/GradientButton";
import { useTheme } from "@/components/providers/ThemeProvider";

const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function SiteNavbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [active, setActive] = useState("");
  const activeRef = useRef("__init__"); // sentinel ensures first updateActive always runs
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const NAVBAR_HEIGHT = 80;

    const updateActive = () => {
      setScrolled(window.scrollY > 20);

      // Find which section's top is closest to (but not past) navbar bottom
      const trigger = NAVBAR_HEIGHT + 40; // px from top of viewport
      let current = "";
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= trigger) current = id;
      }

      if (activeRef.current !== current) {
        activeRef.current = current;
        setActive(current);
        // Update URL hash without adding history entry
        window.history.replaceState(
          null,
          "",
          current ? `#${current}` : window.location.pathname
        );
      }
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass-light py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "py-5 bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); window.history.replaceState(null, "", window.location.pathname); setMenuOpen(false); }}
            className="font-bold text-lg tracking-tight transition-colors hover:text-primary-container focus-visible:outline-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
            aria-label="Shubh Kamal Sharma — go to top"
          >
            Shubh<span style={{ color: "var(--color-primary-container)" }}>.</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-primary-container",
                    active === id
                      ? "text-primary-container bg-[color-mix(in_oklab,var(--color-primary-container)_8%,transparent)]"
                      : "text-on-surface-variant"
                  )}
                  aria-current={active === id ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right: Resume + Theme toggle + Hire Me */}
          <div className="hidden lg:flex items-center gap-3">
            <ViewsCounter />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-primary-container ghost-border"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <FileText size={14} />
              Resume
            </a>
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              className="p-2 rounded-md ghost-border transition-all duration-200 hover:text-primary-container"
              style={{ color: "var(--color-on-surface-variant)" }}
              aria-label={`Switch to ${mounted && theme === "light" ? "dark" : "light"} mode`}
            >
              {mounted && theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <GradientButton onClick={() => scrollToSection("contact")} size="sm">
              Hire Me
            </GradientButton>
          </div>

          {/* Mobile right: theme + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              className="p-2 rounded-md ghost-border transition-all duration-200"
              style={{ color: "var(--color-on-surface-variant)" }}
              aria-label={`Switch to ${mounted && theme === "light" ? "dark" : "light"} mode`}
            >
              {mounted && theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          <button
            className="p-2 rounded-md ghost-border glass transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <ul className="flex flex-col items-center gap-6" role="list">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={cn(
                    "text-2xl font-bold transition-colors",
                    active === id ? "text-primary-container text-glow" : "text-on-surface"
                  )}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg font-medium transition-colors"
                style={{ color: "var(--color-on-surface-variant)" }}
                onClick={() => setMenuOpen(false)}
              >
                <FileText size={18} />
                Resume
              </a>
            </li>
          </ul>
          <GradientButton
            onClick={() => { scrollToSection("contact"); setMenuOpen(false); }}
            size="lg"
          >
            Hire Me
          </GradientButton>
        </div>
      )}
    </>
  );
}
