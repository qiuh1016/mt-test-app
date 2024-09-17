// socket-server.ts

const createServer = require('http').createServer;
const SocketIOServer = require('socket.io').Server;

// Create a basic HTTP server
const server = createServer();

let allowedOrigins = [];

// Create a new instance of Socket.IO server
const io = new SocketIOServer(server, {
  path: '/tag-engine-socket-io',
  cors: {
    // origin: "http://127.0.0.1:3000", // Change this to your frontend URL in production, e.g., "http://localhost:3000"
    origin: (origin, callback) => {
      // Allow the request if the origin is in the allowedOrigins list
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
  },
});

// Function to update allowed origins dynamically
function updateAllowedOrigins(newOrigins) {
  allowedOrigins = newOrigins;
  console.log('Allowed origins updated:', allowedOrigins);
}

// Example of dynamically updating allowed origins
setTimeout(() => {
  updateAllowedOrigins(['http://localhost:3000', 'https://myapp.com']);
}, 10000); // Update allowed origins after 10 seconds

// Listen for socket connections
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Listen for custom events
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Broadcast message to all clients
    socket.emit('message', mockStatus());
  });

  setInterval(() => {
    io.emit('message', mockStatus());
  }, 3000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});


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