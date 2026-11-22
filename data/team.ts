export type TeamMember = {
  id: string;
  number: string;
  name: string;
  designation: string;
  description: string;
  initials: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  portfolio?: string;
  whatsapp?: string;
};

export const team: TeamMember[] = [
  {
    id: "ram-rojith",
    number: "01",
    name: "V. Ram Rojith",
    designation: "Managing Director",
    description:
      "Leads the agency's vision and strategy — steering every engagement with a growth-first mindset and a relentless focus on client success.",
    initials: "RR",
    image: "/images/team/ram-rojith.jpeg",
    imageAlt: "Portrait of V. Ram Rojith",
  },
  {
    id: "annamalai",
    number: "02",
    name: "M. RM Annamalai",
    designation: "Business Development & Client Management",
    description:
      "Owns new partnerships and client relationships end-to-end — turning every conversation into long-term, measurable growth.",
    initials: "MA",
    image: "/images/team/annamalai.jpeg",
    imageAlt: "Portrait of M. RM Annamalai",
    imagePosition: "center 70%",
    portfolio: "https://connectwithannamalai.vercel.app/",
    whatsapp: "919363973591",
  },
  {
    id: "ram-viswanath",
    number: "03",
    name: "V. Ram Viswanath",
    designation: "Creative Director",
    description:
      "Leads creative strategy and brand storytelling — crafting visuals and narratives that captivate audiences and drive engagement.",
    initials: "VR",
    image: "/images/team/ram-viswanath.png",
    imageAlt: "Portrait of V. Ram Viswanath",
  },
  {
    id: "harish-raj",
    number: "04",
    name: "Harish Raj V",
    designation: "Operations & Finance Management",
    description:
      "Keeps the engine running — budgets, timelines and processes — ensuring every project ships on time and on target.",
    initials: "HR",
    image: "/images/team/harish-raj.png",
    imageAlt: "Portrait of Harish Raj V",
  },
];
