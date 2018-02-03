'use strict'

const User = use('App/Models/User')

/* istanbul ignore next */
const resolvers = {
  Query: {
    // fetch all users
    async users() {
      const users = await User.all()
      return users.toJSON()
    },
    async userById(_, { id }) {
      const user = await User.find(id)
      return user.toJSON()
    }
  },
  Mutation: {
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.authenticator('api').attempt(email, password)
      return token
    }
  }
}

module.exports = resolvers