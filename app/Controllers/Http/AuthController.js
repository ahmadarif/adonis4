'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Encryption = use('Encryption')
const { validateAll } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class AuthController {

    async postLogin ({ request, response, auth }) {
        const validation = await validateAll(request.all(), {
            email: 'required|email',
            password: 'required'
        })
        if (validation.fails()) throw new ValidationException(validation.messages())
        
        try {
            const { email, password } = request.all()
            const token = await auth.authenticator('api').attempt(email, password)
            return response.status(200).send({ data: token })
        } catch (error) {
            let message = null
            switch (error.name) {
                case 'UserNotFoundException': message = 'Cannot find user with provided email.'; break
                case 'PasswordMisMatchException': message = 'Invalid user password.'; break
            }
            return response.status(error.status).send({ message: message })
        }
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

    async getProfile ({ response, auth }) {
        const user =  await auth.current.user
        return response.send({ data: user })
    }

    async getTokens ({ response, auth }) {
        const tokens = await auth.authenticator('api').listTokens()
        return response.send({ data: tokens })
    }


    // web session: ===================================================================================
    async redirectToProvider ({ ally, params }) {
        await ally.driver(params.provider).redirect()
    }
    
    async handleProviderCallback ({ params, session, ally, auth, response }) {
        const provider = params.provider
        try {
            const userData = await ally.driver(params.provider).getUser()

            try {
                await auth.check()
            } catch (error) {
                console.log('error = ' + error)
                console.log('email = ' + userData.getEmail())

                // user details to be saved
                const userDetails = {
                    email: userData.getEmail(),
                    username: userData.getNickname(),
                    password: userData.getNickname()
                }

                // search for existing user
                const whereClause = {
                    email: userData.getEmail()
                }
        
                const user = await User.findOrCreate(whereClause, userDetails)
                await auth.login(user)
            } finally {
                return response.redirect('/')
            }
        } catch (e) {
            console.log('error getUser() = ' + e)
            return response.redirect('/auth/' + provider)
        }
    }

    async logout ({auth, response}) {
        await auth.logout()
        response.redirect('/')
    }

    async currentProfile ({ auth }) {
        return auth.current.user
    }

}

module.exports = AuthController
