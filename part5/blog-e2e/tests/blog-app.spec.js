import { test, describe, beforeEach, expect } from "@playwright/test"

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset")
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Mario",
        username: "mario",
        password: "zelda",
      },
    })
    await page.goto("http://localhost:5173")
  })

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click()
    await expect(page.getByRole("button", { name: "login" })).toBeVisible()
  })

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click()
      await page.getByTestId("username").fill("mario")
      await page.getByTestId("password").fill("zelda")
      page.getByRole("button", { name: "login" }).click()

      await expect(page.getByText("mario logged in")).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click()
      await page.getByTestId("username").fill("mario2")
      await page.getByTestId("password").fill("wrongzelda")
      page.getByRole("button", { name: "login" }).click()

      await expect(page.getByText("wrong username or password")).toBeVisible()
    })
  })
})
