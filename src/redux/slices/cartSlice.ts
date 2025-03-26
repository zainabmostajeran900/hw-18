import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/products";

interface CartItem extends IProduct {
  quantity: number;
}

interface ICartState {
  cart: CartItem[];
}

const initialState: ICartState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const CartActions = cartSlice.actions;
export const CartReducer = cartSlice.reducer;
