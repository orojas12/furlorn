import React from "react";
import { Navbar } from "../../components";
import useAuth from "../../lib/auth/useAuth";

export interface ICreatePostProps {}

export default function CreatePost(props: ICreatePostProps) {
  const auth = useAuth();
  return (
    <article id="CreatePost">
      <Navbar />
    </article>
  );
}
