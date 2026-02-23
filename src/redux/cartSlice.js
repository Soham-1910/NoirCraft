import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        // DECREASE QUANTITY BY 1
        decreaseQuantity: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    // Remove item if quantity is 1
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload
                    );
                }
            }
        },
        // REMOVE ENTIRE ITEM
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
