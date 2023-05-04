import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  deleteTaskSuccess: false,
};
const deleteTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    deleteTaskReq: (state, action) => {
      state.loading = true;
      state.deleteTaskSuccess = false;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.deleteTaskSuccess = true;
    },
    deleteTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.deleteTaskSuccess = false;
    },
  },
});

export default deleteTaskSlice.reducer;
export const { deleteTaskReq, deleteTaskSuccess, deleteTaskFail } =
  deleteTaskSlice.actions;
