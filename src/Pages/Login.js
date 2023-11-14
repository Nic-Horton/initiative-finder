import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, FormControl, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Register from "../Component/Register";
import { Auth } from "../Component/Auth";
import NavbarNoLogin from "../Component/NavBarNoLogin";

function Login() {
  return (
    <>
    <NavbarNoLogin />
    <Auth /> 

    </>
  );
}

export default Login;
