import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { logger } from './utils/logger.js';
import { query } from './database/init.js';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Android Remote Hub API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      devices: '/api/devices',
      files: '/api/files',
    },
  });
});

// Import routes
import authRoutes from './routes/auth.routes.js';
import deviceRoutes from './routes/device.routes.js';
import fileRoutes from './routes/file.routes.js';

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/files', fileRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  logger.info(`✅ Client connected: ${socket.id}`);

  // Device authentication
  socket.on('device:authenticate', async (data) => {
    logger.info(`🔐 Device authentication attempt: ${data.deviceId}`);
    // TODO: Verify device and user
    socket.emit('authenticated', { success: true });
  });

  // Handle device disconnection
  socket.on('disconnect', () => {
    logger.info(`❌ Client disconnected: ${socket.id}`);
  });

  // Handle stream frames
  socket.on('stream:frame', (data) => {
    io.to('web-clients').emit('stream:frame', data);
  });

  // Handle control commands
  socket.on('control:command', (data) => {
    io.to(data.targetDeviceId).emit('control:execute', data);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  logger.info(`🚀 Server running on http://${HOST}:${PORT}`);
  logger.info(`📡 WebSocket ready for connections`);
  logger.info(`🌍 CORS Origin: ${process.env.CORS_ORIGIN || 'localhost'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
