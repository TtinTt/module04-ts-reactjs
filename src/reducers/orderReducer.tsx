import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderState } from "../types-unEdit/Order";

// Initial state
const initialState: OrderState = {
  filter: 0,
  searchFilter: "",
  orders: [],
};

const orderReducer = createReducer(initialState, {
  CREATE_ORDER: (state, action: PayloadAction<Order>) => {
    state.orders = [action.payload, ...state.orders];
  },
  CANCEL_ORDER: (state, action: PayloadAction<number>) => {
    state.orders = state.orders.map((order) => {
      if (order.id === action.payload) {
        return { ...order, status: -1 };
      }
      return order;
    });
  },
  UPDATE_STATUS_ORDER: (state, action: PayloadAction<Order>) => {
    state.orders = state.orders.map((order) => {
      if (order.id === action.payload.id) {
        return action.payload;
      }
      return order;
    });
  },
  FILTER_ORDER: (state, action: PayloadAction<number>) => {
    state.filter = action.payload;
  },
  SEARCH_ORDER: (state, action: PayloadAction<string>) => {
    state.searchFilter = action.payload;
  },
});

export default orderReducer;
