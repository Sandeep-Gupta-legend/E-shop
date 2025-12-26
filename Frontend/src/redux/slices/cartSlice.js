import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: cartFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x._id === item._id
      );

      if (existItem) {
        existItem.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    updateQuantity(state, action) {
      const { id, qty } = action.payload;

      const item = state.cartItems.find((i) => i._id === id);

      if (item) {
        item.qty = qty;
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
