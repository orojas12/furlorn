import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { Form, Field } from "../";
import "./SignUpForm.scss";

export interface ISignUpFormProps {
  title?: string;
}

export default function SignUpForm({ title = "Sign Up" }: ISignUpFormProps) {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  async function onSubmit() {
    const res = await auth.login(username, password);
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
  }

  return (
    <div className="SignUpForm">
      <Form
        title={title}
        footer={
          <div className="SignUpForm__footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        }
        submitText="Sign Up"
        onSubmit={onSubmit}
        error={formError}
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
        <Field
          label="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
        />
      </Form>
    </div>
  );
}
