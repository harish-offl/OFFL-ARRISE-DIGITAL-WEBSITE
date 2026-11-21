export type PortfolioProjectType =
  | "Website Development"
  | "Video Production"
  | "Social Media Management"
  | "Content Creation"
  | "Collaboration";

export type PortfolioProject = {
  slug: string;
  projectNumber: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  categories: PortfolioProjectType[];
  services: string[];
  website?: string;
  type: "client" | "collaboration";
};

export const portfolioCategories: ("All Projects" | PortfolioProjectType)[] = [
  "All Projects",
  "Website Development",
  "Video Production",
  "Social Media Management",
  "Content Creation",
  "Collaboration",
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "vaigai-namma-taxi",
    projectNumber: "PROJECT 01",
    title: "Vaigai Namma Taxi",
    client: "Vaigai Namma Taxi",
    industry: "Transportation / Taxi Services",
    description:
      "Developed a dedicated digital platform for Vaigai Namma Taxi, establishing an online presence for its transportation services.",
    categories: ["Website Development"],
    services: ["Website Development"],
    website: "https://vaigainammtaxi.netlify.app",
    type: "client",
  },
  {
    slug: "urs-choice-madurai",
    projectNumber: "PROJECT 02",
    title: "URS Choice Madurai",
    client: "URS Choice Madurai",
    industry: "Retail / Shopping",
    description:
      "Delivered an integrated digital presence combining website development, creative video production, social media management, and Meta advertising.",
    categories: [
      "Website Development",
      "Video Production",
      "Social Media Management",
      "Content Creation",
    ],
    services: [
      "Website Development",
      "Video Production",
      "Social Media Management",
      "Meta Ads Management",
    ],
    website: "https://urschoicemadurai.vercel.app/",
    type: "client",
  },
  {
    slug: "bon-appetite",
    projectNumber: "PROJECT 03",
    title: "Bon Appetite",
    client: "Bon Appetite",
    industry: "Food & Restaurant",
    description:
      "Created visual content and managed social media activities to strengthen the brand's digital presence and audience engagement.",
    categories: ["Video Production", "Social Media Management"],
    services: ["Video Production", "Social Media Management"],
    type: "client",
  },
  {
    slug: "dhiya-garments",
    projectNumber: "PROJECT 04",
    title: "Dhiya Garments",
    client: "Dhiya Garments",
    industry: "Fashion / Apparel",
    description:
      "Produced creative video content showcasing fashion products and helping the brand communicate its visual identity.",
    categories: ["Video Production"],
    services: ["Video Production"],
    type: "client",
  },
  {
    slug: "smp-food-products",
    projectNumber: "PROJECT 05",
    title: "SMP Food Products",
    client: "SMP Food Products",
    industry: "Food / FMCG",
    description:
      "Supported SMP Food Products through website design, product-focused video production, and social media management.",
    categories: [
      "Website Development",
      "Video Production",
      "Social Media Management",
    ],
    services: ["Video Production", "Social Media Management", "Website Design"],
    website: "https://smpproducts.vercel.app/",
    type: "client",
  },
  {
    slug: "le-brew-cafe",
    projectNumber: "PROJECT 06",
    title: "Le Brew Cafe",
    client: "Le Brew Cafe",
    industry: "Cafe / Food & Beverage",
    description:
      "Produced engaging visual content designed to showcase the cafe's atmosphere, offerings, and brand experience.",
    categories: ["Video Production"],
    services: ["Video Production"],
    type: "client",
  },
  {
    slug: "bangles-by-beauty",
    projectNumber: "PROJECT 07",
    title: "Bangles By Beauty",
    client: "Bangles By Beauty",
    industry: "Fashion / Jewellery / Accessories",
    description:
      "Designed an elegant digital shopping experience for Bangles By Beauty, presenting its products through a dedicated branded website.",
    categories: ["Website Development"],
    services: ["Website Design"],
    website: "https://www.banglesbybeauty.in/",
    type: "client",
  },
  {
    slug: "abs-utilities-solar",
    projectNumber: "PROJECT 08",
    title: "ABS Utilities Solar",
    client: "ABS Utilities Solar",
    industry: "Solar Energy / Renewable Energy",
    description:
      "Created digital content and visual communication strategies to strengthen the brand's online presence in the renewable energy sector.",
    categories: ["Video Production", "Content Creation", "Social Media Management"],
    services: ["Video Production", "Content Creation", "Social Media Management"],
    type: "client",
  },
  {
    slug: "pst-construction",
    projectNumber: "PROJECT 09",
    title: "PST Construction",
    client: "PST Construction",
    industry: "Construction / Infrastructure",
    description:
      "Developed creative video and social media content to showcase construction-related work and strengthen the company's digital communication.",
    categories: ["Video Production", "Content Creation", "Social Media Management"],
    services: ["Video Production", "Content Creation", "Social Media Management"],
    type: "client",
  },
  {
    slug: "axs-architect",
    projectNumber: "PROJECT 10",
    title: "AXS Architect",
    client: "AXS Architect",
    industry: "Architecture / Interior Design",
    description:
      "Designed a dedicated digital platform for AXS Architect, presenting its architectural identity through a modern website experience.",
    categories: ["Website Development"],
    services: ["Website Design"],
    website: "https://axswebsite.vercel.app/",
    type: "client",
  },
  {
    slug: "s18-creation",
    projectNumber: "COLLAB 01",
    title: "S18 Creation",
    client: "S18 Creation",
    industry: "Creative Collaboration",
    description: "",
    categories: ["Collaboration"],
    services: [],
    type: "collaboration",
  },
  {
    slug: "b2-club",
    projectNumber: "COLLAB 02",
    title: "B2 Club",
    client: "B2 Club",
    industry: "Creative Collaboration",
    description: "",
    categories: ["Collaboration"],
    services: [],
    type: "collaboration",
  },
];

export const getPortfolioProject = (slug: string) =>
  portfolioProjects.find((project) => project.slug === slug);

export const clientProjects = portfolioProjects.filter(
  (project) => project.type === "client",
);

export const collaborations = portfolioProjects.filter(
  (project) => project.type === "collaboration",
);
