'use strict'

const Env = use('Env')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    const type = request.is(['html', 'json'])

    if (type === 'json') {
      switch (error.name) {
        case 'InvalidApiToken': return response.status(error.status).send({ message : 'Invalid API token.' })
        case 'ModelNotFoundException': return response.status(error.status).send({ message : error.message.split(" ")[6] + ' not found.' })
        case 'HttpException': return response.status(error.status).send({ message : error.message })
        case 'TooManyRequests': return response.status(error.status).send({ message : error.message })
      }
      
      switch (error.code) {
        case 'SQLITE_CONSTRAINT': return response.status(error.status).send({ message : 'Constraint error.' })
      }

      switch (error.statusCode) {
        case 400: return response.status(error.status).send({ message : 'Bad request.' })
      }

      if (Env.get('NODE_ENV') === 'development') {
        return response.status(error.status).send({ errorMessage: error.message, errorName: error.name, errorCode: error.code })
      } else {
        return response.status(error.status).send({ message : 'Something error happens, we will fix soon.' })
      }
    } else {
      response.status(error.status).send(error.message)
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
