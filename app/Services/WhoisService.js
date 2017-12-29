'use strict'

const whois = require('node-whois')

class WhoisService {

    async lookup (url) {
        return new Promise((resolve, reject) => {
            whois.lookup(url, function(err, data) {
                if (err) {
                    reject(null)
                } else {
                    resolve(data)
                }
            })
        })
    }

}

module.exports = new WhoisService