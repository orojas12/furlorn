import React from "react";

import { Header, Button } from "../../components";

import heroImg from "../../assets/hero-img.png";

import "./Home.scss";

export default function Home() {
  return (
    <article className="Home">
      <Header />
      <section className="hero">
        <div className="hero-container">
          <img src={heroImg} alt="Puppy" className="hero-container__img" />
          <div className="heading-container">
            <h1 className="heading-container__heading">Find your lost pet</h1>
            <h2 className="heading-container__subheading">
              Use the power of your local community to recover your beloved
              friend
            </h2>
            <Button type="button" btnStyle="primary" onClick={() => {}}>
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
