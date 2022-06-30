import * as React from "react";
import Form from "./Form";
import "./SignUpForm.scss";

export interface ISignUpFormProps {}

export default function SignUpForm(props: ISignUpFormProps) {
  return (
    <div className="SignUpForm">
      <Form
        title="Sign up and search your neighborhood"
        fields={{
          username: "text",
          password: "password",
          confirmPassword: "password",
        }}
        footer={
          <div className="SignUpForm__footer">
            Already have an account? <a href="">Log in</a>
          </div>
        }
        submitText="Sign Up"
        onSubmit={(e) => null}
      />
    </div>
  );
}
