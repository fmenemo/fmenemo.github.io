# Ticket #35, what was checked in a browser

The prototype has no tests of its own by decision, so everything below was read
off the running dev server (`npm run dev`, Chrome, 2026-09-04) rather than
asserted. The four screenshots beside this file are variant D, `?variant=d`, as
it stood at the commit that added them.

| File | Viewport | Theme | Pixels |
| --- | --- | --- | --- |
| `variant-d-light-1280.png` | 1280 | light | 1280 x 8800 |
| `variant-d-dark-1280.png` | 1280 | dark | 1280 x 8800 |
| `variant-d-light-320.png` | 320 | light | 320 x 12611 |
| `variant-d-dark-320.png` | 320 | dark | 320 x 12632 |

Each is one continuous capture of the whole document, from the top line to the
footer, and the pixel height of each is the page's own height at that width.
All four are taken at a device pixel ratio of 1, including the 1280px pair:
this variant is set at density 2 and its document is 8800 CSS pixels tall, so
at a ratio of 2 the 1280px capture is 17600px, past what Chrome's full-page
capture can hold, and what comes back wraps and restarts at the top of the page
partway down. That is the same fault #32 hit at 320px, met here one viewport
wider because the page is taller.

The 21px between the two 320px heights is the theme control: "Switch to dark
mode" and "Switch to light mode" are not the same length, and at 320px the top
line wraps one word differently between the themes.

They are here and not on the ticket because a Sandcastle sandbox writes to the
tracker with `GH_TOKEN`, and every route that would put an image on issue #35 is
closed to that credential. Three were tried on 2026-09-04, and what each
returned is below, so the next session does not spend the same hour deriving it
again.

| Route | Attempted as | Result |
| --- | --- | --- |
| The native issue attachment | `POST https://github.com/upload/policies/assets` with the repository id, the file name, its size and `image/png`, bearing the token | `422`, GitHub's HTML error page. The endpoint is the web UI's own form, behind a CSRF token and a signed-in session; a PAT is not a session and there is no REST or GraphQL equivalent of it. |
| Serving the files from the repository, so the comment can link them | `POST /repos/:owner/:repo/git/blobs`, then `/git/trees`, then `/git/commits` | `403 Resource not accessible by personal access token` on all three. The token has no `contents: write`, which also rules out creating a branch or a ref for them, uploading them as release assets, and `git push` — all of them are the same permission. |
| Embedding them in the comment body itself | An `<img src="data:image/png;base64,...">` posted as a comment, then read back with `Accept: application/vnd.github.html+json` | The comment posts, and the rendered HTML comes back as `<img width="20" style="max-width: 100%;">`: GitHub's sanitiser strips the `src` of a data URI, so the image is empty. It would not have fitted regardless — a comment body caps at 65,536 characters and the smallest of these files is 1.2MB. |

So the criterion's "recorded as screenshots on the ticket" cannot be met by this
credential, and the four files below are the record standing in its place. What
closes it is one step in a browser someone is signed into: open issue #35 and
drag the four files from this directory into a comment. From a checkout of
`sandcastle/issue-35` they are already on disk here; from anywhere else,

```
git show sandcastle/issue-35:.scratch/redesign/ticket-35-rendered-checks/variant-d-light-1280.png > variant-d-light-1280.png
```

and the same for the other three names in the table above.

## The variant on the switcher

- `/?variant=d` renders variant D whole, with the bar at the bottom reading
  `D / Warm and quiet`.
- From `d`, the right arrow key goes to `e` and the left arrow key comes back,
  and each step rewrites the URL, so the variant is reload-stable and
  shareable.
- `/` with no `variant` parameter renders today's site: no switcher, no
  `wq-page` element, and `body` still computes to Inter. The prototype's
  dynamic import never runs.
- `npm run build` output carries no occurrence of `fraunces`, `literata`,
  `wq-page` or `Warm and quiet`: the variant, its faces and its stylesheet are
  all inside the `import.meta.env.DEV` branch and Rollup drops them.

## The content, read off the rendered page

Every string in `content.en.ts` was matched against `document.body.innerText`
in the browser: every employer name, location and span, every role title and
its dates, every bullet, every one of the nine sub-bullets of the Shop
programme, every recognition and its date, both independent-work entries, all
fourteen technologies, the identity line, the location and mode, all four
education fields, the email, the LinkedIn label, the GitHub route and the CV
label. Nothing was missing.

`main img`, `main svg` and any element with a `background-image` in its inline
style: zero. There is no imagery of any kind on the page.

## Both widths, both themes

- At 320px, `document.documentElement.scrollWidth` is 320 and `clientWidth` is
  320, in both themes, and no element inside `main` has its right edge past the
  viewport. There is nothing to scroll sideways.
- At 1280px the column holds at 34rem, which is the measure the variant is set
  to; the space either side of it is the design rather than an overflow.
- Dark is drawn from the variant's own `wq-*-dark` tokens, a warm off-black
  with the clay accent lifted and desaturated, not an inversion of the light
  palette. The page follows the class the pre-paint script in `index.html`
  sets: reloading under an emulated `prefers-color-scheme` lands on the right
  theme at first paint, and the control in the top line switches it.

## Motion

One entrance, `wq-settle`, on the opening block, 700ms, and nothing else on the
page animates on its own. `getComputedStyle` on that element reports the
animation running under default preferences; `index.css` flattens it under
`prefers-reduced-motion: reduce`, and `prototype.throwaway.css` sets
`animation: none` on the class for the same query, so the variant honours the
preference on its own terms rather than relying on the site stylesheet.

## The mechanical pre-flight

- **Eyebrows.** None. Every section name is the heading itself, set small; no
  heading on the page carries a second label above it.
- **One label per CTA intent.** The CV is offered once, at the top with the
  person. The routes are offered once, at the end. Neither half repeats the
  other, and the location and mode are stated once.
- **No split header.** There is no header bar: the top line is the edition and
  the theme control, in the page's own voice, with no rule under it.
- **No locale or time strip, no version footer.** The footer is one line: the
  copyright and the name.
- **No three equal cards.** There is not a card anywhere on the page. The
  technologies are running text, not chips.

## What makes it structurally different from variant A

A is a two-column document: a centred nameplate under a double rule, a 54rem
page with an 8rem margin rail carrying every date, a contents nav at the top,
evidence set as paragraphs beside the rail, and the contact list as a ruled
definition table at the foot. D has no rail, no rules and no nav: one 34rem
column from the first word to the last, where the space between two blocks is
the only thing dividing them. It leads with the person rather than announcing
the name: the name is the largest text on both pages, but here it is a line at
2.25rem where A's is a centred nameplate at `clamp(2.5rem, 11vw, 5rem)` under a
double rule, which resolves to 5rem at 1280px — so the name is set at under
half the size — and the identity line follows it at reading size, 1.25rem, with
nothing between the two. A sets its standfirst apart from the nameplate with a
rule and a drop initial; here the name, the location and the identity line read
as one opening paragraph about a person. Its dates are captions under the thing
they belong to instead of numbers out in a margin. Its
evidence is a list hung off soft dashes rather than paragraphs. The Shop
programme is numbered 1 to 9 as a story told in order, where A sets it as a
passage between two hairlines. And its section names are the smallest type on
the page rather than its second largest.
