import axios from "axios";

const url = process.env.VUE_APP_GALLERY_API_URL || "http://127.0.0.1:3000";
export const api = axios.create({
  baseURL: url
});
