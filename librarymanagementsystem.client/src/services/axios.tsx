/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7277/api",
  withCredentials: true,
});
