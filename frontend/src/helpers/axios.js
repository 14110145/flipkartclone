import axios from "axios";
import { api } from "../urlConfig";

const token = window.localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bear ${token}` : "",
  },
});

export default axiosIntance;
