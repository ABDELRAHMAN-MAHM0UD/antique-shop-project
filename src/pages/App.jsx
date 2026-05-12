import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

import { useLanguage } from "../context/LanguageContext";

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

function PageFrame({
  isLoggedIn,
  userName,
  cartCount,
  onLogout,
  footerText,
  children,
}) {
  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <div className="site-page">
        <Navbar userName={userName} cartCount={cartCount} onLogout={onLogout} />

        {children}

        <footer className="footer">
          <p>{footerText}</p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  const { t } = useLanguage();

  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("antiqueUser")),
  );

  const [userName, setUserName] = useState(
    () => localStorage.getItem("antiqueUser") || "Guest",
  );

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [lastOrder, setLastOrder] = useState(null);

  const toastTimer = useRef(null);

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

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  function showToast(message) {
    const toastTop = window.scrollY + window.innerHeight / 2;

    setToast({
      message,
      top: toastTop,
    });

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2600);
  }

  function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!matchedUser) {
      showToast("Invalid email or password");
      return;
    }

    localStorage.setItem("antiqueUser", matchedUser.name);

    setUserName(matchedUser.name);
    setIsLoggedIn(true);

    showToast(t.messages.welcomeBack);
  }

  function handleSignUp(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      showToast("This email already exists");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("antiqueUser", name);

    setUserName(name);
    setIsLoggedIn(true);

    showToast(t.messages.accountCreated);
  }

  function continueAsGuest() {
    localStorage.setItem("antiqueUser", "Guest");
    setUserName("Guest");
    setIsLoggedIn(true);
    showToast(t.messages.guestMode);
  }

  function handleLogout() {
    localStorage.removeItem("antiqueUser");
    setIsLoggedIn(false);
    setUserName("Guest");
    setCartItems([]);
    setLastOrder(null);
    showToast(t.messages.loggedOut);
  }

  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    showToast("Added to cart successfully");
  }

  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );

    showToast(t.messages.removedFromCart);
  }

  function clearCart() {
    setCartItems([]);
    showToast(t.messages.cartCleared);
  }

  function handleCheckout(orderDetails = {}) {
    if (cartItems.length === 0) {
      showToast(t.messages.emptyCart);
      return;
    }

    const orderNumber = `AS-${Date.now().toString().slice(-6)}`;

    setLastOrder({
      orderNumber,
      total: cartTotal,
      ...orderDetails,
    });

    setOrderMessage(
      `Your order has been placed successfully. Order number: ${orderNumber}`,
    );

    setCartItems([]);
    showToast(t.messages.checkoutDone);
  }

  function closeOrderMessage() {
    setOrderMessage("");
  }

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category);
    return ["All", ...new Set(uniqueCategories)];
  }, [products]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const pageFrameProps = {
    isLoggedIn,
    userName,
    cartCount,
    onLogout: handleLogout,
    footerText: t.footer,
  };

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
              <SignupPage onSignUp={handleSignUp} onGuest={continueAsGuest} />
            )
          }
        />

        <Route
          path="/home"
          element={
            <PageFrame {...pageFrameProps}>
              <HomePage />
            </PageFrame>
          }
        />

        <Route
          path="/collections"
          element={
            <PageFrame {...pageFrameProps}>
              <CollectionsPage categories={categories} />
            </PageFrame>
          }
        />

        <Route
          path="/products"
          element={
            <PageFrame {...pageFrameProps}>
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
            <PageFrame {...pageFrameProps}>
              <ProductDetailsPage products={products} addToCart={addToCart} />
            </PageFrame>
          }
        />

        <Route
          path="/story"
          element={
            <PageFrame {...pageFrameProps}>
              <StoryPage />
            </PageFrame>
          }
        />

        <Route
          path="/contact"
          element={
            <PageFrame {...pageFrameProps}>
              <ContactPage showToast={showToast} />
            </PageFrame>
          }
        />

        <Route
          path="/cart"
          element={
            <PageFrame {...pageFrameProps}>
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
              onClick={closeOrderMessage}
            >
              ×
            </button>

            <div className="success-icon">✓</div>

            <h2>{t.cart.checkout}</h2>

            <p>{orderMessage}</p>

            {lastOrder && (
              <div className="review-box">
                <div>
                  <span>Order Number</span>
                  <strong>{lastOrder.orderNumber}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>{lastOrder.total} EGP</strong>
                </div>
              </div>
            )}

            <button type="button" onClick={closeOrderMessage}>
              {t.cart.continueShopping}
            </button>
          </div>
        </div>
      )}

      {toast &&
        createPortal(
          <div
            className="toast-message"
            style={{ "--toast-top": `${toast.top}px` }}
          >
            {toast.message}
          </div>,
          document.body,
        )}
    </BrowserRouter>
  );
}

export default App;
