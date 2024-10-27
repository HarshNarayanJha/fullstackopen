import { test, describe, beforeEach, expect } from "@playwright/test"

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173")
  })

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})
