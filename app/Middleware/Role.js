'use strict'

const _ = require('lodash')

class Role {
  async handle ({ request, response, auth }, next, schemes) {
    const user = auth.current.user
    const roles = _.castArray(schemes)
    let isHasRole = false

    for (const role of roles) {
      if (user.email === role) { // for dummies only
        isHasRole = true
        break
      }
    }

    if (!isHasRole) return response.unauthorized({ message: "You can't access to this request. Only User with email sample1@mail.com can access this route." })
    
    // call next to advance the request
    await next()
  }
}

module.exports = Role
