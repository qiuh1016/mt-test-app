const io = require('socket.io-client');

const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('message', (data) => {
  console.log('Message received:', data);
});