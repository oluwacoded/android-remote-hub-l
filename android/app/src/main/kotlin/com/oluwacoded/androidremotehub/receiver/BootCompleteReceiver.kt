package com.oluwacoded.androidremotehub.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class BootCompleteReceiver : BroadcastReceiver() {
    companion object {
        private const val TAG = "BootCompleteReceiver"
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        if (intent?.action == Intent.ACTION_BOOT_COMPLETED) {
            Log.d(TAG, "Device boot completed, starting RemoteHubService")
            // TODO: Start RemoteHubService
        }
    }
}
