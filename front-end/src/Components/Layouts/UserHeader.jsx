import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import LogoutIcon from "@mui/icons-material/Logout";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserLogout } from "../Redux/userSlice";

const links = ["/", "/shop", "/profile"];

const pages = ["Home", "Shop", "Profile"];
const settings = ["Profile", "Logout"];

function UserHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo, token} = useSelector((state) => state.userLogin);
//   let userInfo;
//   if (userLogin) {
//     userInfo = userLogin.userInfo;
//   } else {
//     userInfo = null;
//   }

  const logoutHandler = () => {
    console.log("logout");
    dispatch(logout());
    navigate("/");
  };

  const loginHandler = () => {
    navigate("/usersignin");
  };




  return (
    <AppBar
      position="static"
      sx={{
        height: "100px",
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center", // Align items vertically center
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl" sx={{ bgcolor: "primary.main" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: "Inria Serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            Task Manager
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >{userInfo?<Typography onClick={() => logoutHandler()}>
              <LogoutIcon />
            </Typography>:"" }
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserHeader;
