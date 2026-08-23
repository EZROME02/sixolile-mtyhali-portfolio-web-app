import { expect, test } from "@playwright/test";

test.describe("EZROME mobile portfolio", () => {
  test("shows the exact Download CV wording and downloads the canonical CV", async ({ page }) => {
    await page.goto("/");

    const cv = page.getByRole("link", { name: "Download CV" }).first();
    await expect(cv).toBeVisible();
    await expect(cv).toHaveAttribute("download", "Sixolile_Ezrome_Mtyhali_CV.pdf");
    await expect(cv).toHaveAttribute("href", /Sixolile_Ezrome_Mtyhali_CV\.pdf$/);

    const downloadPromise = page.waitForEvent("download");
    await cv.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("Sixolile_Ezrome_Mtyhali_CV.pdf");
  });

  test("moves between existing sections with horizontal swipes", async ({ page }) => {
    await page.goto("/");

    const about = page.locator("section#about");
    const experience = page.locator("section#experience");
    await expect(about).toHaveCount(1);
    await expect(experience).toHaveCount(1);

    await page.mouse.move(300, 420);
    await page.mouse.down();
    await page.mouse.move(80, 420, { steps: 8 });
    await page.mouse.up();
    await expect(about).toBeInViewport();

    await page.mouse.move(300, 420);
    await page.mouse.down();
    await page.mouse.move(80, 420, { steps: 8 });
    await page.mouse.up();
    await expect(experience).toBeInViewport();
  });
});
