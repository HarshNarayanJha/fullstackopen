const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")

const { initialBlogs, initialUsers } = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(b => new Blog(b))
  const blogPromiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromiseArray)

  const userObjects = initialUsers.map(u => new User(u))
  const userPromoiseArray = userObjects.map(user => user.save())
  await Promise.all(userPromoiseArray)
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

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs")
  const result = response.body.map(r => r.id)
  assert(result[0] != null || result[0] != undefined)
})

test("new blog can be created", async () => {
  const newBlog = {
    _id: "356a645fd14b92a2372ab741",
    title: "Another New Test Post",
    author: "Test Man 2",
    url: "https://new.land",
    likes: 124,
    __v: 0,
  }

  const tokenResponse = await api.post("/api/login").send({ username: "user1", password: "password@123" })
  const token = tokenResponse.body.token

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", "application/json; charset=utf-8")

  const response = await api.get("/api/blogs")
  const contents = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(contents.includes("Another New Test Post"))
})

test("if ommited from request, likes default to be 0", async () => {
  const newBlog = {
    _id: "356a645fd14b92a2372ab741",
    title: "Another New Test Post",
    author: "Test Man 2",
    url: "https://new.land",
    __v: 0,
  }

  const tokenResponse = await api.post("/api/login").send({ username: "user1", password: "password@123" })
  const token = tokenResponse.body.token

  const response = await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog)
  assert.strictEqual(response.body.likes, 0)
})

test("title ommited is 404", async () => {
  const newBlog = {
    _id: "356a645fd14b92a2372ab741",
    author: "Test Man 2",
    url: "https://new.land",
    __v: 0,
  }

  const tokenResponse = await api.post("/api/login").send({ username: "user1", password: "password@123" })
  const token = tokenResponse.body.token

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400)
})

test("url ommited is 404", async () => {
  const newBlog = {
    _id: "356a645fd14b92a2372ab741",
    title: "No more misses!",
    author: "Test Man 2",
    __v: 0,
  }

  const tokenResponse = await api.post("/api/login").send({ username: "user1", password: "password@123" })
  const token = tokenResponse.body.token

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400)
})

test("can delete blog", async () => {
  const tokenResponse = await api.post("/api/login").send({ username: "user1", password: "password@123" })
  const token = tokenResponse.body.token

  await api.delete(`/api/blogs/${initialBlogs[0]._id}`).set("Authorization", `Bearer ${token}`).expect(204)
  const response = await api.get("/api/blogs")
  assert.strictEqual(response.body.length, initialBlogs.length - 1)
})

test("can update blog", async () => {
  updatedBlog = {
    title: "VueJS Features - Updated",
    likes: 200,
  }

  const tokenResponse = await api.post("/api/login").send({ username: "user1", password: "password@123" })
  const token = tokenResponse.body.token

  const updatedResponse = await api
    .put(`/api/blogs/${initialBlogs[0]._id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updatedBlog)
  const updated = await api.get(`/api/blogs/${initialBlogs[0]._id}`)

  assert.strictEqual(updatedResponse.body.title, updatedBlog.title)
  assert.strictEqual(updated.body.title, updatedBlog.title)

  assert.strictEqual(updatedResponse.body.likes, updatedBlog.likes)
  assert.strictEqual(updated.body.likes, updatedBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
