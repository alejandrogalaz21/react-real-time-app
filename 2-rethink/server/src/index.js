import r from 'rethinkdb'
import socketIo from 'socket.io'

const io = socketIo()
const port = 3001

r.connect({
  host: 'localhost',
  port: 28015,
  db: 'awesome_whiteboard'
})
  .then(connection => {
    io.on('connection', client => {
      client.on('subscribeToTimer', interval => {
        console.log(`Client is subscribing to timer with interval ${interval}`)

        r.table('timers')
          .changes()
          .run(connection)
          .then(cursor => {
            cursor.each((error, timerRow) => {
              if (error) console.error(error)
              console.log(timerRow)
              client.emit('timer', timerRow.new_val.timestamp)
            })
          })
          .catch(error => console.error(error))
      })
    })
  })
  .catch(error => console.error(error))

io.listen(port)
console.log(`Server Listing on port ${port}`)

export default io
