import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import feedReducer from "./slices/feed";
import connectionReducer from "./slices/connection";
import requestReducer from "./slices/request";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});
