import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, FormControl, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Register from "../components/Register";
import { Auth } from "../Component/Auth";

const imageURL = "https://wallpapercave.com/wp/wp2427540.jpg";

function Login() {

  function handleClick() {
    alert("Account not found, Please create account first");
  }


  return (
    <>
      <div className="sign-in-container">
      <Auth />
      </div>
      <div
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box
          component="form"
          sx={{
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 1000,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(54,69,79,0.5)",

                color: "white",
                width: 500,
                border: 1,
                borderRadius: 10,
                marginTop: -10,
                marginBottom: 20,
              }}
            >
              <h1>Initiative Finder</h1>
            </Box>

            <FormControl
              sx={{
                display: "flex",
                backgroundColor: "rgba(256,256,256)",
                flexWrap: "wrap",
                flexDirection: "row",
                border: 1,
                borderRadius: 5,
                padding: 10,
                paddingBottom: 20,
                alignContent: "left",
                marginLeft: 3,
                width: 200,
                justifyContent: "center",
              }}
            >
              <FormLabel
                sx={{
                  color: "black",
                  fontStyle: "oblique",
                  fontFamily: "Roboto",
                }}
              >
                {" "}
                How do you want to do this?{" "}
              </FormLabel>
              <TextField
                value=""
                placeholder="Enter Username"
                variant="outlined"
                color="success"
                margin="normal"
              ></TextField>

              <TextField
                sx={{ marginBottom: 2 }}
                type="password"
                placeholder="Enter Password"
                id="outlined-basic"
                variant="outlined"
              />

              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClick}
                  sx={{ marginRight: 0 }}
                >
                  Login
                </Button>
                <Register />
                {/* <Button color="error" variant="contained" >Register</Button> */}
              </Container>
            </FormControl>
          </Container>
        </Box>
      </div>
    </>
  );
}

export default Login;
