import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log("data: ", data);
    axios
      .post("http://localhost:8675/api/auth/login", data, {
        withCredentials: true
      })
      .then(res => {
        console.log("res: ", res);
        sessionStorage.setItem("username", res.data.username);
        setTimeout(() => props.history.push("/dashboard"), 500);
      })
      .catch(err => console.log("error:", err));
  };
  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="username"
        name="username"
        ref={register({ required: true, min: 5, maxLength: 128 })}
      />
      <input
        type="text"
        placeholder="password"
        name="password"
        ref={register({
          required: true,
          min: 8,
          maxLength: 128
          //   pattern: {
          //     value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
          //     message: "Password does not meet requirements. "
          //   }
        })}
      />

      <input type="submit" />
    </form>
  );
}
