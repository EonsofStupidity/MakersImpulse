import { useRef } from "react";
import Hero from "@/components/sections/hero/Hero";
import Features from "@/components/sections/Features";
import FeaturedBuilds from "@/components/sections/FeaturedBuilds";
import CommunityHighlights from "@/components/sections/CommunityHighlights";
import CTASection from "@/components/sections/CTASection";
import PartsDatabase from "@/components/sections/PartsDatabase";
import { useSession } from "@supabase/auth-helpers-react";
import SectionWrapper from "@/components/sections/SectionWrapper";
import EventsSection from "@/components/sections/EventsSection";
import DatabaseCTA from "@/components/sections/DatabaseCTA";
import { GamificationUI } from "@/components/gamification/GamificationUI";
import { motion } from "framer-motion";
import PartCatalog from "@/components/sections/PartCatalog";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const session = useSession();

  // Common animations for sections
  const animations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.8, ease: "easeInOut" },
  };

  // Glow effect for hover interactions
  const glowEffect = {
    whileHover: {
      scale: 1.02,
      boxShadow: "0px 4px 15px rgba(110, 27, 255, 0.5)",
    },
  };

  // Consolidated Section Component
  const Section = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      {...animations}
      {...glowEffect}
      className="rounded-md"
    >
      <SectionWrapper>{children}</SectionWrapper>
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,27,255,0.1)_0%,rgba(26,31,44,0)_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
      </div>

      {/* Database Call to Action */}
      <motion.div {...animations} {...glowEffect} className="rounded-md">
        <DatabaseCTA />
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen snap-start snap-always rounded-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        {...glowEffect}
      >
        <Hero />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/0" />
      </motion.section>

      {/* Gamification Section */}
      {session && (
        <Section>
          <GamificationUI />
        </Section>
      )}

      {/* Parts Database Section with Purple Glow */}
      <Section>
        <motion.div
          className="rounded-md p-4 bg-card/50 backdrop-blur-md"
          {...glowEffect}
        >
          <PartsDatabase />
        </motion.div>
      </Section>

      {/* Part Catalog Section */}
      <Section>
        <PartCatalog />
      </Section>

      {/* Featured Builds Section */}
      <Section>
        <FeaturedBuilds
          scrollVelocity={0}
          scrollDirection="up"
          imageHoverEffect={{
            whileHover: {
              scale: 1.05,
              boxShadow: "0px 4px 20px rgba(110, 27, 255, 0.5)",
            },
          }}
        />
      </Section>

      {/* Community Highlights Section */}
      <Section>
        <CommunityHighlights />
      </Section>

      {/* Events Section */}
      <Section>
        <EventsSection />
      </Section>

      {/* Features Section */}
      <Section>
        <Features scrollVelocity={0} />
      </Section>

      {/* Call to Action Section for Non-Logged-In Users */}
      {!session && (
        <motion.div
          className="min-h-[50vh] relative bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-2xl"
          {...animations}
          {...glowEffect}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,27,255,0.15)_0%,rgba(26,31,44,0)_70%)] pointer-events-none" />
          <CTASection />
        </motion.div>
      )}
    </div>
  );
};

export default Index;