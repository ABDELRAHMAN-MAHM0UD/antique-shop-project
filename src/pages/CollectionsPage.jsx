import { useNavigate } from "react-router-dom";

function CollectionsPage({ categories }) {
  const navigate = useNavigate();

  function openCategory(category) {
    if (category === "All") {
      navigate("/products");
      return;
    }

    navigate(`/products?category=${encodeURIComponent(category)}`);
  }

  return (
    <section className="section-block collections-section">
      <div className="container">
        <div className="section-heading">
          <span>Curated Categories</span>
          <h2>Explore Antique Collections</h2>
          <p>Browse by category and discover pieces that match your home style.</p>
        </div>

        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-3 mb-4" key={category}>
              <button
                type="button"
                className="category-card"
                onClick={() => openCategory(category)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{category}</strong>
                <small>
                  {category === "All"
                    ? "View the full collection"
                    : `Browse ${category}`}
                </small>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollectionsPage;