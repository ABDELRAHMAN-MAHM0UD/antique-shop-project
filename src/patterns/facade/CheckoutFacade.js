import { validateCheckout } from "../chain/CheckoutValidationChain";
import { decorateCartItems } from "../decorator/ProductDecorators";

export function createCheckoutOrder({ cartItems, orderDetails = {} }) {
  const orderData = {
    cartItems,
    delivery: orderDetails.delivery || null,
    paymentMethod: orderDetails.paymentMethod || "cash",
  };

  const validation = validateCheckout(orderData);

  if (!validation.isValid) {
    return {
      success: false,
      message: validation.message,
    };
  }

  const decoratedItems = decorateCartItems(cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = decoratedItems.reduce(
    (sum, item) => sum + item.finalTotal,
    0
  );

  const servicesTotal = total - subtotal;

  const orderNumber = `AS-${Date.now().toString().slice(-6)}`;

  return {
    success: true,
    message: `Your order has been placed successfully. Order number: ${orderNumber}`,
    order: {
      orderNumber,
      items: decoratedItems,
      subtotal,
      servicesTotal,
      total,
      delivery: orderData.delivery,
      paymentMethod: orderData.paymentMethod,
      createdAt: new Date().toLocaleString(),
    },
  };
}