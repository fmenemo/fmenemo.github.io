# The gate run for #12, verbatim

Captured output of `npm run build`, `npm run lint` and `npm test`.
Named `.md` rather than `.log` because `.gitignore` drops `*.log`, and an
uncommitted record of a gate run is no record at all.

```
# gates for #12, run against 819f8d8a on 2026-08-21 11:52:48 +0200

$ node --version
v24.19.0
$ npm --version
12.0.2

=== npm run build ===
npm notice run fmenemo.github.io@0.0.0 build
npm notice run tsc -b && vite build
vite v8.2.0 building client environment for production...
[2Ktransforming...✓ 36 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                              3.99 kB │ gzip:  1.42 kB
dist/es/index.html                                           5.32 kB │ gzip:  1.94 kB
dist/assets/ibm-plex-mono-latin-400-normal-CvHOgSBP.woff    13.14 kB
dist/assets/ibm-plex-mono-latin-500-normal-CB9ihrfo.woff    13.15 kB
dist/assets/ibm-plex-mono-latin-400-normal-DMJ8VG8y.woff2   14.70 kB
dist/assets/ibm-plex-mono-latin-500-normal-DSY6xOcd.woff2   14.88 kB
dist/assets/inter-latin-400-normal-C38fXH4l.woff2           23.66 kB
dist/assets/inter-latin-300-normal-BVlfKGgI.woff2           23.91 kB
dist/assets/inter-latin-500-normal-Cerq10X2.woff2           24.27 kB
dist/assets/inter-latin-700-normal-Yt3aPRUw.woff2           24.35 kB
dist/assets/inter-latin-600-normal-LgqL8muc.woff2           24.45 kB
dist/assets/inter-latin-400-normal-CyCys3Eg.woff            30.69 kB
dist/assets/inter-latin-300-normal-i8F0SvXL.woff            31.01 kB
dist/assets/inter-latin-600-normal-CiBQ2DWP.woff            31.26 kB
dist/assets/inter-latin-500-normal-BL9OpVg8.woff            31.28 kB
dist/assets/inter-latin-700-normal-BLAVimhd.woff            31.32 kB
dist/assets/App-DjN99fmy.css                                19.23 kB │ gzip:  4.68 kB
dist/assets/en-nDJ1h4X3.js                                   7.85 kB │ gzip:  3.73 kB
dist/assets/es-FAsv3Fcf.js                                   8.98 kB │ gzip:  4.08 kB
dist/assets/App-Z1eyejXN.js                                202.35 kB │ gzip: 63.84 kB

✓ built in 147ms
exit: 0

=== npm run lint ===
npm notice run fmenemo.github.io@0.0.0 lint
npm notice run eslint .
exit: 0

=== npm test ===
npm notice run fmenemo.github.io@0.0.0 test
npm notice run vitest run

 RUN  v4.1.10 /Users/fmenemo/Projects/fmenemo.github.io/.sandcastle/worktrees/sandcastle-issue-12


 Test Files  1 passed (1)
      Tests  195 passed (195)
   Start at  11:52:50
   Duration  1.64s (transform 104ms, setup 0ms, import 200ms, tests 907ms, environment 455ms)

exit: 0
```
