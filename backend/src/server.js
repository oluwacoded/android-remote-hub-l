import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

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

// Mock Routes
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  res.status(201).json({
    message: 'User registered',
    user: { id: 1, username, email },
    accessToken: 'mock-token-123',
    refreshToken: 'mock-refresh-123',
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  res.json({
    message: 'Login successful',
    user: { id: 1, username: 'user', email },
    accessToken: 'mock-token-123',
    refreshToken: 'mock-refresh-123',
  });
});

app.get('/api/devices', (req, res) => {
  res.json({
    devices: [
      {
        id: 1,
        device_id: 'device-001',
        device_name: 'My Phone',
        device_model: 'Samsung Galaxy S21',
        android_version: '13.0',
        is_active: true,
        last_seen: new Date(),
      },
    ],
  });
});

app.post('/api/files/upload', (req, res) => {
  res.json({ message: 'File uploaded', fileId: 'file-123' });
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  socket.on('device:authenticate', (data) => {
    console.log('🔐 Device authenticated:', data.deviceId);
    socket.emit('authenticated', { success: true });
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });

  socket.on('stream:frame', (data) => {
    io.emit('stream:frame', data);
  });

  socket.on('control:command', (data) => {
    io.to(data.targetDeviceId).emit('control:execute', data);
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📡 WebSocket ready for connections`);
  console.log(`🌍 CORS Origin: ${process.env.CORS_ORIGIN || 'localhost'}`);
});

export default app;
