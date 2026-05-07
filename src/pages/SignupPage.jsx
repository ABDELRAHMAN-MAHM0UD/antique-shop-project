import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useLanguage } from "../context/LanguageContext";

function SignupPage({ onSignUp, onGuest }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  function handleSignUpSubmit(event) {
    onSignUp(event);
    navigate("/home");
  }

  function handleGuestClick() {
    onGuest();
    navigate("/home");
  }

  return (
    <AuthLayout>
      <div className="auth-tabs">
        <Link to="/">{t.auth.login}</Link>

        <button type="button" className="active">
          {t.auth.signup}
        </button>
      </div>

      <div className="auth-title">
        <span>{t.auth.joinCollection}</span>
        <h2>{t.auth.signupTitle}</h2>
        <p>{t.auth.signupText}</p>
      </div>

      <form onSubmit={handleSignUpSubmit} className="auth-form">
        <label>
          {t.auth.fullName}
          <input
            name="name"
            type="text"
            placeholder={t.auth.fullName}
            required
          />
        </label>

        <label>
          {t.auth.email}
          <input
            name="email"
            type="email"
            placeholder="example@email.com"
            required
          />
        </label>

        <label>
          {t.auth.password}
          <input
            name="password"
            type="password"
            placeholder={t.auth.password}
            required
          />
        </label>

        <button type="submit" className="primary-auth-button">
          {t.auth.createAccount}
        </button>
      </form>

      <button type="button" className="guest-button" onClick={handleGuestClick}>
        {t.auth.guest}
      </button>

      <p className="switch-auth">
        {t.auth.haveAccount} <Link to="/">{t.auth.login}</Link>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;