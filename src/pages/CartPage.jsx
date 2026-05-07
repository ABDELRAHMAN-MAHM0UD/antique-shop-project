import { Link } from "react-router-dom";

function CartPage({
  cartItems,
  cartTotal,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
  handleCheckout,
}) {
  return (
    <section className="section-block products-section">
      <div className="container">
        <div className="section-heading">
          <span>Your Cart</span>
          <h2>Selected Antique Pieces</h2>
          <p>Review your items before checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-state">
            Your cart is empty.
            <br />
            <br />
            <Link to="/products">Go to products</Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8 mb-4">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="row align-items-center">
                    <div className="col-md-3 mb-3">
                      <div className="product-image-box">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>

                    <div className="col-md-5 mb-3">
                      <strong>{item.name}</strong>
                      <span>{item.price} EGP</span>
                    </div>

                    <div className="col-md-2 mb-3">
                      <div className="quantity-actions">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-md-2 mb-3">
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4 mb-4">
              <div className="story-panel">
                <span>Order Summary</span>
                <h2>Total</h2>
                <h3>{cartTotal} EGP</h3>

                <div className="cart-footer">
                  <button type="button" onClick={clearCart}>
                    Clear Cart
                  </button>

                  <button type="button" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>

                <br />

                <Link to="/products" style={{ color: "#f5e6c8" }}>
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;