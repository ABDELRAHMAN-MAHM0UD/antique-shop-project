function validateCart(order) {
  if (!order.cartItems || order.cartItems.length === 0) {
    return {
      isValid: false,
      message: "Cart is empty",
    };
  }

  return { isValid: true };
}

function validateStock(order) {
  const outOfStockItem = order.cartItems.find((item) => item.stock === 0);

  if (outOfStockItem) {
    return {
      isValid: false,
      message: `${outOfStockItem.name} is out of stock`,
    };
  }

  return { isValid: true };
}

function validatePayment(order) {
  if (!order.paymentMethod) {
    return {
      isValid: false,
      message: "Please choose a payment method",
    };
  }

  return { isValid: true };
}

function validateDelivery(order) {
  if (!order.delivery) {
    return { isValid: true };
  }

  const { fullName, phone, city, address } = order.delivery;

  if (!fullName || !phone || !city || !address) {
    return {
      isValid: false,
      message: "Please complete delivery information",
    };
  }

  return { isValid: true };
}

export function validateCheckout(order) {
  const validationSteps = [
    validateCart,
    validateStock,
    validatePayment,
    validateDelivery,
  ];

  for (const step of validationSteps) {
    const result = step(order);

    if (!result.isValid) {
      return result;
    }
  }

  return {
    isValid: true,
    message: "Checkout validation passed",
  };
}