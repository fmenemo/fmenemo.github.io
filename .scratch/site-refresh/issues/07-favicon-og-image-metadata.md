# 07: Favicon, OG image and metadata

**What to build:** Sharing the site produces a correct preview instead of a broken one, and the browser tab identifies Fran rather than advertising the build tool. Today the favicon is the Vite logo, the referenced Open Graph image does not exist, and the metadata describes a "Full Stack Developer & Designer" working in React and Node, which is wrong on both counts.

**Blocked by:** 05 (Swiss visual direction). The imagery depends on the visual direction, not on the final copy, so this can proceed while the bullet table in ticket 06 is being reviewed.

**Status:** ready-for-agent

- [ ] A favicon is designed in the site's visual language and presented to Fran for approval before it ships
- [ ] An Open Graph image is designed and presented to Fran for approval before it ships
- [ ] The Vite logo is removed
- [ ] The page title, description, Open Graph tags, Twitter card tags and canonical link describe a Software Engineer working at the AI layer
- [ ] The referenced Open Graph image actually exists at the referenced path, verified by loading it
- [ ] The theme-color meta value matches the new palette rather than the old accent
- [ ] Metadata claims stay consistent with the CV, in line with ADR 0001
- [ ] `npm run build` and `npm run lint` pass
