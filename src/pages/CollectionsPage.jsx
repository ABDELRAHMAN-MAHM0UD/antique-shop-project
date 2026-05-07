import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function CollectionsPage({ categories }) {
  const navigate = useNavigate();
  const { t, categoryName } = useLanguage();

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
          <span>{t.collections.label}</span>
          <h2>{t.collections.title}</h2>
          <p>{t.collections.description}</p>
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

                <strong>{categoryName(category)}</strong>

                <small>
                  {category === "All"
                    ? t.collections.allCollection
                    : `${t.collections.browse} ${categoryName(category)}`}
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