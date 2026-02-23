import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../api/products";

// Thunk to handle the async API call
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getAllProducts();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;