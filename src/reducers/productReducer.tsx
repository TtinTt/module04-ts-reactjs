import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../types-unEdit/Product";

// Initial state
const initialState: ProductState = {
  sort: 0,
  priceFrom: null,
  searchFilter: "",
  products: [],
};

const productReducer = createReducer(initialState, {
  SORT_PRODUCTS: (state, action: PayloadAction<number>) => {
    state.sort = action.payload;
  },
  SEARCH_BOX: (state, action: PayloadAction<any>) => {
    console.log("action.payload", action.payload);

    state.searchFilter = action.payload;
  },
  SORT_PRICE_FROM: (state, action: PayloadAction<number | null>) => {
    state.priceFrom = action.payload;
  },
  EDIT_PRODUCT: (state, action: PayloadAction<Product>) => {
    state.products = state.products.map((product) => {
      if (product.product_id === action.payload.product_id) {
        return action.payload;
      }
      return product;
    });
  },
  ADD_PRODUCT: (state, action: PayloadAction<Product>) => {
    state.products = [action.payload, ...state.products];
  },
  DELETE_PRODUCT: (state, action: PayloadAction<{ product_id: number }>) => {
    state.products = state.products.filter(
      (product) => product.product_id !== action.payload.product_id
    );
  },
});

export default productReducer;
