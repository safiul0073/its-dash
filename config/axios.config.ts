import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL; 

export const public_instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
