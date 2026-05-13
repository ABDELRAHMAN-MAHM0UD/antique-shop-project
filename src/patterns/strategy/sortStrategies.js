export const sortByLowPrice = (products) => {
  return [...products].sort((a, b) => a.price - b.price);
};

export const sortByHighPrice = (products) => {
  return [...products].sort((a, b) => b.price - a.price);
};

export const sortByFragile = (products) => {
  return [...products].sort(
    (a, b) => Number(b.fragile) - Number(a.fragile)
  );
};

export const sortFeatured = (products) => {
  return [...products];
};