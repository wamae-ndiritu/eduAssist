import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import requestReducer from "./slices/requestSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    request: requestReducer,
  },
});
