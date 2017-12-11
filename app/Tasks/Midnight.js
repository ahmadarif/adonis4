'use strict'

class Midnight {

  // This is required. This is the schedule for which the task will run.
  // More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
  static get schedule () {
    // once every 00:01
    return '1 0 * * *'
  }

  // This is the function that is called at the defined schedule
  async handle() {
    // Do stuff here
    // Supports `async/await`
    console.log('Every midnight, time is ' + new Date())
  }

}

module.exports = Midnight
