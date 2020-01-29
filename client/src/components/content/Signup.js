import React from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../../utils/axiosWithAuth.js";

export default function Signup(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    axiosWithAuth()
      .post("/auth/register", data, {
        withCredentials: true
      })
      .then(res => {
        console.log("signup res: ", res);
        let user = {
          username: data.username,
          password: data.password
        };
        axiosWithAuth()
          .post("/auth/login", user, {
            withCredentials: true
          })
          .then(res => {
            sessionStorage.setItem("username", res.data.username);
            setTimeout(() => props.history.push("/dashboard"), 500);
          })
          .catch(err => console.log("error:", err));
      })
      .catch(err => console.log("error: ", err));
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="username"
        name="username"
        ref={register({ required: true, min: 5, maxLength: 128 })}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={register({ required: true, min: 8, maxLength: 128 })}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        ref={register({
          required: true,
          min: 8,
          maxLength: 128,
          pattern: {
            value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
            message: "Password does not meet requirements. "
          }
        })}
      />

      <input type="submit" />
    </form>
  );
}
