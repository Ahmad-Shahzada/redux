import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartSlice from "./cartSlice"
const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartSlice
    }
});

export default store;
