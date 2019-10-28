import openScoket from 'socket.io-client'
const socket = openScoket()

/**
 *
 * @export
 * @param {*} cb
 * @description this function hangle the
 * handle the components subscriptions
 * for render the drawings
 */
export function subscribeToDrawings(cb) {
  socket.on('drawing', cb)
  socket.emit('subscribeToDrawings')
}

/**
 *
 * @export
 * @param {*} name
 * @description emit the drawings to
 * the server in real time to the db
 */
export function createDrawing(name) {
  socket.emit('createDrawing', { name })
}

export function publishLine({ drawingId, line }) {
  socket.emit('publishLine', { drawingId, line })
}
