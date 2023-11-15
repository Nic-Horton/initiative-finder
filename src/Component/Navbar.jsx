import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Home from "../Pages/Home";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import { NavLink } from "react-router-dom";
import { blueGrey } from "@mui/material/colors";
import { signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { auth } from "../Config/firebase-config";
import NavbarNoLogin from "./NavBarNoLogin";
const appBarColor = blueGrey[900];

const pages = [
  { name: "Character Creation", path: "/dashboard" },
  { name: "Initiative Tracker", path: "/tracker" },
  { name: "Login", path: "/login" },
];
const settings = ["Profile", "Settings", "Logout"];

function Navbar() {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useState(null);


  const handleOpenNavMenu = (event) => {
    console.log("clicked Hamburger");
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    console.log("clicked Horizontal Navbar");
    setAnchorElNav(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null); 
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
  };
  if (user === null) {
    return (
 
      <AppBar position="fixed" sx={{ backgroundColor: appBarColor,zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Button
        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                disabled
                variant="text"
                size="small"
                href="https://github.com/Nic-Horton"
              >
                <img
                   style={{marginLeft:2}}
                   width={40}
                   src="/Images/d20dice.png"
                   alt="GitHub"
                />
              </Button>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              color:'#c8b874'
            }}
          >
            InitFindr
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={NavLink}
                    to={page.path}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*MobileResponsiveness*/}
          <Button
        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                disabled
                variant="text"
                size="small"
                href="https://github.com/Nic-Horton"
              >
                <img
                   style={{marginLeft:2}}
                   width={40}
                   src="/Images/d20dice.png"
                   alt="GitHub"
                />
              </Button>
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              color:'#c8b874'
            }}
          >
            InitFindr
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={NavLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
    );
  }
  return (
    <>
    <NavbarNoLogin />
    </>
  );
}
export default Navbar;
