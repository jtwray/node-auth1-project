import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log("data: ", data);
    axios
      .post("http://localhost:8675/api/auth/login", data)
      .then(res => {
        console.log('res: ', res)
        // set user session???
        // push to dashboard.
        //props.history.push('/dashboard');
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
