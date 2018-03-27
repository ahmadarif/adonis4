'use strict'

class ChatController {
  constructor ({ socket, request }) {
    console.log('user joined with %s socket id', socket.id)
    this.socket = socket
    this.request = request
  }

  onMessage (message) {
    console.log('ada message')
    this.socket.broadcastToAll('message', message)
  }
}

module.exports = ChatController
