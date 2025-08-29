import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // cart items
    wishlist: [], // wishlist items
    loading: false,
};

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addToCart: (state, action) => {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (!exists) state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        addToWishlist: (state, action) => {
            const exists = state.wishlist.find(item => item.id === action.payload.id);
            if (!exists) state.wishlist.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        clearWishlist: (state) => {
            state.wishlist = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    clearCart,
    clearWishlist,
    setLoading,
} = CartSlice.actions;

export default CartSlice.reducer;
