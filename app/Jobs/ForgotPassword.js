'use strict'

const Mail = use('Mail')

class ForgotPassword {

    static get concurrency () {
        return 1
    }

    static get key () {
        return 'forgotpassword-job'
    }

    async handle (data) {
        console.log('ForgotPassword: running')
        await Mail.send('emails.forgotPassword', data, (message) => {
            message
                .to(data.user.email)
                .from('Daily Event')
                .subject('Daily Event - Forgot Password')
        })
        console.log('ForgotPassword: finished')
    }

}

module.exports = ForgotPassword