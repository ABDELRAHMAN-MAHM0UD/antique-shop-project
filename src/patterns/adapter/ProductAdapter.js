export function getProductType(category) {
  const value = String(category || "").toLowerCase();

  if (value.includes("furniture")) return "furniture";
  if (value.includes("decor")) return "decor";
  if (value.includes("kitchen")) return "kitchen";

  return "general";
}

export function adaptProductData(rawProduct, productImages) {
  return {
    ...rawProduct,
    type: getProductType(rawProduct.category),
    image: productImages[rawProduct.imageKey],
  };
}