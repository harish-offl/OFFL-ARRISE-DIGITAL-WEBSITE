export type InsightCategory =
  | "Digital Marketing"
  | "Social Media"
  | "Video"
  | "Web Development"
  | "Branding"
  | "AI Automation"
  | "Business Growth";

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  takeaways: string[];
  featured?: boolean;
};

export const insightCategories: ("All" | InsightCategory)[] = [
  "All",
  "Digital Marketing",
  "Social Media",
  "Video",
  "Web Development",
  "Branding",
  "AI Automation",
  "Business Growth",
];

export const insights: Insight[] = [
  {
    slug: "social-media-that-earns-enquiries",
    title: "Social media that earns enquiries, not just likes",
    category: "Social Media",
    excerpt:
      "Likes are easy to collect and easy to misread. Here is how we think about building a social presence that actually contributes to the business.",
    intro:
      "Most social media reporting starts with reach and ends with engagement. Those numbers are not useless, but they do not tell you whether the work is doing anything for the business. A post can perform brilliantly inside the platform and still bring in nothing.",
    sections: [
      {
        heading: "Start with the job the content has to do",
        paragraphs: [
          "Before deciding on formats or posting frequency, define what the content is for. Awareness content introduces the brand to people who do not know it yet. Consideration content answers the questions a warm audience is already asking. Conversion content gives people a clear next step.",
          "When a calendar mixes all three without labelling them, the feed becomes a blur. A customer sees a product push, then a meme, then an offer, and none of it accumulates into a reason to trust you.",
        ],
      },
      {
        heading: "Make the next step obvious",
        paragraphs: [
          "Many businesses create good content and then leave the audience with nowhere to go. The caption ends, the video loops, and the visit is over. A clear, low-friction next step — a saved post, a profile link, a direct message prompt — turns passive attention into a conversation.",
          "This does not mean every post needs a hard sell. It means every post should know what it wants the viewer to do, even if that action is simply remembering the brand.",
        ],
      },
      {
        heading: "Measure the moments before the enquiry",
        paragraphs: [
          "Enquiries are the outcome, but they are rarely the first signal. Saves, shares, profile visits and replies are often the moments where intent begins. Tracking those alongside enquiries gives a much clearer picture of which content is doing real work.",
          "Review the data monthly, not daily. Short windows produce noise; longer windows reveal patterns you can actually act on.",
        ],
      },
    ],
    takeaways: [
      "Define whether each piece of content is for awareness, consideration or conversion.",
      "Give every post one clear next step.",
      "Track intent signals, not just reach.",
      "Review performance monthly and refine the system.",
    ],
    featured: true,
  },
  {
    slug: "short-form-video-that-holds-attention",
    title: "Short-form video: earning the second second",
    category: "Video",
    excerpt:
      "The first two seconds decide whether the rest of your video exists for the viewer. A practical look at hooks, pacing and brand consistency.",
    intro:
      "Short-form video is unforgiving. The viewer has an infinite number of alternatives and almost no patience. That does not mean every video needs to be loud or gimmicky — it means the opening has to give someone a reason to stay.",
    sections: [
      {
        heading: "A hook is a promise, not a trick",
        paragraphs: [
          "A good hook tells the viewer what they are about to get: a useful idea, a satisfying visual, a surprising detail, a question they want answered. A bad hook withholds information for the sake of suspense and then fails to deliver.",
          "Write the hook before you shoot. If the opening cannot be stated clearly in one line, the edit will struggle to find it later.",
        ],
      },
      {
        heading: "Pacing is a design decision",
        paragraphs: [
          "Pacing is not just cutting faster. It is deciding where the viewer should pause, what deserves a close-up, and when a cut adds energy versus when it adds noise. Food content, product detail and talking-head content all need different rhythms.",
          "Watch the edit without sound first. If the visual story does not hold, music will only hide the problem temporarily.",
        ],
      },
      {
        heading: "Build a system, not a series of one-offs",
        paragraphs: [
          "Brands that post consistently without a system end up with a feed that looks like it was made by several different companies. A simple system — title treatment, colour behaviour, caption style, transition language — keeps output recognisable while leaving room for creative variation.",
          "The system should be documented. That way, quality does not depend on one person remembering how the last edit was done.",
        ],
      },
    ],
    takeaways: [
      "Write the hook before production begins.",
      "Design pacing deliberately rather than defaulting to fast cuts.",
      "Test the visual story with the sound off.",
      "Document a lightweight motion and title system.",
    ],
  },
  {
    slug: "website-that-turns-visitors-into-customers",
    title: "A website is a journey, not a gallery",
    category: "Web Development",
    excerpt:
      "Beautiful pages do not automatically produce enquiries. The difference is usually structure, clarity and how honestly the site answers real questions.",
    intro:
      "A website can look excellent and still fail at its job. The failure is rarely visual. It is almost always structural: the visitor cannot quickly work out what you do, who it is for, or what to do next.",
    sections: [
      {
        heading: "Clarity beats cleverness above the fold",
        paragraphs: [
          "The first screen has one job: help the right visitor recognise that they are in the right place. That usually requires a plain statement of what you offer, who it is for, and a visible next step. Clever wordplay can come after the visitor understands the basics.",
          "This does not mean every site should look the same. It means the design should carry the message rather than compete with it.",
        ],
      },
      {
        heading: "Answer the questions people actually ask",
        paragraphs: [
          "Sales conversations reveal the real objections: price, timeline, process, support, and what happens after launch. If those questions are absent from the site, the visitor either leaves or asks them by email — and many will simply leave.",
          "A well-written FAQ and a clear process section reduce friction before the first conversation. They also filter out enquiries that were never a good fit.",
        ],
      },
      {
        heading: "Performance is part of the experience",
        paragraphs: [
          "A slow site feels less trustworthy, especially on mobile. Large unoptimised images, unnecessary scripts and layout shifts undermine the design work that took weeks to produce.",
          "Treat performance as a design constraint from the start. Optimise images, keep the interaction layer purposeful, and test on a real phone rather than only on a desktop monitor.",
        ],
      },
    ],
    takeaways: [
      "Make the offer and next step obvious in the first screen.",
      "Use real sales questions to shape the content.",
      "Test performance on real devices.",
      "Design the journey, not just the pages.",
    ],
    featured: true,
  },
  {
    slug: "brand-consistency-is-a-growth-strategy",
    title: "Brand consistency is quietly a growth strategy",
    category: "Branding",
    excerpt:
      "Recognition compounds. A consistent visual and verbal system makes every post, page and video work a little harder for the same budget.",
    intro:
      "Consistency is often treated as a design preference. In practice, it is a commercial advantage. Every time a customer recognises your brand without reading the name, you save a fraction of their attention — and attention is the scarcest resource in digital marketing.",
    sections: [
      {
        heading: "Recognition reduces the cost of being noticed",
        paragraphs: [
          "When colour, typography, tone and layout behave predictably, the audience can place you instantly. That instant placement is what allows a new post to feel familiar rather than intrusive.",
          "This does not require a rigid template for everything. It requires a small number of decisions — type, palette, spacing, voice — that are made once and respected consistently.",
        ],
      },
      {
        heading: "Consistency makes collaboration easier",
        paragraphs: [
          "As a business grows, more people touch the brand: internal teams, freelancers, agencies, partners. Without a documented system, each contributor adds their own interpretation and the brand slowly drifts.",
          "A lightweight brand guide — even a few pages covering type, colour, tone and layout rules — prevents that drift and shortens every future project.",
        ],
      },
      {
        heading: "Distinctiveness matters more than perfection",
        paragraphs: [
          "A brand that looks flawless but interchangeable is harder to remember than one with a clear point of view and a few deliberate quirks. Distinctiveness is not decoration; it is a memory device.",
          "Find the two or three things that make the brand recognisable, then protect them across every channel.",
        ],
      },
    ],
    takeaways: [
      "Treat consistency as a commercial asset, not a design preference.",
      "Document the few decisions that define the brand.",
      "Optimise for recognition, not just polish.",
      "Protect distinctiveness across every channel.",
    ],
  },
  {
    slug: "automation-where-it-actually-helps",
    title: "Automate the friction, not the relationship",
    category: "AI Automation",
    excerpt:
      "AI is most useful when it removes repetitive work from a process that already makes sense. Here is how to decide what to automate.",
    intro:
      "Automation is often sold as a transformation. In reality, the most valuable automation is usually unglamorous: a follow-up that goes out on time, a lead that lands in the right place, a reminder that does not depend on someone remembering.",
    sections: [
      {
        heading: "Map the process before you automate it",
        paragraphs: [
          "Automating a broken process just produces mistakes faster. Start by writing down the current workflow, including the handoffs and the places where things get missed.",
          "Once the process is visible, it is much easier to see which steps are repetitive, which require judgement, and which exist only because two tools do not talk to each other.",
        ],
      },
      {
        heading: "Keep a human path",
        paragraphs: [
          "A chatbot can answer common questions and route enquiries, but it should not trap someone who needs a person. Every automated flow needs a clear exit and a fallback.",
          "The goal is not to remove human contact. It is to make sure that when a human does get involved, they have the context they need and the conversation can start further along.",
        ],
      },
      {
        heading: "Measure the time you actually save",
        paragraphs: [
          "Automation should be evaluated against the work it removes. If a workflow saves a few minutes a week but adds maintenance overhead, it may not be worth keeping.",
          "Start with the highest-frequency, lowest-risk tasks. Prove the value, then expand deliberately.",
        ],
      },
    ],
    takeaways: [
      "Document the process before automating it.",
      "Always keep a human fallback path.",
      "Prioritise frequent, low-risk tasks.",
      "Measure saved time, not the novelty of the tool.",
    ],
  },
  {
    slug: "content-system-for-growing-brands",
    title: "Building a content system that survives a busy month",
    category: "Digital Marketing",
    excerpt:
      "Consistency rarely fails because of a lack of ideas. It fails because there is no system holding the ideas together when the week gets busy.",
    intro:
      "Every content plan looks good in a kickoff meeting. The real test arrives in week three, when a client request lands, a shoot is delayed and the calendar is suddenly full of gaps.",
    sections: [
      {
        heading: "Plan in themes, not individual posts",
        paragraphs: [
          "A theme gives you range. Instead of forcing one specific post, you define a territory — product education, behind the scenes, customer questions, brand values — and create multiple pieces inside it.",
          "When something changes, the theme survives. You swap the post, not the strategy.",
        ],
      },
      {
        heading: "Build a bank before you need it",
        paragraphs: [
          "The weeks when you are busiest are the worst time to invent content from scratch. A small bank of evergreen posts, reusable assets and approved copy gives you breathing room.",
          "This is especially useful for small teams. A little ahead-of-time production prevents the quality drop that happens when every post is made under pressure.",
        ],
      },
      {
        heading: "Review the system, not just the numbers",
        paragraphs: [
          "Monthly reporting should ask two questions: what did the audience respond to, and what in our process made that possible or impossible? A format may fail because the idea was weak, or because it was rushed.",
          "Refining the system — templates, approvals, production days — is often more valuable than chasing a single high-performing post.",
        ],
      },
    ],
    takeaways: [
      "Organise content around themes, not one-off posts.",
      "Keep an evergreen bank for busy weeks.",
      "Review the production process alongside performance.",
      "Protect quality with a realistic cadence.",
    ],
  },
];

export const getInsight = (slug: string) => insights.find((insight) => insight.slug === slug);

export type InsightTone = { base: string; tint: string; accent: string; ink: string };

export const insightTones: Record<InsightCategory, InsightTone> = {
  "Digital Marketing": { base: "#E8E4D9", tint: "#F5F1E8", accent: "#FF6B00", ink: "#111111" },
  "Social Media": { base: "#DDE3F5", tint: "#EEF2FB", accent: "#5B6BFF", ink: "#111111" },
  Video: { base: "#1A1A1A", tint: "#2B2B2B", accent: "#FF6B35", ink: "#F7F7F5" },
  "Web Development": { base: "#F4E5D6", tint: "#FCF2E6", accent: "#C25400", ink: "#2A1206" },
  Branding: { base: "#F0E1D6", tint: "#F9EFE7", accent: "#B08954", ink: "#2A2118" },
  "AI Automation": { base: "#E7E1FA", tint: "#F2EEFE", accent: "#6B5BD6", ink: "#1D1830" },
  "Business Growth": { base: "#F4E8C8", tint: "#FBF4E1", accent: "#C05A2C", ink: "#2A1E10" },
};
