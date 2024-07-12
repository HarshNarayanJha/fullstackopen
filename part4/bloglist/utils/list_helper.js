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
    return null;
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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
