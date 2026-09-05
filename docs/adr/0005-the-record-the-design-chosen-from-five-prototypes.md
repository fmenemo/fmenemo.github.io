# The Record: the design, chosen from five prototypes

The site's design was the Swiss pass from the site refresh, and the one attempt to move it on, [#16](https://github.com/fmenemo/fmenemo.github.io/issues/16), was merged on 2026-08-25 and reverted the next morning. It was worse than what it replaced, and there had been no way to know that before it was live. So the design was not argued this time: five structurally different variants were drawn on the real page with the real content, switchable in a browser, and Fran chose one by looking at them, in both themes and at phone width, alongside the site as it stood. The verdict is recorded on [#26](https://github.com/fmenemo/fmenemo.github.io/issues/26).

We decided to build **variant E, the Record**, whole, and to make its rules the site's rules.

The direction is in the name. The page is a record of a person rather than a page about one: a running head at the top edge of every screen, an identification block that says what the record is before it says anything in it, numbered sections opening on a heavy rule, figures in a fixed left column so that a reader scans them down rather than across, and labelled fields on hairlines. Nothing is boxed, banded or carded. The page speaks about itself in one voice — small, narrow, tracked-open uppercase, called **the hand** — so that the record's own hand is never mistaken for the record.

The variant's own design read, which is the sentence the drawing answered to and is now the sentence the build answers to:

> A credibility anchor for a recruiter who already has the name, set as the record itself rather than as a page about it, in a dense index language of running heads, field labels and numbered entries, drawn in one grotesque at two widths on a manila stock; variance 6, motion 2, density 7.

## Considered options

**The four other variants: Editorial (A), Clean product (B), Bold and raw (C), Warm and quiet (D).** Rejected by looking, which is the whole reason they were built. The Spec declined to name a register in advance and drew five directions instead, on the grounds that Fran would not choose one in the abstract and that choosing in the abstract is what produced #16.

**A combination named across variants** — the hero from one, the experience list from another — was offered by the Spec as the answer to "the closest of five" and declined: none of the four earned a part. That the option existed and was not used is worth recording, because it is what makes "variant E, whole" a decision rather than a default.

**Keeping the Swiss pass.** It was in the comparison, at Fran's own request, and it lost on one thing: the evidence. The Swiss page read as a record, which is what E keeps, but set the bullets a recruiter came for at 14px in secondary grey under an identity line that said less at 18px. E gives the evidence the hierarchy the Swiss page lacked, which is the second half of the site's job (CONTEXT.md, `credibility anchor`).

**Restoring #16's choices as such.** Out of scope by the Spec, and unnecessary: any of them was free to return inside a variant that argued for it, and the ones that did — the evidence as primary text, a real 404, a skip link, a pressed state — arrive here on E's terms rather than as a restored revert.

## Consequences

- **The design is a token set and a set of components.** The palette, the type scale, the spacing rhythm and the two settings of the face's width axis live in `@theme` in `src/index.css` (ADR 0002); the three treatments the page answers in — the hand, a link, the action block — live in `src/styles.ts`. Nothing carries a literal, and a restyle is an edit in one of those two files rather than a sweep.

- **Motion is dial 2, and the dial is a rule rather than a mood.** Nothing on this page moves on its own or on scroll. The one moving thing is the rule under a link, which grows from the left edge when a pointer or the keyboard reaches it; a press shows it whole and at once, because a press on a touch screen arrives without a hover before it. Under `prefers-reduced-motion` the rule still appears and does not travel, said in the link's own terms in `src/index.css` beside the sweep that would have covered it anyway, so the preference is legible next to the thing it governs.

- **No texture.** No gradient, no shadow, no glass, no noise, no decorative shape. Two weights of rule and one hairline are the whole of the page's structure, and they are rationed: a third weight is a new decision, not a variation.

- **No imagery of any kind.** No portrait, no generated art, no background image, no icon standing in for a word. Type, rules, spacing and colour do all of the work. This was Fran's decision on the Spec and it overrides the taste skill's instruction to add images; it also overrides the instinct to reach for an icon when a control needs a label, which is why the theme control says what it will do in the edition's own words.

- **Both themes are drawn, each from its own values.** Light is a manila stock and dark is a slate the stock was never printed on. Neither is the inversion of the other, and light stays the primary composition. The system preference is honoured through the class on the root and the pre-paint script in each entry document (ADR 0003), so the first paint is the right one.

- **This reverses the site refresh's visual direction, and that spec now points here.** Gone: the monospace face for dates and employers, the accent that was a signal red, the section band Technologies sat in, and the masthead. Kept and made stricter: left-aligned, a visible grid, hairline and heavy rules as structure, one accent colour, both themes designed with light primary, and motion limited to interactive states behind `prefers-reduced-motion`. The rule about no cards, no glass, no gradients and no scroll-triggered animation is kept as written; the prototype lifted it for the length of the prototype only, and E did not spend it.

- **It also reverses #16, which was merged and reverted.** Its type (Geist and Geist Mono), its fold of Technologies into Recognitions, its grid placement of the hero and its move of the routes out of the hero are not the reasons this design does what it does. Where a decision here looks like one of #16's, it is because a variant argued for it and won by being looked at, which is the gate #16 never had.

- **The routes live once, at the bottom, and that is the one departure from the prototype as approved.** E drew the routes at the top. User story 12 asks for one place on the page where they live, so that the bottom gives a reader something the top did not, and the identification block already carries the CVs, which is the thing a reader actually came for. So email, LinkedIn, GitHub and the location live in the Contact section, the identification block carries none of them, and the colophon under it carries no marks. This is the only place where the built page and the approved picture differ, and it is a departure from the picture rather than from the verdict.

- **The share images and the touch icon are the Record too.** `tools/assets/og-image.css` holds the card's face and palette, every colour a copy of a token beside the token's name, and `public/favicon.svg` carries the ink and the stock for the same reason: a standalone document rendered by Chrome cannot read the app's stylesheet. The stylesheet stays the source of truth and those files follow it, in one run of `npm run render:assets`, which is the command that renders both cards and the icon together (ADR 0004).

- **The prototype survives as the decision's primary source.** The five variants and the switcher are on `prototype/26-five-variants`, out of `main` and merged nowhere. It is what to read before reopening this decision: the four rejected directions exist and can be looked at again, which is a cheaper argument than drawing a fifth.
