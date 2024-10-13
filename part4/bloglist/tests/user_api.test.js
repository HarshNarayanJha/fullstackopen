const { describe, beforeEach, test, after } = require("node:test")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const { usersInDb } = require("./test_helper")

const api = supertest(app)

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", name: "Root User I am", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: "userman",
      name: "User Man",
      password: "password@123",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "password@123",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(result.body.error.includes("expected `username` to be unique"))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if username is less than 4 characters", async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: "abc",
      name: "Superuser",
      password: "password@123",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(result.body.error.includes("username length less than 3"))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if password is less than 4 characters", async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: "test2",
      name: "Superuser",
      password: "usf",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(result.body.error.includes("password length less than 3"))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
