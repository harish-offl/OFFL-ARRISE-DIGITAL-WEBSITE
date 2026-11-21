import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { TeamNav } from "@/components/sections/team-nav";
import { TeamProfiles } from "@/components/sections/team-profiles";
import { FinalCta } from "@/components/sections/final-cta";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the people behind Arrise Digital — four minds, one vision, building meaningful digital experiences together.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        label="Our team"
        title="Meet the People Behind Arrise."
        description="Four minds. One vision. Building meaningful digital experiences together."
        meta={[
          { label: "Team", value: `${team.length} partners` },
          { label: "Structure", value: "Senior-led" },
          { label: "Working", value: "Remote-first" },
          { label: "Focus", value: "Business growth" },
        ]}
        breadcrumb="Team"
      />

      <TeamNav members={team} />
      <TeamProfiles />
      <FinalCta />
    </>
  );
}
