"use client";

import { useEffect, useState } from "react";
import { team } from "@/data/team";
import { ImageUpload } from "@/components/ui/image-upload";

export default function TeamClient() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, "idle" | "uploading" | "done" | "error">>({});

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const member of team) {
      if (member.image) next[member.id] = member.image;
    }
    setUrls(next);
  }, []);

  const handleUpload = (memberId: string) => (urls: string | string[]) => {
    const url = Array.isArray(urls) ? urls[0] : urls;
    setUrls((prev) => ({ ...prev, [memberId]: url }));
    setStatus((prev) => ({ ...prev, [memberId]: "done" }));
    setTimeout(() => setStatus((prev) => ({ ...prev, [memberId]: "idle" })), 1500);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="shell py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-[clamp(1.75rem,4vw,3rem)] fw-bold leading-[1.05] tracking-[-0.04em] text-ink mb-2">
          Team Member Images
        </h1>
        <p className="max-w-xl font-body text-[0.9375rem] leading-relaxed text-muted mb-10">
          Upload a portrait for each team member. Images are stored in Supabase Storage under the
          <code className="font-mono text-xs bg-night/10 px-1.5 py-0.5 rounded">team/</code> folder. Copy the
          returned URL into <code className="font-mono text-xs bg-night/10 px-1.5 py-0.5 rounded">data/team.ts</code>.
        </p>

        <div className="space-y-8">
          {team.map((member) => (
            <section
              key={member.id}
              className="border border-line rounded-xl bg-paper p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    {member.number}
                  </span>
                  <h2 className="font-display text-xl font-bold leading-none tracking-tight text-ink">
                    {member.name}
                  </h2>
                  <span className="ml-auto text-[0.75rem] font-mono text-muted">
                    {member.designation}
                  </span>
                </div>

                {member.image && urls[member.id] && (
                  <img
                    src={urls[member.id]}
                    alt={member.name}
                    className="h-24 w-24 rounded-full object-cover border border-line bg-night/5"
                  />
                )}
              </div>

              <ImageUpload
                value={urls[member.id] ? [urls[member.id]] : []}
                folder="team"
                onUpload={handleUpload(member.id)}
                onRemove={() => {
                  setUrls((prev) => {
                    const next = { ...prev };
                    delete next[member.id];
                    return next;
                  });
                }}
              />

              {urls[member.id] && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[0.6875rem] text-muted">
                    Supabase URL:
                  </span>
                  <div className="flex-1 flex items-center gap-2 rounded border border-line bg-night/5 text-[0.6875rem] font-mono text-ink truncate">
                    <span className="mr-2">{urls[member.id]}</span>
                    <button
                      type="button"
                      onClick={() => copy(urls[member.id])}
                      className="p-1 text-muted hover:text-ink"
                      title="Copy URL"
                    >
                      📋
                    </button>
                  </div>
                  <span
                    className={`text-xs font-medium ${status[member.id] === "done" ? "text-lime-dark" : "text-muted"}`}
                  >
                    {status[member.id] === "done" ? "Uploaded" : status[member.id] === "error" ? "Error" : ""}
                  </span>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-line">
          <p className="text-[0.75rem] text-muted">
            After copying all URLs into <code className="font-mono text-xs bg-night/10 px-1.5 py-0.5 rounded">data/team.ts</code>,
            the <code className="font-mono text-xs bg-night/10 px-1.5 py-0.5 rounded">/team</code> page will display them
            automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
