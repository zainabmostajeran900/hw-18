import { configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./slices/cartSlice";

export const reduxStore = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
