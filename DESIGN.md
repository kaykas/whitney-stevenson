# DESIGN.md — whitneystevenson.com

Editorial hospitality and B2B event marketing portfolio for Whitney Stevenson.

## Palette

| Role | Token | Hex / Value | Usage |
| --- | --- | --- | --- |
| Ground | `--bg-sand` | `#F6F1F3` | Primary page canvas, badge fill, light surfaces |
| Dark surface | `--bg-dark` | `#240F19` | Objective band dark editorial canvas |
| Primary ink | `--text-dark` | `#2B1722` | Body copy, borders, dark badges (14.5:1 on ground) |
| Muted ink | `--text-muted` | `#5A3B49` | Captions, table headers, note metadata, placeholders (>=7:1 on ground) |
| Brand accent | `--accent-orange` | `#7A1D42` | Display headings, labels, stat figures, CTAs (8.7:1 on ground) |
| Light ink | `--text-light` | `#F6F1F3` | Text and borders on dark section |
| Dark display ink | `.dark-content .serif-large` | `#F2CDD8` | Warm rose-ivory display headline on `#240F19` (11.9:1) |
| Hairline rule | `--grid-line` | `rgba(122, 29, 66, 0.1)` | Editorial 1px grid rails and section dividers |
| Error ink | `.form-error` | `#B1273D` | Contact form validation feedback |

## Typography

- **Display / Editorial Serif**: `'Playfair Display', ui-serif, Georgia, serif` (weights `400`, `500`, italic `400`)
- **UI / Body Sans**: `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif` (weights `400`, `500`, `600`)

### Type Scale

| Class | Family | Size | Line Height | Tracking |
| --- | --- | --- | --- | --- |
| `.serif-huge` (H1) | Playfair Display | `clamp(3.25rem, 6.2vw, 5.5rem)` | `0.92` | `-0.02em` |
| `.serif-large` (H2) | Playfair Display | `clamp(2.5rem, 5vw, 4rem)` | `1.1` | `-0.01em` |
| `.serif-medium` (H2/H3) | Playfair Display | `clamp(1.5rem, 3vw, 2.5rem)` | `1.2` | normal |
| `.stat-number` | Playfair Display | `2.5rem` | `1.1` | normal |
| `.post-body` | Playfair Display | `17px–18px` | `1.75` | normal |
| `.fit-answer` / `.fit-cta` | DM Sans | `16px` | `1.6` | normal (`max-width: 560px`) |
| `.sans-body` | DM Sans | `14px` | `1.6` | normal (`max-width: 400px`, `text-wrap: pretty`) |
| `.sans-label` / `.side-text` / `.oval-badge` | DM Sans | `12px` | `1.3` | `0.05em–0.1em`, uppercase |

## Layout & Spacing

- **Outer shell**: `.page-wrapper` — `max-width: 1600px`, two-column grid (`80px` left `.side-nav` + `1fr` `.main-content`), bordered with `1px solid var(--grid-line)`. Collapses to single column at `<= 1024px`.
- **Section rhythm**: `60px–120px` vertical padding, `40px` horizontal padding (`24px` below `1024px`), separated by `1px solid var(--grid-line)`.
- **Measure**: Body copy constrained to `400px` (`.sans-body`), `560px` (`.fit-answer`, `.fit-cta`), or `760px` (`.post-article`) to stay under 80 characters per line.

## Radii & Elevation

- **Hero / article hero photography**: `border-radius: 28px`, shadow `0 20px 60px -20px rgba(43, 23, 34, 0.35)`.
- **Field strip photography**: `border-radius: 22px`, shadow `0 12px 30px -12px rgba(43, 23, 34, 0.25)`.
- **Story / author imagery**: `border-radius: 18px`.
- **Form notices**: `border-radius: 12px`.
- **Interactive controls**: `.circle-btn` (`48x48px`, `border-radius: 50%`), `.oval-badge` (`border-radius: 50px`, solid `--bg-sand` fill when overlapping imagery).

## Accessibility & Motion

- All body, label, caption, and placeholder text meets WCAG AA (`>= 4.5:1`).
- Minimum UI label size is `12px` (above the `11px` floor).
- Form fields preserve visible keyboard focus via `:focus-visible` (`2px solid var(--accent-orange)`, `outline-offset: 2px`).
- Transitions target explicit properties (`transform` on `.circle-btn`), never `transition: all`.
