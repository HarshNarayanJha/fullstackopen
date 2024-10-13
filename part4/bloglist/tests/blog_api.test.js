const { test, after, beforeEach } = require("node:test")
const assert = require('node:assert')
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const { initialBlogs } = require("./test_data")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("length of the blogs are returned", async () => {
  const response = await api.get("/api/blogs")
  assert.strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
