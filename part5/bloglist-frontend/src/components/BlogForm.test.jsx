import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm Component', () => {
  test('the form calls the event handler which received as props with correct details', async () => {
    const user = userEvent.setup()
    const createBlogMockHandler = vi.fn()
    const { container } = render(
      <BlogForm createBlog={createBlogMockHandler} />
    )

    const titleInput = container.querySelector('input[data-testid="title"]')
    const authorInput = container.querySelector('input[data-testid="author"]')
    const urlInput = container.querySelector('input[data-testid="url"]')
    const createButton = screen.getByText('Save')

    await user.type(titleInput, 'Blog 1')
    await user.type(authorInput, 'Luigi')
    await user.type(urlInput, 'http://example.com')
    await user.click(createButton)

    expect(createBlogMockHandler.mock.calls).toHaveLength(1)
    expect(createBlogMockHandler.mock.calls[0][0]).toEqual({
      title: 'Blog 1',
      author: 'Luigi',
      url: 'http://example.com',
    })
  })
})
