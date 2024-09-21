const io = require('socket.io-client');

const socket = io('http://127.0.0.1:1881/', {
  path: '/tag-engine-socket-io',
});
console.log('Client connecting to server');

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('sub', 'dashboard:status');
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('error', (error) => {
  console.log('Error:', error);
});

socket.on('value', (data) => {
  console.log('Message received:', data);
});