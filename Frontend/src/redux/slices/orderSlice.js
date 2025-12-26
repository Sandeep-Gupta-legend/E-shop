import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
  orderItems: [],
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },

    createOrder(state, action) {
      state.orderItems = action.payload.items;
      state.totalPrice = action.payload.total;
    },

    clearOrder(state) {
      state.orderItems = [];
      state.totalPrice = 0;
      state.shippingAddress = {};
    },
  },
});

export const {
  saveShippingAddress,
  createOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
