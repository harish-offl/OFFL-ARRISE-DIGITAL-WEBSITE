export type ServiceVisual = "social" | "video" | "web" | "ai";

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  headline: string;
  summary: string;
  description: string;
  deliverables: string[];
  benefits: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  highlight?: { value: string; label: string; note?: string };
  visual: ServiceVisual;
  accent: string;
  related: string[];
};

export const services: Service[] = [
  {
    slug: "social-media-marketing",
    number: "01",
    title: "Social Media Marketing",
    shortTitle: "Social",
    tagline: "Turn attention into business growth.",
    headline: "Turn Attention Into Business Growth.",
    summary:
      "Strategic social media experiences that improve visibility, connect with the right audience and generate meaningful enquiries.",
    description:
      "We build strategic social media experiences that help businesses improve visibility, connect with their target audience and generate meaningful enquiries. Every post, campaign and content calendar is shaped by a clear business objective — not by whatever happens to be trending.",
    deliverables: [
      "Social Media Management",
      "Content Strategy",
      "Instagram Growth",
      "Social Media Campaigns",
      "Poster Design",
      "Carousel Design",
      "Content Calendars",
      "Brand Communication",
      "Performance Tracking",
    ],
    benefits: [
      {
        title: "A consistent brand presence",
        description:
          "A recognisable visual and verbal system across every platform, so your business looks established even before a conversation starts.",
      },
      {
        title: "Content with a purpose",
        description:
          "Each format is planned around audience intent — awareness, consideration or conversion — instead of posting for the sake of posting.",
      },
      {
        title: "Decisions backed by data",
        description:
          "We review reach, engagement, saves and enquiries to understand what is working and refine the next cycle of content.",
      },
    ],
    process: [
      { title: "Audit & research", description: "We review your current presence, audience and competitors to find the gaps worth owning." },
      { title: "Strategy & calendar", description: "Pillars, formats, tone and cadence are mapped into a practical monthly calendar." },
      { title: "Creative production", description: "Design, copy and short-form video are produced as a cohesive visual system." },
      { title: "Publish & engage", description: "Content goes live with consistent community management and brand voice." },
      { title: "Measure & refine", description: "Monthly reporting informs the next iteration of content and campaigns." },
    ],
    faqs: [
      {
        question: "Do you handle both strategy and content creation?",
        answer:
          "Yes. Social media engagements usually include strategy, content calendars, design, copywriting and publishing support. We can also work with your in-house team and focus only on strategy or creative production.",
      },
      {
        question: "Which platforms do you work with?",
        answer:
          "Instagram and YouTube are our primary focus, with support for Facebook, LinkedIn and other platforms depending on where your audience actually spends time.",
      },
      {
        question: "How do you measure social media performance?",
        answer:
          "We track reach, engagement, profile actions and enquiries, and review them against the objectives agreed at the start of the engagement. We avoid reporting vanity metrics in isolation.",
      },
    ],
    visual: "social",
    accent: "#FF6B00",
    related: ["bangles-by-beauty", "bon-appetit", "dhiya-garments"],
  },
  {
    slug: "video-production",
    number: "02",
    title: "Video Production",
    shortTitle: "Video",
    tagline: "Stories that capture attention.",
    headline: "Stories That Capture Attention.",
    summary:
      "Short-form content and professional brand videos designed to communicate your message and strengthen your brand.",
    description:
      "From engaging short-form content to professional brand videos, we create visual stories designed to communicate your message and strengthen your brand. The goal is not just to look good — it is to hold attention long enough to be remembered.",
    deliverables: [
      "Instagram Reels",
      "YouTube Shorts",
      "YouTube Videos",
      "Promotional Videos",
      "Product Videos",
      "Brand Films",
      "Video Editing",
      "Motion Graphics",
      "Creative Storytelling",
    ],
    benefits: [
      {
        title: "Scroll-stopping openings",
        description:
          "Hooks, pacing and edit rhythm are designed for platforms where the first two seconds decide whether anyone watches the rest.",
      },
      {
        title: "A consistent visual language",
        description:
          "Typography, colour, transitions and sound work together so every video feels unmistakably like your brand.",
      },
      {
        title: "Built for multiple placements",
        description:
          "One production can be shaped into reels, shorts, website loops and campaign cutdowns without losing its core idea.",
      },
    ],
    process: [
      { title: "Concept & script", description: "We define the story, the hook and the message before a single frame is captured." },
      { title: "Pre-production", description: "Shot lists, locations, talent and schedules are planned to keep production focused." },
      { title: "Production", description: "Footage is captured with the final edit and platform formats in mind." },
      { title: "Edit & sound", description: "Editing, motion graphics, colour and sound are layered into a finished piece." },
      { title: "Delivery", description: "Exports are prepared for each placement, with captions and thumbnails where needed." },
    ],
    faqs: [
      {
        question: "Do you produce the video or only edit it?",
        answer:
          "Both. We can handle the full process from concept and filming through editing, or work with footage you already have and focus on editing, motion graphics and platform-ready cutdowns.",
      },
      {
        question: "How many videos are included in a project?",
        answer:
          "It depends on the scope. Short-form engagements can be structured as monthly batches, while brand films and campaigns are quoted per production. We confirm deliverables before work begins.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Yes. We adapt to your brand system where one exists, and help define one where it doesn't — including title treatments, colour and motion behaviour.",
      },
    ],
    highlight: {
      value: "15M+",
      label: "Views generated",
      note: "Aggregate views across video content produced for client channels.",
    },
    visual: "video",
    accent: "#FF6B35",
    related: ["bon-appetit", "le-brew", "dhiya-garments"],
  },
  {
    slug: "web-development",
    number: "03",
    title: "Web Development",
    shortTitle: "Web",
    tagline: "Digital experiences that convert.",
    headline: "Digital Experiences That Convert.",
    summary:
      "Modern, responsive, high-performance websites that strengthen brand credibility and turn visitors into customers.",
    description:
      "We design and develop modern, responsive and high-performance websites that strengthen brand credibility and turn visitors into customers. Every page is built around a clear journey — from the first impression to the enquiry, booking or purchase.",
    deliverables: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages",
      "E-commerce Websites",
      "Custom Web Applications",
      "UI/UX Design",
      "Responsive Development",
      "Website Optimization",
      "Technical Integrations",
    ],
    benefits: [
      {
        title: "Designed around the visitor",
        description:
          "Structure, copy and interaction are shaped around what your customer needs to understand and do next.",
      },
      {
        title: "Fast on real devices",
        description:
          "Performance, image handling and responsive behaviour are treated as part of the design, not an afterthought.",
      },
      {
        title: "Built to be maintained",
        description:
          "Clean components and a clear content structure make future updates and new pages straightforward.",
      },
    ],
    process: [
      { title: "Discovery", description: "Goals, audience, content and technical requirements are mapped before design begins." },
      { title: "Architecture", description: "Sitemap, page structure and conversion paths are defined." },
      { title: "Design", description: "A complete visual direction is designed across key breakpoints, not just desktop." },
      { title: "Development", description: "The site is built with responsive components, performance and accessibility in mind." },
      { title: "Launch & support", description: "Testing, deployment, analytics and a handover that leaves you in control." },
    ],
    faqs: [
      {
        question: "What technology do you build with?",
        answer:
          "We primarily build with modern React and Next.js, which gives us strong performance, flexibility and SEO foundations. For simpler brochure sites we may recommend a lighter stack depending on your needs and budget.",
      },
      {
        question: "Can you redesign an existing website?",
        answer:
          "Yes. We can rebuild an existing site while preserving the content and search visibility you have already earned, or start fresh with a new structure where that serves the business better.",
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer:
          "Yes. Maintenance can be arranged as a monthly arrangement covering updates, small changes, performance checks and technical support.",
      },
    ],
    visual: "web",
    accent: "#4F6BFF",
    related: ["le-brew", "abs-utility-solutions", "dhiya-garments"],
  },
  {
    slug: "ai-automation",
    number: "04",
    title: "AI Automation",
    shortTitle: "Automation",
    tagline: "Work smarter. Grow faster.",
    headline: "Work Smarter. Grow Faster.",
    summary:
      "Intelligent automation that reduces repetitive tasks, improves response times and helps teams operate more efficiently.",
    description:
      "We integrate intelligent automation into business workflows to reduce repetitive tasks, improve response times and help teams operate more efficiently. Automation is applied where it removes real friction — not where it simply sounds impressive.",
    deliverables: [
      "AI Chatbots",
      "Lead Management Automation",
      "Automated Follow-ups",
      "Workflow Automation",
      "Customer Communication",
      "AI-powered Business Tools",
      "API Integrations",
      "Custom Automation Systems",
    ],
    benefits: [
      {
        title: "Faster response times",
        description:
          "Enquiries are acknowledged and routed automatically, so fewer opportunities go cold while waiting for a reply.",
      },
      {
        title: "Less repetitive work",
        description:
          "Data entry, reminders and follow-ups run in the background so your team can focus on conversations that need a human.",
      },
      {
        title: "Clear, connected systems",
        description:
          "Tools talk to each other through dependable integrations, reducing duplicate work and missed handoffs.",
      },
    ],
    process: [
      { title: "Workflow audit", description: "We map the current process and identify where time is actually being lost." },
      { title: "Opportunity mapping", description: "Tasks are assessed for automation potential, risk and expected impact." },
      { title: "Design", description: "The new workflow, triggers, messages and fallbacks are defined before implementation." },
      { title: "Build & integrate", description: "Automations are implemented and connected to your existing tools." },
      { title: "Test & monitor", description: "We test edge cases, monitor performance and refine the workflow." },
    ],
    faqs: [
      {
        question: "Will automation replace my team?",
        answer:
          "Our approach is to remove repetitive work, not people. Automation handles the predictable parts of a workflow so your team can spend more time on judgement, relationships and growth.",
      },
      {
        question: "What tools do you integrate with?",
        answer:
          "We work with common business tools such as CRMs, spreadsheets, messaging platforms and email systems. The exact stack depends on what you already use and what the workflow requires.",
      },
      {
        question: "How do we know if automation is worth it?",
        answer:
          "We start with an audit to quantify where time is being spent. If the repetitive work is too small to justify the setup, we will say so rather than build automation for its own sake.",
      },
    ],
    highlight: {
      value: "3 hrs → 20 mins",
      label: "Manual lead follow-up time per day",
      note: "Observed in a demonstrated workflow. Results vary with the process and tools involved.",
    },
    visual: "ai",
    accent: "#A78BFA",
    related: ["abs-utility-solutions", "smp-food-products"],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
