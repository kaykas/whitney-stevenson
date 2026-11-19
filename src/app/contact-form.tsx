"use client";

import { useId, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  // Each control gets a real <label for> (ERRORS.md 2026-11-19, SEOmator
  // a11y-form-labels): placeholder text alone is not an accessible name.
  // The labels are visually hidden so the placeholder-only look is unchanged.
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success">
        <div className="sans-label" style={{ marginBottom: 12 }}>Message sent</div>
        <h3 className="serif-medium" style={{ marginBottom: 12, fontSize: "1.5rem" }}>
          Thank you — I&apos;ll be in touch.
        </h3>
        <p className="sans-body" style={{ fontSize: 12 }}>
          Replies typically land within a couple of business days.
        </p>
      </div>
    );
  }

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <div className="input-group">
        <label htmlFor={`${id}-name`} className="sr-only">Name</label>
        <input id={`${id}-name`} type="text" name="name" placeholder="Name" autoComplete="name" required />
      </div>
      <div className="input-group">
        <label htmlFor={`${id}-email`} className="sr-only">Email</label>
        <input id={`${id}-email`} type="email" name="email" placeholder="Email" autoComplete="email" required />
      </div>
      <div className="input-group">
        <label htmlFor={`${id}-message`} className="sr-only">Message</label>
        <textarea id={`${id}-message`} name="message" placeholder="Message" required />
      </div>
      {status === "error" && (
        <p className="form-error">{errorMsg || "Something went wrong. Please try again."}</p>
      )}
      <div className="form-footer">
        <span className="sans-label" style={{ color: "var(--text-dark)" }}>
          {status === "submitting" ? "Sending…" : "Send Inquiry"}
        </span>
        <button type="submit" className="circle-btn" disabled={status === "submitting"} aria-label="Submit">
          →
        </button>
      </div>
    </form>
  );
}
