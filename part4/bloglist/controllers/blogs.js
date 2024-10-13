const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body)

  const savedBlog = blog.save()
  response.json(savedBlog)
})

module.exports = blogsRouter
