'use strict'

const kue = use('Kue')
const Job = use('App/Jobs/Example')

class QueueController {

    async exampleQueue({ response }) {
        const data = { message: 'Ini pesan dari controller' } // Data to be passed to job handle
        const priority = 'normal' // Priority of job, can be low, normal, medium, high or critical
        const attempts = 1 // Number of times to attempt job if it fails
        const remove = true // Should jobs be automatically removed on completion
        const job = kue.dispatch(Job.key, data, priority, attempts, remove)
        // const result = await job.result
        return response.send({ message: 'Queue dijalankan!' })
    }

}

module.exports = QueueController
