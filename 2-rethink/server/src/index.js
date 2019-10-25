import socketIo from "socket.io"
import rethinkdb from "rethinkdb"

const io = socketIo()
const port = 8000

rethinkdb
  .connect({
    host: "localhost",
    port: 28015,
    db: "awesome_whiteboard"
  })
  .then(connection => {
    io.on("connection", client => {
      client.on("subscribeToTimer", interval => {
        console.log(`Client is subscribing to timer with interval ${interval}`)

        rethinkdb
          .table("timers")
          .changes()
          .run(connection)
          .then(cursor => {
            cursor.each((error, timerRow) => {
              if (error) throw new error(error)
              client.emit("timer", timerRow.new_val.timestamp)
            })
          })
          .catch(error => {
            throw new error(error)
          })
      })
    })
  })
  .catch(error => {
    throw new error(error)
  })

io.listen(port)
console.log(`Server Listing on port ${port}`)

export default io
