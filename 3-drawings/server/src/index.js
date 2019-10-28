import r from "rethinkdb"
import socketIo from "socket.io"

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
  r.table("drawings")
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
  r.table("drawings")
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor => {
      cursor.each((error, drawingRow) => {
        if (error) throw new error(error)
        client.emit("drawing", drawingRow.new_val)
      })
    })
}

r.connect({
  host: "localhost",
  port: 28015,
  db: "awesome_whiteboard"
})
  .then(connection => {
    io.on("connection", client => {
      // event to create Drawings
      client.on("createDrawing", ({ name }) => {
        createDrawing(connection, name)
      })
      // event to subscribe to the Drawings
      client.on("subscribeToDrawings", () =>
        subscribeToDrawings(client, connection)
      )
    })
  })
  .catch(error => console.error(error))

io.listen(port)
console.log(`Server Listing on port ${port}`)

export default io
