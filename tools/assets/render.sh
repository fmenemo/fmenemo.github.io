#!/usr/bin/env bash
#
# Renders every generated binary in `public/` from its source beside this file.
#
# One command on purpose, and every image in it. Two commands, or one command
# and a manual step, is how a palette change lands on one edition's card and not
# the other's (ADR 0004). Adding an edition means adding a line to the table
# below and nothing else.
#
# Run from anywhere, with `node_modules` installed. Override CHROME if yours is
# somewhere else:
#
#   CHROME=/path/to/chrome tools/assets/render.sh
#
# See README.md beside this file for what these are and why they are checked in.

set -euo pipefail

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME" >&2
  echo "Set CHROME to your Chrome binary and run again." >&2
  exit 1
fi

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root"

if [ ! -d node_modules/@fontsource-variable ]; then
  echo "node_modules/@fontsource-variable is missing: run npm install first." >&2
  echo "The share images use the site's own font files, so without them the" >&2
  echo "cards would render in whatever Chrome falls back to." >&2
  exit 1
fi

if ! command -v python3 >/dev/null; then
  echo "python3 is missing: the sources are served over HTTP to render them." >&2
  exit 1
fi

# The sources are served over HTTP rather than opened as `file://`. Chrome no
# longer loads a `file://` subresource from a `file://` page even with
# `--allow-file-access-from-files`, and what that looked like was not an error:
# the touch icon rendered as a blank square with a broken-image glyph, and the
# screenshot was written anyway. Over HTTP the relative paths in the sources
# resolve exactly as they read.
#
# Port 0 so a machine that already has something on a fixed port renders from
# this repo rather than from whatever answered.
# `-u` because the port is read back out of the log: Python block-buffers stdout
# when it is a file, so without it the line announcing the port arrives after
# everything that wanted to read it.
log="$(mktemp)"
python3 -u -m http.server 0 --bind 127.0.0.1 --directory "$root" >"$log" 2>&1 &
server=$!
# `wait` so the shell reaps the server itself rather than announcing that it
# terminated, which reads like a failure at the end of a successful render.
#
# `|| true` on the wait because a killed process exits 143, and `set -e` inside
# the trap would hand that on as the script's own exit status: a clean render
# would report failure.
trap 'kill "$server" 2>/dev/null; wait "$server" 2>/dev/null || true; rm -f "$log"' EXIT

port=""
for _ in $(seq 1 50); do
  port="$(sed -n 's/.*port \([0-9]*\).*/\1/p' "$log" | head -1)"
  if [ -n "$port" ] && curl -sf -o /dev/null "http://127.0.0.1:$port/tools/assets/og-image.css"; then
    break
  fi
  port=""
  sleep 0.1
done

# Loudly, and before Chrome runs. `--screenshot` writes whatever it was shown,
# so a server that never came up would leave three screenshots of an error page
# sitting in `public/` looking like a successful render. That silent-success
# shape is the whole reason the touch icon shipped blank.
if [ -z "$port" ]; then
  echo "the local server did not come up, so nothing was rendered:" >&2
  cat "$log" >&2
  exit 1
fi

# source                              output                        size
targets=(
  "tools/assets/og-image.html         public/og-image.png           1200,630"
  "tools/assets/og-image.es.html      public/og-image-es.png        1200,630"
  "tools/assets/apple-touch-icon.html public/apple-touch-icon.png   180,180"
)

for target in "${targets[@]}"; do
  read -r source output size <<<"$target"
  # Again before Chrome rather than after: a renamed source would otherwise be
  # screenshotted as the server's 404 page and written out as the card.
  if ! curl -sf -o /dev/null "http://127.0.0.1:$port/$source"; then
    echo "source not found: $source" >&2
    exit 1
  fi
  echo "rendering $output"
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --virtual-time-budget=4000 \
    --window-size="$size" --screenshot="$output" \
    "http://127.0.0.1:$port/$source" 2>/dev/null
done

echo "done. check the pictures, not the checksums (see README.md)."
