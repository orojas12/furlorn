import React from "react";

import { Header, Button, Card } from "../../components";

import heroImg from "../../assets/images/hero-img.png";
import neighborhoodIcon from "../../assets/icons/neighborhood-icon.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import mapIcon from "../../assets/icons/map-icon.svg";

import "./Home.scss";

export default function Home() {
  return (
    <article className="Home">
      <Header />
      <section id="hero">
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
      <section id="about">
        <div className="about-container">
          <Card
            image={neighborhoodIcon}
            caption="Neighborhood reporting notifies you when your pet is spotted or found in
        your local area."
          />
          <Card
            image={searchIcon}
            imageStyles={{ height: "60px" }}
            caption="Use an advanced search tool to quickly find results that match your pet’s description."
          />
          <Card
            image={mapIcon}
            imageStyles={{ height: "80px" }}
            caption="View lost and found pets in your neighborhood on an interactive map."
          />
        </div>
      </section>
    </article>
  );
}
