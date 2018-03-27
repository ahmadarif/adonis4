const { ServiceProvider } = require('@adonisjs/fold')

class ServiceGeneratorProvider extends ServiceProvider {
  register () {
    this.app.bind('Adonis/Commands/Make:Service', () => require('./ServiceGenerator/Commands/MakeService'))
  }

  boot () {
    const ace = require('@adonisjs/ace')
    ace.addCommand('Adonis/Commands/Make:Service')
  }
}

module.exports = ServiceGeneratorProvider
