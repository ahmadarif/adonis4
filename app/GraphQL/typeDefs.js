'use strict'

const typeDefs = `
  type User {
    id: Int,
    username: String,
    email: String,
    password: String
  }
  type Query {
    users: [User]
    userById(id: Int): User
  }
  type Mutation {
    login(email: String, password: String): String
  }
`

module.exports = typeDefs
