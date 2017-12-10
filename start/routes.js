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

Route.post('api/auth/login', 'AuthController.postLogin')
Route.group(() => {
    Route.post('logout', 'AuthController.postLogout')
    Route.get('profile', 'AuthController.getProfile')
    Route.get('tokens', 'AuthController.getTokens')
}).prefix('api/auth').middleware('auth:api')

Route.group(() => {
    Route.get('/', 'UserController.getAll')
    Route.get('/:id', 'UserController.getById')
    Route.post('/', 'UserController.postInsert')
    Route.put('/:id', 'UserController.putUpdate')
    Route.delete('/:id', 'UserController.deleteById')
}).prefix('api/users')

Route.get('api/queue', 'QueueController.exampleQueue')