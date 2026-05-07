import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function ProductsPage({ products, categories, addToCart }) {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("featured");

  const { t, productName, categoryName, materialName } = useLanguage();

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
        productName(product.name).toLowerCase().includes(searchText.toLowerCase())
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
  }, [products, selectedCategory, searchText, sortType, productName]);

  return (
    <section className="section-block products-section">
      <div className="container">
        <div className="section-heading">
          <span>{t.products.label}</span>
          <h2>{t.products.title}</h2>
          <p>{t.products.description}</p>
        </div>

        <div className="product-toolbar">
          <input
            type="text"
            placeholder={t.products.search}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {categoryName(category)}
              </option>
            ))}
          </select>

          <select
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="featured">{t.products.featured}</option>
            <option value="price-low">{t.products.priceLow}</option>
            <option value="price-high">{t.products.priceHigh}</option>
            <option value="fragile">{t.products.fragileFirst}</option>
          </select>
        </div>

        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
              <article className="product-card">
                <div className="product-image-box">
                  <img src={product.image} alt={productName(product.name)} />
                </div>

                <div className="product-content">
                  <div className="product-topline">
                    <span>{categoryName(product.category)}</span>
                    {product.fragile && <b>{t.products.fragile}</b>}
                  </div>

                  <h3>{productName(product.name)}</h3>

                  <p>
                    {t.products.material}:{" "}
                    <strong>{materialName(product.material)}</strong>
                  </p>

                  <p>
                    {t.products.stock}: <strong>{product.stock}</strong>
                  </p>

                  <div className="product-footer">
                    <strong>{product.price} EGP</strong>
                  </div>

                  <div className="product-actions">
                    <Link to={`/product/${product.id}`}>
                      <button type="button">{t.products.viewDetails}</button>
                    </Link>

                    <button type="button" onClick={() => addToCart(product)}>
                      {t.products.addToCart}
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">{t.products.empty}</div>
        )}
      </div>
    </section>
  );
}

export default ProductsPage;