import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    searchQuery: "",
    currentPage: 1, // Pagination ke liye current page
    itemsPerPage: 8, // Har page par kitne items show hon
    loading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      
      if (action.payload === "") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter((product) =>
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      }

      // Jab search ho to page wapas 1 par le aayen
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
