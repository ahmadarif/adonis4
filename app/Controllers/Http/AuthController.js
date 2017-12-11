'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {

    async postLogin ({ request, response, auth }) {
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

    async postLogout ({ request, response, auth }) {
        const user = auth.current.user
        const token = auth.getAuthHeader()
        await user
            .tokens()
            .where('token', token)
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