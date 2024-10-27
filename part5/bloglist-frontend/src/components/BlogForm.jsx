import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      Title: <input data-testid="title" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      <br />
      Author: <input data-testid="author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      <br />
      Url: <input data-testid="url" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
      <br />
      <button type="submit">Save</button>
      <br />
      <br />
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
