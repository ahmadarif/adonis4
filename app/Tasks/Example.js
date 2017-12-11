'use strict'

class Example {

  // This is required. This is the schedule for which the task will run.
  // More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
  static get schedule () {
    // once every minute
    return '* * * * *'
  }

  // This is the function that is called at the defined schedule
  async handle() {
    // Do stuff here
    // Supports `async/await`
    console.log('Every minute, time is ' + new Date())
  }

}

module.exports = Example
