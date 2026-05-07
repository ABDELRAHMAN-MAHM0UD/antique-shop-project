import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";
import { useLanguage } from "../context/LanguageContext";

function HomePage() {
  const { t } = useLanguage();

  const sliderItems = [
    t.nav.products,
    t.nav.collections,
    t.story.fragileCare,
    t.home.classicClock,
    t.home.rarePieces,
    t.story.authenticity,
    t.home.protectedPackaging,
    t.home.antiqueItems,
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid"></div>
      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>

      <div className="container hero-inner">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="hero-label">{t.home.label}</span>

            <h1>{t.home.title}</h1>

            <p>{t.home.description}</p>

            <div className="hero-buttons">
              <Link to="/products">
                <button type="button">{t.home.shopNow}</button>
              </Link>

              <Link to="/collections">
                <button type="button">{t.home.exploreCollections}</button>
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>{t.home.antiqueItems}</span>
              </div>

              <div>
                <strong>80+</strong>
                <span>{t.home.rarePieces}</span>
              </div>

              <div>
                <strong>48h</strong>
                <span>{t.home.carefulDelivery}</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image-card">
              <img src={heroImg} alt="Antique interior" />

              <div className="shine-layer"></div>

              <div className="hero-note note-one">
                <span>{t.home.newArrival}</span>
                <strong>{t.home.classicClock}</strong>
              </div>

              <div className="hero-note note-two">
                <span>{t.home.fragileCare}</span>
                <strong>{t.home.protectedPackaging}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="moving-strip">
        <div className="moving-track">
          <div className="moving-group">
            {sliderItems.map((item, index) => (
              <span key={`first-${index}`}>{item}</span>
            ))}
          </div>

          <div className="moving-group" aria-hidden="true">
            {sliderItems.map((item, index) => (
              <span key={`second-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;