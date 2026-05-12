import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../components/AuthLayout";
import { useLanguage } from "../context/LanguageContext";

function LoginPage({ onLogin, onGuest, showToast }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [errorMessage, setErrorMessage] = useState("");

  function handleLoginSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setErrorMessage("Invalid email or password");
      return;
    }

    setErrorMessage("");

    onLogin(event);

    navigate("/home");
  }

  function handleGuestClick() {
    onGuest();

    navigate("/home");
  }

  return (
    <AuthLayout>
      <div className="auth-tabs">
        <button type="button" className="active">
          {t.auth.login}
        </button>

        <Link to="/signup">{t.auth.signup}</Link>
      </div>

      <div className="auth-title">
        <span>{t.auth.welcomeBack}</span>

        <h2>{t.auth.loginTitle}</h2>

        <p>{t.auth.loginText}</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="auth-form">
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

        {errorMessage && (
          <p className="auth-error-message">
            {errorMessage}
          </p>
        )}

        <div className="auth-options">
          <label>
            <input type="checkbox" /> {t.auth.rememberMe}
          </label>

          <button
            type="button"
            onClick={() => showToast(t.messages.passwordRecovery)}
          >
            {t.auth.forgotPassword}
          </button>
        </div>

        <button type="submit" className="primary-auth-button">
          {t.auth.loginNow}
        </button>
      </form>

      <button
        type="button"
        className="guest-button"
        onClick={handleGuestClick}
      >
        {t.auth.guest}
      </button>

      <p className="switch-auth">
        {t.auth.noAccount} <Link to="/signup">{t.auth.signup}</Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;