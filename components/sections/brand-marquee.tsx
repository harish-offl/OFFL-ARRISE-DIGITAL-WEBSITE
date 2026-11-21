import { Marquee } from "@/components/ui/marquee";

const rowOne = [
  "Strategy",
  "Creativity",
  "Digital Growth",
  "Technology",
  "Content",
  "Innovation",
  "Brand Building",
];

const rowTwo = ["Social", "Video", "Web", "Automation", "Design", "Storytelling", "Performance"];

export function BrandMarquee() {
  return (
    <section aria-label="What we bring together" className="pt-6 md:pt-10">
      <Marquee items={rowOne} speed="normal" />
      <Marquee items={rowTwo} reverse dark speed="slow" />
    </section>
  );
}
