const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  const user = request.user

  if (body.title == undefined) {
    return response.status(400).json({ error: "title missing" })
  }

  if (body.url == undefined) {
    return response.status(400).json({ error: "url missing" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    return response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const blogId = request.params.id

  const body = request.body

  const user = request.user

  const blogToUpdate = await Blog.findById(blogId)

  if (blogToUpdate.user.toString() === user._id.toString()) {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true })
    return response.json(updatedBlog)
  } else {
    return response.status(401).json({ error: "not your blog" })
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id

  const user = request.user

  const blogToDelete = await Blog.findById(blogId)

  if (blogToDelete.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(blogId)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: "not your blog" })
  }
})

module.exports = blogsRouter
