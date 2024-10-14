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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
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
          type="text"
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

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
