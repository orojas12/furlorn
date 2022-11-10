import waveSvg from "../assets/images/wave.svg";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <article className="Home flow">
      <header>
        <div className="hero container">
          <div className="hero__left">
            <h1 className="ff-cursive text-3xl text-primary">
              Find your lost paws
            </h1>
            <h2 className="text-lg">
              Search for your lost pet in our lost and found database, alert
              local communities on social media, print missing pet flyers, and
              more.
            </h2>
            <div className="hero__buttons">
              <button className="btn btn--block btn--primary">
                I Lost My Pet
              </button>
              <button className="btn btn--block btn--secondary">
                I Found A Pet
              </button>
            </div>
          </div>
          <div className="hero__right"></div>
        </div>
        <img src={waveSvg} alt="Hero bottom border" style={{ width: "100%" }} />
      </header>
      <main></main>
    </article>
  );
}
