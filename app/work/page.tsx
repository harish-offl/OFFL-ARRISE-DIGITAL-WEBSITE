import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { WorkGrid } from "@/components/sections/work-grid";
import { Reveal } from "@/components/ui/reveal";
import { projectCategories } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Arrise Digital — branding, social media, video production, websites and automation for growing businesses.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Selected work"
        title="Good Ideas Deserve Great Execution."
        description="Explore how we transform business challenges into creative digital solutions. Every project here started with a real brief, not a template."
        meta={[
          { label: "Projects", value: "Six selected" },
          { label: "Categories", value: projectCategories.length - 1 + " disciplines" },
          { label: "Focus", value: "Business outcomes" },
          { label: "Approach", value: "Creative + technical" },
        ]}
        breadcrumb="Work"
      />

      <section className="py-section">
        <div className="shell">
          <Reveal>
            <WorkGrid />
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
