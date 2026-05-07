import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ProductsPage({ products, categories, addToCart }) {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("featured");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

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

  return (
    <section className="section-block products-section">
      <div className="container">
        <div className="section-heading">
          <span>Available Pieces</span>
          <h2>Featured Antique Items</h2>
          <p>Search, sort, inspect details, and add pieces to your collection.</p>
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
                <div className="product-image-box">
                  <img src={product.image} alt={product.name} />
                </div>

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
                    <Link to={`/product/${product.id}`}>
                      <button type="button">View Details</button>
                    </Link>

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
  );
}

export default ProductsPage;