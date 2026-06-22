# CareerMate AI — Landing Page

A marketing landing page for **CareerMate AI**, an AI-powered career / job-application practice assistant.
Built with **plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.**

## Tech Constraints

- No frameworks (no React/Vue), no CSS preprocessors, no bundlers.
- Open `index.html` directly in a browser to preview. No npm, no build command.
- Keep dependencies to zero. Web fonts via `<link>` are OK.
- Target modern evergreen browsers. Mobile-responsive is required.

## Files

| File         | Purpose                                  |
|--------------|------------------------------------------|
| `index.html`      | Page markup, all sections in order              |
| `components.html` | Reusable component library / naming reference   |
| `styles.css`      | All styling (single stylesheet)                 |
| `app.js`          | Interactivity (nav, form, dropdown, animations) |
| `UI.png`          | The source-of-truth design mockup               |

## Component Naming Convention

Light BEM in kebab-case (see `components.html` for the canonical markup):

- `.block` — component root: `.btn`, `.card`, `.badge`, `.pill`, `.avatar`, `.avatar-container`
- `.block-element` — a part: `.card-title`, `.card-body`, `.card-media`, `.user-menu-item`
- `.block--modifier` / short `.block-modifier` — a variant: `.btn-primary`, `.btn-secondary`,
  `.card-feature`, `.card-testimonial`, `.badge-primary`, `.avatar-lg`

Reusable building blocks: **Buttons** (`.btn` + `-primary/-secondary/-outline/-ghost/-light` + sizes `-sm/-lg`),
**Cards** (`.card` + `-feature/-testimonial/-promo`), **Badge/Pill** (`.badge`, `.pill`),
**Avatar + user dropdown** (`.avatar`, `.avatar-container` > `.avatar-trigger` + `.user-menu`).

## Page Sections (top → bottom)

Match the order and content of `UI.png`. Use semantic `<section>` elements, each with a clear `id` / class.

1. **Navbar** — `CareerMate AI` logo (left), nav links + CTA button (right). Sticky on scroll.
2. **Hero** — H1 "Your AI Career Practice Partner", subtitle, two buttons (primary filled + outline), robot mascot illustration.
3. **Feature cards row** — 3 cards with small illustrations (e.g. interview, resume chat).
4. **"Still Struggling with Job Applications?"** — left column of pain-point cards, right purple gradient card with rocket: "CareerMate AI helps you fix all of that — smartly."
5. **"Everything You Need to Grow Your Career"** — 2×2 grid of feature cards.
6. **"See CareerMate AI in Action"** — chat-demo UI (message bubbles, play/CTA button).
7. **"Built with the Power of AI Engineering"** — row of tech icons over a gradient glow.
8. **"Trusted by Students Worldwide"** — 2 testimonial cards with avatar photos.
9. **"Get in touch with us"** — dark-background contact form (name, email, message, submit).
10. **CTA banner** — gradient "Ready to level up your career?" + button.
11. **Footer** — logo, links, copyright.

## Design Language

- **Theme:** clean, light background with bold purple/blue gradient accents.
- **Primary accent:** purple/indigo gradient (used on buttons, the rocket card, CTA banner).
- **Contact section:** dark background for contrast.
- **Cards:** white, rounded corners, soft shadows, generous padding.
- **Spacing:** roomy vertical rhythm between sections; centered max-width content container (~1100–1200px).
- **Typography:** use the **system font stack** (no web fonts); large bold section headings, muted gray body text.
- **Images/illustrations:** robot mascot, rocket, avatars, preview thumbnails are rendered as **placeholders** (plain boxes / pure-CSS shapes), not real assets, until art is provided.

### Suggested CSS variables (define in `:root`)
- `--color-primary`, `--color-primary-gradient`, `--color-bg`, `--color-dark`,
  `--color-text`, `--color-text-muted`, `--radius`, `--shadow`, `--container-width`.

## Conventions

- Use CSS custom properties for colors, spacing, and radius — don't hardcode repeated values.
- Prefer Flexbox/Grid for layout. Mobile-first media queries.
- Class naming: simple, descriptive, kebab-case (e.g. `.hero`, `.feature-card`, `.cta-banner`). BEM-ish is fine but keep it light.
- Keep `app.js` small and unobtrusive; attach listeners after DOM load. No inline `onclick`.
- Accessibility: semantic tags, `alt` on images, labels on form inputs, sufficient color contrast.

## Workflow

We build this **one step / one section at a time**. Don't scaffold the whole page at once unless asked.
Confirm each section against `UI.png` before moving to the next.
