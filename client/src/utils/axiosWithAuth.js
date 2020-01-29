import axios from "axios";

export function axiosWithAuth() {
  return axios.create({
    baseURL: "https://localhost:8675/api",
  });
}
