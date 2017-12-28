'use strict'

const { test, trait, before, after } = use('Test/Suite')('Auth')
const User = use('App/Models/User')

let token = null

trait('Test/ApiClient')

before(async () => {
  await User.create({
    username: "sample",
    email: "email@mail.com",
    password: "123"
  })
})

after(async () => {
  await User
    .query()
    .where('email', 'email@mail.com')
    .delete()
})

test('login', async ({ client }) => {
  const response = await client.post('/api/auth/login')
    .send({
      email: 'email@mail.com',
      password: '123'
    })
    .type('json').end()

  token = await JSON.parse(response.text).data.token
  
  response.assertStatus(200)
  response.assertJSONSubset({
    data: {
      type: "bearer"
    }
  })
})

test('get profile', async ({ client }) => {
  const response = await client.get('/api/auth/profile')
    .header('Authorization', 'Bearer ' + token)
    .type('json').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    data: {
      username: "sample",
      email: "email@mail.com"
    }
  })
})