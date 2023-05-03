import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Paper } from "@mui/material";
import Loading from "./Loading";
import { loginUser } from "../actions/userActions";
import { loginSchema } from "../schema/validation";

const initialValues = {
  email: "",
  password: "",
};

const UserLogin = () => {

const Navigate = useNavigate();
  const dispatch = useDispatch();

const userLogin = useSelector((state) => state.userLogin);
const { loading, error, userInfo } = userLogin;

const [button , setButton] =useState(false)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =  useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
          submitHandler();

          console.log(values);
        },
      });

       const submitHandler = async () => {
         try {

           const userData = {
             email: values.email,
             password: values.password,
           };
           console.log(userData);

          const result = await dispatch(loginUser(userData));

           console.log(result);
           toast.error(result);

         } catch (error) {
      
           console.log(error.message);
           toast.error(error.message)
         }
       };




       useEffect(() => {
         console.log(userInfo);
         if (userInfo) {
           Navigate("/");
         }
       }, [Navigate, userInfo]);

  return (
    <>
      <Toaster toasterOptions={{ duratiom: 4000 }} />
      {/* <Container component="main" maxWidth="xs"> */}
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#E9E8E8",
          marginTop: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Paper
          sx={{
            padding: "2rem",
            borderRadius: "1rem",
            bgcolor: "info.main",
            boxShadow: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              pt: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#9c27b0", mb: "1rem" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: "1rem" }}>
              Sign in
            </Typography>
            <TextField
              error={errors.email && touched.email ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label={
                errors.email && touched.email ? errors.email : "Email Address"
              }
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: "1rem" }}
            />
            <TextField
              margin="normal"
              error={errors.password && touched.password ? true : false}
              label={
                errors.password && touched.password
                  ? errors.password
                  : "Enter password"
              }
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: "1rem" }}
            />

            {loading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                disabled={button ? true : false}
                variant="contained"
                sx={{
                  mt: "1rem",
                  minWidth: "10vw",
                  bgcolor: "#9c27b0",
                  ":hover": {
                    bgcolor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                Sign In
              </Button>
            )}

            <Grid
              container
              mt={{ xs: 0.5, sm: 1, md: 1.6, lg: 2 }}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: "1rem" }}
            >
              <Grid item xs={12} sm={6}>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ textAlign: { xs: "center", sm: "right" } }}
              >
                <Link to="/usersignup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      {/* </Container> */}
    </>
  );
};

export default UserLogin;
