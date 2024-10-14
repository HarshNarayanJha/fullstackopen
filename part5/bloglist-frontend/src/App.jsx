import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
      setErrorMessage("wrong username or password")
      setPassword("")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem("loggedBlogUser")
    window.location.reload()
  }

  const addBlog = async e => {
    e.preventDefault()
    const newBlog = await blogService.create({ title: newTitle, author: newAuthor, url: newUrl })
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")

    await fetchBlogs()

    setSuccessMessage(`Blog ${newBlog.title} by ${newBlog.author} Created Succesfully!`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => {
            setUsername(target.value)
          }}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      <br />
      Author: <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      <br />
      Url: <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
      <br />
      <button type="submit">Save</button>
      <br />
      <br />
    </form>
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} messageType={"error"} />
      <Notification message={successMessage} messageType={"success"} />

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

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
