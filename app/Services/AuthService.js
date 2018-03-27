'use strict'

const User = use('App/Models/User')
const Response = use('App/Class/Response')
const Hash = use('Hash')
const Encryption = use('Encryption')
const randomstring = use('randomstring')
const Kue = use('Kue')

class AuthService {
  /**
   * Login process
   * Using auth api provider
   * @param {auth} auth
   * @param {String} email
   * @param {String} password
   * @returns App/Class/Response
   */
  async login (auth, email, password) {
    try {
      const token = await auth.authenticator('api').attempt(email, password)
      return new Response(200, null, token)
    } catch (error/* istanbul ignore next */) {
      let message = null
      switch (error.name) {
        case 'UserNotFoundException': message = 'Cannot find user with provided email.'; break
        case 'PasswordMisMatchException': message = 'Invalid user password.'; break
      }
      return new Response(error.status, message, null)
    }
  }

  /**
   * Logout current token only
   * Using auth api provider
   * @param {auth} auth from destructor method
   */
  async logout (auth) {
    const user = auth.current.user
    const token = auth.getAuthHeader()
    await user
      .tokens()
      .where('type', 'api_token')
      .where('is_revoked', false)
      .where('token', Encryption.decrypt(token))
      .update({ is_revoked: true })
  }

  /**
   * Logout other token
   * Using auth api provider
   * @param {auth} auth from destructor method
   */
  async logoutOther (auth) {
    const user = auth.current.user
    const token = auth.getAuthHeader()
    await user
      .tokens()
      .where('type', 'api_token')
      .where('is_revoked', false)
      .whereNot('token', Encryption.decrypt(token))
      .update({ is_revoked: true })
  }

  /**
   * Logout all token
   * Using auth api provider
   * @param {auth} auth from destructor method
   */
  async logoutAll (auth) {
    const user = auth.current.user
    await user
      .tokens()
      .where('type', 'api_token')
      .where('is_revoked', false)
      .update({ is_revoked: true })
  }

  /**
   * Forgot password feature, send email with new password
   * @param {String} email
   */
  async forgotPassword (email) {
    const plainPassword = randomstring.generate(8)
    const safePassword = await Hash.make(plainPassword)

    const user = await User.findBy('email', email)
    user.password = safePassword
    await user.save()

    const data = { newPassword: plainPassword, user: user.toJSON() }
    Kue.dispatch('forgotpassword-job', data, 'high')
  }
}

module.exports = new AuthService()
