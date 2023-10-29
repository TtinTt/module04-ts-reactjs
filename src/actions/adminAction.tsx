import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "../types-unEdit/Admin"; // Asumming Admin type is correctly defined

export const loginAdmin = createAction<Admin | null>("LOGIN_ADMIN");
export const logoutAdmin = createAction("LOGOUT_ADMIN");
export const updateEditProduct = createAction<any>("EDIT_PRODUCT"); // Specify the payload type if known
export const addProduct = createAction<any>("ADD_PRODUCT"); // Specify the payload type if known
export const deleteProduct = createAction<any>("DELETE_PRODUCT"); // Specify the payload type if known
export const inputSearchUser = createAction<string>("SEARCH_USER");

export const inputSearchAdmin = createAction<string>("SEARCH_ADMIN");
export const filterAdmin = createAction<number>("FILTER_ADMIN");
export const changePassAdmin = createAction<string>("CHANGE_PASSWORD_ADMIN");
export const updateStatusAdmin = createAction<number>("UPDATE_STATUS_ADMIN");
export const updateInfoAdmin = createAction<Admin>("UPDATE_INFO");
