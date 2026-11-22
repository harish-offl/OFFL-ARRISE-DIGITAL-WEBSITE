export type ProjectCategory =
  | "Branding"
  | "Social Media"
  | "Video Production"
  | "Websites"
  | "Automation";

export type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  categories: ProjectCategory[];
  services: string[];
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  liveUrl?: string;
  featured?: boolean;
  monogram: string;
  palette: { base: string; tint: string; accent: string; ink: string };
  gallery: { label: string; caption: string }[];
};

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Branding",
  "Social Media",
  "Video Production",
  "Websites",
  "Automation",
];

export const projects: Project[] = [
  {
    slug: "bangles-by-beauty",
    title: "Bangles by Beauty",
    client: "Bangles by Beauty",
    industry: "Fashion & Jewellery",
    categories: ["Branding", "Social Media", "Video Production"],
    services: ["Brand identity direction", "Social media content", "Short-form video"],
    tagline: "A jewellery brand with a point of view.",
    overview:
      "Bangles by Beauty is a jewellery label built around craftsmanship and personal style. The brand needed a digital presence that felt as considered as the pieces themselves.",
    challenge:
      "Jewellery is a crowded, visually repetitive category. The brand had strong products but no consistent visual language to separate it from generic catalogue-style content.",
    solution:
      "We developed a warmer, editorial visual direction built around detail, texture and styling. Social content and short-form video were planned as a single system so the brand felt recognisable across every touchpoint.",
    outcome:
      "The brand now presents a cohesive identity across its channels, with content structured around product storytelling rather than one-off posts.",
    featured: true,
    monogram: "BB",
    palette: { base: "#E9DFD1", tint: "#F6EFE5", accent: "#B08954", ink: "#2A2118" },
    gallery: [
      { label: "Identity", caption: "A warm, editorial palette built around craft and detail." },
      { label: "Social", caption: "Product storytelling shaped for a consistent feed." },
      { label: "Motion", caption: "Short-form video treatments for detail and styling." },
    ],
  },
  {
    slug: "le-brew",
    title: "Le Brew",
    client: "Le Brew",
    industry: "Café & Beverage",
    categories: ["Branding", "Social Media", "Websites"],
    services: ["Brand direction", "Social media content", "Website design & build"],
    tagline: "A café experience translated online.",
    overview:
      "Le Brew is a café brand with a strong in-person atmosphere. The challenge was to carry that same warmth and personality into a digital experience.",
    challenge:
      "Most café websites stop at an address and a menu. The brand needed a digital presence that communicated atmosphere and made the next step — visiting or enquiring — effortless.",
    solution:
      "We shaped a digital direction around the café's character: confident typography, rich imagery and a straightforward content structure. The website and social content were designed to feel like the same place.",
    outcome:
      "A clearer digital identity with a website that gives the café a credible home online and social content that reinforces it.",
    featured: true,
    monogram: "LB",
    palette: { base: "#2E2118", tint: "#4A3728", accent: "#D8A45B", ink: "#F8F1E7" },
    gallery: [
      { label: "Web", caption: "A responsive site designed around atmosphere and action." },
      { label: "Identity", caption: "Type, tone and colour drawn from the café experience." },
      { label: "Social", caption: "Content that keeps the brand present between visits." },
    ],
  },
  {
    slug: "abs-utility-solutions",
    title: "ABS Utility Solutions",
    client: "ABS Utility Solutions",
    industry: "Professional Services",
    categories: ["Websites", "Automation"],
    services: ["Business website", "Enquiry workflow", "Technical integration"],
    tagline: "A service business built for enquiries.",
    overview:
      "ABS Utility Solutions provides technical utility services to homes and businesses. The brand needed a clear, trustworthy web presence that could handle enquiries properly.",
    challenge:
      "Service businesses often lose enquiries in scattered messages and manual follow-up. The site had to explain the offer quickly and route interest to the right place.",
    solution:
      "We structured the website around the services people actually search for, with clear calls to action and a simple enquiry flow. The workflow was designed to keep requests organised instead of lost across inboxes.",
    outcome:
      "A more credible online presence and a cleaner path from visitor interest to a handled enquiry.",
    monogram: "AB",
    palette: { base: "#132A3A", tint: "#1D3E52", accent: "#6FD3C7", ink: "#EDF6F7" },
    gallery: [
      { label: "Web", caption: "A service-led structure built around clear next steps." },
      { label: "Flow", caption: "Enquiry handling designed to reduce manual follow-up." },
      { label: "Trust", caption: "Credibility cues placed where decisions happen." },
    ],
  },
  {
    slug: "bon-appetit",
    title: "Bon Appétit",
    client: "Bon Appétit",
    industry: "Restaurant & Food",
    categories: ["Social Media", "Video Production"],
    services: ["Social media content", "Short-form video", "Campaign creative"],
    tagline: "Food content that earns attention.",
    overview:
      "Bon Appétit is a food brand that lives on appetite and atmosphere. Its digital presence needed to make people hungry — quickly.",
    challenge:
      "Food content is everywhere. Standing out requires more than clean photography; it needs rhythm, personality and a reason to keep watching.",
    solution:
      "We built a short-form video approach focused on texture, sound and pacing, supported by a consistent social template system that keeps the feed recognisable.",
    outcome:
      "A more distinctive content presence with video built into the regular cadence rather than treated as an occasional campaign.",
    featured: true,
    monogram: "BA",
    palette: { base: "#3A1512", tint: "#5A211B", accent: "#F0B45A", ink: "#FFF3E6" },
    gallery: [
      { label: "Video", caption: "Short-form edits built around texture and appetite." },
      { label: "Social", caption: "A repeatable template system with room for personality." },
      { label: "Campaign", caption: "Seasonal creative that stays within the brand world." },
    ],
  },
  {
    slug: "smp-food-products",
    title: "SMP Food Products",
    client: "SMP Food Products",
    industry: "Food & FMCG",
    categories: ["Branding", "Social Media"],
    services: ["Brand communication", "Social media content", "Product creative"],
    tagline: "A food producer with a clearer shelf presence.",
    overview:
      "SMP Food Products produces everyday food items for a broad audience. The brand needed communication that felt consistent and trustworthy across retail and digital.",
    challenge:
      "Product-led brands often struggle to build recognition beyond the pack. Digital content can feel disconnected from what customers see in store.",
    solution:
      "We aligned social and product creative around one visual system, with clear messaging and content formats that could scale across product lines without redesigning from scratch.",
    outcome:
      "A more consistent brand presence that connects product communication with everyday social content.",
    monogram: "SM",
    palette: { base: "#F2E7C9", tint: "#FBF4E3", accent: "#C05A2C", ink: "#2A1E10" },
    gallery: [
      { label: "Identity", caption: "A product-led visual system with room to scale." },
      { label: "Social", caption: "Everyday content that stays on-brand." },
      { label: "Pack", caption: "Digital and physical communication aligned." },
    ],
  },
  {
    slug: "urs-choice-madurai",
    title: "URS Choice Madurai",
    client: "URS Choice Madurai",
    industry: "Real Estate",
    categories: ["Branding", "Websites"],
    services: ["Brand identity direction", "Website design & build"],
    tagline: "A real estate presence built for trust.",
    overview:
      "URS Choice Madurai is a real estate brand that needed a credible digital presence to showcase properties and earn buyer confidence in a competitive market.",
    challenge:
      "Real estate buyers research extensively before enquiring. The brand had no structured online presence to list projects, share details, or route serious enquiries.",
    solution:
      "We built a clean, property-focused website with clear project listings, property detail pages, and a straightforward enquiry flow that directs interest to the right team.",
    outcome:
      "A professional online presence that presents projects clearly and gives buyers a trusted path from browsing to enquiring.",
    featured: false,
    monogram: "UC",
    palette: { base: "#132A3A", tint: "#1D3E52", accent: "#B08954", ink: "#FFFFFF" },
    gallery: [
      { label: "Identity", caption: "A trustworthy real estate brand direction." },
      { label: "Web", caption: "A property-focused website with clear enquiry paths." },
    ],
  },
  {
    slug: "dhiya-garments",
    title: "Dhiya Garments",
    client: "Dhiya Garments",
    industry: "Fashion & Apparel",
    categories: ["Social Media", "Video Production", "Websites"],
    services: ["Social media content", "Video production", "Website design"],
    tagline: "Fashion storytelling with a steady rhythm.",
    overview:
      "Dhiya Garments works across apparel and fashion. The brand needed a digital presence that could showcase products without losing personality.",
    challenge:
      "Apparel brands need volume and consistency, but a high posting cadence can quickly erode visual quality and brand recognition.",
    solution:
      "We created a content framework that supports frequent output while protecting a consistent look — reusable layouts, planned video formats and a clear product hierarchy.",
    outcome:
      "A more sustainable content rhythm with a digital presence that looks deliberate rather than reactive.",
    monogram: "DG",
    palette: { base: "#DCD9E8", tint: "#EFEDF6", accent: "#6B5BD6", ink: "#201C33" },
    gallery: [
      { label: "Social", caption: "Reusable layouts that keep output consistent." },
      { label: "Video", caption: "Product motion designed for short-form platforms." },
      { label: "Web", caption: "A product-first website structure." },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const featuredProjects = projects.filter((project) => project.featured);
