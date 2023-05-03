import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  addTaskSuccess:false,
};
const addTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTaskReq: (state, action) => {
      state.loading = true;
      state.addTaskSuccess = false;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.addTaskSuccess= true;
    },
    addTaskFail: (state, action) => {
      state.loading = false;
      state.addTaskSuccess = false;
      state.error = action.payload;
    },
  },
});

export default addTaskSlice.reducer;
export const { addTaskReq, addTaskSuccess, addTaskFail } = addTaskSlice.actions;
