import { createAction, PayloadAction } from "@reduxjs/toolkit";

export const createOrder = createAction("CREATE_ORDER");
export const cancelOrder = createAction("CANCEL_ORDER");
export const updateStatusOrder = createAction("UPDATE_STATUS_ORDER");
export const filterOrder = createAction<number>("FILTER_ORDER");
export const inputSearchOrder = createAction<string>("SEARCH_ORDER");
