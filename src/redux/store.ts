import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";
export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
