import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog Component', () => {
  const blog = {
    title: 'Blog 1',
    author: 'Mario',
    url: 'http://example.com',
    likes: 12,
    user: {
      username: 'mario',
      name: 'mario',
    },
  }
  const likesMockHandler = vi.fn()

  beforeEach(() => {
    render(<Blog key={blog.id} blog={blog} likeBlog={likesMockHandler} deleteBlog={() => {}} />)
  })

  test('renders title and author, but not url and likes by default', () => {
    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText('likes')).toBeNull()
  })

  test('the url and likes are displayed when the button that controls the details is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText('like')).toBeDefined()
    expect(button).toHaveTextContent('hide')
  })

  test('the event handler that the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('show')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likesMockHandler.mock.calls).toHaveLength(2)
  })
})
