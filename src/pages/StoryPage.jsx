import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function StoryPage() {
  const { t } = useLanguage();

  return (
    <section className="section-block story-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <div className="story-panel">
              <span>{t.story.label}</span>
              <h2>{t.story.title}</h2>
              <p>{t.story.description}</p>

              <Link to="/products">
                <button type="button">{t.story.browsePieces}</button>
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="care-grid">
              <div>
                <strong>{t.story.authenticity}</strong>
                <span>{t.story.authenticityText}</span>
              </div>

              <div>
                <strong>{t.story.fragileCare}</strong>
                <span>{t.story.fragileCareText}</span>
              </div>

              <div>
                <strong>{t.story.premiumFeel}</strong>
                <span>{t.story.premiumFeelText}</span>
              </div>

              <div>
                <strong>{t.story.checkout}</strong>
                <span>{t.story.checkoutText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoryPage;