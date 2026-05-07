import logoImg from "../assets/logo.png";

function AuthLayout({ children }) {
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
          <div className="brand-lockup">
            <div className="logo-badge">
              <img src={logoImg} alt="Antique Shop logo" />
            </div>

            <div>
              <h3>Antique Shop</h3>
              <p>Timeless treasures, lasting value</p>
            </div>
          </div>

          <div className="auth-copy">
            <span>Premium Antique Marketplace</span>

            <h1>
              Rare Pieces.
              <br />
              Real Stories.
            </h1>

            <p>
              Discover handpicked vintage furniture, fragile decor, porcelain
              sets, classic wall pieces, and collectible treasures curated for
              elegant homes.
            </p>
          </div>

          <div className="auth-feature-row">
            <div>
              <strong>500+</strong>
              <span>Curated Items</span>
            </div>

            <div>
              <strong>80+</strong>
              <span>Rare Finds</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <small>Featured Piece</small>
            <strong>Vintage Wooden Chair</strong>
            <span>Oak Wood • Classic Furniture</span>
          </div>

          <div className="floating-card floating-card-two">
            <small>Fragile Item</small>
            <strong>Antique Glass Vase</strong>
            <span>Special care packaging</span>
          </div>
        </div>

        <div className="auth-panel">
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