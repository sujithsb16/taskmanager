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
  const [showOtp, setShowOtp] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loadingRegister, errorRegister } = userRegister;

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
         if (errorRegister) {
           toast.error(errorRegister);
         }

    // Handle form submission
  };

  return (
    <>
      <Container maxWidth="sm">
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        {showOtp ? (
          <Box
            noValidate
            // onSubmit={verifyOtp}
            boxShadow={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // bgcolor: "#20262E",
              borderRadius: "0.5rem",
              height: "12rem",
            }}
          >
            <Typography variant="h5" color={"whitesmoke"} sx={{ my: "1rem" }}>
              Enter OTP
            </Typography>
            <Otp
              // value={otp}
              autoFocus
              // onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              inputStyles={{
                borderRadius: "5px",
                marginRight: ".5rem",
              }}
            ></Otp>

            {showOtp ? (
              <Button
                sx={{
                  mt: 4,
                  mb: 1,
                  color: "black",
                  bgcolor: "secondary.main",
                  ":hover": {
                    bgcolor: "#CD5888",
                    color: "white",
                  },
                }}
                //   onClick={otpHandler}
              >
                <span>Verify OTP</span>
              </Button>
            ) : (
              " "
            )}
          </Box>
        ) : (
          <Box sx={{ marginTop: 8, mb: 2 }}>
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
                    label={
                      errors.email && touched.email ? errors.email : "Email"
                    }
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        )}
      </Container>
    </>
  );
};

export default UserRegister
