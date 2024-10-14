import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
      setUser(user)
      // blogService.setToken(user.toekn)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} messageType={"error"} />

      {user === null && loginForm()}
      {user !== null && <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>}

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
