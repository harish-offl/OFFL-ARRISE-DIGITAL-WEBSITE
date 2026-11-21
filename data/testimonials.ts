export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  service: string;
  verified: boolean;
};

/**
 * Only verified client testimonials belong here.
 * The UI renders an honest placeholder state while this list is empty.
 * Add a testimonial only after written approval from the client.
 */
export const testimonials: Testimonial[] = [];

export const testimonialPlaceholder = {
  title: "We'd rather show you real words than polished fiction.",
  description:
    "We are collecting verified client stories for this space. In the meantime, ask us for references relevant to your industry — we are happy to connect you with the right people.",
};
