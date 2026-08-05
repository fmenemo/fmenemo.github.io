# 04: The language selector

**What to build:** A visitor on either edition can see that the other one exists, and reach it without losing their place.

The control is deliberately dull: two short labels in the masthead, always visible, no menu, no dropdown, no animation. The masthead is a hairline rule and a few labels and must stay one line at every width the site supports.

Two constraints carry reasoning worth keeping. **Text, not flags:** a flag names a country, and Spanish is not Spain's alone. **The current edition is marked and not a link:** a control that lets you click through to the page you are already on tells the visitor nothing about where they are.

Fragment preservation is the one interaction that matters here. A reader switching language is usually mid-page, and dropping them at the top of a document in a language they just asked for is a worse outcome than not offering the switch. Section anchors were kept in English in ticket 02 precisely so this is a matter of carrying the fragment across unchanged, with no mapping table.

See ADR 0004 and `CONTEXT.md` for the `edition` vocabulary.

**Status:** resolved

**Blocked by:** 03 (the Spanish edition exists). There is nothing to select between until it does.

**Found while building 03:** loading a URL with a fragment does not scroll to the section, on either edition. `http://localhost:4173/#experience` and `/es/#experience` both sit at `scrollY: 0` with the hash in the address bar. The cause is timing rather than the anchors: the sections do not exist in the document when the browser processes the fragment, because React has not rendered yet. This is pre-existing and predates the Spanish edition, but it is the mechanism this ticket's fragment preservation depends on, so carrying the fragment across the selector will not be enough on its own. Confirm the landing behaviour in a browser rather than inferring it from the href.

- [x] Both mastheads carry an `EN / ES` control beside the theme toggle, present at every width
- [x] The current edition is marked and is not a link; the other is a plain anchor to the sibling document
- [x] The control is text. No flags
- [x] Switching language from a section anchor lands on the same section in the other edition, not at the top

  Two halves. The selector's `href` carries `location.hash`, kept current from `hashchange` so it follows the visitor rather than freezing at whatever the document was opened with. The landing bug found while building 03 is real and is fixed here: `useFragmentLanding` scrolls to the fragment after mount, because the browser resolves it against a document whose only element is an empty `#root` and never tries again. Confirmed in a browser both ways: `/#experience` sat at `scrollY: 0` before, and lands with the section at 64px (the `scroll-padding-top`) after, on both editions.

  What this does **not** cover is the visitor who scrolled into a section without clicking an anchor: they carry no fragment, so they switch language and land at the top. The acceptance line above is written as "from a section anchor" and is met, but story 8's "keep my place" is only half true, and the other half needs the masthead to know which section is on screen. Not built here, and deliberately not smuggled in.
- [x] Switching language preserves the visitor's light or dark choice, with no flash of the other theme

  Already true from 03 and unchanged: one storage key, one origin, and the pre-paint script in both documents. Confirmed by navigating `/` → `/es/` with `theme: dark` stored.
- [~] The masthead stays a single line at every supported width, in both editions

  Holds down to 320px, but the section links are what made room. Name, two section links, selector and toggle need 384px of content in the Spanish edition, which does not fit a 320px viewport, so the section links are hidden below 420px (a `--breakpoint-xs` token in `index.css`, per ADR 0002). They are the only part of the masthead a visitor can do without: scrolling reaches every section, which is the same reasoning that keeps the masthead to two links rather than six. The selector cannot yield, because a reader who cannot see the other edition has no way to find it. Measured at 320, 419, 420 and 1440 in both editions: one line, no overflow, every item on the same vertical centre.

  This is the one thing here no test pins. jsdom has no layout, so the suite cannot see a masthead that has wrapped, and the guard is a measurement in a browser rather than an assertion. It is also a visible change to the already-shipped English edition, which nothing in the spec asked for and which this note is the only record of.
- [x] The control has an accessible name in the language of the edition it appears in, and the existing guard that every link and button has an accessible name still passes

  It is a named `nav` landmark ("Language" / "Idioma") rather than a labelled `group`: Chrome prunes a `group` wrapping nothing but text out of the accessibility tree, which took the name with it. Confirmed in the browser's own tree, on both editions.

  The link's own name is "EN Ver esta página en inglés": the visible label first, then where it goes. A name that replaced the two letters on screen would leave a voice-control visitor saying "click EN" with nothing to click (WCAG 2.5.3, Label in Name), and a visually hidden qualifier beside the label computes as "ENVer esta página en inglés", which is not a name anyone can say.
- [x] The Spanish edition's navigation labels are Spanish while its anchors stay English, and the existing guard that every in-page anchor points at a section that exists passes for both editions
- [x] Tests cover the control in both editions from the edition table, not as an English test plus a Spanish one
- [x] `npm run build`, `npm run lint` and `npm test` pass
