import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loadingRegister: false,
  error: null,
};
const userRegisterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegisterReq: (state, action) => {
      state.loadingRegister = true;
    },
    userRegisterSuccess: (state, action) => {
      state.loadingRegister = false;
    },
    userRegisterFail: (state, action) => {
      state.loadingRegister = false;
      state.errorRegister = action.payload;
    },
  },
});

export default userRegisterSlice.reducer;
export const { userRegisterReq, userRegisterSuccess, userRegisterFail } =
  userRegisterSlice.actions;
