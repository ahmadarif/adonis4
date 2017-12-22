'use strict'

const { test, trait, before, after } = use('Test/Suite')('User')
const User = use('App/Models/User')
const Hash = use('Hash')

trait('Test/ApiClient')

before(async () => {
  await User.create({
    id: 1,
    username: "sample",
    email: "email@mail.com",
    password: "123"
  })
})

after(async () => {
  await User
    .query()
    .where('email', 'email@mail.com')
    .orWhere('email', 'newuser@mail.com')
    .orWhere('email', 'newuser-update@mail.com')
    .delete()
})

test('check User password has been hashed', async ({ assert }) => {
  const user = await User.findBy('email', 'email@mail.com')
  const isSame = await Hash.verify('123', user.password)
  assert.isTrue(isSame)
})

test('get list of Users', async ({ client }) => {
  const response = await client.get('/api/users').type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    data: [
      {
        username: "sample",
        email: "email@mail.com"
      }
    ]
  })
})

test('get User by ID', async ({ client }) => {
  const response = await client.get('/api/users/1').type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    data: {
      id: 1,
      username: "sample",
      email: "email@mail.com"
    }
  })
})

test('insert new User', async ({ client }) => {
  const response = await client.post('/api/users')
    .send({
      email: 'newuser@mail.com',
      username: 'newuser',
      password: '123'
    })
    .type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Insert successfully.'
  })
})

test('check User has been added', async ({ client }) => {
  const response = await client.get('/api/users').type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    data: [
      {
        username: 'newuser',
        email: 'newuser@mail.com'
      }
    ]
  })
})

test('update User by ID', async ({ client }) => {
  const response = await client.put('/api/users/1')
    .send({
      email: 'newuser-update@mail.com',
      username: 'newuser-update',
      password: '123-update'
    })
    .type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Update successfully.'
  })
})

test('check User has been updated', async ({ client }) => {
  const response = await client.get('/api/users').type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    data: [
      {
        username: 'newuser-update',
        email: 'newuser-update@mail.com'
      }
    ]
  })
})

test('delete User by ID', async ({ client }) => {
  const response = await client.delete('/api/users/1').type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Delete successfully.'
  })
})

test('check User has been deleted', async ({ client }) => {
  const response = await client.get('/api/users/1').type('json').end()
  response.assertStatus(404)
  response.assertJSONSubset({
    message: 'User not found.'
  })
})