import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function SignupPage({ onSignUp, onGuest }) {
  const navigate = useNavigate();

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
        <Link to="/">Login</Link>

        <button type="button" className="active">
          Sign Up
        </button>
      </div>

      <div className="auth-title">
        <span>Join The Collection</span>
        <h2>Create your account</h2>
        <p>Start exploring rare pieces and premium antique products.</p>
      </div>

      <form onSubmit={handleSignUpSubmit} className="auth-form">
        <label>
          Full Name
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            required
          />
        </label>

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
            placeholder="Create a strong password"
            required
          />
        </label>

        <button type="submit" className="primary-auth-button">
          Create Account
        </button>
      </form>

      <button type="button" className="guest-button" onClick={handleGuestClick}>
        Continue as Guest
      </button>

      <p className="switch-auth">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;