import { create } from 'zustand';

const useDeviceStore = create((set) => ({
  devices: [],
  selectedDevice: null,
  connectionStatus: {},
  deviceInfo: {},

  setDevices: (devices) => set({ devices }),
  
  setSelectedDevice: (device) => set({ selectedDevice: device }),
  
  addDevice: (device) => set((state) => ({
    devices: [...state.devices, device],
  })),

  removeDevice: (deviceId) => set((state) => ({
    devices: state.devices.filter((d) => d.device_id !== deviceId),
  })),

  updateConnectionStatus: (deviceId, status) => set((state) => ({
    connectionStatus: { ...state.connectionStatus, [deviceId]: status },
  })),

  updateDeviceInfo: (deviceId, info) => set((state) => ({
    deviceInfo: { ...state.deviceInfo, [deviceId]: info },
  })),
}));

export { useDeviceStore };
