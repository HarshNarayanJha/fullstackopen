import { test, describe, beforeEach, expect } from "@playwright/test"
import { loginWith, createBlog } from "./helper"

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset")
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Mario",
        username: "mario",
        password: "zelda",
      }
    })
    await page.goto("http://localhost:5173")
  })

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click()
    await expect(page.getByRole("button", { name: "login" })).toBeVisible()
  })

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      loginWith(page, "mario", "zelda")

      await expect(page.getByText("mario logged in")).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      loginWith(page, "mario2", "wrongzelda")

      await expect(page.getByText("wrong username or password")).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, "mario", "zelda")
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, "Testing", "Playwright", "https://playwright.dev")

      await expect(page.getByText('Blog Testing by Playwright Created Succesfully!')).toBeVisible()
      await expect(page.getByText(/^Testing/)).toBeVisible()
    })
  })
})
