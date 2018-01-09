'use strict'

const whois = require('node-whois')
const parser = require('parse-whois')

class WhoisService {

    lookup (url) {
        return new Promise((resolve, reject) => {
            whois.lookup(url, function(err, data) {
                if (err) {
                    reject(new Error('Whois error: ' + err.message))
                } else {
                    resolve(data)
                }
            })
        })
    }

    lookupJSON (url) {
        return new Promise((resolve, reject) => {
            whois.lookup(url, function(err, data) {
                if (err) {
                    reject(new Error('Whois error: ' + err.message))
                } else {
                    const result = parser.parseWhoIsData(data)
                    for (var i = 0; i < result.length; i++) {
                        result[i].attribute = result[i].attribute.trim()
                    }
                    resolve(result)
                }
            })
        })
    }

}

module.exports = new WhoisService