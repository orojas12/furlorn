import Form from "./Form";
import "./LoginForm.scss";

export interface ILoginFormProps {
  title?: string;
}

export default function LoginForm({ title = "Log In" }: ILoginFormProps) {
  return (
    <div className="LoginForm">
      <Form
        title={title}
        fields={{
          username: "text",
          password: "password",
        }}
        footer={
          <div className="LoginForm__footer">
            Don't have an account? <a href="">Sign up</a>
          </div>
        }
        submitText="Log In"
        onSubmit={(e) => null}
      />
    </div>
  );
}
