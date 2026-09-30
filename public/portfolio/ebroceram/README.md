# The ebroceram video

This is the video on the ebroceram case study, as EBROCERAM's owners and Fran approved it on 2026-09-29 (#56).

- `ebroceram.webm`: VP9 with Opus audio, 5,170,230 bytes. Listed first.
- `ebroceram.mp4`: H.264 with AAC audio, 9,532,887 bytes. The fallback, and the cut as it was approved.
- `ebroceram-poster.jpg`: the video's first frame, 1920×1080.

Both videos are 39 seconds at 1920×1080 with a music track and Spanish captions. One video serves both editions.

The screens were taken at ebroceram commit `d1a665d`. They come from a local build on the anonymised dump and from production's public catalogue, with customer identifiers, phones, emails, addresses, purchase prices and document links blurred, and were composited into this cut by hand. The pipeline is not versioned, so no command records it again. When ebroceram's UI moves on, a new cut is made by hand, and the owners approve it again before it replaces these files.

The approved MP4 was turned into these files with ffmpeg 9.0.2:

```
ffmpeg -i brag.mp4 -map_metadata -1 -map_chapters -1 -c copy -movflags +faststart ebroceram.mp4
ffmpeg -i brag.jpg -map_metadata -1 -q:v 2 ebroceram-poster.jpg
ffmpeg -i brag.mp4 -map_metadata -1 -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -c:a libopus -b:a 96k ebroceram.webm
```
