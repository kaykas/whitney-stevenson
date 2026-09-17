import type { MetadataRoute } from "next";
import { BOT_POLICY, SITE_ORIGIN } from "@/lib/bot-policy";

/**
 * Rendered from `src/lib/bot-policy.ts` rather than hand-written groups, so the
 * allow/disallow decision for an agent can't drift from the recorded intent for
 * it. Read that file before changing anything here.
 *
 * Verified on every build by `scripts/check-bot-policy.mjs` (wired as
 * `postbuild`, alongside the outgoing-link and meta-description guardrails).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...BOT_POLICY.map(({ token, allow }) =>
        allow
          ? { userAgent: token, allow: "/" }
          : { userAgent: token, disallow: "/" },
      ),
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
