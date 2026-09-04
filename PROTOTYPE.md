# The prototype behind #26

Throwaway. This branch is the primary source for the design prototype that
issue #26 ("A new design from scratch, chosen from five prototypes") was
decided on: five whole-page variants of the English edition and the switcher
that flips between them.

It is `main` at a1da909e plus the prototype delta, and nothing else. It is not
merged anywhere and it is not meant to be. The chosen design reaches `main`
through the phase-two tickets on #26, written from Fran's verdict; the first of
those removes the prototype from the Spec branch. The verdict itself lives as a
comment on #26.

## Run it

```
npm install
npm run dev
```

Then open the dev server with a `variant` search parameter:

| Parameter | Variant |
| --- | --- |
| `?variant=a` | Editorial |
| `?variant=b` | Clean product |
| `?variant=c` | Bold and raw |
| `?variant=d` | Warm and quiet |
| `?variant=e` | The record |

The switcher is a floating bar at the bottom of the page; left and right arrow
keys cycle the variants and the URL follows what is on screen, so any variant
can be reloaded or sent to someone. With no `variant` parameter the route boots
the shipping site, unchanged.

## What is throwaway and what is not

Everything under `src/prototype/` is throwaway, and every file there says so in
its name and its first line. The one production file the prototype touches is
`src/main.tsx`, which imports the prototype only inside an
`import.meta.env.DEV` branch: in a production build that is a literal `false`,
so Rollup removes the import and no variant is in the shipped bundle.

The four extra `@fontsource-variable` packages in `package.json` are the faces
the variants set. They are dev dependencies of this branch only.
