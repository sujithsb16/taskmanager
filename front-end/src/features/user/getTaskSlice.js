import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  tasks:[],
  pendingTasks :0,
  totalTasks:0,
  error: null,
};
const getTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTaskReq: (state) => {
      state.loading = true;
    },
    getTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload.result;
      state.pendingTasks = action.payload.pendingTasks;
      state.totalTasks = action.payload.totalTasks;
    },
    getTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default getTaskSlice.reducer;
export const { getTaskReq, getTaskSuccess, getTaskFail } = getTaskSlice.actions;
