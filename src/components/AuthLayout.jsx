import logoImg from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

function AuthLayout({ children }) {
  const { t, toggleLanguage } = useLanguage();
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <main className="auth-page">
      <div className="auth-grid"></div>
      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>
      <div className="auth-orb auth-orb-three"></div>

      <span className="spark spark-one"></span>
      <span className="spark spark-two"></span>
      <span className="spark spark-three"></span>
      <span className="spark spark-four"></span>

      <section className="auth-shell">
        <div className="auth-showcase">
          <div className="auth-top-actions">
            <button
              type="button"
              className="auth-language-button theme-auth-button"
              onClick={toggleTheme}
            >
              {isDarkTheme ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              type="button"
              className="auth-language-button"
              onClick={toggleLanguage}
            >
              {t.languageButton}
            </button>
          </div>

          <div className="brand-lockup">
            <div className="logo-badge">
              <img src={logoImg} alt="Antique Shop logo" />
            </div>

            <div>
              <h3>{t.auth.brandName}</h3>
              <p>{t.auth.tagline}</p>
            </div>
          </div>

          <div className="auth-copy">
            <span>{t.auth.market}</span>
            <h1>{t.auth.title}</h1>
            <p>{t.auth.description}</p>
          </div>

          <div className="auth-feature-row">
            <div>
              <strong>500+</strong>
              <span>{t.auth.curatedItems}</span>
            </div>

            <div>
              <strong>80+</strong>
              <span>{t.auth.rareFinds}</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>{t.auth.support}</span>
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <small>{t.auth.featuredPiece}</small>
            <strong>{t.auth.woodenChair}</strong>
            <span>{t.auth.furnitureText}</span>
          </div>

          <div className="floating-card floating-card-two">
            <small>{t.auth.fragileItem}</small>
            <strong>{t.auth.glassVase}</strong>
            <span>{t.auth.packaging}</span>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-mobile-actions">
            <button
              type="button"
              className="auth-language-button auth-language-mobile theme-auth-button"
              onClick={toggleTheme}
            >
              {isDarkTheme ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              type="button"
              className="auth-language-button auth-language-mobile"
              onClick={toggleLanguage}
            >
              {t.languageButton}
            </button>
          </div>

          <div className="auth-logo-mobile">
            <img src={logoImg} alt="Antique Shop logo" />
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;