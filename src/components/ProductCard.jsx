import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function ProductCard({ product, addToCart }) {
  const { t, productName } = useLanguage();

  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <div className="product-card">
      <div className="product-image-box">
        <img src={product.image} alt={productName(product.name)} />
      </div>

      <div className="product-content">
        <div className="product-topline">
          <span>{product.category}</span>
          {product.fragile && <b>{t.products.fragile}</b>}
        </div>

        <h3>{productName(product.name)}</h3>

        <p>{product.description}</p>

        <div className="product-footer">
          <strong>{product.price} EGP</strong>
        </div>

        <div className="product-actions">
          <Link to={`/product/${product.id}`}>
            <button type="button">{t.products.viewDetails}</button>
          </Link>

          <button type="button" onClick={handleAddToCart}>
            {t.products.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;