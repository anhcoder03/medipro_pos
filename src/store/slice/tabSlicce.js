import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: {
    tabSelected: 0,
  },
  reducers: {
    setTabSelect: (state, action) => {
      state.tabSelected = action.payload;
    },
  },
});
export const { setTabSelect } = tabSlice.actions;
export default tabSlice.reducer;
