'use strict'

const Model = use('Model')

class Post extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'title' },
      strategy: 'shortId',
      disableUpdates: false
    })
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
