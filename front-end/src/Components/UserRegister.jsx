import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { userRegisterSchema } from '../schema/validation';
import Otp from "otp-input-react";
import { registerUser } from '../actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loading from './Loading';
import { Link, useNavigate } from 'react-router-dom';



/////////////////////////
const initialValues = {
  name:"",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};
///////////////////////////



const theme = createTheme();


const UserRegister = () => {

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loadingRegister, errorRegister } = userRegister;
  const navigate = useNavigate()
 

    ////////////////////////////
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues: initialValues,
        validationSchema: userRegisterSchema,
        onSubmit: (values) => {
          submitHandler();
        //   moblieVerify();

          console.log(values);
        },
      });

    ////////////////////////////
console.log(errors);
/////////////////
  const submitHandler = async() => {

    const userData = {name:values.name,email:values.email,mobile:values.mobile,password:values.password}
         await dispatch(registerUser(userData));
         navigate("/");
         if (errorRegister) {
           toast.error(errorRegister);
           navigate("/")
         }

    // Handle form submission
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "#f5f5f5",
          borderRadius: "10px",
          p: 3,
          marginY: 3,
          position: "relative",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Register
        </Typography>
        <Toaster toasterOptions={{ duratiom: 4000 }} />
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  value={values.name}
                  error={errors.name && touched.name ? true : false}
                  label={errors.name && touched.name ? errors.name : "Name"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={values.email}
                  error={errors.email && touched.email ? true : false}
                  label={errors.email && touched.email ? errors.email : "Email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  value={values.mobile}
                  error={errors.mobile && touched.mobile ? true : false}
                  label={
                    errors.mobile && touched.mobile
                      ? errors.mobile
                      : "Mobile No"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  error={errors.password && touched.password ? true : false}
                  label={
                    errors.password && touched.password
                      ? errors.password
                      : "Password"
                  }
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? true
                      : false
                  }
                  label={
                    errors.confirmPassword
                      ? errors.confirmPassword
                      : "confirm Password"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </form>
          <Link to="/" variant="body2">
            {"Already have account? Login in"}
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default UserRegister
