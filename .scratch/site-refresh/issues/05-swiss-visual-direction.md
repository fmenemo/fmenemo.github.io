# 05: Swiss visual direction

**What to build:** The site stops looking like a generated template and starts looking like something a person designed. A visitor sees a left-aligned, structural page: a visible grid, hairline and heavy rules doing the dividing, a monospace face for dates and employers, one accent colour, and a lot of whitespace. The copy is still the existing copy at this point. This ticket changes the form, ticket 06 changes the words.

The reference is direction B from the mockups reviewed with Fran.

**Blocked by:** 04 (Theming architecture). Restyling is only cheap once the design lives in tokens.

**Status:** ready-for-agent

- [ ] The page is a single scrolling document with anchor navigation and no router
- [ ] Layout is left-aligned and grid-structured, not centred
- [ ] Rules replace cards: no glass or backdrop-blur, no gradients, no pill chips as a content structure
- [ ] Dates and employer names are set in the monospace face, as metadata
- [ ] One accent colour is used, deliberately and sparingly
- [ ] The decorative floating shapes, the pulsing availability dot and the emoji in body copy are gone
- [ ] Motion is limited to CSS transitions on interactive states, with no scroll-triggered entrance or stagger animation
- [ ] `prefers-reduced-motion` is honoured
- [ ] Both light and dark are designed, with light as the primary composition
- [ ] The page reads correctly at mobile widths, and the body never scrolls horizontally
- [ ] Heading hierarchy is sensible (a single `h1`), and every interactive element has a visible focus state and an accessible name
- [ ] Existing tests still pass
- [ ] `npm run build` and `npm run lint` pass
