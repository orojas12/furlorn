import * as React from "react";

import { Button } from "../../components";
import "./Hero.scss";

import heroImg from "../../assets/hero-img.png";

export interface IHeroProps {}

export default function Hero(props: IHeroProps) {
  return (
    <section className="Hero">
      <div className="Hero-container">
        <img src={heroImg} alt="Puppy" className="Hero-container__img" />
        <div className="heading-container">
          <h1 className="heading-container__heading">Find your lost pet</h1>
          <h2 className="heading-container__subheading">
            Use the power of your local community to recover your beloved friend
          </h2>
          <Button type="button" btnStyle="primary" onClick={() => {}}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
