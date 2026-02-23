import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import uiReducer from "./uiSlice";
import productsReducer from "./productsSlice"; // Import the new slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    products: productsReducer, // Add it here
  },
});