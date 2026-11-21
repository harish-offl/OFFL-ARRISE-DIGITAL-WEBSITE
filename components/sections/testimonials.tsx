import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonialPlaceholder, testimonials } from "@/data/testimonials";

const markers = [
  { title: "Verified only", description: "Published with written client approval." },
  { title: "References on request", description: "Ask for a contact in your industry." },
  { title: "No invented results", description: "We would rather show less and mean it." },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-line py-section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              label="08 / In their words"
              title={
                <>
                  Good Partnerships
                  <br />
                  Create Better{" "}
                  <span className="font-serif font-normal italic tracking-[-0.02em]">Results.</span>
                </>
              }
              description="The best proof is a client who would work with us again. We let their words do that job — when we have them in writing."
            />
          </div>

          <div className="lg:col-span-7">
            {testimonials.length > 0 ? (
              <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                  <Reveal key={testimonial.name}>
                    <figure className="rounded-xl border border-line bg-surface p-7 md:p-9">
                      <blockquote className="font-serif text-2xl italic leading-snug text-ink md:text-3xl">
                        “{testimonial.quote}”
                      </blockquote>
                      <figcaption className="mt-6 text-sm text-muted">
                        <span className="font-display fw-medium text-ink">{testimonial.name}</span> ·{" "}
                        <span className="font-body">{testimonial.business}</span> · <span className="font-body">{testimonial.service}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-7 md:p-10">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-10 select-none font-serif text-[11rem] leading-none text-lime"
                  >
                    “
                  </span>
                  <p className="relative max-w-lg font-serif text-2xl italic leading-snug text-ink md:text-[1.75rem]">
                    {testimonialPlaceholder.title}
                  </p>
                  <p className="relative mt-5 font-body max-w-md text-sm leading-relaxed text-muted">
                    {testimonialPlaceholder.description}
                  </p>
                  <div className="relative mt-7">
                    <ButtonLink href="/contact" variant="solid" size="md" arrow="up-right">
                      Ask for references
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            )}

            <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              {markers.map((marker) => (
                <div key={marker.title} className="bg-surface p-4">
                  <p className="flex items-center gap-2 font-mono text-[0.6875rem] fw-semibold uppercase tracking-[0.12em] text-ink">
                    <span className="size-1 rounded-full bg-lime" />
                    {marker.title}
                  </p>
                  <p className="mt-2 font-body text-[0.75rem] leading-relaxed text-muted">
                    {marker.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
