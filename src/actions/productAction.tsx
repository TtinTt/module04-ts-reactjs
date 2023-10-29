import { createAction } from "@reduxjs/toolkit";

export const inputSearchBox = createAction<string>("SEARCH_BOX");
export const sortProducts = createAction<number>("SORT_PRODUCTS");
export const priceFrom = createAction<number>("SORT_PRICE_FROM");
