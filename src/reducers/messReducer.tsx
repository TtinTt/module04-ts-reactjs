import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Mess, MessState } from "../types-unEdit/Mess";

const initialState: MessState = {
  searchFilter: "",
  filter: 2,
  messs: [],
};

const messReducer = createReducer(initialState, {
  SAVE_MESS(state, action: PayloadAction<Mess>) {
    state.messs.push(action.payload);
  },
  FILTER_MESS(state, action: PayloadAction<number>) {
    state.filter = action.payload;
  },
  UPDATE_STATUS_MESS(state, action: PayloadAction<Mess>) {
    const updatedMess = state.messs.map((mess) =>
      mess.id === action.payload.id ? action.payload : mess
    );
    state.messs = updatedMess;
  },
  SEARCH_MESS(state, action: PayloadAction<string>) {
    state.searchFilter = action.payload;
  },
});

export default messReducer;
