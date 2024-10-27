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
      await loginWith(page, "mario", "zelda")

      await expect(page.getByText("mario logged in")).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mario2", "wrongzelda")

      await expect(page.getByText("wrong username or password")).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mario", "zelda")
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "Testing", "Playwright", "https://playwright.dev")

      await expect(page.getByText('Blog Testing by Playwright Created Succesfully!')).toBeVisible()
      await expect(page.getByText(/^Testing/)).toBeVisible()
    })
  })

  describe("When blogs", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mario", "zelda")
      await createBlog(page, "Testing Part 1", "Playwright", "https://playwright.dev")
    })

    test('blogs can be liked', async ({ page }) => {
      await page.getByRole('button', {name: 'show'}).click()
      await page.getByRole('button', {name: 'like'}).click()

      await expect(page.getByText("Blog Testing Part 1 by Playwright Liked!")).toBeVisible()
    })

    test('blogs can be deleted', async ({ page }) => {
      page.on("dialog", dialog => dialog.accept())

      await page.getByRole('button', {name: 'show'}).click()
      await expect(page.getByRole('button', {name: 'delete'})).toBeVisible()

      await page.getByRole('button', {name: 'delete'}).click()

      await expect(page.getByText("Blog Testing Part 1 by Playwright Deleted!")).toBeVisible()
    })
  })
})
