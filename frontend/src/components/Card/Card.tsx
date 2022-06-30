import * as React from "react";

import "./Card.scss";

export interface ICardProps {
  image: string;
  imageStyles?: {};
  caption: string;
  children?: React.ReactNode;
}

export default function Card(props: ICardProps) {
  return (
    <figure className="Card">
      <img
        className="Card__img"
        style={props.imageStyles}
        src={props.image}
        alt="Neighborhood icon"
      />
      <figcaption className="Card__caption">{props.caption}</figcaption>
    </figure>
  );
}
