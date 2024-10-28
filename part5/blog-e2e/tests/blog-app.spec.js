import { test, describe, beforeEach, expect } from '@playwright/test';
import { loginWith, createBlog } from './helper';

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Mario',
        username: 'mario',
        password: 'zelda',
      },
    });
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Luigi',
        username: 'luigi',
        password: 'link',
      },
    });
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mario', 'zelda');

      const successDiv = page.locator('.success');

      await expect(successDiv).toContainText('mario logged in');
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mario2', 'wrongzelda');

      const errorDiv = page.locator('.error');
      await expect(errorDiv).toContainText('wrong username or password');
      await expect(page.getByText('mario logged in')).not.toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mario', 'zelda');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Testing', 'Playwright', 'https://playwright.dev');

      await expect(page.getByText('Blog Testing by Playwright Created Succesfully!')).toBeVisible();
      await expect(page.getByRole('button', { name: 'show' })).toBeVisible();
      await expect(page.getByText('Testing', { exact: true })).toBeVisible();
    });
  });

  describe('When blogs', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mario', 'zelda');
      await createBlog(page, 'Testing Part 1', 'Playwright', 'https://playwright.dev');
    });

    test('blogs can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'show' }).click();
      await page.getByRole('button', { name: 'like' }).click();

      await expect(page.getByText('Blog Testing Part 1 by Playwright Liked!')).toBeVisible();
    });

    test('blogs can be deleted', async ({ page }) => {
      page.on('dialog', (dialog) => dialog.accept());

      await page.getByRole('button', { name: 'show' }).click();
      await expect(page.getByRole('button', { name: 'delete' })).toBeVisible();

      await page.getByRole('button', { name: 'delete' }).click();

      await expect(page.getByText('Blog Testing Part 1 by Playwright Deleted!')).toBeVisible();
    });
  });

  describe('When multiple users', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mario', 'zelda');
      await createBlog(page, 'Testing Part 1', 'mario', 'https://playwright.dev');
      await page.getByRole('button', { name: 'logout' }).click();

      await loginWith(page, 'luigi', 'link');
      await createBlog(page, 'Testing Part 2', 'luigi', 'https://playwright.dev');
      await page.getByRole('button', { name: 'logout' }).click();
    });

    test('delete button visible only for author', async ({ page }) => {
      await loginWith(page, 'mario', 'zelda');

      const post1 = page.getByText(/^Testing Part 1/);
      const post2 = page.getByText(/^Testing Part 2/);

      await post1.getByRole('button', { name: 'show' }).click();
      await post2.getByRole('button', { name: 'show' }).click();

      await expect(post1.getByRole('button', { name: 'delete' })).toBeVisible();
      await expect(post2.getByRole('button', { name: 'delete' })).not.toBeVisible();
    });
  });
});
