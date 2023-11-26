import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [
    {
      products: [],
      price: 0,
      tabId: 1,
    },
  ],
  reducers: {
    addPageCart: (state, action) => {
      state.push(action.payload);
    },
    updateCartByTabId: (state, { payload }) => {
      const cartItem = payload.product;
      const existingItem = state[payload.tabId].products.find(
        (item) => item._id === cartItem._id
      );
      if (existingItem) {
        const existingItemIndex = state[payload.tabId].products.findIndex(
          (item) => item._id === existingItem._id
        );
        state[payload.tabId].products[existingItemIndex].quantity +=
          cartItem.quantity;
        state[payload.tabId].price += cartItem.price * cartItem.quantity;
      } else {
        state[payload.tabId].products.push(cartItem);
        state[payload.tabId].price += cartItem.price * cartItem.quantity;
      }
    },
    deleteCartByTabId: (state, { payload }) => {
      const id = payload._id;

      const existingItemIndex = state[payload.tabIndex].products.findIndex(
        (item) => item._id === id
      );
      const existingItem = state[payload.tabIndex].products[existingItemIndex];

      if (existingItem) {
        state[payload.tabIndex].products.splice(existingItemIndex, 1);
        state[payload.tabIndex].price -=
          existingItem.price * existingItem.quantity;
      }
    },

    increaseQuantity(state, { payload }) {
      const id = payload._id;
      const existingItem = state[payload.tabIndex].products.find(
        (item) => item._id === id
      );
      existingItem.quantity++;
      state[payload.tabIndex].price += existingItem.price;
    },
    decreaseQuantity(state, { payload }) {
      const id = payload._id;
      const existingItem = state[payload.tabIndex].products.find(
        (item) => item._id === id
      );

      if (existingItem.quantity === 1) {
        state[payload.tabIndex].products = state[
          payload.tabIndex
        ].products.filter((item) => item._id !== id);
        state[payload.tabIndex].price -= existingItem.price;
      } else {
        existingItem.quantity--;
        state[payload.tabIndex].price -= existingItem.price;
      }
    },
    resetPageCart: (state, { payload }) => {
      state[payload].price = 0;
      state[payload].products = [];
    },
    deletePageCart: (state, { payload }) => {
      state.splice(payload, 1);
    },
  },
});
export const {
  addPageCart,
  updateCartByTabId,
  deletePageCart,
  deleteCartByTabId,
  increaseQuantity,
  decreaseQuantity,
  resetPageCart,
} = cartSlice.actions;
export default cartSlice.reducer;
