import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const svg = readFileSync("/workspace/public/favicon.svg", "utf8");
const sizes = [16, 32, 64];
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const size of sizes) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<!doctype html><html><head><style>
        html,body{margin:0;padding:0;width:${size}px;height:${size}px;background:#888;}
        svg{display:block;width:${size}px;height:${size}px;}
      </style></head><body>${svg}</body></html>`,
      { waitUntil: "domcontentloaded" },
    );
    await page.screenshot({
      path: `/workspace/.grok/favicon-${size}.png`,
      omitBackground: false,
    });
    await page.close();
  }
} finally {
  await browser.close();
}
console.log("rasterized", sizes);
