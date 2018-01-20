'use strict'

const Whois = use('App/Services/WhoisService')
const Helpers = use('Helpers')
const JasperNode = require('jaspernode')

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

    async jasper ({ response }) {
        const jasper = new JasperNode(Helpers.appRoot('tmp/JasperNode'))
        let inputFile = Helpers.appRoot('tmp/JasperNode/params.jasper')
        let outputFile = Helpers.appRoot('tmp/JasperNode/output')

        let parameters = {
            myString: jasper.quotes('My String'),
            myInt: 100,
            myImage: jasper.quotes('sample.jpg')
        }
        
        try {   
            const pathFile = await jasper.process(inputFile, outputFile, parameters).execute()
            return response.send(pathFile)
        } catch (e) {
            return response.send(e)
        }
    }

}

module.exports = TestController
