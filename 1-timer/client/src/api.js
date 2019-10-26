import openScoket from 'socket.io-client'
const socket = openScoket()

export function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(timestamp))
  socket.emit('subscribeToTimer', 1000)
}
