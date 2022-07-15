import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";
import "./LoginForm.scss";
import useAuth from "../../lib/auth/useAuth";
import Field from "./Field";

export interface ILoginFormProps {
  title?: string;
}

export default function LoginForm({ title = "Log In" }: ILoginFormProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  async function onSubmit() {
    const res = await auth.login(username, password);
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    navigate("/app/createpost", { replace: true });
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
        error={formError}
      >
        <Field
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError}
          required
        />
        <Field
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          required
        />
      </Form>
    </div>
  );
}
