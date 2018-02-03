'use strict'

const sleep = require('system-sleep');

class Example {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'example-job'
  }

  // This is where the work is done.
  async handle (data) {
    sleep(5000);
    console.log(`New Queue received = ${data.message}`)
    return 'haha'
  }

}

module.exports = Example