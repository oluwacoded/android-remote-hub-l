import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import { useDeviceStore } from '../store/deviceStore';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

let socket = null;

export const initializeSocket = () => {
  if (socket) return socket;

  socket = io(WS_URL, {
    auth: {
      token: useAuthStore.getState().token,
    },
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

  socket.on('device:connected', (data) => {
    console.log('📱 Device connected:', data);
    useDeviceStore.getState().setConnectionStatus(data.deviceId, 'connected');
  });

  socket.on('device:disconnected', (data) => {
    console.log('📱 Device disconnected:', data);
    useDeviceStore.getState().setConnectionStatus(data.deviceId, 'disconnected');
  });

  socket.on('device:info', (data) => {
    useDeviceStore.getState().setDeviceInfo(data.deviceId, data);
  });

  socket.on('stream:frame', (data) => {
    // Handle incoming frame data
    const event = new CustomEvent('streamFrame', { detail: data });
    window.dispatchEvent(event);
  });

  socket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return socket;
};

export const getSocket = () => socket;

export const sendControlCommand = (deviceId, command, params = {}) => {
  if (socket) {
    socket.emit('control:command', { targetDeviceId: deviceId, command, params });
  }
};

export default socket;
