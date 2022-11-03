import React from "react";

export interface IBadgeProps {
  children?: React.ReactNode;
}

export default function Badge(props: IBadgeProps) {
  return <span className="badge bg-gray text-xs">{props.children}</span>;
}
