import { Header, LoginForm } from "../../components";
import "./Login.scss";

export default function Login() {
  return (
    <article id="Login">
      <Header />
      <section className="form-container">
        <LoginForm />
      </section>
    </article>
  );
}
