import React, { useState } from "react";
import { Navbar } from "../../components";
import CreatePostForm from "./CreatePostForm";
import useAuth from "../../lib/auth/useAuth";
import Modal from "../../components/ui/Modal";

export interface ICreatePostProps {}

export default function CreatePost(props: ICreatePostProps) {
  const auth = useAuth();

  return (
    <article id="CreatePost">
      <CreatePostForm />
    </article>
  );
}
