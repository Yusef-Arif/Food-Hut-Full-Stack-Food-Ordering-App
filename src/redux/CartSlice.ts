"use client";

import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "./store";

type cartItems = {
  id: string;
  image: string;
  title: string;
  description: string;
  totalPrice: number;
  extra: string[];
  size: string;
  quantity: number;
};

// const initialCartItems = localStorage.getItem("cartItems");
let initialCartItems: cartItems[] = [];

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("cartItems");
  initialCartItems = stored ? JSON.parse(stored) : [];
}

const initialState: { cartItems: cartItems[] } = {
  cartItems: initialCartItems,
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart(state, action) {
      const existItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existItem !== -1) {
        state.cartItems[existItem] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    decreaseQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice -= item.totalPrice / item.quantity;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
    increaseQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        if (item.quantity >= 1) {
          item.quantity += 1;
          item.totalPrice += item.totalPrice / item.quantity;
        }
      }
    },
    deleteItem(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems.splice(itemIndex, 1);
    },
  },
});
export const { decreaseQuantity, addToCart, deleteItem, increaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

export const cartProducts = (state: rootState) => state.cart.cartItems;
