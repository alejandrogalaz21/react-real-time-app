import socketIo from "socket.io"
const io = socketIo()
const port = 8000

io.on("connection", client => {
  client.on("subscribeToTimer", interval => {
    console.log(`Client is subscribing to timer with interval ${interval}`)
    setInterval(() => {
      client.emit("timer", new Date())
    }, interval)
  })
})

io.listen(port)
console.log(`Server Listing on port ${port}`)

export default io
