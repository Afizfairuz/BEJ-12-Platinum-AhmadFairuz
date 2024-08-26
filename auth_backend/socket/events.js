function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      socket.send(`Server received: ${msg}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = setupSocket;
