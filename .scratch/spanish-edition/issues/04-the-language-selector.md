# 04: The language selector

**What to build:** A visitor on either edition can see that the other one exists, and reach it without losing their place.

The control is deliberately dull: two short labels in the masthead, always visible, no menu, no dropdown, no animation. The masthead is a hairline rule and a few labels and must stay one line at every width the site supports.

Two constraints carry reasoning worth keeping. **Text, not flags:** a flag names a country, and Spanish is not Spain's alone. **The current edition is marked and not a link:** a control that lets you click through to the page you are already on tells the visitor nothing about where they are.

Fragment preservation is the one interaction that matters here. A reader switching language is usually mid-page, and dropping them at the top of a document in a language they just asked for is a worse outcome than not offering the switch. Section anchors were kept in English in ticket 02 precisely so this is a matter of carrying the fragment across unchanged, with no mapping table.

See ADR 0004 and `CONTEXT.md` for the `edition` vocabulary.

**Status:** ready-for-agent

**Blocked by:** 03 (the Spanish edition exists). There is nothing to select between until it does.

- [ ] Both mastheads carry an `EN / ES` control beside the theme toggle, present at every width
- [ ] The current edition is marked and is not a link; the other is a plain anchor to the sibling document
- [ ] The control is text. No flags
- [ ] Switching language from a section anchor lands on the same section in the other edition, not at the top
- [ ] Switching language preserves the visitor's light or dark choice, with no flash of the other theme
- [ ] The masthead stays a single line at every supported width, in both editions
- [ ] The control has an accessible name in the language of the edition it appears in, and the existing guard that every link and button has an accessible name still passes
- [ ] The Spanish edition's navigation labels are Spanish while its anchors stay English, and the existing guard that every in-page anchor points at a section that exists passes for both editions
- [ ] Tests cover the control in both editions from the edition table, not as an English test plus a Spanish one
- [ ] `npm run build`, `npm run lint` and `npm test` pass
