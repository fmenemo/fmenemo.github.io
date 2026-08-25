# Ticket 18: the four checks that had to be done in a browser

One acceptance criterion asks for four things a test cannot see: the measure of
the longest bullet at 1280px, digits that line up in the Principal role's
bullets, the CV button moving under a press, and no bullet ending on a stranded
word at either 1280px or 390px. jsdom lays nothing out and applies no
stylesheet, so all four were read off a real render. This is what they found.

The criterion says "recorded in the ticket", and this text is on #18 as
[a comment](https://github.com/fmenemo/fmenemo.github.io/issues/18#issuecomment-5414809948).
It is here too because the screenshots are here: a comment can carry the
numbers but not eight pictures the branch already holds.

## How it was measured

`npm run build`, served with `vite preview`, driven through Chrome's DevTools
Protocol. Two things about the method matter:

- **The viewport is emulated, not a window.** Chrome will not open a window
  narrower than 500px on macOS, so a 390px check made with `--window-size`
  would really be a 500px check. `Emulation.setDeviceMetricsOverride` gives a
  real 390px viewport. Ticket 17's record found the same thing at 320px.
- **A line is measured, not estimated.** For every bullet, a `Range` over each
  character gives that character's rectangle. Characters sharing a top are one
  line. That gives the real per-line character count after wrapping, rather
  than a division of pixel width by an assumed character width.

Both editions were measured, at both widths. The theme is a `localStorage`
choice read pre-paint, set to `light` for the screenshots.

## What the four checks found

### The measure at 1280px

| Edition | Width  | Bullets | Longest line |
| ------- | ------ | ------- | ------------ |
| English | 1280px | 25      | 64 chars     |
| English | 390px  | 25      | 46 chars     |
| Spanish | 1280px | 24      | 63 chars     |
| Spanish | 390px  | 24      | 45 chars     |

64 characters at the widest, against the "about 65" the ticket asks for.

The cap that produces it is `max-w-[30rem]`, and the obvious `max-w-[65ch]` is
wrong. `ch` is the width of a zero, and in Geist Sans a zero is wider than the
average letter, so 65ch measured 698px and took **93 characters** of this
prose. Six caps were measured on the page itself:

| Cap    | Width  | Longest line | Stranded words |
| ------ | ------ | ------------ | -------------- |
| 65ch   | 698px  | 93           | 0              |
| 34rem  | 544px  | 76           | 0              |
| 32rem  | 512px  | 68           | 0              |
| 31rem  | 496px  | 67           | 0              |
| 30rem  | 480px  | 64           | 0              |
| 29rem  | 464px  | 62           | 0              |
| 28rem  | 448px  | 60           | 0              |

30rem it is. The cap sits on the `ul`, and the employer header above it still
spans the whole content column: 698px against the list's 480px.

### Digits in the Principal role's bullets

`font-variant-numeric: tabular-nums` on the body, read back as `tabular-nums`
on a bullet. What that buys is every digit occupying the same box, which is
what a `Range` around each run of digits in the Principal bullets confirms:

| Digits | Widths                                            |
| ------ | ------------------------------------------------- |
| One    | `2`, `3`, `2`, `3` all 9.609px                    |
| Two    | `25`, `90`, `95`, `50`, `34` all 19.219px (`90` at 19.203) |
| Three  | `100`, `000`, `100`, `000`, `850` all 28.813px    |

`850` and `100` measuring the same is the check. With proportional figures they
would not, which is why `850ms` beside `34ms` jittered before.

The remaining 0.016px spread is subpixel rounding in the range rectangles, not
two different glyph widths.

### The pressed CV button

At rest the button's top edge is at 464.53px. Held down with a real
`Input.dispatchMouseEvent`, it is at 465.53px, with `translate` computed as
`0px 1px`. Released, it is back at 464.53px. The fill transition reads
`0.2s` over `background-color` and the other colour properties.

Under `prefers-reduced-motion`, `index.css` zeroes the transition and adds
`*:active { translate: none !important }`, because a pixel drop is motion
whether or not anything transitions into it. Tailwind v4 compiles
`active:translate-y-px` to the `translate` property rather than `transform`,
which is the property that rule has to name. That was read out of the built
stylesheet, not assumed.

### Stranded words

None. Zero bullets end on a single word, in either edition, at 1280px or at
390px, and none did at any of the six caps measured above either.
`text-wrap: pretty` is on `p` and `li`, so the browser looks ahead over the
last lines rather than filling greedily.

Neither width scrolls horizontally.

## Also read, since the render was up

Light mode, English, at 1280px:

- A bullet is `rgb(17, 17, 17)`, 16px, Geist Sans, with a 1px left border. Ink,
  body size, hairline kept.
- The employer's location and span is `rgb(95, 95, 95)`, 11px, Geist Mono. The
  muted colour stayed on the metadata.
- The role dates are `rgb(204, 34, 0)`, 11px, Geist Mono. Accent, unchanged by
  this ticket.
- The Contact email is `rgb(17, 17, 17)`, 14px, Geist Mono, `lowercase`,
  `letter-spacing: normal`. The value voice, distinct from the label beside it.

## The screenshots

Both editions, both widths, light mode, Experience and Contact:

`en-1280px-light-experience.png`, `en-1280px-light-contact.png`,
`en-390px-light-experience.png`, `en-390px-light-contact.png`, and the four
`es-` files beside them.
