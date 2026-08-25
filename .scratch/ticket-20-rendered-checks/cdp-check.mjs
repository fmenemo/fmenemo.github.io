import { writeFileSync, mkdirSync } from 'node:fs';

// Usage: node cdp-check.mjs <output-dir> [base-url]
//
// The base URL is an argument so that the same script runs against the local
// build and, once this branch is merged and published, against the deployed
// site: https://fmenemo.github.io. The half of the ticket's browser criterion
// that a Run cannot reach is the deployment, not the check.
const OUT = process.argv[2];
const BASE = (process.argv[3] ?? 'http://127.0.0.1:4174').replace(/\/$/, '');
mkdirSync(OUT, { recursive: true });

const targets = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else events.push(msg);
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send('Page.enable');
await send('Runtime.enable');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const evaluate = async (expression) => {
  const { result } = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return result.value;
};

const goto = async (url) => {
  await send('Page.navigate', { url });
  await sleep(1200);
};

const shot = async (name) => {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'));
};

const tab = async () => {
  for (const type of ['rawKeyDown', 'char', 'keyUp'])
    await send('Input.dispatchKeyEvent', {
      type,
      windowsVirtualKeyCode: 9,
      nativeVirtualKeyCode: 9,
      key: 'Tab',
      code: 'Tab',
      text: type === 'char' ? '\t' : undefined,
      unmodifiedText: type === 'char' ? '\t' : undefined,
    });
  await sleep(250);
};

const enter = async () => {
  for (const type of ['rawKeyDown', 'char', 'keyUp'])
    await send('Input.dispatchKeyEvent', {
      type,
      windowsVirtualKeyCode: 13,
      nativeVirtualKeyCode: 13,
      key: 'Enter',
      code: 'Enter',
      text: type === 'char' ? '\r' : undefined,
      unmodifiedText: type === 'char' ? '\r' : undefined,
    });
  await sleep(600);
};

const FOCUSED = `(() => {
  const el = document.activeElement;
  const box = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return {
    tag: el.tagName, text: el.textContent.trim(), href: el.getAttribute('href'),
    isFirstLink: el === document.querySelectorAll('a')[0],
    box: { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) },
    inViewport: box.width > 1 && box.height > 1 && box.top >= 0 && box.left >= 0
      && box.bottom <= innerHeight && box.right <= innerWidth,
    color: style.color, background: style.backgroundColor, outline: style.outline,
    clip: style.clipPath, position: style.position, visibility: style.visibility,
    matchesFocusVisible: el.matches(':focus-visible'),
  };
})()`;

const report = {};

for (const [edition, url] of [['en', `${BASE}/`], ['es', `${BASE}/es/`]]) {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
  await goto(url);
  const beforeTab = await evaluate(`document.activeElement.tagName`);
  await tab();
  const focused = await evaluate(FOCUSED);
  await shot(`skip-link-${edition}-focused`);
  await enter();
  const landed = await evaluate(`(() => {
    const main = document.querySelector('main');
    const box = main.getBoundingClientRect();
    return {
      hash: location.hash,
      activeElement: document.activeElement.tagName + (document.activeElement.id ? '#' + document.activeElement.id : ''),
      nextTabWouldStartInMain: document.activeElement === main,
      mainTop: Math.round(box.top),
      firstHeading: document.querySelector('main h1')?.textContent.trim(),
    };
  })()`);
  await shot(`skip-link-${edition}-activated`);
  report[edition] = { beforeTab, focused, landed };
}

report['404-status'] = (await fetch(`${BASE}/this-page-does-not-exist`)).status;

for (const scheme of ['light', 'dark']) {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
  await goto(`${BASE}/this-page-does-not-exist`);
  report[`404-${scheme}`] = await evaluate(`(() => {
    const body = getComputedStyle(document.body);
    const heading = document.querySelector('h1');
    return {
      title: document.title,
      lang: document.documentElement.lang,
      darkClass: document.documentElement.classList.contains('dark'),
      background: body.backgroundColor,
      color: body.color,
      fontFamily: getComputedStyle(heading).fontFamily,
      headingFontLoaded: document.fonts.check('600 48px "Geist Sans"'),
      monoFontLoaded: document.fonts.check('400 11px "Geist Mono"'),
      eyebrowColor: getComputedStyle(document.querySelector('.eyebrow')).color,
      links: [...document.querySelectorAll('.editions a')].map((a) => ({
        text: a.textContent, href: a.getAttribute('href'), hreflang: a.getAttribute('hreflang'),
      })),
    };
  })()`);
  await shot(`404-${scheme}`);
}

writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
ws.close();
