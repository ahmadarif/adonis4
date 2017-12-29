'use strict'

const Whois = use('App/Services/WhoisService')

class TestController {

    async whois ({ request, response }) {
        const data = await Whois.lookupJSON(request.input('url'))
        return response.send(data)
    }

}

module.exports = TestController
