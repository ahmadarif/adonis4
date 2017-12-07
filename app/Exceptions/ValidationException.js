'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ValidationException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    response.badRequest({ message: 'Validation error.', errors: error.message })
  }
}

module.exports = ValidationException
