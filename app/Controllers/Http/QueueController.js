'use strict'

const kue = use('Kue')
const Job = use('App/Jobs/Example')
const Redis = use('Redis')
const Event = use('Event')
const { validateAll } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class QueueController {
  async exampleQueue ({ request, response }) {
    const validation = await validateAll(request.all(), { message: 'required' })
    if (validation.fails()) throw new ValidationException(validation.messages())

    const data = { message: request.input('message') } // Data to be passed to job handle
    const priority = 'normal' // Priority of job, can be low, normal, medium, high or critical
    const attempts = 1 // Number of times to attempt job if it fails
    const remove = true // Should jobs be automatically removed on completion

    kue.dispatch(Job.key, data, priority, attempts, remove)

    return response.send({ message: 'Queue dijalankan!' })
  }

  async exampleRedis ({ request, response }) {
    const validation = await validateAll(request.all(), { message: 'required' })
    if (validation.fails()) throw new ValidationException(validation.messages())

    Redis.publish('news', JSON.stringify({ message: request.input('message') }))
    return response.send({ message: 'Redis sudah dipublish' })
  }

  async exampleEvent ({ request, response }) {
    const validation = await validateAll(request.all(), { message: 'required' })
    if (validation.fails()) throw new ValidationException(validation.messages())

    Event.fire('new::event', JSON.stringify({ message: request.input('message') }))
    return response.send({ message: 'Event sudah difire!' })
  }
}

module.exports = QueueController
