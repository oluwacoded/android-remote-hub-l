# Dashboard - Android Remote Hub Web UI

React + Vite web dashboard for Android Remote Hub.

## Quick Start

```bash
cd dashboard
npm install
npm run dev
```

UI runs on `http://localhost:5173`

## Features

- 🔐 User authentication (login/register)
- 📱 Device management dashboard
- 🎮 Real-time device control
- 📊 Device monitoring (battery, CPU, RAM)
- 🎨 Beautiful dark mode UI
- 📲 Download Android app
- ⚙️ Settings page

## Pages

- `/login` - Login page
- `/register` - Registration page
- `/` - Dashboard (protected)
- `/device/:id` - Device control screen (protected)
- `/download` - Android app download
- `/settings` - User settings (protected)

## Build

```bash
npm run build
```

Built files go to `dist/` folder.
