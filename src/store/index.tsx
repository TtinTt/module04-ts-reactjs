// Import reducers
import productReducer from "../reducers/productReducer";
import userReducer from "../reducers/userReducer";
import orderReducer from "../reducers/orderReducer";
import adminReducer from "../reducers/adminReducer";
import messReducer from "../reducers/messReducer";

// Import toolkit functions
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Combine reducers to create the root reducer
const rootReducer = combineReducers({
  productReducer,
  userReducer,
  orderReducer,
  adminReducer,
  messReducer,
});

// Define the type for the entire state
export type RootState = ReturnType<typeof rootReducer>;

// Function to load state from local storage
const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

// Get the preloaded state from local storage
const preloadedState = loadFromLocalStorage();

// Create the store with the root reducer and the preloaded state
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Export the store as the default export
export default store;
