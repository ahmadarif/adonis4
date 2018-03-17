'use strict'

const Model = use('Model')
const Hashids = use('Hashids')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', 'User.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  getId (id) {
    return Hashids.encode(id)
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = User
