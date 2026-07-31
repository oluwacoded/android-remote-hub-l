package com.oluwacoded.androidremotehub.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.util.Log

class NetworkChangeReceiver : BroadcastReceiver() {
    companion object {
        private const val TAG = "NetworkChangeReceiver"
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        val cm = context?.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
        val activeNetwork = cm?.activeNetwork
        
        if (activeNetwork != null) {
            Log.d(TAG, "Network connected, reconnecting WebSocket")
            // TODO: Reconnect WebSocket
        } else {
            Log.d(TAG, "Network disconnected")
            // TODO: Handle network disconnection
        }
    }
}
