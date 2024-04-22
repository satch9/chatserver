import React from "react"
import socketio from "socket.io-client"

export const socket = socketio.connect('https://bookish-meme-97xxp76r44gcxq4r-3000.app.github.dev')

export const SocketContext = React.createContext();