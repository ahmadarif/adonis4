'use strict'

const { trait, test } = use('Test/Suite')('Exception Handler')
trait('Test/ApiClient')

test('validation exception test', async ({ client }) => {
  const response = await client.post('/api/users')
    .send({
      email: 'emailfailed',
      username: 'newuser',
      password: '123'
    })
    .type('json').end()
  response.assertStatus(400)
}).timeout(0)
