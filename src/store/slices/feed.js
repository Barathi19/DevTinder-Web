import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeeds: (state, action) => action.payload,
    removeFeeds: (state, action) => {
      if (state.length) {
        return state.filter((data) => data._id !== action.payload);
      }
      return null;
    },
  },
});

export const { addFeeds, removeFeeds } = feedSlice.actions;

export default feedSlice.reducer;
