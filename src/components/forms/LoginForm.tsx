import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, TextField, PasswordField } from "..";
import "./LoginForm.scss";
import useAuth from "../../lib/auth/useAuth";

export interface ILoginFormProps {
  title?: string;
}

export default function LoginForm({ title = "Log In" }: ILoginFormProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form>
    </div>
  );
}
