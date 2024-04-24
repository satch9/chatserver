import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'https://bookish-meme-97xxp76r44gcxq4r-5173.app.github.dev', // Modifier en fonction de votre configuration frontend
      methods: ['GET', 'POST'],
    },
    /* cors: {
      origin: 'http://localhost:5173', // Modifier en fonction de votre configuration frontend
      methods: ['GET', 'POST'],
    }, */
  })

  let loopLimit = 0

  let gameCollection = {
    totalGameCount: 0,
    gameList: [],
  }

  const buildGame = (socket) => {
    let gameObject = {}
    gameObject['id'] = uuidv4()
    gameObject['playerOne'] = socket.username
    gameObject['playerTwo'] = null
    gameCollection.totalGameCount++
    gameCollection.gameList.push({ gameObject: gameObject })

    console.log(`Game created by ${socket.username} with ${gameObject.id}`)
    io.emit('gameCreated', { username: socket.username, gameId: gameObject.id })
  }

  const killGame = (socket) => {
    let notInGame = true
    for (let i = 0; i < gameCollection.totalGameCount; i++) {
      let gameId = gameCollection.gameList[i]['gameObject']['id']
      let plyr1tmp = gameCollection.gameList[i]['gameObject']['playerOne']
      let plyr2tmp = gameCollection.gameList[i]['gameObject']['playerTwo']

      if (plyr1tmp == socket.username) {
        gameCollection.totalGameCount--
        console.log(`Destroy game ${gameId} !`)
        gameCollection.gameList.splice(i, 1)
        console.log(gameCollection.gameList)
        socket.emit('leftGame', { gameId: gameId })
        io.emit('gameDestroyed', { gameId: gameId, gameOwner: socket.username })
        notInGame = false
      } else if (plyr2tmp == socket.username) {
        gameCollection.gameList[i]['gameObject']['playerTwo'] = null
        console.log(`${socket.username} has left ${gameId}`)
        socket.emit('leftGame', { gameId })
        console.log(gameCollection.gameList[i]['gameObject'])
        notInGame = false
      }
    }

    if (notInGame == true) socket.emit('notInGame')
  }

  const gameSeeker = (socket) => {
    loopLimit++
    if (gameCollection.totalGameCount == 0 || loopLimit >= 20) {
      buildGame(socket)
      loopLimit = 0
    } else {
      console.log('gameSeeker else')
    }
  }

  // chatRoom

  let numUsers = 0

  io.on('connection', (socket) => {
    console.log(`User connected with socketId ${socket.id}`)
    let addedUser = false

    // when the client emits 'new message', this listens and executes
    socket.on('new message', ({ username, message }) => {
      //console.log('username, message [new message]', username, message)
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: username,
        message: message,
      })
    })

    // when the clients emits 'add user', this listens and executes
    socket.on('add user', (username) => {
      if (addedUser) return

      // we store the username in the socket session for this client
      socket.username = username
      numUsers++
      addedUser = true
      socket.emit('login', { numUsers })
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers,
      })
    })

    socket.on('joinGame', () => {
      console.log(`${socket.username} wants to join a game`)
      let alreadyInGame = false

      for (let i = 0; i < gameCollection.totalGameCount; i++) {
        const plyr1tmp = gameCollection.gameList[i]['gameObject']['playerOne']
        const plyr2tmp = gameCollection.gameList[i]['gameObject']['playerTwo']
        if (plyr1tmp == socket.username || plyr2tmp == socket.username) {
          alreadyInGame = trueconsole.log(
            `${socket.username} already has a Game!`,
          )

          socket.emit('alreadyJoined', {
            gameId: gameCollection.gameList[i]['gameObject']['id'],
          })
        }
      }
      if (alreadyInGame == false) gameSeeker(socket)
    })

    socket.on('leaveGame', () => {
      if (gameCollection.totalGameCount == 0) {
        socket.emit('notInGame')
      } else {
        killGame(socket)
      }
    })

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
      socket.broadcast.emit('typing', { username: socket.username })
    })

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing', {
        username: socket.username,
      })
    })

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
      if (addedUser) {
        numUsers--
        killGame(socket)

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers,
        })
      }
    })
  })
}

export default initializeSocket
