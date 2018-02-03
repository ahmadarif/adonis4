'use strict'

const AuthService = use('App/Services/AuthService')
const Response = use('App/Class/Response')
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
        /* istanbul ignore if */
        if (validation.fails()) throw new ValidationException(validation.messages())
        
        const { email, password } = request.all()
        const result = await AuthService.login(auth, email, password)

        /* istanbul ignore else */
        if (result.data != null) {
            return response.status(result.status).send({ data: result.data })
        } else {
            return response.status(result.status).send({ message: result.message })
        }
    }

    async postLogout ({ response, auth }) {
        await AuthService.logout(auth)
        return response.send({ message: 'Logout successfully' })
    }

    async postLogoutOther ({ response, auth }) {
        await AuthService.logoutOther(auth)
        return response.send({ message: 'Logout successfully' })
    }

    async postLogoutAll ({ response, auth }) {
        await AuthService.logoutAll(auth)
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
    /* istanbul ignore next */
    async redirectToProvider ({ ally, params }) {
        await ally.driver(params.provider).redirect()
    }
    
    /* istanbul ignore next */
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

    async forgotPassword ({ request, response }) {
        const validation = await validateAll(request.all(), {
            email: 'required|email|exists:users,email'
        })
        if (validation.fails()) throw new ValidationException(validation.messages())
        await AuthService.forgotPassword(request.input('email'))
        return response.send({ message: 'New password will been send to your Email.' })
    }

}

module.exports = AuthController