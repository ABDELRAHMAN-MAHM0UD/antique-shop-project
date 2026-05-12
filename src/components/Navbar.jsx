import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import logoImg from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const StyledCartButton = styled(Link)`
  background: #d4af37;
  color: black;
  padding: 10px 18px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    background: #f5e6c8;
    color: black;
  }
`;

function Navbar({ userName, cartCount, onLogout }) {
  const { t, toggleLanguage } = useLanguage();
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <nav className="site-navbar">
      <div className="container nav-inner">
        <Link className="nav-brand" to="/home">
          <img src={logoImg} alt="Antique Shop logo" />

          <span>
            Antique<b>Shop</b>
          </span>
        </Link>

        <div className="nav-menu">
          <NavLink to="/home">{t.nav.home}</NavLink>
          <NavLink to="/collections">{t.nav.collections}</NavLink>
          <NavLink to="/products">{t.nav.products}</NavLink>
          <NavLink to="/story">{t.nav.story}</NavLink>
          <NavLink to="/contact">{t.nav.contact}</NavLink>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-button"
            onClick={toggleTheme}
          >
            {isDarkTheme ? "☀ Light" : "🌙 Dark"}
          </button>

          <button
            type="button"
            className="language-button"
            onClick={toggleLanguage}
          >
            {t.languageButton}
          </button>

          <span>
            {t.nav.hi}, {userName}
          </span>

          <StyledCartButton to="/cart">
            {t.nav.cart} ({cartCount})
          </StyledCartButton>

          <button
            type="button"
            className="logout-button"
            onClick={onLogout}
          >
            {t.nav.logout}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;