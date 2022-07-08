import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import Form from "./Form";
import "./SignUpForm.scss";

export interface ISignUpFormProps {
  title?: string;
}

export default function SignUpForm({ title = "Sign Up" }: ISignUpFormProps) {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onSubmit() {
    auth.login(username, password);
  }

  return (
    <div className="SignUpForm">
      <Form
        title={title}
        fields={{
          username: {
            type: "text",
            state: username,
            setState: setUsername,
          },
          password: {
            type: "password",
            state: password,
            setState: setPassword,
          },
          confirmPassword: {
            type: "password",
            state: confirmPassword,
            setState: setConfirmPassword,
          },
        }}
        footer={
          <div className="SignUpForm__footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        }
        submitText="Sign Up"
        onSubmit={onSubmit}
      />
    </div>
  );
}
