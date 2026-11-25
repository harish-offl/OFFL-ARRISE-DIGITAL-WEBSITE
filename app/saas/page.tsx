import type { Metadata } from "next";
import { SaasShowcase } from "@/components/saas/saas-showcase";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Our SaaS Products",
  description: "Discover upcoming software products by Arrise Digital, including email automation, creative canvas, task management, AI mock interviews, LMS and QR generation tools.",
  alternates: { canonical: "/saas" },
  openGraph: { title: "Our SaaS Products | Arrise Digital", description: "Discover the software ecosystem Arrise Digital is building.", url: "https://arrisedigital.vercel.app/saas" },
};

export default function SaasPage() {
  return (
    <>
      <PageHero
        label="Arrise Digital / Product Development"
        title="We Build What Comes Next."
        description="Our products are shaped from real workflow problems. We are designing practical, scalable software that simplifies everyday work and creates new possibilities."
        meta={[
          { label: "Products", value: "Six in development" },
          { label: "Focus", value: "Useful software" },
          { label: "Approach", value: "Problem-led" },
          { label: "Status", value: "Building" },
        ]}
        breadcrumb="Our SaaS"
      />
      <SaasShowcase />
      <FinalCta />
    </>
  );
}
