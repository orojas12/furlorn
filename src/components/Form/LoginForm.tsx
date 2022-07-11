import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import "./LoginForm.scss";
import { useAuth } from "../../lib/auth";
import Field from "./Field";

export interface ILoginFormProps {
  title?: string;
}

export default function LoginForm({ title = "Log In" }: ILoginFormProps) {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function onSubmit() {
    auth.login(username, password);
  }

  return (
    <div className="LoginForm">
      <Form
        title={title}
        footer={
          <div className="LoginForm__footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        }
        submitText="Log In"
        onSubmit={onSubmit}
      >
        <Field
          label="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError}
        />
        <Field
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
      </Form>
    </div>
  );
}