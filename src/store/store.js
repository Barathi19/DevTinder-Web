import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import feedReducer from "./slices/feed";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
