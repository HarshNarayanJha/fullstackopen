const User = require("../models/user")

const initialUsers = [
  {
    _id: "670bceedc88ecb203d3abe3d",
    username: "user1",
    name: "User 1",
    password: "$2b$10$xq2kieXRewfqHuM8R2SkxOB0hjHkbhFWZ5/axi4vlqX4/U3eGJY1G",
    __v: 0,
  },
  {
    _id: "670bceedc88ecb203d3abe3e",
    username: "user2",
    name: "User 2",
    password: "$2b$10$xq2kieXRewfqHuM8R2SkxOB0hjHkbhFWZ5/axi4vlqX4/U3eGJY1G",
    __v: 0,
  },
  {
    _id: "670bceedc88ecb203d3abe3f",
    username: "user3",
    name: "User 3",
    password: "$2b$10$xq2kieXRewfqHuM8R2SkxOB0hjHkbhFWZ5/axi4vlqX4/U3eGJY1G",
    __v: 0,
  },
]

const initialBlogs = [
  {
    _id: "670ba52adf2bbfd4e99b2640",
    title: "Vue JS Features",
    author: "Tester",
    url: "https://vuejs.org",
    likes: 10,
    __v: 0,
  },
  {
    _id: "670ba52adf2bbfd4e99b2641",
    title: "Just like it!",
    author: "Albert Einstein",
    url: "http://example.com",
    likes: 200,
    __v: 0,
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  usersInDb,
}
