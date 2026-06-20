const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const path = require('path');

// Load environment variables
dotenv.config();

// Import feature routes
const userRoutes = require('./features/users/routes/userRoutes');
const mealRoutes = require('./features/meals/routes/mealRoutes');
const orderRoutes = require('./features/orders/routes/orderRoutes');
const ratingRoutes = require('./features/ratings/routes/ratingRoutes');

// Import shared middleware
const errorHandler = require('./shared/middleware/errorHandler');
const corsMiddleware = require('./shared/middleware/cors');
const realtimeHandler = require('./features/realtime/handlers/realtimeHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middlewares
app.use(cors(corsMiddleware));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Feature Routes
app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ratings', ratingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Initialize WebSocket handlers
realtimeHandler.initialize(io);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});

module.exports = { server, io };
