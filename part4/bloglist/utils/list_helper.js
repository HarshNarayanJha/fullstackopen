const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (total, item) => {
    return total + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  var mostLikedBlog = blogs[0]

  for (var blog of blogs) {
    if (mostLikedBlog.likes < blog.likes) {
      mostLikedBlog = blog
    }
  }

  delete mostLikedBlog._id
  delete mostLikedBlog.__v
  delete mostLikedBlog.url

  return mostLikedBlog
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  const mostBlogsAuthor = {
    author: blogs[0].author,
    blogs: 0,
  }

  // map of author to no. of blogs
  const authors = {}

  for (const blog of blogs) {
    if (blog.author in authors) {
      authors[blog.author]++
    } else {
      authors[blog.author] = 1
    }
  }

  for (const author in authors) {
    if (authors[author] > mostBlogsAuthor.blogs) {
      mostBlogsAuthor.author = author
      mostBlogsAuthor.blogs = authors[author]
    }
  }

  return mostBlogsAuthor
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  const mostLikesAuthor = {
    author: blogs[0].author,
    likes: 0,
  }

  // map of author to no. of likes
  const authors = {}

  for (const blog of blogs) {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  }

  for (const author in authors) {
    if (authors[author] > mostLikesAuthor.likes) {
      mostLikesAuthor.author = author
      mostLikesAuthor.likes = authors[author]
    }
  }

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
