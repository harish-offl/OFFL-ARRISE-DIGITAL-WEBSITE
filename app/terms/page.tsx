import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply to use of the Arrise Digital website and enquiries submitted through it.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="These terms govern your use of the Arrise Digital website. Project engagements are governed by a separate written agreement."
      updated="November 2026"
      sections={[
        {
          title: "Use of this website",
          paragraphs: [
            "This website is provided for information and enquiry purposes. By using it, you agree not to misuse it, attempt to disrupt its operation or access it in a way that could damage the site or interfere with other users.",
            "The content on this site is provided in good faith but may change without notice. We do not guarantee that every page is complete, current or free of errors.",
          ],
        },
        {
          title: "Enquiries and proposals",
          paragraphs: [
            "Submitting an enquiry does not create a client relationship or a binding agreement. Any engagement begins only when a written proposal or agreement has been accepted by both parties.",
            "Estimates, timelines and deliverables discussed before a written agreement are indicative and may change once the full scope is understood.",
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "Unless stated otherwise, the content on this website — including text, layout, graphics and the Arrise Digital name and marks — belongs to Arrise Digital or is used with permission. It may not be copied or republished without written consent.",
            "Ownership of project deliverables is defined in the relevant client agreement, not by these website terms.",
          ],
        },
        {
          title: "Third-party links",
          paragraphs: [
            "This website may link to third-party platforms or services. Those links are provided for convenience. We do not control and are not responsible for the content, availability or practices of third-party sites.",
          ],
        },
        {
          title: "Limitation of liability",
          paragraphs: [
            "To the extent permitted by applicable law, Arrise Digital is not liable for any indirect or consequential loss arising from use of this website or reliance on its content.",
            "Nothing in these terms limits any liability that cannot lawfully be limited.",
          ],
        },
        {
          title: "Client responsibilities",
          paragraphs: [
            "Where a project is undertaken, the client is responsible for providing accurate information, timely feedback, necessary access and any content or approvals required for the work to progress.",
            "Delays caused by missing information or approvals may affect agreed timelines.",
          ],
        },
        {
          title: "Confidentiality",
          paragraphs: [
            "We treat client information shared during an engagement as confidential. We do not publish project details, results or testimonials without permission.",
            "This website may describe project categories and general approaches without disclosing confidential client information.",
          ],
        },
        {
          title: "Payments and cancellation",
          paragraphs: [
            "Payment terms, cancellation rights and refund arrangements for projects are set out in the relevant proposal or agreement. These website terms do not override those arrangements.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: [
            "These website terms are governed by applicable local law. The specific jurisdiction and dispute process for a project will be confirmed in the relevant service agreement.",
          ],
        },
        {
          title: "Changes to these terms",
          paragraphs: [
            "We may update these terms as the website or our services change. The current version will always be published on this page, with the updated month and year shown above.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [
            `Questions about these terms can be sent to ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
