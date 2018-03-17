'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.bigIncrements()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('username', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
