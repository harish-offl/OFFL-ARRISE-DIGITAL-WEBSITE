import type { ReactNode } from "react";
import {
  deliveredServices,
  hasService,
  hasWebsite,
  SERVICE_LABELS,
  type PortfolioProject,
} from "@/data/portfolio";
import { MediaGallery } from "@/components/ui/media-gallery";
import { VideoGallery } from "@/components/ui/video-gallery";
import { WebsitePreview } from "@/components/ui/website-preview";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowLink } from "@/components/ui/button";

type ServiceBlockData = {
  label: string;
  summary: string;
  body: ReactNode;
};

export function DeliveredServices({ project }: { project: PortfolioProject }) {
  const services = deliveredServices(project);
  const accent = project.accent;

  const blocks: ServiceBlockData[] = [];

  const websiteService = project.services.find(
    (service) => service === "Website Development" || service === "Website Design",
  );
  if (websiteService && project.website?.enabled && project.website.url) {
    blocks.push({
      label: SERVICE_LABELS[websiteService],
      summary: project.description,
      body: (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <WebsitePreview
              url={project.website.url}
              title={project.client}
              monogram={project.monogram}
              accent={accent}
            />
          </div>
          <div className="lg:col-span-5">
            <dl className="space-y-5 rounded-xl border border-line bg-surface p-6 md:p-7">
              <div>
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                  Deliverable
                </dt>
                <dd className="mt-1 font-display text-base font-medium text-ink">
                  Responsive {SERVICE_LABELS[websiteService].toLowerCase()}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                  Live website
                </dt>
                <dd className="mt-1 break-all text-sm text-ink/70">
                  {project.website.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted">
                  Website screenshots
                </dt>
                <dd className="mt-2">
                  <MediaGallery
                    images={project.media.websiteShots}
                    accent={accent}
                    dense
                    pendingLabels={["Website screenshot 01", "Website screenshot 02"]}
                  />
                </dd>
              </div>
              <div className="border-t border-line pt-5">
                <ArrowLink href={project.website.url} external>
                  Visit live website
                </ArrowLink>
              </div>
            </dl>
          </div>
        </div>
      ),
    });
  }

  if (hasService(project, "Video Production")) {
    blocks.push({
      label: SERVICE_LABELS["Video Production"],
      summary:
        "Produced video deliverables for the client — every clip stays playable from this page, with poster previews and full playback controls.",
      body: (
        <VideoGallery
          videos={project.media.videos}
          accent={accent}
          pendingLabels={["Video 01", "Video 02"]}
        />
      ),
    });
  }

  if (hasService(project, "Social Media Management")) {
    blocks.push({
      label: SERVICE_LABELS["Social Media Management"],
      summary:
        "Approved posts, reels covers and campaign creatives managed for the brand's channels.",
      body: (
        <MediaGallery
          images={project.media.socialPosts}
          accent={accent}
          pendingLabels={["Social post 01", "Social post 02", "Reel cover 01"]}
        />
      ),
    });
  }

  if (hasService(project, "Content Creation")) {
    blocks.push({
      label: SERVICE_LABELS["Content Creation"],
      summary:
        "Promotional assets and content creatives developed to keep the brand publishing with a consistent visual system.",
      body: (
        <MediaGallery
          images={project.media.content}
          accent={accent}
          pendingLabels={["Content creative 01", "Content creative 02"]}
        />
      ),
    });
  }

  if (hasService(project, "Meta Ads Management")) {
    blocks.push({
      label: SERVICE_LABELS["Meta Ads Management"],
      summary:
        "Meta advertising campaigns planned and run for the brand, with campaign creatives and documentation.",
      body: (
        <MediaGallery
          images={project.media.metaAds}
          accent={accent}
          pendingLabels={["Campaign creative 01", "Campaign creative 02"]}
        />
      ),
    });
  }

  return (
    <section className="border-t border-line py-section" id="services-delivered">
      <div className="shell">
        <SectionHeading
          label="02 / Services delivered"
          title={`Everything we handled for ${project.client}.`}
          description={`${blocks.length} discipline${blocks.length === 1 ? "" : "s"} delivered as one engagement — scroll through each service below.`}
        />

        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          {blocks.map((block, index) => (
            <article key={block.label} className="scroll-mt-28">
              <Reveal>
                <div className="flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-start md:gap-10 md:pt-8">
                  <div className="md:w-56 md:shrink-0">
                    <span className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.05em] text-ink/15">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <h3 className="mt-3 font-display text-xl font-medium leading-tight tracking-[-0.02em] text-ink md:text-2xl">
                      {block.label}
                    </h3>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="max-w-prose font-body text-[0.9375rem] leading-relaxed text-muted">
                      {block.summary}
                    </p>
                    <div className="mt-7">{block.body}</div>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectGallery({ project }: { project: PortfolioProject }) {
  const accent = project.accent;
  const images = [
    ...project.media.websiteShots,
    ...project.media.socialPosts,
    ...project.media.content,
    ...project.media.metaAds,
    ...project.media.gallery,
  ];

  const videoCount = project.media.videos.length;
  const hasWebsite = hasWebsiteService(project);

  return (
    <section className="border-t border-line py-section" id="gallery">
      <div className="shell">
        <SectionHeading
          label="03 / Project gallery"
          title="The complete asset library."
          description="Every approved image, creative and screenshot delivered for this client, collected in one place."
          aside={
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              {images.length} image{images.length === 1 ? "" : "s"} · {videoCount} video
              {videoCount === 1 ? "" : "s"}
            </span>
          }
        />

        <div className="mt-10 md:mt-14">
          <MediaGallery
            images={images}
            accent={accent}
            pendingLabels={[
              ...(hasWebsite ? ["Website screenshots"] : []),
              ...(videoCount === 0 ? ["Video production stills"] : []),
              "Social media creatives",
              "Campaign visuals",
            ]}
          />
        </div>

        {videoCount > 0 && (
          <p className="mt-6 font-body text-sm text-muted">
            Video deliverables are playable in the Video Production section above.
          </p>
        )}
      </div>
    </section>
  );
}

function hasWebsiteService(project: PortfolioProject) {
  return (
    (hasService(project, "Website Development") ||
      hasService(project, "Website Design")) &&
    hasWebsite(project)
  );
}
