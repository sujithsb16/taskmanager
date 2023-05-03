import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  tasks:[],
  error: null,
};
const getTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTaskReq: (state, action) => {
      state.loading = true;
    },
    getTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    getTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default getTaskSlice.reducer;
export const { getTaskReq, getTaskSuccess, getTaskFail } = getTaskSlice.actions;
