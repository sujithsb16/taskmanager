import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  addRemainderSuccess: false,
};
const addRemainderSlice = createSlice({
  name: "remainder",
  initialState,
  reducers: {
    addRemainderReq: (state, action) => {
      state.loading = true;
      state.addRemainderSuccess = false;
    },
    addRemainderSuccess: (state, action) => {
      state.loading = false;
      state.addRemainderSuccess = true;
    },
    addRemainderFail: (state, action) => {
      state.loading = false;
      state.addRemainderSuccess = false;
      state.error = action.payload;
    },
  },
});

export default addRemainderSlice.reducer;
export const { addRemainderReq, addRemainderSuccess, addRemainderFail } = addRemainderSlice.actions;
