// socket-server.ts

const createServer = require('http').createServer;
const SocketIOServer = require('socket.io').Server;

// Create a basic HTTP server
let server, io, allowedOrigins = [];

// Create a new instance of Socket.IO server
io = createIoServer(server, allowedOrigins);

function createIoServer(server, allowedOrigins) {
  // shutdown the existing server
  if (io) {
    io.close();
    if (io.timer) clearInterval(io.timer);
  }

  if (server) {
    server.close();
  }

  server = createServer();
  // Start the server
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
  });

  // Create a new instance of Socket.IO server
  io = new SocketIOServer(server, {
    path: '/tag-engine-socket-io',
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });


  io.timer = setInterval(() => {
    if (io && io.emit) io.emit('message', mockStatus());
  }, 3000);

  // Listen for socket connections
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Listen for custom events
    socket.on('message', (data) => {
      console.log('Message received:', data);
      // Broadcast message to all clients
      socket.emit('message', mockStatus());
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}


// Function to update allowed origins dynamically
function updateAllowedOrigins(newOrigins) {
  allowedOrigins = newOrigins;
  console.log('Allowed origins updated:', allowedOrigins);
  io = createIoServer(server, allowedOrigins);
}

// Example of dynamically updating allowed origins
setTimeout(() => {
  updateAllowedOrigins(["http://127.0.0.1:3000"]);
}, 10000); // Update allowed origins after 10 seconds


function mockStatus() {
  const equipments = ['Broadcaster', 'Oven', 'Calibrator', 'Polisher', 'UV Oven'];
  const status = {}
  for (const equipment of equipments) {
    status[equipment] = {
      state: Math.round(Math.random() * 4),
      runtime: Math.round(Math.random() * 100),
      outfeed: Math.round(Math.random() * 10 + 10),
      rejects: Math.round(Math.random() * 5),
      rate: Math.round(Math.random() * 40) / 10,
      signalDistribution: {
        running: Math.round(Math.random() * 40),
        blocked: Math.round(Math.random() * 30),
        starved: Math.round(Math.random() * 20),
        unplannedDowntime: Math.round(Math.random() * 5),
        plannedDowntime: Math.round(Math.random() * 2)
      }
    }
  }

  return status;
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  if (io) io.close();
  if (server) server.close();
  process.exit(0);
});