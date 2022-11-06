import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/form";

export interface ILogInProps {}

export default function Login(props: ILogInProps) {
  const navigate = useNavigate();

  async function login(data: FormData) {
    // authenticate user
    navigate("/home");
  }

  return (
    <div className="Login">
      <Form
        id="loginForm"
        inputs={[
          {
            key: 1,
            name: "username",
            type: "text",
            label: "Username",
            required: true,
            errorMsg: "Username must be 2-32 characters",
            validate: (input) => input.length >= 2 && input.length <= 32,
          },
          {
            key: 2,
            name: "password",
            type: "text",
            label: "Password",
            required: true,
            errorMsg: "Password must be 8-128 alphanumeric characters.",
            validate: (input) => input.length >= 8 && input.length <= 128,
          },
        ]}
        initialState={{ username: "", password: "" }}
        onSubmit={login}
      ></Form>
    </div>
  );
}
