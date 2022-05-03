const express = require('express');
const { Server } = require('socket.io');
const port = process.env.PORT || 3000;
const cors = require('cors');

const app = express();

const http = require('http').Server(app);

app.use(cors);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });




const io = new Server(http, {

  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },

})


io.on('connection', async (socket) => {
  // const userId = await fetchUserId(socket);
  console.log(socket.id);
  // socket.on('chat message', (anotherSocketId, msg) => {
  //   socket.to(anotherSocketId).emit('new message', socket.id, msg);
  // });

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('new_message', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
