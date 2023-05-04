import { Box, Divider, ThemeProvider, Typography, createTheme, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment } from "react";





const UserFooter = () => {
  const isAboveLgScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <>
      <Stack
        sx={{
          bgcolor: "primary.main",
          padding: 3,
          display: "flex",
          justifyContent: "space-around",
          marginTop: 0,
          
        }}
        direction={isAboveLgScreen ? "row" : "column"}
      >
        <Stack>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            About Us
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            Blog
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            Career
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            Contact Us
          </Typography>
        </Stack>
        {!isAboveLgScreen && <Divider color="#C0EEF2" sx={{ marginY: 1.5 }} />}

        <Stack>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            About Us
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            Blog
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            Career
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="info.main"
          >
            Contact Us
          </Typography>
        </Stack>

        {!isAboveLgScreen && (
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            direction="row"
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Inria Serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "info.main",
                textDecoration: "none",
              }}
            >
              Task Manager
            </Typography>
            <Typography
              variant="body2"
              color="warning.main"
              sx={{ mt: 1.3, marginLeft: 3 }}
            >
              {"Copyright © "}
              Task Manager {new Date().getFullYear()}
            </Typography>
          </Stack>
        )}

        {isAboveLgScreen && (
          <Stack
            sx={{
              bgcolor: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pb: 3,
            }}
          >
            {isAboveLgScreen && (
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Inria Serif",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "info.main",
                  textDecoration: "none",
                }}
              >
                Task Manager
              </Typography>
            )}
            <Typography variant="body2" color="info.main">
              {"Copyright © "}
              Task Manager {new Date().getFullYear()}
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default UserFooter;
