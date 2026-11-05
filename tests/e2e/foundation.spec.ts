import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("foundation loads without external services", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:3100")) externalRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Foundation preview", exact: true })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.getByText("Illustrative fixed values", { exact: false })).toBeVisible();
  expect(externalRequests).toEqual([]);
});

test("form feedback and reset work accessibly without a network submission", async ({ page }) => {
  const submissions: string[] = [];
  page.on("request", (request) => { if (request.method() !== "GET") submissions.push(request.url()); });
  await page.goto("/");
  await page.getByRole("button", { name: "Check example" }).click();
  const input = page.getByRole("textbox", { name: "Example product" });
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("form").getByRole("alert")).toHaveText("Error: Enter an example product name.");
  await expect(input).toBeFocused();
  await input.fill("Test product");
  await page.getByRole("button", { name: "Check example" }).click();
  await expect(page.getByRole("status")).toHaveText("Example checked. No data was submitted.");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(input).toHaveValue("");
  await expect(page.locator("form").getByRole("alert")).toHaveCount(0);
  expect(submissions).toEqual([]);
});

test("keyboard focus, mobile reflow, and accessible components", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.keyboard.press("Tab");
  const input = page.getByRole("textbox", { name: "Example product" });
  await expect(input).toBeFocused();
  await expect(input).toHaveCSS("outline-style", "solid");
  await expect(page.getByRole("button", { name: /^Working/ })).toBeDisabled();
  await expect(page.getByRole("button", { name: /^Working/ })).toHaveAttribute("aria-busy", "true");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(audit.violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("foundation-preview.png"), fullPage: true });
});
