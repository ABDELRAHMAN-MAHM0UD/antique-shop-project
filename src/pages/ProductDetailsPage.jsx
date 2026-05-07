import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetailsPage({ products, addToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => String(item.id) === productId);

  if (!product) {
    return (
      <section className="section-block products-section">
        <div className="container">
          <div className="empty-state">
            Product not found or still loading.
            <br />
            <br />
            <Link to="/products">Back to products</Link>
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
          <span>{product.category}</span>
          <h2>{product.name}</h2>
          <p>Inspect the piece details before adding it to your collection.</p>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <div className="product-card">
              <div className="modal-product-image">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="story-panel">
              <span>Product Details</span>

              <h2>{product.name}</h2>

              <p>
                This antique piece is made from{" "}
                <strong>{product.material}</strong>. It is currently in stock
                with <strong>{product.stock}</strong> available item(s).
              </p>

              {product.fragile && (
                <div className="fragile-warning">
                  Fragile item: needs special handling and careful packaging.
                </div>
              )}

              <h3>{product.price} EGP</h3>

              <button type="button" onClick={handleAddToCart}>
                Add to Cart
              </button>

              <br />
              <br />

              <Link to="/products" style={{ color: "#f5e6c8" }}>
                Back to products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;