'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Encryption = use('Encryption')
const { validateAll} = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class AuthController {

    async postLogin ({ request, response, auth }) {
        const validation = await validateAll(request.all(), {
            email: 'required|email',
            password: 'required'
        })
        if (validation.fails()) throw new ValidationException(validation.messages())

        const { email, password } = request.all()
        const authenticator = auth.authenticator('api')
        const user = await User.findBy('email', email)
        if (user) {
            const isSame = await Hash.verify(password, user.password)
            if (isSame) {
                const token = await authenticator.generate(user)
                return response.status(200).send({ data: token })
            }
        }
        return response.badRequest({ message : 'Username or Password wrong!' })
    }

    async postLogout ({ response, auth }) {
        const user = auth.current.user
        const token = auth.getAuthHeader()
        await user
            .tokens()
            .where('type', 'api_token')
            .where('is_revoked', false)
            .where('token', Encryption.decrypt(token))
            .update({ is_revoked: true })
        return response.send({ message: 'Logout successfully' })
    }

    async postLogoutAll ({ response, auth }) {
        const user = auth.current.user
        await user
            .tokens()
            .where('type', 'api_token')
            .where('is_revoked', false)
            .update({ is_revoked: true })
        return response.send({ message: 'Logout successfully' })
    }

    async postLogoutOther ({ response, auth }) {
        const user = auth.current.user
        const token = auth.getAuthHeader()
        await user
            .tokens()
            .where('type', 'api_token')
            .where('is_revoked', false)
            .whereNot('token', Encryption.decrypt(token))
            .update({ is_revoked: true })
        return response.send({ message: 'Logout successfully' })
    }

    async getProfile ({ auth, response }) {
        const user =  await auth.authenticator('api').getUser()
        return response.send({ data: user })
    }

    async getTokens ({ response, auth }) {
        const tokens = await auth.authenticator('api').listTokens()
        return response.send({ data: tokens })
    }

}

module.exports = AuthController
