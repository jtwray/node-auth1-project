import axios from "axios";

export function axiosWithAuth() {
  return axios.create({
    baseURL: "http://localhost:8675/api",
  });
}
