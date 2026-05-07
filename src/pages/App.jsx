import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "../components/Navbar";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import HomePage from "./HomePage";
import CollectionsPage from "./CollectionsPage";
import ProductsPage from "./ProductsPage";
import ProductDetailsPage from "./ProductDetailsPage";
import StoryPage from "./StoryPage";
import ContactPage from "./ContactPage";
import CartPage from "./CartPage";

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

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("antiqueUser"))
  );

  const [userName, setUserName] = useState(
    () => localStorage.getItem("antiqueUser") || "Guest"
  );

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
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
    const name = email.split("@")[0];

    localStorage.setItem("antiqueUser", name);
    setUserName(name);
    setIsLoggedIn(true);
    showToast("Welcome back to Antique Shop.");
  }

  function handleSignUp(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");

    localStorage.setItem("antiqueUser", name);
    setUserName(name);
    setIsLoggedIn(true);
    showToast("Account created successfully.");
  }

  function continueAsGuest() {
    localStorage.setItem("antiqueUser", "Guest");
    setUserName("Guest");
    setIsLoggedIn(true);
    showToast("Continuing as guest.");
  }

  function handleLogout() {
    localStorage.removeItem("antiqueUser");
    setIsLoggedIn(false);
    setUserName("Guest");
    setCartItems([]);
    showToast("Logged out successfully.");
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
    showToast("Checkout completed successfully.");
  }

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category);
    return ["All", ...new Set(uniqueCategories)];
  }, [products]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function PageFrame({ children }) {
    return (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <div className="site-page">
          <Navbar
            userName={userName}
            cartCount={cartCount}
            onLogout={handleLogout}
          />

          {children}

          <footer className="footer">
            <p>© 2026 Antique Shop. Timeless treasures, lasting value.</p>
          </footer>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage
                onLogin={handleLogin}
                onGuest={continueAsGuest}
                showToast={showToast}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <SignupPage
                onSignUp={handleSignUp}
                onGuest={continueAsGuest}
              />
            )
          }
        />

        <Route
          path="/home"
          element={
            <PageFrame>
              <HomePage />
            </PageFrame>
          }
        />

        <Route
          path="/collections"
          element={
            <PageFrame>
              <CollectionsPage categories={categories} />
            </PageFrame>
          }
        />

        <Route
          path="/products"
          element={
            <PageFrame>
              <ProductsPage
                products={products}
                categories={categories}
                addToCart={addToCart}
              />
            </PageFrame>
          }
        />

        <Route
          path="/product/:productId"
          element={
            <PageFrame>
              <ProductDetailsPage products={products} addToCart={addToCart} />
            </PageFrame>
          }
        />

        <Route
          path="/story"
          element={
            <PageFrame>
              <StoryPage />
            </PageFrame>
          }
        />

        <Route
          path="/contact"
          element={
            <PageFrame>
              <ContactPage showToast={showToast} />
            </PageFrame>
          }
        />

        <Route
          path="/cart"
          element={
            <PageFrame>
              <CartPage
                cartItems={cartItems}
                cartTotal={cartTotal}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                handleCheckout={handleCheckout}
              />
            </PageFrame>
          }
        />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

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
    </BrowserRouter>
  );
}

export default App;