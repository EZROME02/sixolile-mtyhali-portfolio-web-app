import { test, expect } from "@playwright/test";

test.describe("EZROME mobile portfolio", () => {
  test("keeps Projects intact and exposes the exact Download CV action", async ({ page }) => {
    await page.goto("/");

    const download = page.getByRole("link", { name: "Download CV", exact: true });
    await expect(download).toHaveAttribute("download", "Sixolile_Ezrome_Mtyhali_CV.pdf");

    const projectHeading = page.getByRole("heading", { name: "AI Workplace Productivity Assistant" });
    await expect(projectHeading).toBeVisible();

    const downloadEvent = page.waitForEvent("download");
    await download.click();
    const downloadFile = await downloadEvent;
    expect(downloadFile.suggestedFilename()).toBe("Sixolile_Ezrome_Mtyhali_CV.pdf");
  });

  test("supports horizontal swipe navigation without replacing the Projects section", async ({ page }) => {
    await page.goto("/");

    const about = page.locator("#about");
    const experience = page.locator("#experience");
    await about.scrollIntoViewIfNeeded();

    await page.evaluate(() => {
      const target = document.querySelector("#about");
      if (!target) throw new Error("About section not found");
      const start = new Event("touchstart", { bubbles: true });
      Object.defineProperty(start, "changedTouches", { value: [{ clientX: 300, clientY: 400 }] });
      target.dispatchEvent(start);
      const end = new Event("touchend", { bubbles: true });
      Object.defineProperty(end, "changedTouches", { value: [{ clientX: 100, clientY: 400 }] });
      target.dispatchEvent(end);
    });

    await expect(experience).toBeInViewport();
    await expect(page.getByRole("heading", { name: "AI Workplace Productivity Assistant" })).toBeVisible();
  });
});
