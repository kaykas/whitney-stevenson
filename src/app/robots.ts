import type { MetadataRoute } from "next";
import { BOT_POLICY, SITE_ORIGIN } from "@/lib/bot-policy";

/**
 * Rendered from `src/lib/bot-policy.ts` rather than hand-written groups, so the
 * allow/disallow decision for an agent can't drift from the recorded intent for
 * it. Read that file before changing anything here.
 *
 * Verified on every build by `scripts/check-bot-policy.mjs` (wired as
 * `postbuild`, alongside the outgoing-link and meta-description guardrails).
 *
 * WHY EVERY ALLOW GROUP ALSO EMITS AN EMPTY `Disallow:`
 * -----------------------------------------------------
 * `Allow:` is a later addition to the robots.txt convention — the original spec
 * defined `Disallow:` only. RFC 9309 permits an Allow-only group, but parsers
 * written to the older spec expect at least one `Disallow` per group and can
 * treat a group without one as malformed, which discards the group. For a bot
 * that then finds no group of its own, behaviour falls somewhere between "use
 * `*`" and "no usable record" depending on the implementation.
 *
 * `Disallow:` with an empty value is the original spelling of "nothing is
 * forbidden". Emitting it alongside `Allow: /` says the same permissive thing
 * twice, in both dialects, so no parser generation has to guess. Costs one line
 * per group and removes a whole class of "why did that crawler skip us".
 *
 * `disallow: [""]` (an array), not `disallow: ""` — Next's serializer guards
 * with a truthiness check, so a bare empty string is silently dropped.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: [""] },
      ...BOT_POLICY.map(({ token, allow }) =>
        allow
          ? { userAgent: token, allow: "/", disallow: [""] }
          : { userAgent: token, disallow: "/" },
      ),
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
