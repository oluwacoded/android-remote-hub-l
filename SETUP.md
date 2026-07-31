# Android Remote Hub - Development Setup

## 📋 Prerequisites

- Node.js 18+ (https://nodejs.org)
- PostgreSQL 12+ (https://www.postgresql.org)
- Android Studio (https://developer.android.com/studio)
- Git (https://git-scm.com)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/oluwacoded/android-remote-hub-l.git
cd android-remote-hub-l
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# nano .env

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Dashboard Setup

```bash
cd ../dashboard

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Dashboard runs on `http://localhost:5173`

### 4. Android App Setup

```bash
cd ../android

# Open in Android Studio
open -a "Android Studio" .

# Or if using command line
# ./gradlew assembleDebug
```

## 📁 Project Structure

```
android-remote-hub-l/
├── backend/              # Node.js Express server
│   ├── src/
│   │   ├── server.js     # Main entry point
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   ├── services/     # Business logic
│   │   ├── database/     # DB configuration
│   │   ├── websocket/    # Socket.io handlers
│   │   └── utils/        # Helper functions
│   ├── package.json
│   └── .env.example
│
├── dashboard/            # React web dashboard
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API & WebSocket
│   │   ├── store/        # Zustand stores
│   │   └── App.jsx       # Root component
│   ├── package.json
│   └── .env.example
│
└── android/              # Android Kotlin app
    ├── app/
    │   ├── src/
    │   │   ├── main/java/
    │   │   ├── res/
    │   │   └── AndroidManifest.xml
    │   └── build.gradle
    └── gradle/
```

## 🗄️ Database Setup

### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE android_remote_hub;
CREATE USER arh_user WITH PASSWORD 'your_password';
ALTER ROLE arh_user SET client_encoding TO 'utf8';
ALTER ROLE arh_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE arh_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE android_remote_hub TO arh_user;
\q
```

### Update Backend .env

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=android_remote_hub
DB_USER=arh_user
DB_PASSWORD=your_password
```

## 🔑 Generate Secrets

```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate Encryption Key (32 chars hex)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Add these to your `.env` file:

```env
JWT_SECRET=<your-generated-secret>
JWT_REFRESH_SECRET=<your-generated-secret>
ENCRYPTION_KEY=<your-generated-key>
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### API Testing

Use Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

## 🎨 Frontend Development

### Components

- `Navbar.jsx` - Top navigation
- `ProtectedRoute.jsx` - Route protection
- Login, Register, Dashboard, DeviceScreen, Download, Settings pages

### State Management

Using Zustand:
- `authStore` - Authentication state
- `deviceStore` - Device management state

### Styling

TailwindCSS for utility-first styling

## 📱 Android Development

### Architecture

- **Kotlin** - Modern Android language
- **Jetpack** - Android components
- **Coroutines** - Async operations
- **WebSocket** - Real-time communication
- **Room** - Local database

### Key Features

- Screen capture & streaming
- Remote input handling
- Accessibility service integration
- Background service
- Auto-start on boot

## 🔗 WebSocket Events

### Device → Server
```javascript
// Authenticate
socket.emit('device:authenticate', { deviceId, authToken });

// Send screen frame
socket.emit('stream:frame', { frameData, quality, fps });

// Heartbeat
socket.emit('heartbeat');

// Device info
socket.emit('device:info', { battery, ram, cpu, storage });
```

### Server → Web Client
```javascript
// Control commands
socket.emit('control:execute', { command, params });

// Stream frames
socket.emit('stream:frame', { deviceId, frameData });

// Device status
socket.emit('device:connected', { deviceId });
socket.emit('device:disconnected', { deviceId });
socket.emit('device:info', { deviceId, ...info });
```

## 📝 Logging

Logs are stored in `backend/logs/`:
- `combined.log` - All logs
- `error.log` - Error logs only

## 🐛 Debugging

### Backend
```bash
DEBUG=app:* npm run dev
```

### Frontend
Open DevTools (F12) in browser

### Android
Use Android Studio Logcat

## 🚀 Production Deployment

See `DEPLOYMENT_RAILWAY.md` for Railway deployment guide.

## 📚 Resources

- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [Socket.io Docs](https://socket.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Android Docs](https://developer.android.com)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Personal use only - Not for distribution or commercial use

---

Happy coding! 🎉
