import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { Intro } from "@/components/sections/intro";
import { Stats } from "@/components/sections/stats";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { WhyArrise } from "@/components/sections/why-arrise";
import { WorkPreview } from "@/components/sections/work-preview";
import { Process } from "@/components/sections/process";
import { Industries } from "@/components/sections/industries";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { homeFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Arrise Digital — Partners in Progress. We Build Businesses.",
  description:
    "Premium digital marketing, content creation and tech solutions that transform brands into market leaders. Arrise Digital is a creative digital growth studio.",
  alternates: { canonical: "/" },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", "text": item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Intro />
      <Stats />
      <ServicesShowcase />
      <WhyArrise />
      <WorkPreview />
      <Process />
      <Industries />
      <Testimonials />
      <Faq />
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}
