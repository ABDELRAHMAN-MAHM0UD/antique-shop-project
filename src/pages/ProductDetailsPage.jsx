import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function ProductDetailsPage({ products, addToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { t, productName, categoryName, materialName } = useLanguage();

  const product = products.find((item) => String(item.id) === productId);

  if (!product) {
    return (
      <section className="section-block products-section">
        <div className="container">
          <div className="empty-state">
            {t.products.notFound}
            <br />
            <br />
            <Link to="/products">{t.products.backProducts}</Link>
          </div>
        </div>
      </section>
    );
  }

  function handleAddToCart() {
    addToCart(product);
    navigate("/cart");
  }

  return (
    <section className="section-block products-section">
      <div className="container">
        <div className="section-heading">
          <span>{categoryName(product.category)}</span>
          <h2>{productName(product.name)}</h2>
          <p>{t.products.inspect}</p>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <div className="product-card">
              <div className="modal-product-image">
                <img src={product.image} alt={productName(product.name)} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="story-panel">
              <span>{t.products.productDetails}</span>

              <h2>{productName(product.name)}</h2>

              <p>
                {t.products.detailText}{" "}
                <strong>{materialName(product.material)}</strong>.{" "}
                {t.products.available} <strong>{product.stock}</strong>{" "}
                {t.products.availableItems}
              </p>

              {product.fragile && (
                <div className="fragile-warning">
                  {t.products.fragileWarning}
                </div>
              )}

              <h3>{product.price} EGP</h3>

              <button type="button" onClick={handleAddToCart}>
                {t.products.addToCart}
              </button>

              <br />
              <br />

              <Link to="/products" style={{ color: "#f5e6c8" }}>
                {t.products.backProducts}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;