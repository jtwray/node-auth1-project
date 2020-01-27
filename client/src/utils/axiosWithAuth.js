import axios from "axios";

export function axiosWithAuth() {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://localhost:8675/api",
    headers: {
      token: token
    }
  });
}
