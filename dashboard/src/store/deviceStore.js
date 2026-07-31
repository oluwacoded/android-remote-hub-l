import { create } from 'zustand';

export const useDeviceStore = create((set, get) => ({
  devices: [],
  selectedDevice: null,
  isLoading: false,
  connectionStatus: {},
  deviceInfo: {},

  setDevices: (devices) => set({ devices }),
  setSelectedDevice: (device) => set({ selectedDevice: device }),
  setLoading: (isLoading) => set({ isLoading }),
  setConnectionStatus: (deviceId, status) =>
    set((state) => ({
      connectionStatus: { ...state.connectionStatus, [deviceId]: status },
    })),
  setDeviceInfo: (deviceId, info) =>
    set((state) => ({
      deviceInfo: { ...state.deviceInfo, [deviceId]: info },
    })),
  addDevice: (device) =>
    set((state) => ({ devices: [...state.devices, device] })),
  removeDevice: (deviceId) =>
    set((state) => ({
      devices: state.devices.filter((d) => d.device_id !== deviceId),
    })),
}));
