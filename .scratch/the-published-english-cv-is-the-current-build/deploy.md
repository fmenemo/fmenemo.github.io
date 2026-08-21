# The English CV is published, #12

Evidence for the three criteria in #12 that a later reader cannot reconstruct
from the diff: the gates, the deploy, and the live digest. The commit before
this one carries the copy itself and its before-and-after digests.

## The gates

`gates.md` beside this file is the whole run, captured against `819f8d8a` on
2026-08-21 11:52:48 +0200, on Node v24.19.0 and npm 12.0.2.

| Gate | Result |
| --- | --- |
| `npm run build` | exit 0, built in 147ms |
| `npm run lint` | exit 0, no output |
| `npm test` | exit 0, 195 tests in 1 file |

Nothing on this branch runs in CI: the repository has no workflow for it, so
`gh run list` on `sandcastle/issue-12` is empty by design rather than by
omission. The log is the record.

## The deploy

`npm run deploy` builds through `predeploy` and pushes `dist` to `gh-pages`.
It prints `Published` whether or not it wrote anything, so the head is what
was checked:

```
before  d2a48307775b88bfed053d2c153ffe88e49c1019  2026-08-08 09:21:27 +0200
after   4d9eb8b2b2d05bbaf98a3f350507c54125969d37  2026-08-21 11:52:59 +0200
```

Thirteen days apart, so the head moved and the build was not a no-op. In the
new tree `Fran_Menendez_CV.pdf` is `61493cb` and `Fran_Menendez_CV_ES.pdf` is
`a7ce21c`, which is the pair the local `public/` holds.

Only this branch's build was published, not `main`'s. The branch is ten
commits ahead of `origin/main` and carries #5, #7, #8 and #9 as well as this
PDF, so the live site is now running content those Tickets wrote and the
pull request has not yet merged. That is a real consequence and it is
recorded here rather than left to be discovered.

## The live download

GitHub Pages served the old bytes for about fifteen seconds after the push and
then cut over.

```
$ curl -sL https://fmenemo.github.io/Fran_Menendez_CV.pdf | shasum -a 256
61493cbb6aeee2e6a8a91178e5f9e64fc857f66bd6479db94557e07212553b31

$ shasum -a 256 public/Fran_Menendez_CV.pdf
61493cbb6aeee2e6a8a91178e5f9e64fc857f66bd6479db94557e07212553b31
```

147488 bytes, `last-modified: Fri, 21 Aug 2026 09:53:22 GMT`, against 144895
bytes and 2026-08-08 before the deploy. The Spanish download is `a7ce21c` live
and `a7ce21c` locally, unchanged, which is what #4 asked for.
