'use strict'

/*
|--------------------------------------------------------------------------
| Redis Subscribers (Running in background)
|--------------------------------------------------------------------------
|
| Here you can register the subscribers to redis channels. Adonis assumes
| your listeners are stored inside `app/Listeners` directory.
|
*/
const Redis = use('Redis')
Redis.subscribe('news', 'News.newMessage') // proccess in background

/*
|--------------------------------------------------------------------------
| Events Listener (Running syncronized)
|--------------------------------------------------------------------------
|
| Here you can register the subscribers to redis channels. Adonis assumes
| your listeners are stored inside `app/Listeners` directory.
|
*/
const Event = use('Event')
Event.on('new::event', 'News.newEvent') // waiting until finished
