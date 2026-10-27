# naen.me Design Direction

## Status

This document is the visual source of truth for naen.me. It describes the direction for a personal portfolio, not a finished interface. Do not replace these decisions with a generic portfolio template.

## Design Read

Reading this as: a personal software engineer portfolio for thoughtful technical readers, in a cool cinematic galaxy visual language, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

## Core identity

naen.me should feel like visiting a small observatory after midnight. The page is dark, cool, spacious, and observant. It should communicate a person who builds software carefully, notices details, and prefers depth over noise.

The identity has four connected parts:

- **Alam semesta:** the surrounding atmosphere. Use darkness and space to suggest scale, curiosity, and room for thought.
- **Bintang:** a restrained navigation and emphasis motif. Stars mark meaningful points, not empty decoration.
- **Kucing:** a quiet companion presence. The cat should feel independent, warm, and slightly mysterious. It must not turn the portfolio into a mascot page or a cute illustration collection.
- **Software Engineer:** structure, care, and reflection. Show technical work clearly while leaving space for the reasoning behind it.

The concept should be recognizable through its composition and voice, even without a logo or domain name.

## Mood

Use these words as a filter for every visual decision:

- quiet
- cold
- nocturnal
- spacious
- observant
- intimate
- thoughtful
- slightly mysterious

Avoid these directions:

- cyberpunk
- neon sci-fi dashboard
- loud space fantasy
- cute cat merchandise
- generic developer portfolio
- fake terminal aesthetic
- purple-black AI landing page
- decorative stars scattered everywhere

## Color system

The palette is dark and cool. It should feel like blue-black sky and cold paper under low light, not like a neon interface.

| Role | Color | Use |
| --- | --- | --- |
| Deep sky | `#0B1020` | Main page background and the visual ground plane |
| Blue slate | `#182236` | Secondary surfaces, only where separation is needed |
| Cold paper | `#EEF2F6` | Primary text and important content |
| Frosted blue | `#B8C6D9` | The single accent for links, selected states, and star markers |

Color rules:

- Keep the active palette to these colors plus transparent versions of them.
- Do not use blue-to-purple gradients, neon cyan, saturated violet, warm rainbow accents, or colored glow as defaults.
- Use the frosted blue accent sparingly. It should identify a meaningful action or point of focus, not color every link, border, icon, and decoration.
- Verify every text pairing against WCAG AA when implementing the interface. Do not assume a muted color passes on the dark background.
- Use solid backgrounds by default. A gradient is allowed only if it creates a specific depth transition in the night-sky atmosphere, and its purpose must be recorded in the implementation.

**Reason:** A limited cold palette makes the page feel like one place. Darkness gives the content room, while the pale blue accent behaves like a single visible star.

## Typography

Use typography that balances reflection with engineering clarity.

- **Display and personal statements:** a contemporary sans such as Space Grotesk. Its geometry gives the page a modern, cinematic edge without using a fake terminal aesthetic.
- **Body and interface text:** IBM Plex Sans. It keeps project details, navigation, and technical descriptions clear.
- **Code or technical snippets:** use a monospace font only when actual code is being shown. Do not use monospace as the page's personality.
- Use sentence case for labels and navigation. Avoid wide-tracked uppercase labels as decoration.
- Keep the type scale measured. A large statement may be the focal point, but it should not become a poster that hides the actual work.
- Self-host selected fonts or provide strong system fallbacks so the atmosphere does not depend on a blocking font request.

**Reason:** Space Grotesk gives the hero a sharper presence, while IBM Plex Sans keeps the engineer's details precise. The contrast creates a clear visual voice without relying on decoration.

## Composition and rhythm

The layout should behave like a personal field journal, not a SaaS landing page.

- Start with one clear statement and a quiet amount of surrounding space.
- Let selected work appear as a considered vertical sequence or editorial list, not a grid of identical feature cards.
- Use alignment shifts sparingly. A project title, description, and year can have a deliberate relationship without creating a busy collage.
- Let project detail pages give the work most of the space. The portfolio should explain decisions, constraints, and the person's contribution when that information is real.
- Use whitespace as a pause between thoughts. Do not fill empty areas with stars, blobs, gradients, or invented statistics.
- Vary section composition enough to avoid repetition: a statement, a work list, a reflective profile block, and a simple contact ending can each have a different shape.
- Navigation must only point to pages that exist. If there are no notes yet, do not add a Notes link just to complete a template.

**Reason:** The content is a person's work and thinking. An editorial sequence gives each project a moment of attention instead of flattening everything into equal cards.

## Identity motif: constellation notation

Use a small, restrained constellation motif as a recurring structural language:

- A few connected points may mark the start of a project, a selected work item, or a transition between sections.
- The motif should support hierarchy or orientation. It must never become a star field behind every section.
- Project metadata can use a quiet coordinate-like treatment, such as an index or category, only when it describes real content.
- Avoid generic sparkle icons, glowing status dots, and synchronized twinkling animations.
- A star marker is allowed because stars are part of the stated identity, but it must have a clear job: marking a selected project, an active page, or a meaningful transition. The atmospheric field is a separate background layer and stays sparse.

**Reason:** The constellation is the page's signature gesture. It turns the universe concept into navigation and rhythm rather than stock decoration.

## Cat presence

The cat is a secondary character, not the main visual asset.

- Prefer a small recurring detail, silhouette, caption, or authored illustration over a large cartoon mascot.
- Do not generate a logo, cat portrait, avatar, or profile image without explicit confirmation of its form and source.
- If no approved cat asset exists, use text or a clearly labeled placeholder rather than disguising a generated image as personal.
- A cat reference should appear at most in one or two meaningful places so it remains a discovery.
- The cat's tone is calm, independent, and observant. Avoid childish, exaggerated, or sticker-like treatment.

**Reason:** The cat should make the portfolio feel personal without competing with the work or pretending to be a brand mascot.

## Surfaces, borders, and shape

- Keep most content on the deep sky background. Use the blue slate surface only to separate an important region or a real interactive state.
- Prefer thin, visible borders over large shadows. The page should feel grounded, not like a stack of floating cards.
- Use a small radius system: mostly square or softly rounded corners, with a larger radius only for a clearly important surface. Do not make every element a pill.
- Avoid glassmorphism across the navigation, cards, and page shell. If blur is ever used, it is limited to one intentional accent.
- Buttons and links should look like actions, not decorative badges. Their labels must name the action.
- Focus indicators must be visible in the dark theme and meet the non-text contrast requirement.

**Reason:** Flat dark surfaces preserve the feeling of a night sky. Limited elevation keeps hierarchy legible and prevents the page from becoming a generic floating-card interface.

## Motion

MOTION is 2. Motion is atmospheric but restrained.

- Use hover and focus transitions to confirm interaction.
- Stars may pulse at different intervals, while small particles drift slowly through the scene.
- One passing object may cross the sky occasionally, with a long pause between appearances.
- The approved minimal cat silhouette may sway slowly as a low-contrast background detail.
- A restrained scroll parallax separates the nebula, dust, stars, and hero foreground into depth layers. It is disabled on touch devices and for reduced-motion preferences.
- Do not use scroll choreography or animation on every element.
- Respect `prefers-reduced-motion` by removing nonessential transitions.
- Never use motion to compensate for empty content.

**Reason:** Slow asynchronous movement and depth layers make the galaxy feel inhabited without turning the portfolio into a spectacle. The cat and passing object add personality, while reduced-motion and touch fallbacks keep the scene comfortable.

## Voice and copy

Write in a first-person voice that is quiet, direct, and specific.

- Explain what was built, why a decision was made, and what the person contributed.
- Let the technical detail and the personal reflection sit next to each other without forcing either one to sound grand.
- Use Indonesian, English, or a deliberate combination only after the language choice is confirmed. Do not mix languages randomly.
- Avoid slogans, startup claims, fake numbers, invented outcomes, testimonials, and generic phrases such as "next generation" or "seamless".
- Do not use a claim when a concrete description would be stronger.
- Keep the cat and universe references occasional. The page should not narrate every idea as a metaphor.
- No em dash characters in interface copy.

## Page structure guidance

The page structure must follow the real content available at implementation time.

A sensible first version may include:

1. A home page with a personal statement, selected work, and a real contact path.
2. A work index only if there are enough real projects to list.
3. A detail page for each real project, with context and contribution.
4. An about page if there is enough personal material to make it useful.
5. Notes only after there are actual notes to publish.

This is guidance, not permission to fabricate content. Empty or unfinished areas should be omitted or labeled honestly.

## Responsive and accessible behavior

- Design mobile as a distinct composition, not a squeezed desktop page.
- Stack project content when columns stop being readable. Never allow horizontal overflow.
- Keep interactive targets at least 44px tall and give adjacent controls enough space.
- A mobile menu must have a visible text label, keyboard support, and a clear open and close state.
- Preserve focus order and visible focus styling.
- Test text at 200% zoom and verify that long project titles, links, and code snippets reflow without clipping.
- Every data-bearing interactive view needs empty, loading, and error states. A static content page should not pretend to have data states it does not need.
- Test the dark palette for contrast, keyboard access, reduced motion, and mobile breakpoints before delivery.

## Asset boundaries

No final logo, cat illustration, avatar, profile photo, project screenshot, statistic, testimonial, or personal claim may be invented. Ask for the asset, use a clearly labeled placeholder, or leave the space out.

The universe and cat concepts define the direction. The approved asset for this iteration is a small, minimal cat silhouette in inline SVG. It is atmospheric decoration, not a logo, avatar, or mascot.

## Decision log

- **Dark, cold palette:** matches the requested quiet nocturnal feeling and gives the portfolio a distinct visual ground.
- **Sparse stars:** turns the stated universe concept into a navigation motif instead of generic background decoration.
- **Subtle cat presence:** makes the page personal while keeping software work as the main content.
- **Galaxy field:** gives the universe concept a visible, atmospheric role instead of reducing it to a few dots.
- **Space Grotesk plus IBM Plex Sans:** gives the hero a cinematic geometric voice while keeping technical information readable.
- **Vertical editorial work list:** lets real projects receive different levels of attention instead of forcing equal feature cards.
- **Atmospheric motion and depth:** gives the galaxy a sense of space through slow stars, particles, a passing object, a dark cat silhouette, and subtle scroll parallax.
- **No invented assets or claims:** keeps the portfolio personal and trustworthy.
