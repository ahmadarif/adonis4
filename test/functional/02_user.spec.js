'use strict'

const { test, trait, before, after } = use('Test/Suite')('User')
const Database = use('Database')
const Hash = use('Hash')
const User = use('App/Models/User')
const Hashids = use('Hashids')

const id1 = Hashids.encode(1)

trait('Test/ApiClient')

before(async () => {
  await User.create({
    id: 1,
    username: 'sample',
    email: 'email@mail.com',
    password: '123'
  })
})

after(async () => {
  await Database.truncate('users')
})

test('check User password has been hashed', async ({ assert }) => {
  const user = await User.findBy('email', 'email@mail.com')
  const isSame = await Hash.verify('123', user.password)
  assert.isTrue(isSame)
}).timeout(5000)

test('get list of Users', async ({ client }) => {
  const response = await client.get('/api/users').type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    data: [
      {
        username: 'sample',
        email: 'email@mail.com'
      }
    ]
  })
}).timeout(5000)

test('get User by ID', async ({ client }) => {
  const response = await client.get('/api/users/' + id1).type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    data: {
      id: id1,
      username: 'sample',
      email: 'email@mail.com'
    }
  })
}).timeout(5000)

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
}).timeout(5000)

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
}).timeout(5000)

test('update User by ID', async ({ client }) => {
  const response = await client.put('/api/users/' + id1)
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
}).timeout(5000)

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
}).timeout(5000)

test('delete User by ID', async ({ client }) => {
  const response = await client.delete('/api/users/' + id1).type('json').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Delete successfully.'
  })
}).timeout(5000)

test('check User has been deleted', async ({ client }) => {
  const response = await client.get('/api/users/' + id1).type('json').end()
  response.assertStatus(404)
  response.assertJSONSubset({
    message: 'User not found.'
  })
}).timeout(5000)

test('delete User by Email (ExistsRuleProvider test)', async ({ client }) => {
  await User.create({
    username: 'sample2',
    email: 'email2@mail.com',
    password: '123'
  })

  const response = await client.delete('/api/users/email')
    .send({
      email: 'email2@mail.com'
    })
    .type('json').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Delete successfully.'
  })
}).timeout(5000)
