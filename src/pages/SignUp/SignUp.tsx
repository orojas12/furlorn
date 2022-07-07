import { Header, SignUpForm } from "../../components";
import "./SignUp.scss";

export default function SignUp() {
  return (
    <article id="SignUp">
      <Header />
      <section className="form-container">
        <SignUpForm />
      </section>
    </article>
  );
}
