import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions from this connection. Please try again later." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.company_website_confirm) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Arrise Digital <onboarding@resend.dev>";

  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set. Add it to .env.local to enable form delivery.",
    );
    return NextResponse.json(
      {
        error: `Email delivery is not configured on this deployment yet. Please email ${site.email} directly and we will respond from there.`,
      },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Business", data.businessName || "—"],
    ["Website / social", data.website || "—"],
    ["Service", data.service],
    ["Budget", data.budget],
    ["Preferred contact", data.preferredContact],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px">
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#777;margin:0 0 8px">New project enquiry</p>
      <h1 style="font-size:26px;line-height:1.2;margin:0 0 24px">${escapeHtml(data.fullName)} — ${escapeHtml(data.service)}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:10px 12px 10px 0;border-bottom:1px solid #e5e5e5;color:#777;width:38%;vertical-align:top">${label}</td>
            <td style="padding:10px 0;border-bottom:1px solid #e5e5e5">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#777;margin:28px 0 8px">Project description</p>
      <div style="font-size:14px;line-height:1.7;white-space:pre-wrap;background:#f7f7f5;padding:16px;border-radius:8px">${escapeHtml(data.description)}</div>
      <p style="font-size:12px;color:#999;margin-top:28px">Sent from the Arrise Digital website contact form.</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New project enquiry — ${data.fullName} (${data.service})`,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend error:", response.status, detail);
      return NextResponse.json(
        {
          error: `We could not deliver your enquiry right now. Please email ${site.email} directly.`,
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] Delivery failed:", error);
    return NextResponse.json(
      { error: `We could not deliver your enquiry right now. Please email ${site.email} directly.` },
      { status: 502 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New enquiry from ${data.fullName} (${data.service}) — ${data.email}`,
          enquiry: data,
        }),
      });
    } catch (error) {
      console.error("[contact] Webhook notification failed:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
