export const industries = [
  {
    title: "Restaurants & Cafés",
    description: "Atmosphere, menus and content that make people want to visit.",
    glyph: "R",
  },
  {
    title: "Fashion & Lifestyle",
    description: "Product storytelling and visual systems built for consistency.",
    glyph: "F",
  },
  {
    title: "Retail & E-commerce",
    description: "Storefronts and journeys designed around the next purchase.",
    glyph: "E",
  },
  {
    title: "Education",
    description: "Clear communication that builds trust with students and parents.",
    glyph: "Ed",
  },
  {
    title: "Professional Services",
    description: "Credibility-first websites that turn expertise into enquiries.",
    glyph: "P",
  },
  {
    title: "Startups",
    description: "Fast, focused digital foundations that can grow with you.",
    glyph: "S",
  },
  {
    title: "Local Businesses",
    description: "Visibility where your customers actually are.",
    glyph: "L",
  },
  {
    title: "Personal Brands",
    description: "A distinct voice and presence that feels genuinely yours.",
    glyph: "B",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your brand, audience, goals and constraints. The questions come before the ideas.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "We build the right creative and digital roadmap, with clear priorities and a realistic scope.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Identity, content, design and digital solutions are designed, developed and executed.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "We launch, measure, optimize and scale — staying close to what actually moves the business.",
  },
];

export const whyArrise = [
  {
    number: "01",
    title: "Growth-Focused Execution",
    description:
      "Every strategy, design and digital solution is developed with a clear business objective — not just a deliverable to tick off.",
  },
  {
    number: "02",
    title: "Creative + Technology",
    description:
      "We combine creative thinking with modern technology to deliver complete digital experiences, not disconnected pieces.",
  },
  {
    number: "03",
    title: "AI-Powered Efficiency",
    description:
      "We identify opportunities to simplify workflows, improve communication and automate repetitive business tasks.",
  },
  {
    number: "04",
    title: "Transparent Collaboration",
    description:
      "Clear communication, measurable objectives and honest project reporting. No vanity metrics, no surprises.",
  },
];

export type Stat =
  | { value: number; suffix?: string; label: string; display?: never }
  | { display: string; label: string; value?: never; suffix?: never };

export const stats: Stat[] = [
  { value: 15, suffix: "M+", label: "Video views generated" },
  { value: 6, suffix: "+", label: "Brands partnered with" },
  { value: 4, suffix: "", label: "Core service categories" },
  { display: "3h → 20m", label: "Daily follow-up time in a demonstrated workflow" },
];
