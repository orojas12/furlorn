import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import "./LoginForm.scss";
import { useAuth } from "../../lib/auth";

export interface ILoginFormProps {
  title?: string;
}

export default function LoginForm({ title = "Log In" }: ILoginFormProps) {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    auth.login(username, password);
  }

  return (
    <div className="LoginForm">
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
        }}
        footer={
          <div className="LoginForm__footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        }
        submitText="Log In"
        onSubmit={onSubmit}
      />
    </div>
  );
}
