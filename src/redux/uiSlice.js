import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartOpen: false, // consistent naming
  },
  reducers: {
    openCart: (state) => { state.cartOpen = true; },
    closeCart: (state) => { state.cartOpen = false; },
  },
});

export const { openCart, closeCart } = uiSlice.actions;
export default uiSlice.reducer;
