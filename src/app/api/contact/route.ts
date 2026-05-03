import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let payload: { name?: string; email?: string; company?: string; message?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const company = (payload.company || "").trim();
  const message = (payload.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Whitney's Site <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  // If Resend isn't configured yet, log and acknowledge — the form still feels
  // working to the user, and we don't drop the lead silently when wired up.
  if (!apiKey || !to) {
    console.warn("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not set — message captured to logs only", {
      name,
      email,
      company,
      message,
    });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  const subject = `Whitney site — ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `From: ${name} <${email}>`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #14110f;">
      <p style="text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; color: #8a8278; margin: 0 0 8px;">New message · whitneystevenson.com</p>
      <h1 style="font-family: ui-serif, Georgia, serif; font-size: 22px; margin: 0 0 16px;">${escapeHtml(name)}${company ? ` <span style="color:#8a8278;font-weight:400;">· ${escapeHtml(company)}</span>` : ""}</h1>
      <p style="margin: 0 0 16px;">
        <a href="mailto:${escapeHtml(email)}" style="color:#c2410c;">${escapeHtml(email)}</a>
      </p>
      <div style="white-space: pre-wrap; line-height: 1.6; padding: 16px; background: #faf8f5; border: 1px solid #e6dfd5; border-radius: 12px;">${escapeHtml(message)}</div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        html,
        reply_to: email,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error("[contact] Resend error", res.status, errBody);
      return NextResponse.json({ error: "Could not send right now. Please try again shortly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, mode: "sent" });
  } catch (err) {
    console.error("[contact] fetch error", err);
    return NextResponse.json({ error: "Could not reach the mail service." }, { status: 502 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
