import { useState } from "react"

const BlogForm = ({createBlog}) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }

  return (
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
}

export default BlogForm
