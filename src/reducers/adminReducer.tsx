import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Admin, AdminLogined, AdminState } from "../types-unEdit/Admin";

// Initial state
const initialState: AdminState = {
  adminLogined: null,
  admins: [],
  searchFilter: "",
  filter: null,
};

const adminReducer = createReducer(initialState, {
  LOGIN_ADMIN: (state, action: PayloadAction<AdminLogined>) => {
    return {
      ...state,
      adminLogined: action.payload,
    };
  },
  LOGOUT_ADMIN: (state) => {
    return {
      ...state,
      adminLogined: null,
    };
  },
  FILTER_ADMIN: (state, action: PayloadAction<any>) => {
    // Specify the type of payload if known
    return {
      ...state,
      filter: action.payload,
    };
  },
  ADD_ADMIN: (state, action: PayloadAction<Admin>) => {
    return {
      ...state,
      admins: [...state.admins, action.payload],
    };
  },

  UPDATE_STATUS_ADMIN: (state, action: PayloadAction<Admin>) => {
    let updatedAdmins = state.admins.map((admin) => {
      if (admin.email === action.payload.email) {
        return action.payload;
      }
      return admin;
    });
    return {
      ...state,
      admins: updatedAdmins,
    };
  },
  SEARCH_ADMIN: (state, action: PayloadAction<string>) => {
    return {
      ...state,
      searchFilter: action.payload,
    };
  },
  CHANGE_PASSWORD_ADMIN: (
    state,
    action: PayloadAction<{ email: string; password: string }>
  ) => {
    let updatedPassAdmins = state.admins.map((admin) => {
      if (admin.email === action.payload.email) {
        return { ...admin, password: action.payload.password };
      } else {
        return admin;
      }
    });

    return {
      ...state,
      admins: updatedPassAdmins,
    };
  },
});

export default adminReducer;
