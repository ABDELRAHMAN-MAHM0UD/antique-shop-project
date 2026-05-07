import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function LoginPage({ onLogin, onGuest, showToast }) {
  const navigate = useNavigate();

  function handleLoginSubmit(event) {
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
          Login
        </button>

        <Link to="/signup">Sign Up</Link>
      </div>

      <div className="auth-title">
        <span>Welcome Back</span>
        <h2>Login to your account</h2>
        <p>Access your cart, saved items, and antique collections.</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="auth-form">
        <label>
          Email Address
          <input
            name="email"
            type="email"
            placeholder="example@email.com"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </label>

        <div className="auth-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>

          <button
            type="button"
            onClick={() => showToast("Password recovery is not connected yet.")}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="primary-auth-button">
          Login Now
        </button>
      </form>

      <button type="button" className="guest-button" onClick={handleGuestClick}>
        Continue as Guest
      </button>

      <p className="switch-auth">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;