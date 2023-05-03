import { configureStore } from "@reduxjs/toolkit";

import userLoginReducer from "../features/user/userLoginSlice";
import userRegisterReducer from "../features/user/userRegisterSlice";
import addTaskReducer from "../features/user/addTaskSlice";
import getTaskReducer from "../features/user/getTaskSlice";
import deleteTaskReducer from "../features/user/deleteTaskSlice";
import updateTaskReducer from "../features/user/updateTaskSlice";
import addRemainderReducer from "../features/user/addRemainderSlice";
const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    addTask: addTaskReducer,
    getTask: getTaskReducer,
    deleteTask: deleteTaskReducer,
    updateTask: updateTaskReducer,
    addRemainderTask: addRemainderReducer,
  },
});
export default store;
