import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong username or password')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
  }

  const addBlog = async blogDetails => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogDetails)
    await fetchBlogs()

    setSuccessMessage(`Blog ${newBlog.title} by ${newBlog.author} Created Succesfully!`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const likeBlog = async blogDetails => {
    if (user === null) {
      setErrorMessage('Login first to Like!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      return
    }

    const newBlog = await blogService.update(blogDetails.id, { ...blogDetails, likes: blogDetails.likes + 1 })

    await fetchBlogs()

    setSuccessMessage(`Blog ${newBlog.title} by ${newBlog.author} Liked!`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const deleteBlog = async blog => {
    if (user === null) {
      setErrorMessage('Login first to Like!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      return
    }

    if (user.id !== blog.user.id) {
      setErrorMessage('Not your blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      return
    }

    if (!window.confirm(`Delete Blog ${blog.name} by ${blog.author}?`)) {
      return
    }

    await blogService.deleteBlog(blog.id)

    await fetchBlogs()

    setSuccessMessage(`Blog ${blog.title} by ${blog.author} Deleted!`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const loginForm = () => (
    <Togglable showLabel="Login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable showLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} messageType={'error'} />
      <Notification message={successMessage} messageType={'success'} />

      {user === null && loginForm()}
      {user !== null && (
        <p>
          {user.name} logged-in <button onClick={handleLogout}>logout</button>
        </p>
      )}

      {user !== null && (
        <div>
          <h2>Create New</h2>
          {blogForm()}
        </div>
      )}

      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            showDeleteBlog={user && user.id === blog.user.id}
          />
        ))}
    </div>
  )
}

export default App
