export type PortfolioProjectType =
  | "Website Development"
  | "Video Production"
  | "Social Media Management"
  | "Content Creation"
  | "Meta Ads"
  | "Collaboration";

export type ServiceKey =
  | "Website Development"
  | "Video Production"
  | "Social Media Management"
  | "Content Creation"
  | "Meta Ads Management"
  | "Website Design";

/**
 * A single playable video deliverable.
 * Provide `src` (MP4/WebM hosted in /public) OR `embedUrl` (verified platform embed).
 * Leave both undefined while the asset is still being integrated — the UI will
 * render an explicit "asset pending" slot instead of a fake player.
 */
export type VideoAsset = {
  id: string;
  title: string;
  src?: string;
  poster?: string;
  embedUrl?: string;
  duration?: string;
  caption?: string;
};

export type ImageAsset = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

/** Every asset is grouped by the service it belongs to — never flattened. */
export type MediaLibrary = {
  /** Video production deliverables. */
  videos: VideoAsset[];
  /** Website screenshots / live-site preview frames. */
  websiteShots: ImageAsset[];
  /** Approved social posts, reels covers, campaign creatives. */
  socialPosts: ImageAsset[];
  /** Content creation creatives and promotional assets. */
  content: ImageAsset[];
  /** Meta ads campaign creatives / documentation. */
  metaAds: ImageAsset[];
  /** Anything else worth showing in the master gallery. */
  gallery: ImageAsset[];
};

export type PortfolioProject = {
  slug: string;
  projectNumber: string;
  title: string;
  client: string;
  industry: string;
  intro: string;
  description: string;
  categories: PortfolioProjectType[];
  services: ServiceKey[];
  website?: { url: string; enabled: boolean };
  cover?: string;
  monogram: string;
  accent: string;
  media: MediaLibrary;
  type: "client" | "collaboration";
};

export const portfolioCategories: ("All Projects" | PortfolioProjectType)[] = [
  "All Projects",
  "Website Development",
  "Video Production",
  "Social Media Management",
  "Content Creation",
  "Meta Ads",
  "Collaboration",
];

/** Display labels + ordering used on the project detail page. */
export const SERVICE_LABELS: Record<ServiceKey, string> = {
  "Website Development": "Website Development",
  "Website Design": "Website Design",
  "Video Production": "Video Production",
  "Social Media Management": "Social Media Management",
  "Content Creation": "Content Creation",
  "Meta Ads Management": "Meta Ads Management",
};

export const SERVICE_ORDER: ServiceKey[] = [
  "Website Development",
  "Website Design",
  "Video Production",
  "Social Media Management",
  "Content Creation",
  "Meta Ads Management",
];

export const SERVICE_FILTERS: Record<ServiceKey, PortfolioProjectType> = {
  "Website Development": "Website Development",
  "Website Design": "Website Development",
  "Video Production": "Video Production",
  "Social Media Management": "Social Media Management",
  "Content Creation": "Content Creation",
  "Meta Ads Management": "Meta Ads",
};

const emptyMedia = (): MediaLibrary => ({
  videos: [],
  websiteShots: [],
  socialPosts: [],
  content: [],
  metaAds: [],
  gallery: [],
});

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "vaigai-namma-taxi",
    projectNumber: "PROJECT 01",
    title: "Vaigai Namma Taxi",
    client: "Vaigai Namma Taxi",
    industry: "Transportation / Taxi Services",
    intro:
      "A dedicated digital platform that took Vaigai Namma Taxi online, giving its cab and travel services a credible, bookable presence.",
    description:
      "Developed a dedicated digital platform for Vaigai Namma Taxi, establishing an online presence for its transportation services.",
    categories: ["Website Development"],
    services: ["Website Development"],
    website: { url: "https://vaigainammtaxi.netlify.app", enabled: true },
    monogram: "Vaigai Taxi",
    accent: "#F9CA14",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "urs-choice-madurai",
    projectNumber: "PROJECT 02",
    title: "URS Choice Madurai",
    client: "URS Choice Madurai",
    industry: "Real Estate",
    intro:
      "A full-funnel engagement covering the website, creative video production, always-on social media management and Meta advertising.",
    description:
      "Delivered an integrated digital presence combining website development, creative video production, social media management, and Meta advertising.",
    categories: [
      "Website Development",
      "Video Production",
      "Social Media Management",
      "Meta Ads",
    ],
    services: [
      "Website Development",
      "Social Media Management",
      "Video Production",
      "Meta Ads Management",
    ],
    website: { url: "https://urschoicemadurai.vercel.app/", enabled: true },
    monogram: "Urs Choice",
    accent: "#3544A5",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "bon-appetite",
    projectNumber: "PROJECT 03",
    title: "Bon Appetite",
    client: "Bon Appetite",
    industry: "Food & Restaurant",
    intro:
      "Visual content and social media management built to make the restaurant's food — and its feed — impossible to scroll past.",
    description:
      "Created visual content and managed social media activities to strengthen the brand's digital presence and audience engagement.",
    categories: ["Video Production", "Social Media Management"],
    services: ["Video Production", "Social Media Management"],
    monogram: "Bon Appetite",
    accent: "#F2A104",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "dhiya-garments",
    projectNumber: "PROJECT 04",
    title: "Dhiya Garments",
    client: "Dhiya Garments",
    industry: "Fashion / Apparel",
    intro:
      "Creative video content that gives the garments movement, styling and a visual identity built for short-form platforms.",
    description:
      "Produced creative video content showcasing fashion products and helping the brand communicate its visual identity.",
    categories: ["Video Production"],
    services: ["Video Production"],
    monogram: "Dhiya garments",
    accent: "#7A5AF8",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "smp-food-products",
    projectNumber: "PROJECT 05",
    title: "SMP Food Products",
    client: "SMP Food Products",
    industry: "Food / FMCG",
    intro:
      "A three-discipline engagement — website design, product-focused video production and social media management — presented as one complete brand system.",
    description:
      "Supported SMP Food Products through website design, product-focused video production, and social media management.",
    categories: [
      "Website Development",
      "Video Production",
      "Social Media Management",
    ],
    services: [
      "Website Design",
      "Video Production",
      "Social Media Management",
    ],
    website: { url: "https://smpproducts.vercel.app/", enabled: true },
    monogram: "Smp Food",
    accent: "#C05A2C",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "le-brew-cafe",
    projectNumber: "PROJECT 06",
    title: "Le Brew Cafe",
    client: "Le Brew Cafe",
    industry: "Cafe / Food & Beverage",
    intro:
      "Visual content produced to carry the café's atmosphere, offerings and brand experience onto the screen.",
    description:
      "Produced engaging visual content designed to showcase the cafe's atmosphere, offerings, and brand experience.",
    categories: ["Video Production"],
    services: ["Video Production"],
    monogram: "Le Brew",
    accent: "#8A5A2B",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "bangles-by-beauty",
    projectNumber: "PROJECT 07",
    title: "Bangles By Beauty",
    client: "Bangles By Beauty",
    industry: "Fashion / Jewellery / Accessories",
    intro:
      "An elegant digital shopping experience that presents the jewellery collection through a dedicated branded website.",
    description:
      "Designed an elegant digital shopping experience for Bangles By Beauty, presenting its products through a dedicated branded website.",
    categories: ["Website Development"],
    services: ["Website Design"],
    website: { url: "https://www.banglesbybeauty.in/", enabled: true },
    monogram: "Bangles",
    accent: "#B08954",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "abs-utilities-solar",
    projectNumber: "PROJECT 08",
    title: "ABS Utilities Solar",
    client: "ABS Utilities Solar",
    industry: "Solar Energy / Renewable Energy",
    intro:
      "Video, content and social media work that made a technical solar business legible and trustworthy online.",
    description:
      "Created digital content and visual communication strategies to strengthen the brand's online presence in the renewable energy sector.",
    categories: ["Video Production", "Content Creation", "Social Media Management"],
    services: ["Video Production", "Content Creation", "Social Media Management"],
    monogram: "Abs Utilities",
    accent: "#12A594",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "pst-construction",
    projectNumber: "PROJECT 09",
    title: "PST Construction",
    client: "PST Construction",
    industry: "Construction / Infrastructure",
    intro:
      "Creative video and social media content that turns site work into proof of capability for the construction brand.",
    description:
      "Developed creative video and social media content to showcase construction-related work and strengthen the company's digital communication.",
    categories: ["Video Production", "Content Creation", "Social Media Management"],
    services: ["Video Production", "Content Creation", "Social Media Management"],
    monogram: "Pst Construction",
    accent: "#3D5A80",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "axs-architect",
    projectNumber: "PROJECT 10",
    title: "AXS Architect",
    client: "AXS Architect",
    industry: "Architecture / Interior Design",
    intro:
      "A modern website that presents the practice's architectural identity with the restraint the work deserves.",
    description:
      "Designed a dedicated digital platform for AXS Architect, presenting its architectural identity through a modern website experience.",
    categories: ["Website Development"],
    services: ["Website Design"],
    website: { url: "https://axswebsite.vercel.app/", enabled: true },
    monogram: "Axs Architects",
    accent: "#4A6FA5",
    media: { ...emptyMedia() },
    type: "client",
  },
  {
    slug: "s18-creation",
    projectNumber: "COLLAB 01",
    title: "S18 Creation",
    client: "S18 Creation",
    industry: "Creative Collaboration",
    intro: "A creative collaboration bringing impactful ideas to life through partnership.",
    description: "A creative collaboration bringing impactful ideas to life through partnership.",
    categories: ["Collaboration"],
    services: [],
    monogram: "S18 Creation",
    accent: "#FF6B00",
    media: { ...emptyMedia() },
    type: "collaboration",
  },
  {
    slug: "b2-club",
    projectNumber: "COLLAB 02",
    title: "B2 Club",
    client: "B2 Club",
    industry: "Creative Collaboration",
    intro: "A creative collaboration bringing impactful ideas to life through partnership.",
    description: "A creative collaboration bringing impactful ideas to life through partnership.",
    categories: ["Collaboration"],
    services: [],
    monogram: "B² Club",
    accent: "#FF6B00",
    media: { ...emptyMedia() },
    type: "collaboration",
  },
];

/** Legacy slugs used by older case-study links — resolved to the current client slug. */
const slugAliases: Record<string, string> = {
  "le-brew": "le-brew-cafe",
  "abs-utility-solutions": "abs-utilities-solar",
  bonappetit: "bon-appetite",
  "bon-appetit": "bon-appetite",
};

export const resolvePortfolioSlug = (slug: string) => slugAliases[slug] ?? slug;

export const getPortfolioProject = (slug: string) => {
  const resolved = resolvePortfolioSlug(slug);
  return portfolioProjects.find((project) => project.slug === resolved);
};

export const clientProjects = portfolioProjects.filter(
  (project) => project.type === "client",
);

export const collaborations = portfolioProjects.filter(
  (project) => project.type === "collaboration",
);

/** Services actually delivered, in presentation order. */
export const deliveredServices = (project: PortfolioProject): ServiceKey[] =>
  SERVICE_ORDER.filter((service) => project.services.includes(service));

export const hasService = (project: PortfolioProject, service: ServiceKey) =>
  project.services.includes(service);

export const hasWebsite = (project: PortfolioProject) =>
  Boolean(project.website?.enabled && project.website.url);

/** Total number of media assets attached to this client — used on the card. */
export const mediaCount = (project: PortfolioProject) =>
  project.media.videos.length +
  project.media.websiteShots.length +
  project.media.socialPosts.length +
  project.media.content.length +
  project.media.metaAds.length +
  project.media.gallery.length;

export const projectHref = (project: PortfolioProject) => `/work/${project.slug}`;
