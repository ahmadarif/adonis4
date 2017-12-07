'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {

    async login ({ request, response, auth }) {
        const { email, password } = request.all()
        const authenticator = auth.authenticator('api')
        const user = await User.findBy('email', email)
        if (user) {
            const isSame = await Hash.verify(password, user.password)
            if (isSame) {
                const token = await authenticator.generate(user)
                return response.status(200).send(token)
            }
        }
        return response.badRequest({ message : 'Username or Password wrong!' })
    }

    async logout({ request, response, auth }) {
        const user = await auth.authenticator('api').getUser()
        await user
            .tokens()
            .where('type', 'api_token')
            .update({ is_revoked: true })
        return response.send({ message: 'Logout successfully' })
    }

    async profile ({ auth, response }) {
        const user =  await auth.authenticator('api').getUser()
        return response.send(user)
    }

    async add ({ request, response, params }) {
        const user = new User()
        user.username = request.input('username')
        user.password = request.input('password')
        user.email = request.input('email')
        await user.save()
        return response.send(user)
    }

    async tokens({ response, auth }) {
        const tokens = await auth.authenticator('api').listTokens()
        return response.send(tokens)
    }

}

module.exports = UserController
