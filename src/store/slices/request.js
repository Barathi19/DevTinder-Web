import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (_, action) => action.payload,
    removeRequest: (state, action) => {
      if (state.length) {
        return state.filter((req) => req._id !== action.payload);
      }
      return null;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
