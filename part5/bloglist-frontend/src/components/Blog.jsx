import { useState } from "react"

const Blog = ({ blog, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} &nbsp;
        {detailsVisible && <button onClick={() => setDetailsVisible(false)}>{"hide"}</button>}
        {!detailsVisible && <button onClick={() => setDetailsVisible(true)}>{"show"}</button>}
      </div>

      {detailsVisible && (
        <div>
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
          <br />
          {blog.author}
        </div>
      )}
    </div>
  )
}

export default Blog
