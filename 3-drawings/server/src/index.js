import r from 'rethinkdb'
import socketIo from 'socket.io'

const io = socketIo()
const port = 3001

/**
 *
 *
 * @param {*} connection
 * @param {*} name
 * @description create a new name in the
 * table drawings.
 */
function createDrawing(connection, name) {
  r.table('drawings')
    .insert({
      name,
      timestamp: new Date()
    })
    .run(connection)
    .then(() => console.log(`create a drawing with name ${name}`))
    .catch(error => console.error(error))
}

/**
 *
 * @param {*} { client, connection }
 * @description subscribe to the drawings and emit
 * the new changes in the database to the client.
 */
function subscribeToDrawings(client, connection) {
  r.table('drawings')
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor => {
      cursor.each((error, drawingRow) => {
        if (error) throw new error(error)
        client.emit('drawing', drawingRow.new_val)
      })
    })
}

/**
 *
 * @param {*} connection
 * @param {*} line
 * @description this function inserts on
 * the db new lines in the table lines.
 */
function handleLinePublish(connection, line) {
  console.log('saving line to the db')
  const data = { ...line, timestamp: new Date() }
  r.table('lines')
    .insert(data)
    .run(connection)
}

/**
 *
 * @param {*} client
 * @param {*} connection
 * @param {*} drawingId
 * @returns promise
 * @description this function send data to the sockets of each
 * new line of the drawing.
 */
function subscribeToDrawingLines(client, connection, drawingId) {
  return r
    .table('lines')
    .filter(r.row('drawingId').eq(drawingId))
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor => {
      cursor.each((error, lineRow) => {
        if (error) throw new error(error)
        client.emit(`drawingLine:${drawingId}`, lineRow.lineRow_val)
      })
    })
    .catch(error => console.error(error))
}

r.connect({
  host: 'localhost',
  port: 28015,
  db: 'awesome_whiteboard'
})
  .then(connection => {
    io.on('connection', client => {
      // event to create Drawings.
      client.on('createDrawing', ({ name }) => {
        createDrawing(connection, name)
      })
      // event to subscribe to the Drawings/
      client.on('subscribeToDrawings', () =>
        subscribeToDrawings(client, connection)
      )
      // this event pass the data and save to the db/
      client.on('publishLine', line => handleLinePublish(connection, line))
      // this event pass to the sockets the new changes.
      client.on('subscribeToDrawingLines', drawingId =>
        subscribeToDrawingLines(client, connection, drawingId)
      )
    })
  })
  .catch(error => console.error(error))

io.listen(port)
console.log(`Server Listing on port ${port}`)

export default io
