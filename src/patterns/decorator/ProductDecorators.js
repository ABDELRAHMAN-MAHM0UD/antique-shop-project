export function createCheckoutProduct(product) {
  return {
    ...product,
    addOns: [],
    finalUnitPrice: product.price,
  };
}

export function withFragilePackaging(product) {
  if (!product.fragile) return product;

  return {
    ...product,
    addOns: [
      ...product.addOns,
      {
        name: "Fragile Packaging",
        price: 150,
      },
    ],
    finalUnitPrice: product.finalUnitPrice + 150,
  };
}

export function withLuxuryInsurance(product) {
  if (product.price < 3000) return product;

  return {
    ...product,
    addOns: [
      ...product.addOns,
      {
        name: "Luxury Insurance",
        price: 250,
      },
    ],
    finalUnitPrice: product.finalUnitPrice + 250,
  };
}

export function decorateProductForCheckout(product) {
  let decoratedProduct = createCheckoutProduct(product);

  decoratedProduct = withFragilePackaging(decoratedProduct);
  decoratedProduct = withLuxuryInsurance(decoratedProduct);

  return {
    ...decoratedProduct,
    finalTotal: decoratedProduct.finalUnitPrice * decoratedProduct.quantity,
  };
}

export function decorateCartItems(cartItems) {
  return cartItems.map((item) => decorateProductForCheckout(item));
}