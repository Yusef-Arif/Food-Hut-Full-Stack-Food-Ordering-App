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

const initialState: { cartItems: cartItems[] } = {
  cartItems: [],
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart(state, action) {
      const existItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existItem) {
        existItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

export const cartProducts = (state: rootState) => state.cart.cartItems;
