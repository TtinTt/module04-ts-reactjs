import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types-unEdit/User";

export const registerUser = (user: User): PayloadAction<User> => ({
  type: "ADD_USER",
  payload: user,
});

export const loginUser = (user: User | null): PayloadAction<User | null> => ({
  type: "LOGIN_USER",
  payload: user,
});

export const logoutUser = (): PayloadAction<null> => {
  localStorage.removeItem("userLogined");
  localStorage.removeItem("X-API-Key");
  return {
    type: "LOGOUT_USER",
    payload: null,
  };
};

export const filterUser = createAction<number>("FILTER_USER");
export const clearCart = createAction("CLEAR_CART");
export const updateInfoUser = createAction<User>("UPDATE_INFO");
export const updateStatusUser = createAction<number>("UPDATE_STATUS_USER");
export const changePassUser = createAction<string>("CHANGE_PASSWORD_USER");
