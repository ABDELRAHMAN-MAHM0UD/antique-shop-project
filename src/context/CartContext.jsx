import { createContext, useState, useContext } from 'react';

/** * [PATTERN: SINGLETON] 
 * We create a Context object. This acts as the single source of truth 
 * for our shopping cart data across the entire application.
 */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // [STATE MANAGEMENT]
  // cartItems: holds the list of products currently in the cart.
  // setCartItems: function to update the cart state.
  const [cartItems, setCartItems] = useState([]);

  /**
   * [ACTION: ADD TO CART]
   * Takes a product object and appends it to the existing array.
   * We use the spread operator (...) to maintain immutability.
   */
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  /**
   * [ACTION: REMOVE FROM CART]
   * Filters the array to keep only items that DON'T match the given ID.
   * This is a clean way to delete an item from a list in React.
   */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  /**
   * [PROVIDER]
   * This component wraps our app and "provides" the cart data 
   * and functions to any child component that needs them.
   */
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * [OBSERVER] 
 * A shorthand way for components to access the cart context easily
 * without needing to import 'useContext' and 'CartContext' every time.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);