import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Arrise Digital collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains what information we collect through the Arrise Digital website, why we collect it and how it is handled."
      updated="November 2026"
      sections={[
        {
          title: "Overview",
          paragraphs: [
            "Arrise Digital respects your privacy. This policy applies to information submitted through this website, including the project enquiry form and direct contact links.",
            "By using the website, you agree to the practices described here. If you do not agree, please do not submit personal information through the site.",
          ],
        },
        {
          title: "Information we collect",
          paragraphs: [
            "We only collect information you choose to provide. Through the project enquiry form, this typically includes:",
          ],
          list: [
            "Your name, email address and phone number",
            "Business name, website or social profile URL",
            "The service and budget range you select",
            "Your project description and preferred contact method",
          ],
        },
        {
          title: "How we use your information",
          paragraphs: [
            "Information submitted through the form is used to respond to your enquiry, understand your requirements and prepare a relevant proposal.",
            "We do not sell your personal information. We do not add you to a marketing list without a separate, explicit opt-in.",
          ],
        },
        {
          title: "Third-party services",
          paragraphs: [
            "This website is hosted on a third-party platform. Enquiry emails may be delivered through an email service provider. These providers process data on our behalf and are bound by their own privacy and security terms.",
            "Where a messaging or social platform is linked from this site, your use of that platform is governed by its own privacy policy.",
          ],
        },
        {
          title: "Cookies and analytics",
          paragraphs: [
            "This website is designed to work without advertising cookies. If analytics are enabled in the future, this policy will be updated and, where required, consent will be requested before non-essential cookies are set.",
          ],
        },
        {
          title: "Data retention",
          paragraphs: [
            "Enquiry information is kept only for as long as needed to respond, maintain a record of the conversation and meet any applicable legal or accounting obligations. If you ask us to delete your information, we will do so unless we are required to retain it.",
          ],
        },
        {
          title: "Your choices and rights",
          paragraphs: [
            "You may ask us to access, correct or delete the personal information you have submitted. You may also withdraw consent for future contact.",
            `To make a request, email ${site.email}. We may need to verify your identity before acting on it.`,
          ],
        },
        {
          title: "Security",
          paragraphs: [
            "We take reasonable technical and organisational measures to protect the information you share. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
          ],
        },
        {
          title: "Children",
          paragraphs: [
            "This website is intended for businesses and professional enquiries. It is not directed at children, and we do not knowingly collect personal information from children.",
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: [
            "We may update this policy as the website or our services change. The most recent version will always be published on this page, with the updated month and year shown above.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [
            `Questions about this policy can be sent to ${site.email}. We will respond as soon as we reasonably can.`,
          ],
        },
      ]}
      footer={
        <div className="rounded-xl border border-line bg-night p-6">
          <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted">Privacy contact</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 block font-display text-lg font-medium text-ink"
          >
            {site.email}
          </a>
        </div>
      }
    />
  );
}
