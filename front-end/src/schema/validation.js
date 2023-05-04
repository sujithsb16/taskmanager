import * as Yup from "yup";



export const userRegisterSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter name"),
  email: Yup.string().email().required("Please enter your email"),
  mobile: Yup.string().min(10).required("Please enter your mobile"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please Enter Email"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
});

export const addTaskSchema = Yup.object({
  title: Yup.string().min(2).required("Please Enter Title"),
  description: Yup.string().min(4).required("Please Enter Description"),
});