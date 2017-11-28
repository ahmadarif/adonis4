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

Route.group(() => {
    Route.post('login', 'UserController.login')
    Route.post('logout', 'UserController.logout')
    Route.get('users/add', 'UserController.add')
    Route.get('profile', 'UserController.profile').middleware('auth:api')
    Route.get('tokens', 'UserController.tokens').middleware('auth:api')
}).prefix('api')