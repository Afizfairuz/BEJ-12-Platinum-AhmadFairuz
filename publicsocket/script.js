const socket = io();

document.getElementById('sendMessage').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  socket.send(message);
});

socket.on('message', (message) => {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  messagesDiv.appendChild(newMessage);
});
