export function createProduct(type, data) {
  switch (type) {
    case "furniture":
      return {
        ...data,
        category: "Furniture",
        type: "furniture",
      };

    case "decor":
      return {
        ...data,
        category: "Decor",
        type: "decor",
      };

    case "kitchen":
      return {
        ...data,
        category: "Kitchen",
        type: "kitchen",
      };

    default:
      return {
        ...data,
        type: "general",
      };
  }
}