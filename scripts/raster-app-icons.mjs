import { chromium } from "playwright";
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname } from "node:path";

const svg = readFileSync("/workspace/public/favicon.svg", "utf8");

const mipmaps = [
  { dir: "mipmap-mdpi", size: 48 },
  { dir: "mipmap-hdpi", size: 72 },
  { dir: "mipmap-xhdpi", size: 96 },
  { dir: "mipmap-xxhdpi", size: 144 },
  { dir: "mipmap-xxxhdpi", size: 192 },
];

const extras = [
  { path: "/workspace/public/icon-192.png", size: 192 },
  { path: "/workspace/public/icon-512.png", size: 512 },
];

function wrapSvg(size, inset = 0) {
  const inner = size - inset * 2;
  return `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;width:${size}px;height:${size}px;background:#101D33;}
    .pad{display:grid;place-items:center;width:${size}px;height:${size}px;}
    svg{display:block;width:${inner}px;height:${inner}px;}
  </style></head><body><div class="pad">${svg}</div></body></html>`;
}

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shoot(size, path, inset = 0) {
  mkdirSync(dirname(path), { recursive: true });
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(wrapSvg(size, inset), { waitUntil: "domcontentloaded" });
  await page.screenshot({ path, omitBackground: false });
  await page.close();
}

try {
  for (const { dir, size } of mipmaps) {
    const dest = `/workspace/android-app/app/src/main/res/${dir}/ic_launcher.png`;
    await shoot(size, dest, 0);
  }
  await shoot(432, "/workspace/android-app/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png", 72);
  await shoot(324, "/workspace/android-app/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png", 54);
  await shoot(216, "/workspace/android-app/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png", 36);
  await shoot(162, "/workspace/android-app/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png", 27);
  await shoot(108, "/workspace/android-app/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png", 18);
  for (const extra of extras) {
    await shoot(extra.size, extra.path, 0);
  }
} finally {
  await browser.close();
}

mkdirSync("/workspace/android-app/app/src/main/res/mipmap-anydpi-v26", { recursive: true });
writeFileSync(
  "/workspace/android-app/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml",
  `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/navy"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`,
);
console.log("rasterized launcher + pwa icons");
