import { addRemainderFail, addRemainderReq, addRemainderSuccess } from "../features/user/addRemainderSlice";
import { addTaskFail, addTaskReq, addTaskSuccess } from "../features/user/addTaskSlice";
import { deleteTaskFail, deleteTaskReq, deleteTaskSuccess } from "../features/user/deleteTaskSlice";
import { getTaskFail, getTaskReq, getTaskSuccess } from "../features/user/getTaskSlice";
import { updateTaskFail, updateTaskReq, updateTaskSuccess } from "../features/user/updateTaskSlice";
import { userLoginFail, userLoginReq, userLoginSuccess, userLogout } from "../features/user/userLoginSlice";
import {
  userRegisterReq,
  userRegisterSuccess,
  userRegisterFail,
} from "../features/user/userRegisterSlice";
import { axiosUserInstance } from "../utility/axios";



export const registerUser =
  (userData) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(userRegisterReq());

      const response = await axiosUserInstance.post(
        "/register",
        userData,
        config
      );

      if (response) {
        if (response.data) {
          dispatch(userRegisterSuccess(response.data));
        } else {
          dispatch(userRegisterFail(response.data.message));
        }
      } else {
        throw new Error(`Unexpected response status code: ${response.status}`);
      }
      

    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userRegisterFail(errorIs));
    }
  };

  export const loginUser = (userData) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(userLoginReq());

      const {data} = await axiosUserInstance.post(
        "/login",
         userData,
        config
      );
      if (data.message) {
        dispatch(userLoginFail(data.message));
        return data.message
      } else {
        dispatch(userLoginSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
      
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          console.log(errorIs);
      dispatch(userLoginFail(errorIs));
      
    }
  };

  export const addTask = (taskData) => async (dispatch, getState) => {
    try {
      dispatch(addTaskReq());
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axiosUserInstance.post(
        "/addtask",
        taskData,
        config
      );

      if (response && response.data) {
        console.log("add success");
        dispatch(addTaskSuccess());

        // const newTask = response.data; // the newly created task object
        // dispatch(getTaskSuccess([...getState().getTask.tasks, newTask]));
      } else {
        console.log(response);
        dispatch(addTaskFail(response.message));
      }

    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(errorIs);
      dispatch(addTaskFail(errorIs));
    }
  };


   export const getTask = () => async (dispatch, getState) => {
     try {
       dispatch(getTaskReq());
       const {
         userLogin: { userInfo },
       } = getState();

       const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${userInfo.token}`,
         },
       };

       const response = await axiosUserInstance.get(
         "/gettask",
         config
       );
       if (response) {
         if (response.data) {
           dispatch(getTaskSuccess(response.data));
         } else {
           console.log(response);
           dispatch(getTaskFail(response.message));
         }
       } else {
         dispatch(getTaskFail(response.message));
         throw new Error(`Unexpected response status code: ${response.status}`);
       }
     } catch (error) {
       const errorIs =
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message;
       console.log(errorIs);
       dispatch(getTaskFail(errorIs));
     }
   };


    export const deleteTask = (id,tasks) => async (dispatch, getState) => {
      try {
        dispatch(deleteTaskReq());
        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axiosUserInstance.get(
          `/deletetask/${id}`,
          config
        );
        if (response) {
          if (response.data) {

            dispatch(deleteTaskSuccess());
            const updatedTasks = await tasks.filter((task) => task.id !== id);
           dispatch(getTaskSuccess(updatedTasks));
          } else {
            console.log(response);
            dispatch(deleteTaskFail(response.message));
          }
        } else {
          dispatch(deleteTaskFail(response.message));
          throw new Error(
            `Unexpected response status code: ${response.status}`
          );
        }
      } catch (error) {
        const errorIs =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(errorIs);
        dispatch(deleteTaskFail(errorIs));
      }
    };

   export const updateTask =
     (id, updatedTask) => async (dispatch, getState) => {
       try {
         dispatch(updateTaskReq());
         const {
           userLogin: { userInfo },
         } = getState();

         const config = {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${userInfo.token}`,
           },
         };

         const response = await axiosUserInstance.put(
           `/updatetask/${id}`,
           updatedTask,
           config
         );

         if (response && response.data) {
           console.log("update success");
           dispatch(updateTaskSuccess(updatedTask));

           // const newTask = response.data; // the newly created task object
           // dispatch(getTaskSuccess([...getState().getTask.tasks, newTask]));
         } else {
           console.log(response);
           dispatch(updateTaskFail(response.message));
         }
       } catch (error) {
         const errorIs =
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message;
         console.log(errorIs);
         dispatch(updateTaskFail(errorIs));
       }
     };


   export const setRemainder =
     (id, taskData) => async (dispatch, getState) => {
       try {
        console.log(taskData);
         dispatch(addRemainderReq());
         const {
           userLogin: { userInfo },
         } = getState();

         const config = {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${userInfo.token}`,
           },
         };

         
         const response = await axiosUserInstance.put(
           `/setremainder/${id}`,
           taskData,
           config
         );

         if (response && response.data) {
           console.log("update success");
           dispatch(addRemainderSuccess());

           // const newTask = response.data; // the newly created task object
           // dispatch(getTaskSuccess([...getState().getTask.tasks, newTask]));
         } else {
           console.log(response);
           dispatch(addRemainderFail(response.message));
         }
       } catch (error) {
         const errorIs =
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message;
         console.log(errorIs);
         dispatch(addRemainderFail(errorIs));
       }
     };

    
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

  

