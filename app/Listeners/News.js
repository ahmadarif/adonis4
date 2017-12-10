'use strict'

const News = exports = module.exports = {}
const sleep = require('system-sleep');

News.newMessage = (data) => {
    sleep(2000)
    data = JSON.parse(data)
    console.log(`New message received = ${data.message}`)
}

News.newEvent = (data) => {
    sleep(2000)
    data = JSON.parse(data)
    console.log(`New message received = ${data.message}`)
}