'use strict'

const Helpers = use('Helpers')

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  'adonis-kue/providers/KueProvider',
  '@adonisjs/redis/providers/RedisProvider',
  'adonis-throttle/providers/ThrottleProvider',
  'adonis-scheduler/providers/SchedulerProvider',
  '@adonisjs/ally/providers/AllyProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/lucid-slugify/providers/SlugifyProvider',
  Helpers.appRoot('providers/ExistsRuleProvider'),
  'adonis-graphql/providers/GraphQLProvider',
  'adonis-hashids/providers/HashidsProvider',
  '@adonisjs/websocket/providers/WsProvider',
  '@adonisjs/drive/providers/DriveProvider'
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-kue/providers/CommandsProvider',
  'adonis-scheduler/providers/CommandsProvider',
  '@adonisjs/vow/providers/VowProvider',
  Helpers.appRoot('providers/ServiceGenerator/providers/ServiceGeneratorProvider')
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Throttle: 'Adonis/Addons/Throttle',
  Scheduler: 'Adonis/Addons/Scheduler'
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

const jobs = [
  'App/Jobs/Example',
  'App/Jobs/ForgotPassword'
]

module.exports = { providers, aceProviders, aliases, commands, jobs }
