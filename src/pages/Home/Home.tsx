import { Header, Card, SignUpForm } from "../../components";

import heroImg from "../../assets/images/hero-img.png";
import neighborhoodIcon from "../../assets/icons/neighborhood-icon.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import mapIcon from "../../assets/icons/map-icon.svg";
import pawIcon from "../../assets/icons/paw-icon.svg";
import piechartIcon from "../../assets/icons/piechart-icon.svg";
import percentIcon from "../../assets/icons/percent-icon.svg";
import houseIcon from "../../assets/icons/house-icon.svg";

import "./Home.scss";

export default function Home() {
  return (
    <article className="Home">
      <Header />
      <main>
        <section id="hero">
          <div className="hero-container">
            <img src={heroImg} alt="Puppy" className="hero-container__img" />
            <div className="heading-container">
              <h1 className="heading-container__heading">Find your lost pet</h1>
              <h2 className="heading-container__subheading">
                Use the power of your local community to recover your beloved
                friend
              </h2>
              <button type="button" onClick={() => {}}>
                Get Started
              </button>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="about-container">
            <Card />
          </div>
        </section>
        <section id="signup">
          <div className="signup-container">
            <div className="statement-container">
              <figure className="statement">
                <img src={pawIcon} alt="Paw icon" className="statement__img" />
                <figcaption className="statement__caption">
                  There are 135 million dogs and cats in the United States.
                </figcaption>
              </figure>
              <figure className="statement">
                <img
                  src={piechartIcon}
                  alt="Paw icon"
                  className="statement__img"
                />
                <figcaption className="statement__caption">
                  1 in 3 pets goes missing in their lifetime.
                </figcaption>
              </figure>
              <figure className="statement">
                <img
                  src={percentIcon}
                  alt="Paw icon"
                  className="statement__img"
                />
                <figcaption className="statement__caption">
                  Only 6% of dog owners and 2% of cat owners find their lost
                  pets at a shelter.
                </figcaption>
              </figure>
              <figure className="statement">
                <img
                  src={houseIcon}
                  alt="Paw icon"
                  className="statement__img"
                />
                <figcaption className="statement__caption">
                  60% of lost pets are recovered by searching within the
                  neighborhood.
                </figcaption>
              </figure>
            </div>
            <SignUpForm />
          </div>
        </section>
      </main>
      <footer>
        <section id="footer">
          <div className="footer-container">
            <div className="footer-links">
              <a className="footer-links__link" href="">
                Privacy Policy
              </a>
              <a className="footer-links__link" href="">
                Terms &amp; Conditions
              </a>
              <a className="footer-links__link" href="">
                License
              </a>
              <a className="footer-links__link" href="">
                About the author
              </a>
            </div>
            <p className="copyright">
              &copy; 2022 Oscar Rojas. All rights reserved.
            </p>
          </div>
        </section>
      </footer>
    </article>
  );
}
