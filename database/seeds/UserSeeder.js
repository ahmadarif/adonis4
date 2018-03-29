'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const user = new User()
    user.email = 'admin@mail.com'
    user.password = '123'
    user.username = 'admin'
    await user.save()
  }
}

module.exports = UserSeeder
