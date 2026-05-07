import { Link } from "react-router-dom";

function StoryPage() {
  return (
    <section className="section-block story-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <div className="story-panel">
              <span>Our Story</span>
              <h2>Every antique piece carries a memory.</h2>
              <p>
                Antique Shop focuses on rare, elegant, and carefully selected
                pieces. Fragile items are marked clearly, and each product is
                presented with its material, category, stock, and care level.
              </p>

              <Link to="/products">
                <button type="button">Browse Pieces</button>
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="care-grid">
              <div>
                <strong>Authenticity</strong>
                <span>Selected classic pieces</span>
              </div>

              <div>
                <strong>Fragile Care</strong>
                <span>Special packing for delicate items</span>
              </div>

              <div>
                <strong>Premium Feel</strong>
                <span>Elegant shopping interface</span>
              </div>

              <div>
                <strong>Simple Checkout</strong>
                <span>Fast cart and order flow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoryPage;