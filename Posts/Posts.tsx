import * as React from "react";
import { Outlet, Routes } from "react-router-dom";

export interface IPostsProps {}

export default function Posts(props: IPostsProps) {
  return (
    <div>
      <Outlet />
    </div>
  );
}
