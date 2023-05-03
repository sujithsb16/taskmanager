import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
};
const deleteTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    deleteTaskReq: (state, action) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    deleteTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default deleteTaskSlice.reducer;
export const { deleteTaskReq, deleteTaskSuccess, deleteTaskFail } = deleteTaskSlice.actions;
