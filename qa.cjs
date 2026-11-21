const { chromium } = require("playwright-core");
const fs = require("fs");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "http://localhost:3000";
const OUT = "C:\\Users\\annam\\AppData\\Local\\Temp\\opencode\\arrise-qa";
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  ["/", "home"],
  ["/about", "about"],
  ["/services", "services"],
  ["/services/web-development", "service-web"],
  ["/work", "work"],
  ["/work/le-brew", "project-le-brew"],
  ["/insights", "insights"],
  ["/insights/social-media-that-earns-enquiries", "insight"],
  ["/contact", "contact"],
  ["/privacy-policy", "privacy"],
  ["/terms", "terms"],
  ["/this-page-does-not-exist", "notfound"],
];

async function scrollThrough(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 260;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y > document.body.scrollHeight + 600) {
          clearInterval(timer);
          resolve();
        }
      }, 110);
    });
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

(async () => {
  const errors = [];
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`[console] ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`[pageerror] ${error.message}`));
  page.on("requestfailed", (request) => {
    if (!request.url().includes("favicon")) {
      errors.push(`[requestfailed] ${request.url()} ${request.failure()?.errorText}`);
    }
  });

  for (const [path, name] of pages) {
    const response = await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const status = response ? response.status() : "no-response";
    const metrics = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      h: document.body.scrollHeight,
    }));
    console.log(`PAGE ${name} status=${status} overflow=${metrics.sw - metrics.cw}px height=${metrics.h}`);
    if (name === "notfound") {
      await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
      continue;
    }
    await scrollThrough(page);
    await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });
    if (["home", "about", "services", "work", "insights", "contact", "service-web", "project-le-brew", "insight"].includes(name)) {
      await page.screenshot({ path: `${OUT}/${name}-hero.png`, fullPage: false });
    }
  }

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  const sectionCount = await page.locator("section").count();
  console.log("HOME SECTIONS", sectionCount);
  const sectionShots = [
    [0, "hero"],
    [3, "stats"],
    [4, "services"],
    [6, "work"],
    [8, "industries"],
    [11, "finalcta"],
  ];
  for (const [index, label] of sectionShots) {
    if (index < sectionCount) {
      const locator = page.locator("section").nth(index);
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await locator.screenshot({ path: `${OUT}/home-${label}.png` });
    }
  }

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const faq = page.locator("section").nth(10).locator("button[aria-expanded]").nth(1);
  if (await faq.count()) {
    await faq.click();
    await page.waitForTimeout(500);
    console.log("FAQ expanded:", await faq.getAttribute("aria-expanded"));
  }

  await page.goto(BASE + "/work", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const websiteFilter = page.getByRole("button", { name: "Websites", exact: true });
  await websiteFilter.click();
  await page.waitForTimeout(500);
  const visibleCards = await page.locator("a[href^='/work/']").count();
  console.log("WORK filtered website links:", visibleCards);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.waitForTimeout(300);

  const internalLinks = new Set();
  for (const [path] of pages) {
    if (path === "/this-page-does-not-exist") continue;
    await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    const hrefs = await page.$$eval("a[href]", (anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
    );
    hrefs
      .filter((href) => href.startsWith("/") && !href.startsWith("//"))
      .forEach((href) => internalLinks.add(href.split("#")[0]));
  }
  for (const href of internalLinks) {
    if (!href || href === "/api/contact") continue;
    const res = await context.request.get(BASE + href);
    if (res.status() >= 400) errors.push(`[link] ${href} -> ${res.status()}`);
  }
  console.log("INTERNAL LINKS CHECKED", internalLinks.size);

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobile.newPage();
  mobilePage.on("pageerror", (error) => errors.push(`[mobile pageerror] ${error.message}`));

  for (const [path, name] of [["/", "home"], ["/work", "work"], ["/contact", "contact"], ["/services", "services"]]) {
    await mobilePage.goto(BASE + path, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1200);
    const metrics = await mobilePage.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    console.log(`MOBILE ${name} overflow=${metrics.sw - metrics.cw}px`);
    await scrollThrough(mobilePage);
    await mobilePage.screenshot({ path: `${OUT}/mobile-${name}-full.png`, fullPage: true });
    await mobilePage.screenshot({ path: `${OUT}/mobile-${name}-hero.png`, fullPage: false });
  }

  await mobilePage.goto(BASE + "/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1200);
  await mobilePage.getByRole("button", { name: "Open menu" }).click();
  await mobilePage.waitForTimeout(900);
  await mobilePage.screenshot({ path: `${OUT}/mobile-menu.png`, fullPage: false });

  console.log("ERRORS", errors.length);
  errors.forEach((error) => console.log("ERR", error));

  await browser.close();
})();
