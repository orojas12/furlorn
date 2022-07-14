import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../lib/auth/useAuth";
import { Form, Field } from "../";
import "./SignUpForm.scss";

export interface ISignUpFormProps {
  title?: string;
}

export default function SignUpForm({ title = "Sign Up" }: ISignUpFormProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  function usernameIsValid() {
    /* 
      Contains 4-32 alphanumeric characters ( a-z, A-Z, 0-9, _ )
      and no consecutive underscores ( __ ).
    */
    const regex = /^([a-zA-Z0-9]|[_](?![_])){2,32}$/;

    const isValid = Boolean(username.match(regex));
    if (!isValid) {
      setUsernameError(
        "Username must be 2-32 alphanumeric characters (a-z, A-Z, 0-9, _) and may not contain consecutive underscores (__)."
      );
    }
    return isValid;
  }

  function passwordIsValid() {
    /* 
      Contains at least 8 characters  and at least 1 uppercase letter, 
      1 lowercase letter, and 1 number. May contain special characters.
    */
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8, 128}$/;

    const isValid = Boolean(password.match(regex));
    if (!isValid) {
      setPasswordError(
        "Password must be 8-128 characters and must contain at least one uppercase letter, " +
          "one lowercase letter, and one number. May contain special characters."
      );
    }
    return isValid;
  }

  function passwordsMatch() {
    const isValid = password === confirmPassword;
    if (!isValid) {
      setConfirmPasswordError("Passwords do not match.");
    }
    return isValid;
  }

  function formIsValid(validators: Array<() => boolean>) {
    let errors = 0;
    validators.forEach((isValid) => {
      if (!isValid()) {
        errors++;
      }
    });
    return errors === 0;
  }

  function clearErrors() {
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
  }

  async function onSubmit() {
    clearErrors();
    if (!formIsValid([usernameIsValid, passwordIsValid, passwordsMatch])) {
      return;
    }
    const res = await auth.signup(username, password, nickname);
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    navigate("/login", { replace: true });
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
          required
        />
        <Field
          label="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Field
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          required
        />
        <Field
          label="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          required
        />
      </Form>
    </div>
  );
}
