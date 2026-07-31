# Android Remote Hub - Deployment Guide

## 🚀 Deploy on Railway

Railway makes it easy to deploy your full-stack application. Follow these steps:

### Prerequisites
- Railway account (https://railway.app)
- GitHub account with the repository
- PostgreSQL database

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `android-remote-hub-l` repository
4. Click "Deploy Now"

### Step 3: Configure Environment Variables

In Railway Dashboard:

#### Backend Variables
```
NODE_ENV=production
PORT=5000
DB_HOST=<railway-postgres-host>
DB_PORT=5432
DB_NAME=android_remote_hub
DB_USER=postgres
DB_PASSWORD=<generated-password>
JWT_SECRET=<generate-strong-secret>
JWT_REFRESH_SECRET=<generate-another-secret>
ENCRYPTION_KEY=<32-char-hex-key>
CORS_ORIGIN=https://<your-domain>.railway.app
```

#### Frontend Variables
```
VITE_API_URL=https://<backend-url>.railway.app
VITE_WS_URL=wss://<backend-url>.railway.app
```

### Step 4: Add PostgreSQL Service
1. In Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create and link the database
4. Copy connection variables to backend environment

### Step 5: Configure Backend Service

Add `railway.json` to backend root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 5
  }
}
```

### Step 6: Configure Frontend Service

Add `railway.json` to dashboard root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "nixpacks",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm install -g serve && serve -s dist -l 3000"
  }
}
```

### Step 7: Deploy

1. Push code to GitHub
2. Railway automatically deploys on push
3. Monitor build progress in Railway Dashboard
4. Once deployed, you get a public URL

### Step 8: Get Your URLs

After successful deployment:
- Backend URL: `https://<project>-backend.railway.app`
- Frontend URL: `https://<project>-frontend.railway.app`
- WebSocket URL: `wss://<project>-backend.railway.app`

## 🔒 Security Checklist

- [ ] Generate strong JWT secrets
- [ ] Set ENCRYPTION_KEY (32-char hex)
- [ ] Enable HTTPS (Railway does this automatically)
- [ ] Configure CORS properly
- [ ] Set DB password to strong value
- [ ] Review database access rules
- [ ] Enable connection logging
- [ ] Set up monitoring alerts

## 📱 Android App Configuration

Update Android app with:
```kotlin
const val API_BASE_URL = "https://<your-backend>.railway.app"
const val WS_URL = "wss://<your-backend>.railway.app"
```

## 🧪 Testing

1. **Test Backend**: `https://<backend-url>/api/health`
2. **Test Frontend**: Open in browser
3. **Test Auth**: Login with test account
4. **Test WebSocket**: Connect device and check real-time updates
5. **Test File Upload**: Upload a file from dashboard

## 📊 Monitoring

In Railway Dashboard:
- View logs in real-time
- Monitor CPU/Memory usage
- Check deployment history
- Set up alerts for failures

## 💾 Database Backup

Railway automatically backs up PostgreSQL daily. Access backups in project settings.

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs in Railway

### Connection Errors
- Verify CORS_ORIGIN is correct
- Check WebSocket URL configuration
- Ensure database variables are set

### WebSocket Not Connecting
- Verify WSS URL in frontend .env
- Check browser console for errors
- Ensure backend is running

## 📞 Support

- Railway Docs: https://docs.railway.app
- GitHub Issues: https://github.com/oluwacoded/android-remote-hub-l/issues

---

**Your app is now live! 🎉**
