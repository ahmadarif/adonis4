'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class UserController {
  async getAll ({ request, response }) {
    const users = await User.query().paginate(request.input('page', 1))
    return response.send(users)
  }

  async getById ({ params, response }) {
    const user = await User.findOrFail(params.id)
    return response.send({ data: user })
  }

  async postInsert ({ request, response }) {
    const validation = await validateAll(request.all(), {
      email: 'required|email|unique:users,email',
      password: 'required',
      username: 'required|unique:users,username'
    })
    if (validation.fails()) throw new ValidationException(validation.messages())

    const user = new User()
    user.password = request.input('password')
    user.email = request.input('email')
    user.username = request.input('username')
    await user.save()

    return response.send({ message: 'Insert successfully.' })
  }

  async putUpdate ({ request, params, response }) {
    const validation = await validateAll(request.all(), {
      email: `required|email|unique:users,email,id,${params.id}`,
      password: 'required',
      username: `required|unique:users,username,id,${params.id}`
    })
    /* istanbul ignore if */
    if (validation.fails()) throw new ValidationException(validation.messages())

    const user = await User.findOrFail(params.id)
    user.password = request.input('password')
    user.email = request.input('email')
    user.username = request.input('username')
    await user.save()

    return response.send({ message: 'Update successfully.' })
  }

  async deleteById ({ params, response }) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.send({ message: 'Delete successfully.' })
  }

  async deleteByEmail ({ request, response }) {
    const validation = await validateAll(request.all(), {
      email: 'required|email|exists:users,email'
    })
    /* istanbul ignore if */
    if (validation.fails()) throw new ValidationException(validation.messages())

    const user = await User.findBy('email', request.input('email'))
    await user.delete()
    return response.send({ message: 'Delete successfully.' })
  }
}

module.exports = UserController
