// const { REACT_APP_API_URL: host } = process.env;
const rpiAPI = "http://192.168.1.148:3001";

export const getDevices = () => `${rpiAPI}/api/network-scanner`;
export const getPorts = () => `${rpiAPI}/api/port-scanner`;
export const connectDevice = () => `${rpiAPI}/api/connect-device`;
