package com.oluwacoded.androidremotehub.service

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log

class RemoteHubService : Service() {
    companion object {
        private const val TAG = "RemoteHubService"
        private const val NOTIFICATION_ID = 1
    }

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "RemoteHubService created")
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "RemoteHubService started")
        // TODO: Start foreground service
        // TODO: Initialize WebSocket connection
        // TODO: Start screen capture
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "RemoteHubService destroyed")
        // TODO: Clean up resources
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
