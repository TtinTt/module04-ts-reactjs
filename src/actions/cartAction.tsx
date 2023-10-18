import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartItem } from "../types-unEdit/Product";
export const addToCart = createAction<Product | CartItem>("ADD_TO_CART");
export const deleteFromCart = createAction<number>("DELETE_FROM_CART");

interface ChangeQuantityPayload {
  id: number;
  quantity: number;
}

export const changeQuantity = (
  id: number,
  quantity: number
): PayloadAction<ChangeQuantityPayload> => ({
  type: "CHANGE_QUANTITY",
  payload: { id, quantity },
});

// export const createOrder = createAction("CREATE_ORDER");
