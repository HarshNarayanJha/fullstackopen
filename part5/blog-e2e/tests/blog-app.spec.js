import { test, describe, beforeEach, expect } from '@playwright/test'
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Mario',
        username: 'mario',
        password: 'zelda',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Luigi',
        username: 'luigi',
        password: 'link',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mario', 'zelda')

      const successDiv = page.locator('.success')

      await expect(successDiv).toContainText('mario logged in')
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mario2', 'wrongzelda')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(page.getByText('mario logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mario', 'zelda')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Testing', 'Playwright', 'https://playwright.dev')

      await expect(page.getByText('Blog Testing by Playwright Created Succesfully!')).toBeVisible()
      await expect(page.getByRole('button', { name: 'show' })).toBeVisible()
      await expect(page.getByText('Testing', { exact: true })).toBeVisible()
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Testing Part 1', 'Playwright', 'https://playwright.dev')
        await createBlog(page, 'Testing Part 2', 'Playwright', 'https://playwright.dev')
        await createBlog(page, 'Testing Part 3', 'Playwright', 'https://playwright.dev')
      })

      test('blogs can be liked', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'Testing Part 1' })
        await blog.getByRole('button', { name: 'show' }).click()

        await expect(blog.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('Blog Testing Part 1 by Playwright Liked!')).toBeVisible()

        await expect(blog.getByText('likes 1')).toBeVisible()
        await expect(blog.getByText('likes 0')).not.toBeVisible()
      })

      test('the user who added the blog can delete it', async ({ page }) => {

        const blog = page.locator('.blog').filter({ hasText: 'Testing Part 2' })
        await blog.getByRole('button', { name: 'show' }).click()
        await expect(blog.getByRole('button', { name: 'delete' })).toBeVisible()

        page.on('dialog', async (dialog) => await dialog.accept())

        await blog.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('Blog Testing Part 2 by Playwright Deleted!')).toBeVisible()
        await expect(blog).not.toBeVisible()
      })

      test('only the user who added the blog sees the remove button', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'Testing Part 3' })
        await blog.getByRole('button', { name: 'show' }).click()
        await expect(blog.getByRole('button', { name: 'delete' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'luigi', 'link')

        await blog.getByRole('button', { name: 'show' }).click()
        await expect(blog.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      test('blogs should be organized from most likes to least likes', async ({ page }) => {
        const blog1 = page.locator('.blog').filter({ hasText: 'Testing Part 1' })
        const blog2 = page.locator('.blog').filter({ hasText: 'Testing Part 2' })
        const blog3 = page.locator('.blog').filter({ hasText: 'Testing Part 3' })

        await blog1.getByRole('button', { name: 'show' }).click()
        await blog2.getByRole('button', { name: 'show' }).click()
        await blog3.getByRole('button', { name: 'show' }).click()

        await blog2.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Blog Testing Part 2 by Playwright Liked!')).toBeVisible()
        await blog3.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Blog Testing Part 3 by Playwright Liked!')).toBeVisible()
        await blog3.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Blog Testing Part 3 by Playwright Liked!')).toBeVisible()

        await expect(blog3).toContainText('likes 2')
        await expect(blog2).toContainText('likes 1')
        await expect(blog1).toContainText('likes 0')

        await expect(page.locator('.blog').first()).toContainText('Testing Part 3')
        await expect(page.locator('.blog').nth(1)).toContainText('Testing Part 2')
        await expect(page.locator('.blog').last()).toContainText('Testing Part 1')
      })
    })
  })
})
