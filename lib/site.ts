export const site = {
  name: "Arrise Digital",
  shortName: "Arrise",
  slogan: "Partners in Progress.",
  positioning: "We don't just generate leads. We build businesses.",
  description:
    "Arrise Digital is a creative digital growth studio combining social media marketing, video production, web development and AI automation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arrisedigital.vercel.app",
  email: "arrisedigital@gmail.com",
  phone: "+91 93639 73591",
  whatsapp: "https://wa.me/919363973591",
  instagram: "https://instagram.com/arrisedigital",
  github: "https://github.com/arrisedigital",
  location: "Remote-first · Working worldwide",
  availability: "Open for new partnerships",
} as const;

export const socials = [
  { label: "Instagram", href: site.instagram },
  { label: "GitHub", href: site.github },
  { label: "WhatsApp", href: site.whatsapp },
  { label: "Email", href: `mailto:${site.email}` },
] as const;
