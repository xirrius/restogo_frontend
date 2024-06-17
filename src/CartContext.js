import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  fetchProduct,
  fetchCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  createOrder,
} from "./services/api";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      const totalPrice = action.payload.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        return total + itemPrice;
      }, 0);
      return {
        ...state,
        cartItems: action.payload,
        totalPrice,
      };
    case "ADD_CART_ITEM":
      const addedItemPrice = parseFloat(action.payload.price) || 0;
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        totalPrice: (state.totalPrice || 0) + addedItemPrice,
      };
    case "UPDATE_CART_ITEM":
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      const updatedTotalPrice = updatedCartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        return total + itemPrice;
      }, 0);
      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
      };
    case "REMOVE_CART_ITEM":
      const remainingItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const remainingTotalPrice = remainingItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        return total + itemPrice;
      }, 0);
      return {
        ...state,
        cartItems: remainingItems,
        totalPrice: remainingTotalPrice,
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [], totalPrice: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    totalPrice: 0,
  });

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItems = await fetchCartItems();
        const cartItemsWithProducts = await Promise.all(
          cartItems.map(async (item) => {
            const product = await fetchProduct(item.product);
            return { ...item, product, price: parseFloat(item.price) || 0 };
          })
        );
        dispatch({ type: "SET_CART_ITEMS", payload: cartItemsWithProducts });
        console.log(cartItems);
      } catch (error) {
        console.error("Error Fetching cart items:", error);
      }
    };
    loadCartItems();
  }, []);

  const addToCart = async (
    productId,
    quantity,
    totalPrice,
    selectedOptions
  ) => {
    try {
      const response = await createCartItem(
        productId,
        quantity,
        totalPrice,
        selectedOptions
      );
      const product = await fetchProduct(productId);
      dispatch({
        type: "ADD_CART_ITEM",
        payload: { ...response, product, price: parseFloat(totalPrice) || 0 },
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const updateCartItemInContext = async (cartItemId, updatedData) => {
    try {
      const response = await updateCartItem(cartItemId, updatedData);
      const product = await fetchProduct(updatedData.product);
      dispatch({
        type: "UPDATE_CART_ITEM",
        payload: { ...response, product, price: parseFloat(response.price) || 0 },
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      dispatch({ type: "REMOVE_CART_ITEM", payload: cartItemId });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const placeOrder = async (cartId, paymentInfo) => {
    try {
      const orderResponse = await createOrder(cartId, paymentInfo);

      // After successfully creating the order, clear the cart
      for (const item of state.cartItems) {
        await deleteCartItem(item.id);
      }

      dispatch({ type: "CLEAR_CART" });

      return orderResponse;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        addToCart,
        updateCartItemInContext,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
