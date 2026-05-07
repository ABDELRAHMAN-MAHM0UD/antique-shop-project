import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import heroImg from "../assets/hero.png";
import ProductCard from "../components/ProductCard";

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  return (
    <div>
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold mb-3">Antique Shop</h1>

            <p className="lead text-muted mb-4">
              Welcome to our antique shop. Discover classic furniture, vintage
              decor, and fragile handmade items for elegant homes.
            </p>

            <button
              type=" shop. Discover classic furniture, vintage
              decor, and fragile handmade items for elegant homes.
            </p>

            <button
button"
              className="btn btn-primary btn-lg"
              onClick={() => setCount((count) => count + 1)}
            >
              Start Shopping {count}
            </button>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={heroImg}
              alt="Antique hero"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-4">Our Collections</h2>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={viteLogo}
                  alt="Furniture icon"
                  width="60"
                  className="mb-3"
                />

                <h3>Antique Furniture</h3>

                <p className="text-muted">
                  Classic wooden chairs, tables, cabinets, and timeless home
                  pieces.
                </p>

                <a href="#products" className="btn btn-outline-primary">
                  Browse Furniture
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={reactLogo}
                  alt="Decor icon"
                  width="60"
                  className="mb-3"
                />

                <h3>Fragile Decor</h3>

                <p className="text-muted">
                  Glass vases, porcelain pieces, and handmade decorations that
                  need special care.
                </p>

                <a href="#products" className="btn btn-outline-primary">
                  View Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="container py-5">
        <h2 className="text-center mb-4">Available Products</h2>

        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;