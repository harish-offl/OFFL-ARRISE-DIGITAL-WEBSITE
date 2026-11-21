import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { clientProjects, collaborations } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Selected Work & Client Projects | Arrise Digital",
  description:
    "Explore Arrise Digital's website development, video production, social media management, content creation, and creative collaboration projects.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Our Work / Selected Projects"
        title="Work That Moves Businesses Forward."
        description="Explore the businesses we&apos;ve worked with, the digital experiences we&apos;ve created, and the creative collaborations that bring ideas to life."
        meta={[
          { label: "Client Projects", value: String(clientProjects.length) },
          { label: "Creative Collaborations", value: String(collaborations.length) },
          { label: "Disciplines", value: "6 categories" },
          { label: "Approach", value: "Creative + technical" },
        ]}
        breadcrumb="Work"
      />

      <PortfolioShowcase />
    </>
  );
}
