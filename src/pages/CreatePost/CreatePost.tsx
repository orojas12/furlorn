import React from "react";
import { Navbar } from "../../components";
import CreatePostForm from "../../components/Form/CreatePostForm";
import useAuth from "../../lib/auth/useAuth";

export interface ICreatePostProps {}

export default function CreatePost(props: ICreatePostProps) {
  const auth = useAuth();
  return (
    <article id="CreatePost">
      <CreatePostForm />
    </article>
  );
}
