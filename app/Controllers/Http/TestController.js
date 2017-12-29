'use strict'

const Whois = use('App/Services/WhoisService')

class TestController {

    async whois ({ request, response }) {
        const output = request.input('output')
        let data = null
        if (output == 'json') {
            data = await Whois.lookupJSON(request.input('url'))
        } else {
            data = await Whois.lookup(request.input('url'))
        }
        return response.send(data)
    }

}

module.exports = TestController
