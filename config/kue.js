'use strict'

const Env = use('Env')

module.exports = {
  // redis connection
  connection: Env.get('KUE_CONNECTION', 'kue')
}
