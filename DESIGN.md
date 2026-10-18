# Visual system

## Scene and theme

A creative lead opens a filmmaker's portfolio on a laptop, pauses at a saturated portrait cover, then watches advertising samples within the same dim, colored environment. Use the supplied rainbow-lit image for a drenched photographic cover. Continue its purple, indigo and orange light into one uninterrupted background through the work, experience and contact sections.

## Selected reference

User-supplied Cyber Ronin hero prompt: full viewport, three-line display title at upper left, small action controls, compact film teaser at lower left, concise information at lower right, pointer spotlight and staggered entrances. Replace the prompt's fictional product and hero images with actual personal content and the supplied portrait.

## Colors

Use OKLCH tokens. Cream text is approximately oklch(90% 0.064 76); warm orange accent oklch(68% 0.16 47); plum-ink base oklch(15% 0.024 308); dimmed cream text uses alpha. The reference's cream and orange roles remain, while the image supplies magenta, yellow and blue. Below the cover, subdued purple, indigo and orange fields continue the portrait's light. Sections remain transparent instead of becoming separate black blocks. Thin cream outlines define media and controls without interrupting the shared light field.

## Typography

Orbitron-Medium for English display and short headings, Inter with PingFang SC and Microsoft YaHei for Chinese body text, using the fonts explicitly supplied in the reference prompt. Fluid display size, readable body size, short text blocks. Display copy: HUANG XIYUAN / AIGC / DIRECTOR. Chinese name and role remain visible in ordinary readable type. Work, experience and contact use the same English display treatment with concise Chinese descriptions, so the cover's typographic hierarchy carries through the whole page.

## Composition

Full-height cover with absolute photographic layers. Keep the person near the center-right. A directional dark overlay gives left copy contrast. Upper-left headline, upper-right navigation, lower-left TVC teaser, lower-right personal capability summary. Preserve this cover composition and its pointer spotlight. Below the cover: one wide TVC player and three proportion-preserving UGC players, followed by compact resume and contact sections. Shared gutters, fine cream rules and the continuous colored background connect these areas. A compact navigation appears after the visitor leaves the cover, providing direct access to work, experience and contact.

## Components

Thin cream outlines, pill-shaped navigation and filter controls, circular play controls, and 16px corner radii on media frames form one component system. Keep the small cover teaser, underlined text links, one expandable work note per film, chronological experience rows, and mail and copy-WeChat controls. Use HXY consistently for the cover and floating navigation marks. In the contact section, place email and WeChat below the left headline; use the right column for three concise capability rows with resume-confirmed tools. Stack these columns on mobile, with contact details before capabilities.

Every film has a clear play affordance and a visible playing state. Preserve native video controls for seeking, sound and fullscreen, and keep single-film playback behavior. Use inline players rather than a video modal. Preserve film duration, sound and source aspect ratio. The upgraded soda TVC uses an optimized 1080p web edition, and UGC retains its source dimensions. All videos load on demand. Keep work experience and confirmed capabilities without adding unverified commercial results. Omit education from the webpage at the user’s request; the downloadable source resume stays intact.

## Motion

Keep the orchestrated cover entrance with image scale and staggered word reveals. A pointer spotlight reveals the same original portrait at full brightness over the darker base. Limit spotlight animation to the hero.

Use one easeOutQuint curve across page reveals and interface transitions, without bounce. Scroll entrances animate opacity and transforms for 650–800ms with restrained staggering. Hover feedback lasts 180–280ms. Work filters use a short fade when the visible selection changes. Do not animate layout properties or add perpetual decorative motion to the content.

Honor prefers-reduced-motion by removing spotlight tracking and scroll/filter movement, making content and state changes immediately readable. Coarse pointers and touch devices receive visible controls without depending on hover; motion must never block playback, navigation or reading.

## Responsive behavior

Desktop cover is one viewport. At tablet sizes tighten gutters and type. At 720px and below allow the hero to grow naturally, use a single-column composition and keep the portrait visible. At 480px and 360px reduce gutters and teaser dimensions. Video collection stacks on mobile, maintains the original aspect ratios and never crops the actual video. All major controls remain keyboard-accessible.

## Delivery

One index.html with inline CSS and vanilla JavaScript, local media under assets, no framework and no build step. External font links are optional enhancements; system fallbacks keep the site usable offline. Package the directory for portability.
