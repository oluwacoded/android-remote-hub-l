# Backend - Android Remote Hub API

Node.js + Express + Socket.io backend for Android Remote Hub.

## Quick Start

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token

### Devices
- `GET /api/devices` - List devices
- `GET /api/devices/:id` - Get device
- `POST /api/devices/register` - Register device
- `DELETE /api/devices/:id` - Delete device

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files/download/:id` - Download file

## WebSocket Events

- `device:authenticate` - Device login
- `stream:frame` - Screen frame data
- `control:command` - Remote control
- `device:info` - Device status

## Environment Variables

See `.env.example` for all variables needed.
