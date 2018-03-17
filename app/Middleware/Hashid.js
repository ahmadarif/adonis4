'use strict'

const Hashids = use('Hashids')

class Hashid {
  async handle ({ request, params }, next) {
    if (params.id) {
      params.id = Hashids.decode(params.id)[0]
    }
    await next()
  }
}

module.exports = Hashid
