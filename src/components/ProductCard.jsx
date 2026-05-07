function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>

        <p className="card-text">
          <strong>Material:</strong> {product.material}
        </p>

        <p className="card-text">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="card-text">
          <strong>Stock:</strong> {product.stock}
        </p>

        <p className="fw-bold">{product.price} EGP</p>

        {product.fragile && (
          <div className="alert alert-warning py-2">
            Fragile item - handle with care
          </div>
        )}

        <button className="btn btn-primary w-100">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;