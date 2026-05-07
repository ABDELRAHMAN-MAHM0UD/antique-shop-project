import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

function HomePage() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid"></div>
      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>

      <div className="container hero-inner">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="hero-label">Classic • Curated • Rare</span>

            <h1>Antique Pieces That Bring History Into Your Home</h1>

            <p>
              A premium marketplace for vintage furniture, fragile decor,
              porcelain sets, classic clocks, and timeless handmade treasures.
            </p>

            <div className="hero-buttons">
              <Link to="/products">
                <button type="button">Shop Now</button>
              </Link>

              <Link to="/collections">
                <button type="button">Explore Collections</button>
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Antique Items</span>
              </div>

              <div>
                <strong>80+</strong>
                <span>Rare Pieces</span>
              </div>

              <div>
                <strong>48h</strong>
                <span>Careful Delivery</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image-card">
              <img src={heroImg} alt="Antique interior" />

              <div className="shine-layer"></div>

              <div className="hero-note note-one">
                <span>New Arrival</span>
                <strong>Classic Wall Clock</strong>
              </div>

              <div className="hero-note note-two">
                <span>Fragile Care</span>
                <strong>Protected Packaging</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="moving-strip">
        <div>
          <span>Vintage Furniture</span>
          <span>Fragile Decor</span>
          <span>Porcelain Sets</span>
          <span>Classic Clocks</span>
          <span>Rare Collectibles</span>
          <span>Handmade Treasures</span>
          <span>Vintage Furniture</span>
          <span>Fragile Decor</span>
        </div>
      </div>
    </section>
  );
}

export default HomePage;