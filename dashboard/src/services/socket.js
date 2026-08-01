import io from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';
let socket = null;

export function initializeSocket() {
  if (socket) return socket;

  socket = io(WS_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('✅ WebSocket connected');
  });

  socket.on('disconnect', () => {
    console.log('❌ WebSocket disconnected');
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function sendControlCommand(deviceId, command, params = {}) {
  if (socket) {
    socket.emit('control:command', {
      targetDeviceId: deviceId,
      command,
      params,
    });
  }
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
