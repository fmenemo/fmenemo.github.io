# 06: The content files say which CV they came from

**Status:** needs-info

**Blocked by:** 01, 02, 03 — and 04 and 05 if either is taken. The commit this records has to be
the one the content actually matches, so it cannot be written until the corrections have landed.

**What to build:** Each content file records the CV it was condensed from precisely enough that
the next sweep is a diff rather than a re-read.

**The problem this closes is the one the sweep actually found.** The site's copy was not
scattered with drift — it was a faithful condensation of the CV as it stood at one moment, and
the CV then moved three times without this repo hearing about it. Two full reworks landed and the
only reason anyone noticed was that a bullet happened to be read. The fault is not wording; it is
that neither repo can answer "which version of the CV is this site telling the truth about".

Record, in each content file's header comment beside the existing ADR 0001 note, the CV repo
commit that file's copy was approved against. At the time of writing that is `da5f2c5` — use
whatever is current when the corrections land, for each edition's own CV.

**Deliberately not a wording guard.** An assertion that no bullet says "the team's agentic
workflow" would pass forever while the next rework drifts something else, and it is the
banned-word list this repo already rejected in `.scratch/catch-up-with-the-cv/issues/01` in favour
of guarding shape. There is no shape to guard here: "says something the CV does not" is not a
pattern, it is a comparison against a document in another repo.

**Be honest about how much this buys.** It does not prevent drift and does not fail a build. It
makes the next sweep cheap and bounded — `git diff <recorded>..HEAD -- cv/en.md` in the CV repo
is the entire question — where this one required reading two CVs and two content files end to end
to find four things. That is the whole claim. Do not oversell it in the comment you write.

If a stronger guard is wanted later, the shape of it is a check in the CV repo's `publish:cv`
chain that refuses to publish while this repo's recorded commit is behind. That is a change to
the other repo and is out of scope here; note it in Comments rather than building it.

- [ ] `src/content.en.ts` names the CV repo commit its copy was approved against
- [ ] `src/content.es.ts` names the CV repo commit its copy was approved against
- [ ] Each names the commit for its own edition's CV, not a shared one
- [ ] The comment says what the record buys and what it does not
- [ ] The next sweep's procedure is written down in one line, so it is followed rather than
      reinvented
- [ ] `npm run build`, `npm run lint` and `npm test` pass
