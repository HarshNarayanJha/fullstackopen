import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, showDeleteBlog = false }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span>{blog.title} &nbsp;</span>
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'hide' : 'show'}
        </button>
      </div>

      {detailsVisible && (
        <div>
          <a href={blog.url}>{blog.url}</a>

          <div>
            likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
            <br />
            {showDeleteBlog && <button style={{ color: 'red' }} onClick={() => deleteBlog(blog)}>delete</button>}
          </div>
        </div>
      )}
      <span>{blog.author}</span>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  showDeleteBlog: PropTypes.bool
}

export default Blog
