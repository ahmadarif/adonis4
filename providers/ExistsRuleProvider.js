const { ServiceProvider } = require('@adonisjs/fold')

class ExistsRuleProvider extends ServiceProvider {
  async existsFn (data, field, message, args, get) {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return
    }
    
    const [table, column] = args
    
    const Database = use('Database')
    const row = await Database.table(table).where(column, value).first()
    if (!row) {
      throw message
    }
  }

  boot () {
    const Validator = use('Validator')
    Validator.extend('exists', this.existsFn)
  }
}

module.exports = ExistsRuleProvider