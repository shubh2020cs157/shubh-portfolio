import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { ContactSection } from "@/components/contact/ContactSection";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <JourneySection />
        <SkillsSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
