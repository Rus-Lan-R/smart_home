const { REACT_APP_API_URL: host } = process.env;

export const userDevices = () => `${host}/api/devices`;
