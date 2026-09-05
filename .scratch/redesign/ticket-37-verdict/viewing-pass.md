# The viewing pass, #37 criterion 1

Fran, on the running dev server. Twenty views: five variants, two themes, two
widths. This is the order that makes them two sweeps rather than twenty
toggles.

```
npm install
npm run dev
```

Vite prints the port. The prototype mounts on the English entry only, so every
URL below is the root with a `variant` parameter — `/es` has no switcher.

| Variant | URL |
| --- | --- |
| Editorial | `/?variant=a` |
| Clean product | `/?variant=b` |
| Bold and raw | `/?variant=c` |
| Warm and quiet | `/?variant=d` |
| The record | `/?variant=e` |

Left and right arrow keys cycle the five and wrap, and the URL follows what is
on screen, so any single view can be reloaded or sent to someone.

## Why it is two sweeps

The theme choice persists in `localStorage` under `theme`, and the switcher
does not reset it. So: set the theme once, cycle all five, flip it, cycle all
five again. Each variant carries its own theme control — its form is the
variant's own decision, which is itself one of the things being judged — so the
control moves between variants. The `?variant=` URLs above are stable across
both sweeps.

Phone width is Chrome's device toolbar at 320px, the width every variant was
drawn to be finished at. Same shape: set the width, sweep the five, flip the
theme, sweep again.

## The prototype is not on the deployed site, and never will be

`main.tsx` imports it only inside an `import.meta.env.DEV` branch, which is a
literal `false` in a production build, so Rollup drops every variant from the
bundle. `fmenemo.github.io` serves the current design and ignores `?variant=`
entirely. This pass is the one thing on #26 that cannot be done by deploying
and looking at the real site.

## Where the code is

`spec/26` has it, and so does `prototype/26-five-variants`, which is `main`
plus the prototype and nothing else. Either serves the pass. `spec/26` keeps it
only until #40 runs.

## What the pass is for

The verdict. Which design gets built: one variant, or a combination named
across variants — "the hero from B with the experience list from D". See
[`verdict-form.md`](verdict-form.md) for where it goes and what it has to say.
