import { useEffect, useMemo, useState } from "react";
import heroImg from "../assets/hero.png";
import logoImg from "../assets/logo.png";

import chairImg from "../assets/products/chair.png";
import vaseImg from "../assets/products/vase.png";
import clockImg from "../assets/products/clock.png";
import teaSetImg from "../assets/products/tea-set.png";
import tableImg from "../assets/products/table.png";

const productImages = {
  chair: chairImg,
  vase: vaseImg,
  clock: clockImg,
  teaSet: teaSetImg,
  table: tableImg,
};

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("featured");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const productsWithImages = data.map((product) => ({
          ...product,
          image: productImages[product.imageKey],
        }));

        setProducts(productsWithImages);
      })
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2600);
  }

  function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    setUserName(email.split("@")[0]);
    setIsLoggedIn(true);
    showToast("Welcome back to Antique Shop.");
  }

  function handleSignUp(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");

    setUserName(name);
    setIsLoggedIn(true);
    showToast("Account created successfully.");
  }

  function continueAsGuest() {
    setUserName("Guest");
    setIsLoggedIn(true);
    showToast("Continuing as guest.");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserName("Guest");
    setCartItems([]);
    setAuthMode("login");
    showToast("Logged out successfully.");
  }

  function goToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getProductIcon(product) {
    const category = product.category?.toLowerCase() || "";

    if (category.includes("furniture")) {
      return "🪑";
    }

    if (category.includes("decor")) {
      return "🏺";
    }

    if (category.includes("kitchen")) {
      return "☕";
    }

    return "🗝️";
  }

  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
    showToast(`${product.name} added to cart.`);
  }

  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );

    showToast("Item removed from cart.");
  }

  function clearCart() {
    setCartItems([]);
    showToast("Cart cleared.");
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      showToast("Your cart is empty.");
      return;
    }

    setOrderMessage(
      "Order placed successfully. Your antique pieces are being prepared with special care."
    );

    setCartItems([]);
    setIsCartOpen(false);
    showToast("Checkout completed successfully.");
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Message sent successfully. We will contact you soon.");
  }

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category);
    return ["All", ...new Set(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (searchText.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortType === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortType === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortType === "fragile") {
      result.sort((a, b) => Number(b.fragile) - Number(a.fragile));
    }

    return result;
  }, [products, selectedCategory, searchText, sortType]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoggedIn) {
    const isLogin = authMode === "login";

    return (
      <main className="auth-page">
        <div className="auth-grid"></div>
        <div className="auth-orb auth-orb-one"></div>
        <div className="auth-orb auth-orb-two"></div>
        <div className="auth-orb auth-orb-three"></div>

        <span className="spark spark-one"></span>
        <span className="spark spark-two"></span>
        <span className="spark spark-three"></span>
        <span className="spark spark-four"></span>

        <section className="auth-shell">
          <div className="auth-showcase">
            <div className="brand-lockup">
              <div className="logo-badge">
                <img src={logoImg} alt="Antique Shop logo" />
              </div>

              <div>
                <h3>Antique Shop</h3>
                <p>Timeless treasures, lasting value</p>
              </div>
            </div>

            <div className="auth-copy">
              <span>Premium Antique Marketplace</span>

              <h1>
                Rare Pieces.
                <br />
                Real Stories.
              </h1>

              <p>
                Discover handpicked vintage furniture, fragile decor, porcelain
                sets, classic wall pieces, and collectible treasures curated for
                elegant homes.
              </p>
            </div>

            <div className="auth-feature-row">
              <div>
                <strong>500+</strong>
                <span>Curated Items</span>
              </div>

              <div>
                <strong>80+</strong>
                <span>Rare Finds</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Support</span>
              </div>
            </div>

            <div className="floating-card floating-card-one">
              <small>Featured Piece</small>
              <strong>Vintage Wooden Chair</strong>
              <span>Oak Wood • Classic Furniture</span>
            </div>

            <div className="floating-card floating-card-two">
              <small>Fragile Item</small>
              <strong>Antique Glass Vase</strong>
              <span>Special care packaging</span>
            </div>
          </div>

          <div className="auth-panel">
            <div className="auth-logo-mobile">
              <img src={logoImg} alt="Antique Shop logo" />
            </div>

            <div className="auth-tabs">
              <button
                type="button"
                className={isLogin ? "active" : ""}
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>

              <button
                type="button"
                className={!isLogin ? "active" : ""}
                onClick={() => setAuthMode("signup")}
              >
                Sign Up
              </button>
            </div>

            <div className="auth-title">
              <span>{isLogin ? "Welcome Back" : "Join The Collection"}</span>

              <h2>{isLogin ? "Login to your account" : "Create your account"}</h2>

              <p>
                {isLogin
                  ? "Access your cart, saved items, and antique collections."
                  : "Start exploring rare pieces and premium antique products."}
              </p>
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin} className="auth-form">
                <label>
                  Email Address
                  <input
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </label>

                <div className="auth-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      showToast("Password recovery is not connected yet.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="primary-auth-button">
                  Login Now
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="auth-form">
                <label>
                  Full Name
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </label>

                <label>
                  Email Address
                  <input
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                  />
                </label>

                <button type="submit" className="primary-auth-button">
                  Create Account
                </button>
              </form>
            )}

            <button type="button" className="guest-button" onClick={continueAsGuest}>
              Continue as Guest
            </button>

            <p className="switch-auth">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setAuthMode(isLogin ? "signup" : "login")}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </section>

        {toast && <div className="toast-message">{toast}</div>}
      </main>
    );
  }

  return (
    <div className="site-page">
      <nav className="site-navbar">
        <div className="container nav-inner">
          <button
            className="nav-brand"
            type="button"
            onClick={() => goToSection("home")}
          >
            <img src={logoImg} alt="Antique Shop logo" />
            <span>
              Antique<b>Shop</b>
            </span>
          </button>

          <div className="nav-menu">
            <button type="button" onClick={() => goToSection("home")}>
              Home
            </button>

            <button type="button" onClick={() => goToSection("collections")}>
              Collections
            </button>

            <button type="button" onClick={() => goToSection("products")}>
              Products
            </button>

            <button type="button" onClick={() => goToSection("story")}>
              Story
            </button>

            <button type="button" onClick={() => goToSection("contact")}>
              Contact
            </button>
          </div>

          <div className="nav-actions">
            <span>Hi, {userName}</span>

            <button
              type="button"
              className="cart-nav-button"
              onClick={() => setIsCartOpen(true)}
            >
              Cart ({cartCount})
            </button>

            <button type="button" className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-grid"></div>
        <div className="hero-orb hero-orb-one"></div>
        <div className="hero-orb hero-orb-two"></div>

        <div className="container hero-inner">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="hero-label">Classic • Curated • Rare</span>

              <h1>Antique Pieces That Bring History Into Your Home</h1>

              <p>
                A premium marketplace for vintage furniture, fragile decor,
                porcelain sets, classic clocks, and timeless handmade treasures.
              </p>

              <div className="hero-buttons">
                <button type="button" onClick={() => goToSection("products")}>
                  Shop Now
                </button>

                <button type="button" onClick={() => goToSection("collections")}>
                  Explore Collections
                </button>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>500+</strong>
                  <span>Antique Items</span>
                </div>

                <div>
                  <strong>80+</strong>
                  <span>Rare Pieces</span>
                </div>

                <div>
                  <strong>48h</strong>
                  <span>Careful Delivery</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image-card">
                <img src={heroImg} alt="Antique interior" />

                <div className="shine-layer"></div>

                <div className="hero-note note-one">
                  <span>New Arrival</span>
                  <strong>Classic Wall Clock</strong>
                </div>

                <div className="hero-note note-two">
                  <span>Fragile Care</span>
                  <strong>Protected Packaging</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="moving-strip">
          <div>
            <span>Vintage Furniture</span>
            <span>Fragile Decor</span>
            <span>Porcelain Sets</span>
            <span>Classic Clocks</span>
            <span>Rare Collectibles</span>
            <span>Handmade Treasures</span>
            <span>Vintage Furniture</span>
            <span>Fragile Decor</span>
          </div>
        </div>
      </section>

      <section id="collections" className="section-block collections-section">
        <div className="container">
          <div className="section-heading">
            <span>Curated Categories</span>
            <h2>Explore Antique Collections</h2>
            <p>
              Browse by category and discover pieces that match your home style.
            </p>
          </div>

          <div className="row">
            {categories.map((category, index) => (
              <div className="col-md-3 mb-4" key={category}>
                <button
                  type="button"
                  className={`category-card ${
                    selectedCategory === category ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    goToSection("products");
                  }}
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

      <section id="products" className="section-block products-section">
        <div className="container">
          <div className="section-heading">
            <span>Available Pieces</span>
            <h2>Featured Antique Items</h2>
            <p>
              Search, sort, inspect details, and add pieces to your collection.
            </p>
          </div>

          <div className="product-toolbar">
            <input
              type="text"
              placeholder="Search antique products..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortType}
              onChange={(event) => setSortType(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="fragile">Fragile First</option>
            </select>
          </div>

          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                <article className="product-card">
                  {product.image ? (
                    <div className="product-image-box">
                      <img src={product.image} alt={product.name} />
                    </div>
                  ) : (
                    <div className="product-icon">{getProductIcon(product)}</div>
                  )}

                  <div className="product-content">
                    <div className="product-topline">
                      <span>{product.category}</span>
                      {product.fragile && <b>Fragile</b>}
                    </div>

                    <h3>{product.name}</h3>

                    <p>
                      Material: <strong>{product.material}</strong>
                    </p>

                    <p>
                      Stock: <strong>{product.stock}</strong>
                    </p>

                    <div className="product-footer">
                      <strong>{product.price} EGP</strong>
                    </div>

                    <div className="product-actions">
                      <button type="button" onClick={() => setSelectedProduct(product)}>
                        View Details
                      </button>

                      <button type="button" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              No products found. Try another search or category.
            </div>
          )}
        </div>
      </section>

      <section id="story" className="section-block story-section">
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

                <button type="button" onClick={() => goToSection("products")}>
                  Browse Pieces
                </button>
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

      <section id="contact" className="section-block contact-section">
        <div className="container">
          <div className="section-heading">
            <span>Contact</span>
            <h2>Ask About A Piece</h2>
            <p>
              Send a message if you need help choosing, reserving, or handling a
              fragile item.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" rows="4" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Antique Shop. Timeless treasures, lasting value.</p>
      </footer>

      {isCartOpen && (
        <aside className="cart-drawer">
          <div className="cart-header">
            <h3>Your Cart</h3>

            <button type="button" onClick={() => setIsCartOpen(false)}>
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            <>
              <div className="cart-list">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.price} EGP</span>
                    </div>

                    <div className="quantity-actions">
                      <button type="button" onClick={() => decreaseQuantity(item.id)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button type="button" onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <span>Total</span>
                <strong>{cartTotal} EGP</strong>
              </div>

              <div className="cart-footer">
                <button type="button" onClick={clearCart}>
                  Clear Cart
                </button>

                <button type="button" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </aside>
      )}

      {selectedProduct && (
        <div className="modal-backdrop-custom">
          <div className="product-modal">
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            {selectedProduct.image ? (
              <div className="modal-product-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
            ) : (
              <div className="modal-icon">{getProductIcon(selectedProduct)}</div>
            )}

            <span>{selectedProduct.category}</span>

            <h2>{selectedProduct.name}</h2>

            <p>
              This antique piece is made from{" "}
              <strong>{selectedProduct.material}</strong>. It is currently in
              stock with <strong>{selectedProduct.stock}</strong> available
              item(s).
            </p>

            {selectedProduct.fragile && (
              <div className="fragile-warning">
                Fragile item: needs special handling and careful packaging.
              </div>
            )}

            <div className="modal-price">{selectedProduct.price} EGP</div>

            <button
              type="button"
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {orderMessage && (
        <div className="modal-backdrop-custom">
          <div className="success-modal">
            <button
              type="button"
              className="modal-close"
              onClick={() => setOrderMessage("")}
            >
              ×
            </button>

            <div className="success-icon">✓</div>

            <h2>Order Confirmed</h2>

            <p>{orderMessage}</p>

            <button type="button" onClick={() => setOrderMessage("")}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast-message">{toast}</div>}
    </div>
  );
}

export default App;