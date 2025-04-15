import axios from "axios";

// از متغیر محیطی استفاده می‌کنیم
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const generateClient = () => {
  return axios.create({
    baseURL: serverUrl,
  });
};
