import { createAction } from "@reduxjs/toolkit";
import { Mess } from "../types-unEdit/Mess";
// Assuming the payloads based on the names and the provided interfaces:

interface UpdateStatusMessPayload {
  id: number;
  status: number;
}

export const saveMess = createAction<Mess>("SAVE_MESS");
export const updateStatusMess =
  createAction<UpdateStatusMessPayload>("UPDATE_STATUS_MESS");
export const inputSearchMess = createAction<string>("SEARCH_MESS");
export const filterMess = createAction<number>("FILTER_MESS");
