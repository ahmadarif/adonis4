'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.post('api/auth/login', 'AuthController.postLogin').middleware(['throttle:20'])
Route.group(() => {
    Route.post('logout', 'AuthController.postLogout')
    Route.post('logoutAll', 'AuthController.postLogoutAll')
    Route.post('logoutOther', 'AuthController.postLogoutOther')
    Route.get('profile', 'AuthController.getProfile').middleware(['role:sample1@mail.com'])
    Route.get('tokens', 'AuthController.getTokens')
}).prefix('api/auth').middleware(['throttle:20', 'auth:api'])

Route.group(() => {
    Route.get('/', 'UserController.getAll')
    Route.get('/:id', 'UserController.getById')
    Route.post('/', 'UserController.postInsert')
    Route.put('/:id', 'UserController.putUpdate')
    Route.delete('/:id', 'UserController.deleteById')
}).prefix('api/users').middleware(['throttle:20'])

Route.group(() => {
    Route.get('api/queue', 'QueueController.exampleQueue')
    Route.get('api/redis', 'QueueController.exampleRedis')
    Route.get('api/event', 'QueueController.exampleEvent')
}).middleware(['throttle:20'])

Route.get('/auth/:provider', 'AuthController.redirectToProvider').as('social.login')
Route.get('/auth/:provider/callback', 'AuthController.handleProviderCallback').as('social.login.callback')
Route.get('/logout', 'AuthController.logout').as('logout')
Route.get('/profile', 'AuthController.currentProfile').as('profile').middleware('auth')