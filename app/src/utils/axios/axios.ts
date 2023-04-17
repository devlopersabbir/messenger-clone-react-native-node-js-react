import axios from "axios";

export const baseURLWindows = "http://192.168.0.102:5000/api/v1";
export const baseURLMac = "http://127.0.0.1:5000";
export const baseURLSocket = "http://127.0.0.1:5000";

export const axiosPublic = axios.create({
  baseURL: baseURLMac,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: baseURLMac,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosFileUpload = axios.create({
  baseURL: baseURLMac,
  withCredentials: true,
});
//     "Content-Type": "multipart/form-data",
