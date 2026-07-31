# Android Remote Hub

**Remote control your Android device from a web browser**

[![GitHub stars](https://img.shields.io/github/stars/oluwacoded/android-remote-hub-l)](https://github.com/oluwacoded/android-remote-hub-l)
[![License](https://img.shields.io/badge/license-Personal%20Use-blue)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![Android](https://img.shields.io/badge/Android-7.0%2B-green)](https://developer.android.com)

## 🎯 Features

✅ **Live Screen Streaming** - Real-time device screen display
✅ **Remote Control** - Touch, swipe, and button controls
✅ **File Transfer** - Send and receive files
✅ **Device Info** - Battery, CPU, RAM, storage monitoring
✅ **Web Dashboard** - Beautiful React-based control panel
✅ **Secure Connection** - JWT authentication & encryption
✅ **Real-time Updates** - WebSocket for instant communication
✅ **Multiple Devices** - Control multiple Android devices
✅ **Auto-reconnect** - Automatic reconnection on network change
✅ **Dark Mode** - Eye-friendly interface

## 📱 Screenshots

### Web Dashboard
- Login/Register page
- Device management dashboard
- Real-time screen viewer
- Control panel with touch simulation
- Device monitoring (battery, CPU, RAM)
- Settings page

### Android App
- Clean Material 3 UI
- Background service
- Screen capture & streaming
- Accessibility integration

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ 
PostgreSQL 12+
Android Studio (for building APK)
```

### 1. Clone & Setup Backend
```bash
git clone https://github.com/oluwacoded/android-remote-hub-l.git
cd android-remote-hub-l/backend

npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Setup Dashboard
```bash
cd ../dashboard
npm install
cp .env.example .env
npm run dev
```

Dashboard runs on `http://localhost:5173`

### 3. Download Android App
```
Visit: http://localhost:5173/download
Download the APK and install on your Android device
```

### 4. Register & Connect
1. Create account on web dashboard
2. Open Android app and login
3. Grant required permissions
4. Start controlling!

## 🌐 Deploy on Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Connect your repository

### Step 2: Create Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose this repository
4. Click "Deploy"

### Step 3: Add PostgreSQL
1. In Railway dashboard, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will auto-link and provide credentials

### Step 4: Configure Environment

**Backend Variables:**
```env
NODE_ENV=production
PORT=5000
DB_HOST=<railway-postgres-host>
DB_PORT=5432
DB_NAME=android_remote_hub
DB_USER=postgres
DB_PASSWORD=<your-password>
JWT_SECRET=<generate-strong-secret>
JWT_REFRESH_SECRET=<another-secret>
ENCRYPTION_KEY=<32-char-hex-key>
CORS_ORIGIN=https://<your-domain>.railway.app
```

**Frontend Variables:**
```env
VITE_API_URL=https://<backend-url>.railway.app
VITE_WS_URL=wss://<backend-url>.railway.app
```

### Step 5: Deploy
1. Push code to GitHub
2. Railway automatically deploys
3. Monitor build in dashboard
4. Get your public URLs!

### Generate Secrets
```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## 📋 Project Structure

```
android-remote-hub-l/
├── backend/              # Express.js server
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── websocket/
│   │   └── database/
│   └── package.json
│
├── dashboard/            # React web app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── store/
│   └── package.json
│
├── android/              # Android app
│   └── app/
│       └── src/
│           └── main/
│
└── Documentation files
```

## 🏗️ Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Socket.io Client** - WebSocket client
- **Axios** - HTTP client

### Android
- **Kotlin** - Programming language
- **Jetpack Compose** - UI framework
- **Coroutines** - Async operations
- **Socket.io** - WebSocket
- **Room** - Local database

## 🔐 Security

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Data encryption for sensitive info
- ✅ HTTPS/WSS in production
- ✅ CORS properly configured
- ✅ Rate limiting ready
- ✅ Input validation
- ✅ Secure token refresh mechanism

## 📡 WebSocket Events

### Device → Server
```javascript
device:authenticate     // Auth with device
stream:frame           // Send screen data
device:info            // Send device stats
heartbeat             // Keep-alive ping
```

### Server → Client
```javascript
control:execute        // Execute command
stream:frame           // Receive frame
device:connected       // Device online
device:disconnected    // Device offline
```

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Health check
curl http://localhost:5000/api/health

# API test
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

## 📖 Documentation

- [Setup Guide](SETUP.md) - Local development setup
- [Deployment Guide](DEPLOYMENT_RAILWAY.md) - Railway deployment
- [Contributing](CONTRIBUTING.md) - How to contribute
- [Security Policy](SECURITY.md) - Security guidelines

## 🐛 Troubleshooting

### Backend Won't Connect
- Check PostgreSQL is running
- Verify database credentials in .env
- Check database exists: `psql -l | grep android_remote_hub`

### Frontend WebSocket Error
- Verify backend is running
- Check VITE_WS_URL in .env
- Ensure CORS_ORIGIN matches

### Android App Won't Connect
- Check internet permission granted
- Verify server URL is correct
- Check backend is publicly accessible
- Look at Android Logcat for errors

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Devices
- `POST /api/devices/register` - Register device
- `GET /api/devices` - List all devices
- `GET /api/devices/:deviceId` - Get device details
- `DELETE /api/devices/:deviceId` - Remove device
- `POST /api/devices/:deviceId/disconnect` - Disconnect device

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files/download/:fileId` - Download file
- `GET /api/files/transfers/:deviceId` - Get transfers

## 🌟 Future Features

- [ ] App marketplace
- [ ] Voice commands
- [ ] Clipboard sync
- [ ] Notification mirroring
- [ ] App installation from dashboard
- [ ] Call recording
- [ ] Message forwarding
- [ ] Two-factor authentication
- [ ] Device location tracking
- [ ] Multi-language support

## 📄 License

Personal use only - Not for distribution or commercial use

## 👨‍💻 Author

**Oluwacoded** - [@oluwacoded](https://github.com/oluwacoded)

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## 📞 Support

- GitHub Issues: https://github.com/oluwacoded/android-remote-hub-l/issues
- Documentation: Check SETUP.md and DEPLOYMENT_RAILWAY.md

---

**⭐ Star this repo if you find it useful!**
