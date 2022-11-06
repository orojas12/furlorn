import * as React from "react";
import { Form, FormInput } from "../components/form";
import { Badge, Breadcrumb, Card, Tooltip } from "../components/ui";

export interface IComponentsProps {}

export default function Components(props: IComponentsProps) {
  return (
    <div
      className="container flex flex-column justify-center align-center flow"
      style={{ minHeight: "inherit" }}
    >
      <h1 className="text-4xl ff-cursive spacing-tight">Display</h1>
      <h1 className="text-4xl spacing-tight">Heading 1</h1>
      <h2 className="text-3xl">Heading 2</h2>
      <h3 className="text-2xl">Heading 3</h3>
      <h4 className="text-xl">Heading 4</h4>
      <h5 className="text-lg">Heading 5</h5>
      <p className="text-base">Paragraph base</p>
      <p className="text-sm spacing-wide">Paragraph small</p>
      <p className="text-xs spacing-wider">Paragraph extra small</p>
      <button className="btn--primary">Button</button>
      <button className="btn--primary-outline">Button</button>
      <button className="btn--secondary">Button</button>
      <button className="btn--secondary-outline">Button</button>
      <Card />
      <Breadcrumb />
      <Badge>optional</Badge>
      <FormInput
        key={1}
        name="username"
        type="text"
        label="Username"
        value="oscar"
        onChange={() => {}}
        required={false}
        errorMsg="Username is too short."
        description="Username must be at least 3 characters long"
        pattern="[A-Za-z]{3,20}"
      />
      <Form
        id="testForm"
        inputs={[
          {
            key: 1,
            name: "username",
            type: "text",
            label: "Username",
            errorMsg: "Username must be 3-20 characters long.",
            required: true,
          },
          {
            key: 2,
            name: "email",
            type: "email",
            label: "Email",
            errorMsg: "Please enter a valid email address.",
            required: true,
          },
          {
            key: 3,
            name: "password",
            type: "password",
            label: "Password",
            errorMsg: "Password must be 8-128 characters long.",
            hint: "Must be 8-128 characters long.",
            required: true,
          },
          {
            key: 4,
            name: "confirmPassword",
            type: "password",
            label: "Confirm Password",
            errorMsg: "Passwords do not match.",
            required: true,
          },
        ]}
        initialState={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
      />
      <Tooltip
        id="testtooltip"
        position="left-start"
        textAlign="center"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore cupiditate itaque eveniet facilis et suscipit exercitationem iure vero maxime distinctio sapiente debitis adipisci iste, laborum beatae rerum? Soluta, dolores dignissimos."
      >
        <i className="fa-solid fa-circle-info"></i>
      </Tooltip>
    </div>
  );
}
