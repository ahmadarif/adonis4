'use strict'

const Whois = use('App/Services/WhoisService')
const Helpers = use('Helpers')
const JasperNode = require('jaspernode')

class TestController {
  async whois ({ request, response }) {
    const output = request.input('output')
    let data = null
    if (output === 'json') {
      data = await Whois.lookupJSON(request.input('url'))
    } else {
      data = await Whois.lookup(request.input('url'))
    }
    return response.send(data)
  }

  async whoisPromisify ({ request, response }) {
    const output = request.input('output')
    let data = null
    if (output === 'json') {
      data = await Whois.lookupPromisifyJSON(request.input('url'))
    } else {
      data = await Whois.lookupPromisify(request.input('url'))
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

  async getTemplate ({ view }) {
    return view.render('template')
  }

  async postTemplate ({ request, response }) {
    const name = request.input('name')
    return response.send({ name: name })
  }

  async postCreateBucket ({ request, response }) {
    const GCS = require('App/Services/GcsService')

    try {
      await GCS.createBucket('uhuy')
      return response.send({ message: 'DONE' })
    } catch (e) {
      return response.send({ message: e.message })
    }
  }

  async postUploadFile ({ request, response }) {
    const GCS = require('App/Services/GcsService')

    try {
      const file = request.file('myfile')
      const uploadedFile = await GCS.upload('baru-nih', file, 'HOH')
      return response.send({ url: uploadedFile })
    } catch (e) {
      return response.send({ message: e.message })
    }
  }

  async postDeleteFile ({ request, response }) {
    const GCS = require('App/Services/GcsService')

    try {
      const filename = request.input('filename')
      await GCS.delete('baru-nih', filename)
      return response.send({ message: 'DONE' })
    } catch (e) {
      return response.send({ message: e.message })
    }
  }

  async postMoveFile ({ request, response }) {
    const GCS = require('App/Services/GcsService')

    try {
      const srcFilename = request.input('srcFilename')
      const destFilename = request.input('destFilename')
      await GCS.move('baru-nih', srcFilename, destFilename)
      return response.send({ message: 'DONE' })
    } catch (e) {
      return response.send({ message: e.message })
    }
  }
}

module.exports = TestController
