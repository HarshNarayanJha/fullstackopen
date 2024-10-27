const loginWith = async (page, username, password)  => {
  await page.getByRole("button", { name: "Login" }).click()
  await page.getByTestId("username").fill(username)
  await page.getByTestId("password").fill(password)
  page.getByRole("button", { name: "login" }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New Blog" }).click()
  await page.getByTestId("title").fill(title)
  await page.getByTestId("author").fill(author)
  await page.getByTestId("url").fill(url)
  page.getByRole("button", { name: "Save" }).click()
}

export { loginWith, createBlog }