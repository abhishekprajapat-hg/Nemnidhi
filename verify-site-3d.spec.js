const { test, expect } = require("@playwright/test");

async function canvasSignature(page) {
  return page.evaluate(() => {
    const host = document.querySelector("[data-scroll-3d-model]");
    const canvas = host?.querySelector("canvas");
    if (!canvas) return null;
    return {
      width: canvas.width,
      height: canvas.height,
      progress: Number(host.dataset.motionProgress || 0),
      urlLength: canvas.toDataURL("image/png").length,
      urlHead: canvas.toDataURL("image/png").slice(0, 1800),
    };
  });
}

test("site 3d model persists and changes through page scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForSelector("[data-scroll-3d-model] canvas", { timeout: 20000 });
  await page.waitForTimeout(600);

  const top = await canvasSignature(page);
  expect(top).toBeTruthy();
  expect(top.width).toBeGreaterThan(1000);
  expect(top.height).toBeGreaterThan(700);
  expect(top.urlLength).toBeGreaterThan(5000);
  await page.screenshot({ path: "verify-site-3d-top.png", fullPage: false });

  await page.evaluate(() => window.scrollTo({ top: Math.floor(document.documentElement.scrollHeight * 0.45), behavior: "instant" }));
  await page.waitForTimeout(1200);
  const mid = await canvasSignature(page);
  expect(mid).toBeTruthy();
  expect(mid.urlLength).toBeGreaterThan(5000);
  expect(mid.progress).toBeGreaterThan(top.progress + 0.1);
  await page.screenshot({ path: "verify-site-3d-mid.png", fullPage: false });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForSelector("[data-scroll-3d-model] canvas", { timeout: 20000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "verify-site-3d-mobile.png", fullPage: false });
});
