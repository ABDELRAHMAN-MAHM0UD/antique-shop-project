import { Link, NavLink } from "react-router-dom";
import logoImg from "../assets/logo.png";

function Navbar({ userName, cartCount, onLogout }) {
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
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/story">Story</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="nav-actions">
          <span>Hi, {userName}</span>

          <Link className="cart-nav-button" to="/cart">
            Cart ({cartCount})
          </Link>

          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;