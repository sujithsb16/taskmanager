import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  updateSuccess:false,
  error: null,
};
const updateTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTaskReq: (state, action) => {
      state.loading = true;
      state.updateSuccess= false;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
     state.updateSuccess = true;

      state.tasks = action.payload;
    },
    updateTaskFail: (state, action) => {
      state.loading = false;
      state.updateSuccess = false;
      state.error = action.payload;
    },
  },
});

export default updateTaskSlice.reducer;
export const { updateTaskReq, updateTaskSuccess, updateTaskFail } =
  updateTaskSlice.actions;
