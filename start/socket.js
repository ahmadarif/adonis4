const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

io.use(function(socket, next) {
    const username = socket.handshake.query.username
    const password = socket.handshake.query.password

    if (username && password){
        if (password == '123') {
            socket.client.username = username
            return next()
        }
    }
    next(new Error('Authentication error'))
})

io.on('connection', function (socket) {
    socket.emit('authenticated', socket.client.username)

    socket.on('chat message', function(msg) {
        socket.emit('chat message', msg);
        console.log(`${msg} from ${socket.client.username}`)
    })

    socket.on('login', (data) => {
        if (data.password == '123') {
            socket.client.username = data.username
            
        } else {
            socket.emit('unauthorized', 'User not found!')
        }
    })
})