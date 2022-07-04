import { useReducer, createContext, useEffect, useContext } from "react";
import { cartReducer, initialState } from "../reducers/shopReducer";

export const CartContext = createContext(initialState);

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(state.products));
    localStorage.setItem("cart", JSON.stringify(state.cart));

    // localStorage.removeItem("cart", state.cart);
  }, [state]);

  //* Actions
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const changeCartQty = (id, qty) => {
    dispatch({ type: "CHANGE_CART_QTY", payload: { id: id, qty: qty } });
  };

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        addToCart,
        removeFromCart,
        changeCartQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
