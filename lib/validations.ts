import { z } from "zod";

export const serviceOptions = [
  "Social Media Marketing",
  "Video Production",
  "Web Development",
  "AI Automation",
  "Branding / Creative Design",
  "Multiple Services",
  "Other",
] as const;

export const budgetOptions = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
] as const;

export const contactOptions = ["Email", "Phone call", "WhatsApp"] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a reachable phone number.")
    .max(24)
    .regex(/^[+()\-\s\d]+$/, "Phone number can only contain digits and + ( ) - spaces."),
  businessName: z.string().trim().max(120).optional().or(z.literal("")),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$/i.test(value),
      "Enter a valid website or social profile URL.",
    ),
  service: z.enum(serviceOptions),
  budget: z.enum(budgetOptions),
  description: z
    .string()
    .trim()
    .min(30, "Tell us a little more — at least 30 characters.")
    .max(3000, "Please keep your description under 3000 characters."),
  preferredContact: z.enum(contactOptions),
  company_website_confirm: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
