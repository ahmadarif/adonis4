'user strict'

const { Command } = require('@adonisjs/ace')
const { join } = require('path')
const _ = require('lodash')

class MakeService extends Command {
  static get signature () {
    return `make:service { name: Name of Service }`
  }

  static get description () {
    return 'Make a new Service'
  }

  async handle ({ name }) {
    try {
      name = _.upperFirst(_.camelCase(name)) + 'Service'
      const templatePath = join(__dirname, '../Templates/Service.mustache')
      const templateContent = await this.readFile(templatePath, 'utf-8')
      const filePath = join('app/Services', name) + '.js'

      await this.generateFile(filePath, templateContent, { name })

      console.log(`${this.icon('success')} ${this.chalk.green('create')}  ${filePath}`)
    } catch ({ message }) {
      this.error(message)
    }
  }
}

module.exports = MakeService
